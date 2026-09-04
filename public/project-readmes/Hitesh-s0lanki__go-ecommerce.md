# go-ecommerce

E-commerce REST API in Go — auth, catalog, cart, orders, image uploads, and domain events.

```
github.com/Hitesh-s0lanki/go-ecommerce
```

## Stack

| Concern | Choice |
| --- | --- |
| Language | Go 1.26 |
| HTTP | [gin](https://github.com/gin-gonic/gin) v1.12.0 |
| ORM | [GORM](https://gorm.io/) v1.31.2 + Postgres driver v1.6.0 |
| Migrations | [golang-migrate](https://github.com/golang-migrate/migrate) v4.19.1 (versioned SQL) |
| Auth | [golang-jwt/jwt](https://github.com/golang-jwt/jwt) v5.3.1 (HS256) + bcrypt (`golang.org/x/crypto`) |
| Messaging | [Watermill](https://watermill.io/) v1.5.2 + watermill-aws over SQS |
| Storage | [AWS SDK v2](https://github.com/aws/aws-sdk-go-v2) — S3 (or local disk) |
| API docs | [swaggo](https://github.com/swaggo/swag) v1.16.6 → Swagger UI |
| Logging | [zerolog](https://github.com/rs/zerolog) v1.35.1 |
| Config | [godotenv](https://github.com/joho/godotenv) v1.5.1 + environment |
| Lint | [golangci-lint](https://golangci-lint.run/) v2.12.2 |

### Docker images

| Image | Role | Port |
| --- | --- | --- |
| `postgres:18.4-alpine` | Database | `5432` |
| `localstack/localstack:4.0` | S3 + SQS, local | `4566` |
| `nginx:1.27-alpine` | CDN fronting uploads | `8081` |

## Quick start

```bash
git clone https://github.com/Hitesh-s0lanki/go-ecommerce.git
cd go-ecommerce
cp .env.example .env
make tools       # pinned dev tooling
make hooks       # git hooks
make docker-up   # Postgres, LocalStack, CDN
make migrate-up  # schema
make run         # http://localhost:8080
```

Docs: **http://localhost:8080/swagger/index.html** (disabled in release mode).

## Layout

```
cmd/api/            entrypoint: config, database, HTTP server, graceful shutdown
db/migrations/      versioned SQL — the source of truth for the schema
docker/             compose file, LocalStack init, nginx CDN config
internal/auth/      password hashing, JWT issue/verify
internal/config/    environment loading and validation
internal/database/  Postgres connection, pooling, health check
internal/dto/       request/response shapes and model mappers
internal/events/    SQS publisher
internal/logger/    zerolog setup
internal/models/    GORM models
internal/server/    gin engine, middleware, handlers
internal/storage/   upload providers (local, S3)
internal/utils/     HTTP response envelope
```

## Endpoints

| Method | Path | Access |
| --- | --- | --- |
| `GET` | `/health` | public — liveness, never touches the DB |
| `GET` | `/health/ready` | public — readiness, pings the DB |
| `POST` | `/api/v1/auth/register` | public |
| `POST` | `/api/v1/auth/login` | public |
| `POST` | `/api/v1/auth/refresh` | public — rotates the token |
| `POST` | `/api/v1/auth/logout` | public |
| `GET` | `/api/v1/auth/me` | user |
| `GET` | `/api/v1/users/profile` | user — same as `/auth/me` |
| `PUT` | `/api/v1/users/profile` | user — name and phone only |
| `GET` | `/api/v1/categories` | public |
| `GET` | `/api/v1/products` | public |
| `GET` | `/api/v1/products/:id` | public |
| `GET` | `/api/v1/cart` | user |
| `POST` | `/api/v1/cart/items` | user |
| `PUT` | `/api/v1/cart/items/:id` | user |
| `DELETE` | `/api/v1/cart/items/:id` | user |
| `POST` | `/api/v1/orders` | user |
| `GET` | `/api/v1/orders` | user |
| `GET` | `/api/v1/orders/:id` | user |
| `POST` | `/api/v1/categories` | admin |
| `PUT` | `/api/v1/categories/:id` | admin |
| `DELETE` | `/api/v1/categories/:id` | admin |
| `POST` | `/api/v1/products` | admin |
| `PUT` | `/api/v1/products/:id` | admin |
| `DELETE` | `/api/v1/products/:id` | admin |
| `POST` | `/api/v1/products/:id/images` | admin |

One envelope for every response:

```json
{ "success": true, "message": "ok", "data": { "status": "ok" } }
```

Error detail is returned only for 4xx. A 5xx returns a generic message and logs
the detail. Every request carries an `X-Request-ID` (an inbound one is reused).
CORS comes from `ALLOWED_ORIGINS`.

## Make targets

`make help` lists all of them.

| Target | Does |
| --- | --- |
| `run` / `dev` | Run the API |
| `build` | Compile to `bin/api` |
| `test` | Tests with the race detector |
| `test-integration` | Also tests needing Postgres |
| `lint` / `lint-fix` | Lint, optionally autofixing |
| `fmt` / `fmt-check` | Format, or show the diff |
| `docs` / `docs-check` | Regenerate Swagger spec / fail if stale |
| `ci` | tidy + vet + lint + test |
| `docker-up` / `docker-down` / `docker-reset` | Containers (`reset` drops volumes) |
| `migrate-up` / `migrate-down` / `migrate-status` | Apply / roll back one / show version |
| `migrate-create name=add_widgets` | Scaffold a migration pair |

## Design notes

<details>
<summary><b>Auth</b> — token separation, HS256 pinning, bcrypt limits</summary>

Access and refresh tokens are **not interchangeable**. Both are signed with the
same secret, so a signature alone proves only that a token is ours — not what it
is for. Every token carries a `use` claim and `ParseAccessToken` rejects a
refresh token; otherwise a 72-hour refresh token authenticates anywhere a
24-hour access token does.

- HS256 is **pinned** at parse time — a parser that trusts the token's own header is the root of the classic JWT confusion attacks
- `exp` is required; a token without one is valid forever
- Every token carries a `jti`, so one session can be revoked without dropping the rest
- `JWT_SECRET` must be ≥32 bytes, checked at startup. Generate with `openssl rand -hex 32`
- Passwords over 72 bytes are **rejected, not truncated** — bcrypt reads only the first 72, so a longer one would authenticate on a prefix. Cost is 12, not the library default of 10

Protect routes with `srv.Authenticate()`, gate admin routes with
`srv.RequireAdmin()` after it. Handlers read the caller via `CurrentUserID`,
`CurrentUserEmail`, `CurrentUserRole`.

</details>

<details>
<summary><b>Refresh tokens</b> — hashed at rest, rotated, theft detection</summary>

Only a **SHA-256 hash** of each refresh token is stored, never the token — a
database leak must not hand out working sessions. Plain SHA-256 rather than
bcrypt is correct here: the token is already high-entropy, so there is nothing to
brute force.

Refresh **rotates**: the presented token is revoked as the new pair is issued, so
any refresh token works exactly once. Replaying a rotated token is treated as
theft — a legitimate client never does it — and **every session for that user is
revoked**.

Login is uniform: wrong password, unknown email, and deactivated account all
return the same error, and an unknown email still pays for a bcrypt comparison so
it cannot be identified with a stopwatch.

</details>

<details>
<summary><b>Models</b> — integer cents, partial unique indexes</summary>

Nine models: `User`, `RefreshToken`, `Category`, `Product`, `ProductImage`,
`Cart`, `CartItem`, `Order`, `OrderItem`. `models.All()` lists them in dependency
order and is the single source of truth for migrations and tests.

**Money is integer cents** (`PriceCents`, `TotalAmountCents`, `UnitPriceCents`),
never a float — binary floating point cannot represent decimal cents exactly, so
summing line items drifts. `1999` means $19.99.

**Unique indexes are partial** (`WHERE deleted_at IS NULL`). Everything soft
deletes, and a plain unique index would let a deleted row reserve its email or
SKU forever.

`OrderItem` snapshots the price at purchase; `CartItem` deliberately does not, so
carts always price from the current product.

</details>

<details>
<summary><b>DTOs</b> — why they are separate from models</summary>

Binding a request straight onto a model invites mass assignment — a caller
setting `Role: "admin"` on registration — and serialising models back leaks
columns as they are added. `UserResponse` has no password field by construction
rather than by remembering a `json:"-"` tag.

Requests are validated with gin's `binding` tags. Prices cross the wire as
`price_cents`, matching the models; accepting decimals would reintroduce the
float rounding the schema avoids.

</details>

<details>
<summary><b>Migrations</b> — SQL only, never AutoMigrate</summary>

The models never migrate themselves. `AutoMigrate` builds throwaway schemas in
tests only, so [`db/migrations/`](db/migrations) stays the single source of truth
for the real database.

The SQL is kept equivalent to the models: applying the migrations and running
`AutoMigrate` produce a byte-identical schema. **Change a model, change the
migrations** — nothing enforces this automatically.

> **Postgres volume:** Postgres 18 stores data in `/var/lib/postgresql/18/docker`
> and expects the volume at `/var/lib/postgresql`. The pre-18 path
> (`/var/lib/postgresql/data`) is not interchangeable.

</details>

<details>
<summary><b>Domain events</b> — best-effort SQS publishing</summary>

Registering and logging in publish to SQS (`user.registered`, `user.logged_in`),
so work that is not the caller's concern — a welcome email, an analytics record —
happens elsewhere. `EVENTS_ENABLED=false` discards them and the API runs with no
queue.

Publishing is best-effort: a queue outage is logged, never a failed login. The
cost is that an event can be dropped, which is the right trade for these two. If
one ever must not be lost — payment taken, order placed — write it to the
database in the same transaction and have a relay publish it.

Refreshing a token publishes nothing: that is a session continuing, not a person
logging in.

The queue must already exist (the LocalStack init script creates it). The
publisher will not create one, so a typo in `AWS_EVENT_QUEUE_NAME` fails loudly.

</details>

<details>
<summary><b>Uploads and the CDN</b> — one URL for either provider</summary>

`UPLOAD_PROVIDER` decides where product images are stored: `local` writes to
`UPLOAD_PATH`, `s3` writes to the LocalStack bucket. `UPLOAD_PUBLIC_BASE_URL`
decides where clients fetch them, and the two are independent.

Left empty, the API serves its own files at `/uploads` — fine for development,
but only with the local provider. Point it at the CDN instead:

```sh
UPLOAD_PUBLIC_BASE_URL=http://localhost:8081/uploads
```

and one URL serves either provider: nginx returns the file from disk if the local
provider wrote it, and proxies the bucket if not. Switching `UPLOAD_PROVIDER`
needs no other change, and the API stops serving bytes — which is what production
looks like.

</details>

<details>
<summary><b>Config, hooks, and linting</b></summary>

Configuration comes from `.env` (copy `.env.example`). The Makefile reads the
same file, so `make migrate-*` targets the database configured there. Real
environment variables take precedence.

`GIN_MODE` drives more than routing: `release` switches logs to JSON, quiets GORM
statement logging, and makes a default `JWT_SECRET` a startup error rather than a
warning. Config is validated at startup, so a malformed duration or size fails
immediately instead of silently becoming zero.

`make hooks` points `core.hooksPath` at [`.githooks/`](.githooks) — plain shell,
nothing extra to install.

| Hook | Runs | Why there |
| --- | --- | --- |
| `pre-commit` | format check + lint | Fast, and only when Go files are staged |
| `pre-push` | `go vet` + `go test -race` | Too slow per commit; still blocks broken code from the remote |

Bypass with `--no-verify`; disable with `make unhooks`.

Linters live in [`.golangci.yml`](.golangci.yml) and run in CI on every push to
`main` and every PR. On top of the standard set (`errcheck`, `govet`,
`ineffassign`, `staticcheck`, `unused`): `bodyclose`, `errorlint`, `gocritic`,
`gosec`, `misspell`, `revive`, `unconvert`. Formatting is `gofmt` + `goimports`,
with local imports grouped separately.

</details>

## Requirements

- Go 1.26+
- Docker
- `make tools` installs golangci-lint and golang-migrate at pinned versions

## License

Not yet specified.
</content>
</invoke>
