# 🛍️ Modern Shopify Hydrogen Storefront

![Shopify Hydrogen Storefront](/images/banner.png)

<div align="center">

**Become an advanced, confident, and modern Shopify developer from scratch**

Build production-ready, headless commerce experiences with the latest tech stack

[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![React Router](https://img.shields.io/badge/react--router-7.9.2-red.svg)](https://reactrouter.com/)
[![Shopify Hydrogen](https://img.shields.io/badge/shopify--hydrogen-2025.7.0-96bf48.svg)](https://hydrogen.shopify.dev/)

</div>

---

## 🌟 Overview

This is a **modern, production-ready Shopify Hydrogen storefront** built with cutting-edge technologies. Perfect for developers looking to master headless commerce, this project demonstrates professional-grade patterns and best practices used in real-world e-commerce applications.

### 🎯 What You'll Learn

- ✅ **Shopify Hydrogen Framework** - Build blazing-fast storefronts with server-side rendering
- ✅ **Shopify Storefront API** - Query products, collections, and customer data with GraphQL
- ✅ **React Router v7** - Modern routing and data loading patterns
- ✅ **TypeScript** - Type-safe development with full IDE support
- ✅ **AI-Powered Features** - Integrated AI chat for enhanced customer experience
- ✅ **Vector Search** - Pinecone integration for semantic product search
- ✅ **Modern UI Components** - Shadcn/ui + Radix UI + Tailwind CSS
- ✅ **Docker Deployment** - Containerized development and production workflows

### 💼 Job-Ready Skills

Become job-ready by working with libraries and tools used in professional Shopify projects:

- Professional component architecture
- Advanced state management
- GraphQL code generation
- Performance optimization
- SEO best practices
- Accessibility standards (WCAG)
- Production deployment workflows

---

## 🚀 Features

### 🛒 Core E-Commerce

- **Product Catalog** - Browse products with advanced filtering and sorting
- **Collections** - Organized product collections with pagination
- **Search** - Powerful predictive search with instant results
- **Shopping Cart** - Full-featured cart with real-time updates
- **Checkout** - Seamless Shopify checkout integration
- **Customer Accounts** - Authentication and order management

### 🤖 AI & Advanced Features

- **AI Chat Assistant** - OpenAI-powered product recommendations and support
- **Vector Search** - Semantic search using Pinecone for better product discovery
- **Eye Tracking** - Advanced UX analytics
- **Dynamic Breadcrumbs** - Smart navigation with auto-generated breadcrumbs
- **Responsive Design** - Mobile-first, fully responsive UI

### 🎨 Modern UI/UX

- **shadcn/ui Components** - 50+ beautiful, accessible components
- **Dark Mode** - System-aware theme switching
- **Animations** - Smooth transitions and micro-interactions
- **Loading States** - Optimistic UI updates
- **Error Boundaries** - Graceful error handling

---

## 🛠️ Tech Stack

### Frontend Framework

- **[React 18.3](https://react.dev/)** - UI library with concurrent features
- **[React Router 7.9](https://reactrouter.com/)** - Modern routing solution
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Shopify & E-Commerce

- **[Shopify Hydrogen 2025.7](https://hydrogen.shopify.dev/)** - Shopify's headless commerce framework
- **[Storefront API](https://shopify.dev/docs/api/storefront)** - GraphQL API for storefront data
- **[Customer Account API](https://shopify.dev/docs/api/customer)** - Customer authentication and data
- **[GraphQL Codegen](https://the-guild.dev/graphql/codegen)** - Auto-generated TypeScript types

### AI & Search

- **[OpenAI](https://openai.com/)** - GPT-powered chat assistant
- **[Anthropic Claude](https://www.anthropic.com/)** - Alternative AI model support
- **[Pinecone](https://www.pinecone.io/)** - Vector database for semantic search
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - AI integration toolkit

### UI Components & Styling

- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon set
- **[Embla Carousel](https://www.embla-carousel.com/)** - Lightweight carousel

### Build Tools & Development

- **[Vite 6.2](https://vitejs.dev/)** - Next-generation build tool
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Docker](https://www.docker.com/)** - Containerization

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `18.0.0` or higher ([Download](https://nodejs.org/))
- **npm** `9.0.0` or higher (comes with Node.js)
- **Shopify Store** - A Shopify store with Storefront API access
- **Docker** (optional) - For containerized development ([Download](https://www.docker.com/))

---

## 🏁 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd shopify-hydrogen-storefront
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Shopify Store Configuration
PUBLIC_STORE_DOMAIN=your-store.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=your_storefront_api_token
PRIVATE_STOREFRONT_API_TOKEN=your_private_token

# Checkout & Session
PUBLIC_CHECKOUT_DOMAIN=your-store.myshopify.com
SESSION_SECRET=your_session_secret

# Site Configuration
PUBLIC_SITE_URL=http://localhost:3000

# AI Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key

# Vector Search (Optional)
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_HOST=your_index_host
```

#### 🔑 How to Get API Keys:

**Shopify API Tokens:**

1. Go to your Shopify Admin → Settings → Apps and sales channels
2. Click "Develop apps" → "Create an app"
3. Configure Storefront API permissions
4. Generate Storefront API access token

**OpenAI API Key:**

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and navigate to API keys
3. Generate a new API key

**Pinecone API Key:**

1. Visit [Pinecone](https://www.pinecone.io/)
2. Sign up for a free account
3. Create a new index and get your API key

### 4️⃣ Generate GraphQL Types

```bash
npm run codegen
```

This generates TypeScript types from your Shopify GraphQL schema.

---

## 💻 Local Development

### Standard Development (Without Docker)

```bash
# Start the development server
npm run dev
```

Your app will be available at:

- 🌐 **App**: http://localhost:3000
- 🔍 **GraphiQL**: http://localhost:3000/graphiql
- 📊 **Network Profiler**: http://localhost:3000/subrequest-profiler

### Docker Development

#### Prerequisites

- Docker installed on your machine
- Docker Compose (usually included with Docker Desktop)

#### Start with Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode (background)
docker-compose -f docker-compose.dev.yml up -d --build
```

#### Stop Docker Container

```bash
# Stop the container
docker-compose -f docker-compose.dev.yml down

# Stop and remove volumes
docker-compose -f docker-compose.dev.yml down -v
```

#### Docker Commands Reference

```bash
# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Restart container
docker-compose -f docker-compose.dev.yml restart

# Rebuild without cache
docker-compose -f docker-compose.dev.yml build --no-cache

# Execute commands in container
docker-compose -f docker-compose.dev.yml exec hydrogen-dev sh
```

#### Alternative: Plain Docker Commands

```bash
# Build the image
docker build -f Dockerfile.dev -t hydrogen-storefront-dev .

# Run the container
docker run -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --name hydrogen-dev \
  hydrogen-storefront-dev

# Stop container
docker stop hydrogen-dev

# Remove container
docker rm hydrogen-dev
```

---

## 🏗️ Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

---

## 📁 Project Structure

```
shopify-hydrogen-storefront/
├── app/
│   ├── actions/              # Server-side data mutations
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ai/              # AI chat components
│   │   ├── home/            # Home page components
│   │   ├── pageLayout/      # Layout components
│   │   └── search/          # Search components
│   ├── graphql/             # GraphQL queries & mutations
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   ├── routes/              # Route handlers (React Router)
│   ├── styles/              # Global styles
│   ├── entry.client.tsx     # Client entry point
│   ├── entry.server.tsx     # Server entry point
│   └── root.tsx             # Root component
├── public/                   # Static assets
├── server/                   # Server configuration
├── guides/                   # Documentation guides
├── docker-compose.dev.yml   # Docker Compose config
├── Dockerfile.dev           # Docker development config
├── vite.config.ts           # Vite configuration
├── react-router.config.ts   # React Router config
└── package.json             # Dependencies & scripts
```

---

## 🔌 API Integration

### Storefront API (GraphQL)

Query Shopify data using the Storefront API:

```typescript
// Example: Fetch products
import {useLoaderData} from 'react-router';

export async function loader({context}) {
  const {storefront} = context;

  const {products} = await storefront.query(PRODUCTS_QUERY, {
    variables: {
      first: 10,
    },
  });

  return {products};
}

export default function Products() {
  const {products} = useLoaderData<typeof loader>();
  // Render products...
}
```

### AI Chat API

Interact with the AI assistant:

```typescript
// POST /api/chat
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    messages: [{role: 'user', content: 'Show me running shoes'}],
  }),
});
```

### Vector Search

Semantic product search with Pinecone:

```typescript
// Integrated in search components
// Uses embeddings for better product discovery
```

---

## 🎨 Customization

### Adding New Components

```bash
# Add shadcn/ui component
npx shadcn-ui@latest add button

# Component will be added to app/components/ui/
```

### Styling

This project uses **Tailwind CSS 4.1**. Global styles are in `app/styles/globals.css`.

```tsx
// Example component with Tailwind
export function ProductCard({product}) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-muted-foreground">{product.description}</p>
    </div>
  );
}
```

### Theme Configuration

Edit `app/styles/globals.css` to customize your color palette:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... */
  }
}
```

---

## 🧪 Code Quality

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Code Generation

```bash
npm run codegen
```

Generates TypeScript types from:

- Shopify Storefront API schema
- Shopify Customer Account API schema
- React Router routes

---

## 🚀 Deployment

### Deploy to Shopify Oxygen

```bash
# Build and deploy
npm run build
npx shopify hydrogen deploy
```

### Deploy to Other Platforms

This app can be deployed to any Node.js hosting platform:

- **Vercel** - Connect your Git repo
- **Netlify** - Use the build command: `npm run build`
- **Railway** - Deploy with Dockerfile
- **Fly.io** - Use the provided Dockerfile
- **AWS / GCP / Azure** - Deploy as containerized app

---

## 📚 Learning Resources

### Official Documentation

- [Shopify Hydrogen Docs](https://shopify.dev/custom-storefronts/hydrogen)
- [React Router Docs](https://reactrouter.com/docs)
- [Storefront API Reference](https://shopify.dev/docs/api/storefront)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Guides

Check the `guides/` directory for detailed tutorials:

- `guides/search/` - Implementing predictive search
- `guides/predictiveSearch/` - Advanced search patterns

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Test your changes thoroughly

---

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**GraphQL types not generating:**

```bash
# Ensure your .env file has correct API tokens
npm run codegen -- --force
```

**Docker container exits immediately:**

```bash
# Check logs
docker-compose -f docker-compose.dev.yml logs

# Rebuild without cache
docker-compose -f docker-compose.dev.yml build --no-cache
```

**Module not found errors:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 💡 Make Money with Shopify Apps

This project demonstrates the skills needed to build and sell Shopify Hydrogen apps. With this foundation, you can:

- 🎯 Build custom storefronts for clients
- 🏪 Create and sell Shopify apps on the App Store
- 💼 Offer Shopify development services
- 🚀 Launch your own e-commerce brand
- 📚 Create educational content and courses

**Ready to become a professional Shopify developer? Start building today!** 🚀

---

<div align="center">

**Built with ❤️ using Shopify Hydrogen**

[Report Bug](https://github.com/your-repo/issues) · [Request Feature](https://github.com/your-repo/issues)

</div>
