# Shopify Next.js Supabase Starter - Setup Guide

This is a complete Shopify embedded app template built with Next.js 14+ App Router, TypeScript, Supabase, and following all security best practices.

## Features ✅

- **Shopify App Bridge v4** with token exchange authentication
- **Supabase** for session/install storage (no Prisma, no Docker)
- **OOP Repositories + Service Singleton** for all external calls
- **TanStack Query** hooks for client data fetching (no direct fetch in components)
- **Secure defaults**: strict CSP, no token logging, proper auth error handling
- **Webhooks**: server-side registration, APP_UNINSTALLED cleanup, GDPR handlers
- **GraphQL Codegen** for operations only
- **TypeScript** throughout with proper type safety

## Prerequisites

1. Node.js 18+ and npm
2. Shopify Partner account and development store
3. Supabase account and project
4. ngrok or similar tunneling service for development

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd shopify-next-supabase-starter
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   cp shopify.app.example.toml shopify.app.toml
   ```

3. **Configure Environment Variables**
   Edit `.env.local`:
   ```env
   SHOPIFY_API_KEY=your_shopify_api_key
   SHOPIFY_API_SECRET=your_shopify_api_secret
   SCOPES=write_products,read_products
   HOST=https://your-ngrok-url.ngrok.io
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_SHOPIFY_API_KEY=your_shopify_api_key
   NEXT_PUBLIC_HOST=https://your-ngrok-url.ngrok.io
   ```

4. **Setup Supabase Database**
   Run this SQL in your Supabase SQL Editor:
   ```sql
   -- Session storage
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

   -- Online access info
   CREATE TABLE online_access_info (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     session_id text UNIQUE REFERENCES session(id) ON DELETE CASCADE,
     expires_in integer,
     associated_user_scope text,
     created_at timestamptz DEFAULT now(),
     updated_at timestamptz DEFAULT now()
   );

   -- Associated user
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

   -- Indexes for performance
   CREATE INDEX idx_session_shop ON session(shop);
   CREATE INDEX idx_session_api_key ON session(api_key);
   CREATE INDEX idx_app_installation_shop ON app_installation(shop);
   ```

5. **Configure Shopify App**
   Edit `shopify.app.toml`:
   ```toml
   name = "your-app-name"
   client_id = "your_shopify_api_key"
   application_url = "https://your-ngrok-url.ngrok.io"
   embedded = true

   [access_scopes]
   scopes = "write_products,read_products"

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

6. **Start Development**
   ```bash
   # Start ngrok in one terminal
   ngrok http 3000

   # Start Next.js dev server in another terminal
   npm run dev
   ```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── hello/route.ts          # Example authenticated API route
│   │   └── webhooks/route.ts       # Webhook handler
│   ├── hooks/
│   │   ├── useGraphQL.ts           # Generic GraphQL hook
│   │   └── useSession.ts           # Session management hook
│   ├── providers/
│   │   ├── providers.tsx           # Main providers wrapper
│   │   ├── query-client.tsx        # React Query provider
│   │   └── session-provider.tsx    # Session management
│   ├── layout.tsx                  # Root layout with metadata
│   └── page.tsx                    # Main app page
├── lib/
│   ├── db/
│   │   ├── base-repository.ts      # Base repository class
│   │   ├── session.repository.ts   # Session repository
│   │   ├── app-installation.repository.ts
│   │   └── service.ts              # Database service singleton
│   ├── shopify/
│   │   ├── initialize-context.ts   # Shopify API setup
│   │   ├── verify.ts               # Token verification
│   │   ├── gdpr.ts                 # GDPR webhook handlers
│   │   └── register-webhooks.ts    # Webhook registration
│   └── supabase/
│       └── server.ts               # Supabase admin client
├── codegen.ts                      # GraphQL Codegen config
├── .env.example                    # Environment variables template
└── shopify.app.example.toml        # Shopify app config template
```

## Key Features Explained

### Authentication & Security
- Uses Shopify App Bridge v4 with token exchange (no session tokens stored client-side)
- Strict CSP headers prevent XSS attacks
- All API routes verify session tokens
- Proper 401/403 error handling
- No sensitive tokens logged

### Data Layer
- OOP repository pattern for all external calls
- Service singleton for dependency injection
- Supabase with service role key (never exposed to client)
- Type-safe database operations

### Client-Side Data Fetching
- All components use TanStack Query hooks
- No direct fetch calls in components
- Proper error boundaries and loading states
- Automatic refetching and caching

### Webhooks
- Server-side registration (not on every request)
- APP_UNINSTALLED automatically cleans up shop data
- GDPR webhooks ready for implementation
- Proper webhook verification

### GraphQL
- Codegen generates only operation types (not schema)
- Type-safe GraphQL queries and mutations
- Generic useGraphQL hook for any operation

## Development Workflow

1. **API Development**: Add routes in `app/api/` with proper auth
2. **Database Operations**: Extend repositories in `lib/db/`
3. **Client Hooks**: Create React Query hooks in `app/hooks/`
4. **GraphQL Operations**: Add `.graphql` files, run `npm run graphql-codegen`

## Testing the Setup

1. **Build Test**: `npm run build` should succeed
2. **API Auth Test**: Call `/api/hello` with valid session token
3. **Webhook Test**: Uninstall app, check database cleanup
4. **Dev Server**: `npm run dev` should start without errors

## Production Deployment

1. Deploy to Vercel/Railway/similar
2. Update `HOST` environment variable to production URL
3. Update Shopify app URLs in Partner Dashboard
4. Ensure Supabase production database is configured
5. Test webhooks in production environment

## Troubleshooting

### Build Errors
- Ensure all environment variables have placeholder values
- Check that Supabase URL and key are valid
- Verify Shopify API credentials

### Runtime Errors
- Check ngrok is running and URL matches HOST
- Verify Supabase tables exist and have correct schema
- Ensure Shopify app is configured with correct URLs

### Type Errors
- Run `npm run graphql-codegen` after adding GraphQL operations
- Check that all imports are correct
- Verify TypeScript configuration

## Security Notes

- Never commit real `.env` or `shopify.app.toml` files
- Service role key should only be used server-side
- All user input should be validated and sanitized
- Regular security updates for dependencies
- Monitor Supabase logs for suspicious activity

## Next Steps

1. Implement your app-specific features
2. Add proper error boundaries
3. Implement GDPR webhook handlers
4. Add monitoring and logging
5. Set up CI/CD pipeline
6. Add comprehensive tests

For questions or issues, refer to:
- [Shopify App Development Docs](https://shopify.dev/docs/apps)
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
