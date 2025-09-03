# Shopify Next.js Supabase Starter 🚀

A production-ready **Shopify embedded app** template built with **Next.js 14+ App Router**, **TypeScript**, **Supabase**, and **TanStack Query**. This starter follows all security best practices and provides a scalable architecture for building modern Shopify apps.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Shopify](https://img.shields.io/badge/Shopify-App%20Bridge%20v4-green?style=flat-square&logo=shopify)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)
![TanStack Query](https://img.shields.io/badge/TanStack-Query-red?style=flat-square)

## 🌟 Features

- ✅ **Shopify App Bridge v4** with secure token exchange authentication
- ✅ **Supabase** for session/install storage (no Prisma, no Docker)
- ✅ **OOP Repository Pattern** + Service Singleton for all external calls
- ✅ **TanStack Query hooks** for client data fetching (no direct fetch in components)
- ✅ **Security-first**: Strict CSP, no token logging, proper auth error handling
- ✅ **Webhooks**: Server-side registration, APP_UNINSTALLED cleanup, GDPR handlers
- ✅ **GraphQL Codegen** for type-safe operations
- ✅ **TypeScript** throughout with full type safety
- ✅ **Shopify Polaris** UI components
- ✅ **Production-ready** build and deployment configuration

## 📦 Dependencies

| Category | Package | Version | Purpose |
|----------|---------|---------|---------|
| **Core Framework** | `next` | 15.5.2 | Next.js App Router framework |
| | `react` | ^18.3.1 | React library (v18 for Polaris compatibility) |
| | `react-dom` | ^18.3.1 | React DOM rendering |
| | `typescript` | ^5 | TypeScript support |
| **Shopify Integration** | `@shopify/shopify-api` | ^11.0.0 | Shopify API SDK with webhooks & auth |
| | `@shopify/app-bridge-react` | ^4.1.3 | App Bridge v4 React components |
| | `@shopify/polaris` | ^12.0.0 | Shopify's design system components |
| **Database & Backend** | `@supabase/supabase-js` | ^2.39.7 | Supabase client for database operations |
| **State Management** | `@tanstack/react-query` | ^5.28.6 | Server state management & caching |
| **GraphQL** | `graphql` | ^16.8.1 | GraphQL core library |
| | `graphql-request` | ^6.1.0 | Lightweight GraphQL client |
| | `@graphql-codegen/cli` | ^5.0.2 | GraphQL code generation CLI |
| | `@graphql-codegen/client-preset` | ^4.2.4 | Client-side code generation preset |
| | `@graphql-typed-document-node/core` | ^3.2.0 | TypeScript support for GraphQL documents |

## 🏗️ Project Architecture

```
shopify-next-supabase-starter/
├── 📁 app/
│   ├── 📁 api/
│   │   ├── 📁 hello/
│   │   │   └── route.ts              # Example authenticated API route
│   │   └── 📁 webhooks/
│   │       └── route.ts              # Shopify webhook handler
│   ├── 📁 hooks/
│   │   ├── useGraphQL.ts             # Generic type-safe GraphQL hook
│   │   └── useSession.ts             # Session management hook
│   ├── 📁 providers/
│   │   ├── providers.tsx             # Main providers wrapper
│   │   ├── query-client.tsx          # TanStack Query provider
│   │   └── session-provider.tsx      # Session management provider
│   ├── layout.tsx                    # Root layout with Shopify metadata
│   ├── page.tsx                      # Main embedded app page
│   └── globals.css                   # Global styles
├── 📁 lib/
│   ├── 📁 db/
│   │   ├── base-repository.ts        # Base repository class
│   │   ├── session.repository.ts     # Session data repository
│   │   ├── app-installation.repository.ts # App installation tracking
│   │   └── service.ts                # Database service singleton
│   ├── 📁 shopify/
│   │   ├── initialize-context.ts     # Shopify API initialization
│   │   ├── verify.ts                 # Token verification utilities
│   │   ├── gdpr.ts                   # GDPR webhook handlers
│   │   └── register-webhooks.ts      # Webhook registration
│   └── 📁 supabase/
│       └── server.ts                 # Supabase admin client
├── 📁 lib/gql/                       # Generated GraphQL types (auto-generated)
├── codegen.ts                        # GraphQL Codegen configuration
├── next.config.ts                    # Next.js config with CSP headers
├── .env.example                      # Environment variables template
├── shopify.app.example.toml          # Shopify CLI config template
└── SETUP.md                          # Detailed setup instructions
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** and npm installed
- A **Shopify Partner account** ([Sign up here](https://partners.shopify.com/))
- A **Shopify development store** ([Create one here](https://help.shopify.com/en/partners/dashboard/managing-stores/development-stores))
- A **Supabase account** ([Sign up here](https://supabase.com/))
- **ngrok** or similar tunneling service ([Download here](https://ngrok.com/))

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd shopify-next-supabase-starter
npm install
```

### 2. Environment Setup

```bash
# Copy environment templates
cp .env.example .env.local
cp shopify.app.example.toml shopify.app.toml
```

## 🔧 Shopify Account Setup

### Step 1: Create a Shopify App

1. **Go to Shopify Partners Dashboard**
   - Visit [partners.shopify.com](https://partners.shopify.com/)
   - Sign in or create an account

2. **Create a New App**
   - Click "Apps" in the sidebar
   - Click "Create app"
   - Choose "Create app manually"
   - Enter your app name and select "Embedded app"

3. **Configure App URLs**
   - **App URL**: `https://your-ngrok-url.ngrok.io`
   - **Allowed redirection URLs**: `https://your-ngrok-url.ngrok.io/api/auth/callback`

4. **Set App Scopes**
   - Go to "App setup" → "Configuration"
   - Add required scopes (e.g., `read_products`, `write_products`)

5. **Get Your Credentials**
   - **Client ID** (API Key): Found in "App setup" → "App info"
   - **Client Secret**: Found in "App setup" → "App info"

### Step 2: Configure Environment Variables

Update your `.env.local` file:

```env
# Shopify App Credentials
SHOPIFY_API_KEY=your_client_id_here
SHOPIFY_API_SECRET=your_client_secret_here
SCOPES=read_products,write_products
HOST=https://your-ngrok-url.ngrok.io

# Public variables (accessible in browser)
NEXT_PUBLIC_SHOPIFY_API_KEY=your_client_id_here
NEXT_PUBLIC_HOST=https://your-ngrok-url.ngrok.io
```

### Step 3: Update Shopify App Configuration

Edit `shopify.app.toml`:

```toml
name = "your-app-name"
client_id = "your_client_id_here"
application_url = "https://your-ngrok-url.ngrok.io"
embedded = true

[access_scopes]
scopes = "read_products,write_products"

[auth]
redirect_urls = [
  "https://your-ngrok-url.ngrok.io/api/auth/callback"
]

[webhooks]
api_version = "2024-10"

[build]
automatically_update_urls_on_dev = true
dev_store_url = "your-dev-store.myshopify.com"
```

## 🗄️ Supabase Database Setup

### Step 1: Create a Supabase Project

1. **Go to Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com/)
   - Sign in or create an account
   - Click "New project"

2. **Configure Your Project**
   - Choose your organization
   - Enter project name and database password
   - Select a region close to your users
   - Click "Create new project"

### Step 2: Get Supabase Credentials

1. **Go to Project Settings**
   - Click the gear icon in the sidebar
   - Go to "API" section

2. **Copy Required Values**
   - **Project URL**: Your project's API URL
   - **Service Role Key**: The `service_role` secret key (⚠️ Keep this secure!)

### Step 3: Add Supabase Environment Variables

Update your `.env.local` file:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 4: Create Database Tables

In your Supabase dashboard, go to the **SQL Editor** and run this schema:

```sql
-- Session storage table
CREATE TABLE session (
  id text PRIMARY KEY,
  shop text NOT NULL,
  access_token text,
  scope text,
  expires timestamptz,
  is_online boolean DEFAULT false,
  state text,
  api_key text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Online access info for online tokens
CREATE TABLE online_access_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE REFERENCES session(id) ON DELETE CASCADE,
  expires_in integer,
  associated_user_scope text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Associated user information
CREATE TABLE associated_user (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  online_access_info_id uuid UNIQUE REFERENCES online_access_info(id) ON DELETE CASCADE,
  user_id bigint,
  first_name text,
  last_name text,
  email text,
  account_owner boolean DEFAULT false,
  locale text,
  collaborator boolean DEFAULT false,
  email_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- App installation tracking
CREATE TABLE app_installation (
  shop text PRIMARY KEY,
  webhooks_registered boolean DEFAULT false,
  installed_at timestamptz,
  uninstalled_at timestamptz
);

-- Performance indexes
CREATE INDEX idx_session_shop ON session(shop);
CREATE INDEX idx_session_api_key ON session(api_key);
CREATE INDEX idx_app_installation_shop ON app_installation(shop);
```

### Step 5: Configure Row Level Security (Optional but Recommended)

For additional security, you can enable RLS:

```sql
-- Enable RLS on all tables
ALTER TABLE session ENABLE ROW LEVEL SECURITY;
ALTER TABLE online_access_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE associated_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_installation ENABLE ROW LEVEL SECURITY;

-- Since we're using service role key, we can create policies that allow all operations
-- In production, you might want more granular policies
CREATE POLICY "Service role can do everything" ON session FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON online_access_info FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON associated_user FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON app_installation FOR ALL USING (true);
```

## 🔧 Development Setup

### Step 1: Start ngrok

In a terminal, start ngrok to create a secure tunnel:

```bash
# Install ngrok if you haven't already
# Visit https://ngrok.com/ for installation instructions

# Start ngrok on port 3000
ngrok http 3000
```

Copy the `https://` URL (e.g., `https://abc123.ngrok.io`) and update your environment variables and Shopify app configuration.

### Step 2: Start the Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000` and accessible via your ngrok URL.

### Step 3: Install Your App

1. Go to your Shopify Partner Dashboard
2. Find your app and click "Test on development store"
3. Select your development store
4. Click "Install app"

## 🧪 Testing Your Setup

### Test API Authentication

```bash
# This should return 401/403 without proper auth
curl https://your-ngrok-url.ngrok.io/api/hello

# With proper Shopify session token, it should return 200
# (You'll get the session token from App Bridge in your embedded app)
```

### Test Webhooks

1. Install your app on a development store
2. Check your Supabase database - you should see entries in `app_installation`
3. Uninstall the app
4. Check the database - the `uninstalled_at` field should be populated

### Test GraphQL Codegen

```bash
# Generate types from GraphQL operations
npm run graphql-codegen
```

## 📚 Key Concepts & Usage

### Repository Pattern

All database operations use the repository pattern:

```typescript
// Using the database service
import { dbService } from '@/lib/db/service';

// In an API route or server component
const session = await dbService.sessions.findById(sessionId);
const installation = await dbService.appInstallations.ensureWebhooksRegistered(shop);
```

### Client-Side Data Fetching

Always use React Query hooks in components:

```typescript
// ❌ Don't do this
const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};

// ✅ Do this instead
import { useQuery } from '@tanstack/react-query';

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-data'],
    queryFn: async () => {
      const response = await fetch('/api/data');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

### GraphQL Operations

1. Create `.graphql` files in your app:

```graphql
# app/graphql/products.graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}
```

2. Run codegen:

```bash
npm run graphql-codegen
```

3. Use the generated types:

```typescript
import { useGraphQL } from '@/app/hooks/useGraphQL';
import { GetProductsDocument } from '@/lib/gql/graphql';

function ProductsList() {
  const { data, isLoading } = useGraphQL(GetProductsDocument, { first: 10 });
  
  if (isLoading) return <div>Loading products...</div>;
  
  return (
    <div>
      {data?.products.edges.map(({ node }) => (
        <div key={node.id}>{node.title}</div>
      ))}
    </div>
  );
}
```

## 🚀 Production Deployment

### Deploy to Vercel

1. **Connect Your Repository**
   - Go to [vercel.com](https://vercel.com/)
   - Import your GitHub repository

2. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Update `HOST` to your Vercel domain

3. **Update Shopify App URLs**
   - Change app URL to your Vercel domain
   - Update redirect URLs accordingly

### Deploy to Railway

1. **Connect Your Repository**
   - Go to [railway.app](https://railway.app/)
   - Create new project from GitHub

2. **Configure Environment Variables**
   - Add all environment variables
   - Railway will provide a domain automatically

## 🔗 Useful Links

### Documentation
- [Shopify App Development](https://shopify.dev/docs/apps)
- [Shopify App Bridge](https://shopify.dev/docs/api/app-bridge)
- [Shopify Admin API](https://shopify.dev/docs/api/admin-graphql)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Shopify Polaris](https://polaris.shopify.com/)

### Tools & Services
- [Shopify Partners Dashboard](https://partners.shopify.com/)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [ngrok](https://ngrok.com/)
- [Vercel](https://vercel.com/)
- [Railway](https://railway.app/)

### GraphQL Tools
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen)
- [Shopify GraphiQL Explorer](https://shopify.dev/docs/api/admin-graphql#graphiql)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [SETUP.md](SETUP.md) for detailed setup instructions
2. Review the [troubleshooting section](SETUP.md#troubleshooting)
3. Open an issue on GitHub with detailed information about your problem

---

**Built with ❤️ for the Shopify developer community**
