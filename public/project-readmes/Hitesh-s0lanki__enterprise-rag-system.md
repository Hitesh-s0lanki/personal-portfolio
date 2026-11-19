# Enterprise RAG System

An IT support knowledge copilot that combines permission-aware company search, evidence grading, public web research, and controlled document updates. Built with Python, LangChain, and Streamlit.

The showcase uses **NovaRetail**, a fictional organization with 3,000 employees. Its sample knowledge covers VPN access, passwords, MFA, software installation, laptop troubleshooting, and service-desk procedures.

## The problem

Employees raise repetitive IT tickets because they cannot quickly find current, applicable guidance. Keyword search leaves them to interpret documents; a general chatbot can give answers unsupported by company policy. Support teams also need to keep that knowledge current without allowing unauthorized reads or edits.

This project addresses that problem by retrieving approved document revisions, checking whether the evidence can answer the question, and giving the agent tools to research public information or maintain existing documents within the caller's permissions. The full [problem statement](docs/problem-statement.md) also defines quality, latency, provenance, and cost requirements; some remain future work.

## Architecture

![Enterprise RAG System architecture: client, agent, internal knowledge search, public web search, and controlled document updates](docs/diagrams/image.png)

[Download PNG](docs/diagrams/image.png)

Open the app's **Architecture** page for interactive views of [client and tools](docs/diagrams/system.html), [knowledge search](docs/diagrams/knowledge.html), and [document updates](docs/diagrams/updates.html). Download those HTML files to view them locally; GitHub displays their source.

### How a question is answered

1. The application binds the selected demo user's database identity, namespace, and approved document heads to the root agent's tools. Services check current permissions before executing operations.
2. The OpenAI-powered LangChain root agent calls `search_knowledge`. A valid Mem0 hit can reuse a complete retrieval and grading report after scope, revision, freshness, integrity, and access checks. Paraphrased queries additionally require Jev equivalence verification.
3. On a miss or explicit memory bypass, Pinecone runs dense semantic and BM25 keyword searches in parallel over permitted approved revisions. Weighted reciprocal rank fusion merges and deduplicates the results.
4. TypeSafe AI Jev evaluates each retrieved chunk for relevance, coverage, and sufficient evidence. Eligible sufficient reports can be stored in Mem0; insufficient evidence is returned explicitly.
5. The agent can refine its search or call optional Firecrawl public-web tools. Firecrawl search middleware grades results against the original question and allows at most two query enhancements, for up to three searches. Scrape and map tools remain ungraded.
6. The agent produces the reply using returned evidence. Streamlit shows streamed text, tool activity, sources, revisions, source update times, evidence assessments, and available latency and usage metrics.

The agent chooses whether to retry or use web tools within its execution limits. Internal search itself does not automatically invoke web search. Citation and grounding instructions guide answer generation; a separate final-answer validator is not implemented.

### How knowledge changes

Initial ingestion loads UTF-8 `.txt`, `.md`, and `.markdown` files, splits them recursively, and stores chunks with embeddings and metadata in Pinecone. OpenAI embeddings can be generated directly or through a compatible Pinecone integrated embedding configuration.

Existing-document edits use an authoritative SQLite source catalog. The update service checks the caller's action permissions, namespace, stored document ACLs, and expected revision; stages immutable replacement chunks; verifies the uploaded data; then atomically publishes the new catalog head. Earlier revisions remain recorded. Subsequent queries follow approved published heads, and the changed revision set prevents reuse of old Mem0 reports.

Raw Pinecone ingestion does **not** publish a catalog revision. A trusted maintainer must explicitly enroll verified documents before the showcase can query or edit them. See [document update setup](docs/document-update-tools.md).

## Implemented capabilities

| Capability | Current behavior |
| --- | --- |
| Hybrid retrieval | Parallel dense and BM25 search, weighted reciprocal rank fusion, deduplication, approved revision filters, and role checks. |
| Evidence grading | Jev relevance, coverage, and sufficiency scores; explicit sufficient, insufficient, or empty results. |
| Report reuse | Mem0 stores complete successful retrieval/grading reports, scoped to user, revisions, configuration, and TTL. It does not cache the final generated answer. |
| Access control | Database-derived bitwise permissions, namespace scopes, document role checks, and catalog reader/writer ACLs for edits. |
| Controlled updates | Optimistic revision checks, immutable chunks, upload verification, publication history, and current-head selection. |
| Public research | Optional Firecrawl MCP search, scrape, and map tools; bounded grading/refinement loop for search. |
| Streaming | Shared `BaseAgent` runtime with normalized `AgentEvent` output, JSONL/SSE serialization, cancellation, and terminal events. |
| Showcase | Streamlit chat, starter questions, source inspection, session-local history, demo identity selection, and interactive architecture pages. |
| Observability | Structured rotating JSONL logs, retrieval timings, agent token usage, and available tool-provider metrics. |

## Technology

| Component | Technology |
| --- | --- |
| Runtime and dependency management | Python 3.13+, `uv`, repository-local `.venv` |
| Agent orchestration | LangChain, shared `BaseAgent`, OpenAI chat models |
| Frontend | Streamlit |
| Embeddings | OpenAI; default `text-embedding-3-small`, 1,536 dimensions |
| Document search | Pinecone Documents API, dense vectors and BM25 |
| Evidence and query-equivalence grading | TypeSafe AI Jev |
| Retrieval report cache | Mem0 Platform |
| Public web tools | Firecrawl over MCP |
| Users, permissions, source catalog, revisions | Standard-library SQLite behind repository interfaces |

Redis appears in the [original architecture proposal](docs/architecture-diagram.md), but the current implementation uses Mem0 for report reuse.

## Local setup

Run all commands from the repository root. Install Python matching `.python-version` and [uv](https://docs.astral.sh/uv/) first.

```sh
git clone https://github.com/Hitesh-s0lanki/enterprise-rag-system.git
cd enterprise-rag-system
uv sync --locked
cp .env.example .env
```

If `.env` already exists, keep it and compare its settings with `.env.example`. Replace the required placeholders locally; `.env` is ignored by Git.

### Provider configuration

| Setting | Needed for |
| --- | --- |
| `OPENAI_API_KEY` | Agent answer generation, query enhancement, and direct embedding generation. |
| `PINECONE_API_KEY` | Live document ingestion and retrieval. |
| `TYPESAFE_API_KEY` | Document/web evidence grading and paraphrase equivalence checks. |
| `MEM0_API_KEY` | Default `search_knowledge` report reuse. Calls with `use_memory=False` bypass Mem0 reads and writes. |
| `FIRECRAWL_API_KEY` | Optional public-web tools; set `FIRECRAWL_ENABLED=false` to disable them. |

The complete configuration reference is [.env.example](.env.example). Important defaults include:

| Setting | Default |
| --- | --- |
| `PINECONE_INDEX_NAME` / `PINECONE_NAMESPACE` | `enterprise-it-knowledge` / `it-support` |
| `AGENT_MODEL` | `gpt-4.1-mini` |
| `AUTH_DB_PATH` | `.local/auth.sqlite3` |
| Chunk size / overlap | 1,000 / 150 characters |
| Retrieval results / candidates per signal | 5 / 20 |
| Dense / keyword fusion weights | 0.7 / 0.3 |
| Jev relevance / sufficiency thresholds | 0.6 / 0.7 |
| Mem0 report TTL | 900 seconds |
| Root model calls / tool calls / run timeout | 4 / 6 / 120 seconds |

Pinecone must have a compatible hybrid schema; legacy vector-only indexes are rejected. Embedding model and dimensions must match the index. See [ingestion](docs/data-ingestion.md) for schema and embedding modes.

### Start the showcase

```sh
uv run --locked streamlit run src/app/main.py
```

Open the local URL printed by Streamlit. Startup initializes SQLite auth and catalog tables and seeds demo users once, preserving later changes. When demo document registrations are missing, it verifies the approved manifest's exact chunks in Pinecone and restores the catalog automatically. Startup never uploads or embeds documents; provider reads occur only for missing registrations. Live questions and ingestion can incur provider charges. See [startup recovery](docs/streamlit-app.md) for configuration and verification rules.

An empty catalog disables chat. The two approved demo revisions are restored automatically when they exist in the configured Pinecone index and namespace. For other documents, ingest and enroll their verified revisions as described below. The Architecture page is available without provider calls.

### Prepare and publish knowledge

Initialize auth explicitly when using the CLI before starting the app:

```sh
uv run --locked python -m src.db.auth init
```

Preview sample chunks and metadata without calling embedding or storage providers:

```sh
uv run --locked python -m src.data_ingestion src/data \
  --user bob \
  --allowed-role employee \
  --allowed-role contributor \
  --allowed-role administrator \
  --dry-run
```

For a live ingestion, remove `--dry-run` after configuring credentials. If a new compatible index is needed, use `--user mice --create-index`. Choose reader roles appropriate to each document; the example makes both sample documents readable by all three demo roles.

Source metadata preserves filename, source update time, ingestion time, source editor, uploader identity, reader roles, document/revision IDs, and chunk identity. `--updated-by` supplies the source editor when different from the uploader; `--updated-at` supplies a known source timestamp. Otherwise, file modification time is used and labeled accordingly.

After ingestion, a trusted maintainer must:

1. Initialize the document catalog in the same SQLite database as auth, if the app has not already done so.
2. Verify each intended uploaded document/revision pair and its full source and metadata.
3. Call `DocumentUpdateService.register_existing_document(...)` with explicit reader/writer roles and that verified revision.

The [catalog setup and enrollment examples](docs/document-update-tools.md#explicit-catalog-setup) describe the Python API. Enrollment records trusted approval; it does not upload or independently verify existing Pinecone content. There is currently no upload/enrollment form or all-in-one bootstrap CLI.

### Demo users

| Username | Seeded role | Intended use |
| --- | --- | --- |
| `alice` | Employee | Read permitted knowledge. |
| `bob` | Contributor | Read and write within assigned scope and document permissions. |
| `mice` | Administrator | Manage knowledge within assigned scope, including index creation. |

Seeded users belong to `it-support`. Permissions and scopes are read from SQLite on use; repeat initialization preserves edits and deletions. The selector and CLI `--user` option are demo identity controls. Production deployment requires real authentication and trusted identity binding.

### Query from the CLI

Replace `DOCUMENT_ID:REVISION_ID` with a trusted approved pair of 64-character lowercase SHA-256 IDs. Repeat `--revision` for additional approved documents.

```sh
# Fresh retrieval with Jev evidence grading
uv run --locked python -m src.retrieval "How do I connect to the VPN?" \
  --user alice --grade --revision DOCUMENT_ID:REVISION_ID

# Add --memory-cache to the command above to enable Mem0 report reuse.

# Stream root-agent events; use --format sse for SSE framing
uv run --locked python -m src.agents "How do I connect to the VPN?" \
  --user alice --revision DOCUMENT_ID:REVISION_ID --format jsonl
```

## Repository layout

```text
src/
  agents/          BaseAgent, root agent, query enhancement, Markdown prompts
  app/             Streamlit pages, components, conversation and runtime services
  clients/         OpenAI, Pinecone, Jev, Mem0, and Firecrawl clients
  data/            Sample company handbook and service-desk runbook
  data_ingestion/  Text loading, splitting, embeddings, ingestion, revision updates
  db/auth/         SQLite users, role masks, scopes, authorization, seed data
  db/documents/    Authoritative source catalog and revision repository
  grading/         Internal document and web evidence grading
  query/           Knowledge orchestration, scoped report reuse, equivalence checks
  retrieval/       Dense/BM25 search, filters, fusion, retrieval CLI
  tools/           Explicit agent tool registry and tool adapters
  utils/           Events, streaming normalization, structured logging
docs/              Requirements, implementation guides, architecture diagrams
tests/             Offline unit and integration tests
```

## Verification

```sh
uv run --locked python -m unittest discover -s tests -v
```

Tests use temporary databases, scripted model streams, and provider doubles. They cover authorization, denied provider calls, ingestion metadata, hybrid retrieval, grading, cache validation, document publication, streaming/cancellation, web tools, and Streamlit behavior without live provider requests.

## Current limitations

- Jev grades retrieved evidence, not the final generated answer. Final-answer relevance, completeness, and factual-support grading remain unimplemented.
- Token counts and provider metrics are available in parts of the pipeline, but monetary totals, aggregate spending reports, development/runtime cost separation, and enforceable monetary budgets are not implemented. Call, input/output, and timeout limits provide narrower execution bounds.
- Retrieval supports 1–100 approved document heads per namespace. The showcase disables chat outside that supported range.
- SQLite and Pinecone do not share a transaction. Failed uploads may leave orphan chunks, crashes may require manual inspection of staged updates, and search indexing can lag publication. Old chunks and cache entries are excluded by revision context rather than automatically deleted.
- Persistent embedding caching, automatic staged-update recovery, ACL administration tools, and dedicated document upload/edit forms are not implemented.
- Mem0 operation failures can fall back to fresh retrieval, but missing provider configuration can fail before that fallback. Bypass memory explicitly when it is not configured.

## Further reading

- [Business problem and acceptance requirements](docs/problem-statement.md)
- [Current architecture and interactive diagram details](docs/architecture-page.md)
- [Streamlit showcase and setup behavior](docs/streamlit-app.md)
- [Users, permissions, and namespace scopes](docs/auth.md)
- [Ingestion and metadata](docs/data-ingestion.md)
- [Hybrid retrieval](docs/hybrid-retrieval.md) and [document grading](docs/document-grading.md)
- [Mem0 report reuse](docs/query-memory-cache.md)
- [Root agent](docs/root-agent.md), [knowledge tools](docs/agent-knowledge-tools.md), and [public web tools](docs/firecrawl-tools.md)
- [Document updates and publication](docs/document-update-tools.md)
- [Structured logging](docs/logging.md)
