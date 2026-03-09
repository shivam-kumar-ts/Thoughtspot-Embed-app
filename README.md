# ThoughtSpot Embed App

A demo application showcasing how to embed [ThoughtSpot](https://try-everywhere.thoughtspot.cloud/v2/#/everywhere/playground/search) analytics into a modern web app using the [Visual Embed SDK](https://github.com/thoughtspot/visual-embed-sdk). Built with Next.js 16, React 19, and TypeScript.

## Features

- **Liveboard Embed** — Interactive dashboards with real-time data visualizations
- **Visualization Embed** — Individual chart embeds for focused, contextual insights
- **Search Embed** — Natural language search over your data
- **Spotter (AI) Embed** — AI-powered conversational analytics assistant
- **Full App Embed** — The complete ThoughtSpot experience with full navigation and discovery

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Analytics | [@thoughtspot/visual-embed-sdk](https://www.npmjs.com/package/@thoughtspot/visual-embed-sdk) |
| Auth | ThoughtSpot Trusted Auth (Cookieless) via [@thoughtspot/rest-api-sdk](https://www.npmjs.com/package/@thoughtspot/rest-api-sdk) |

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm (or yarn/pnpm)
- A ThoughtSpot instance with valid credentials
- A Liveboard, Visualization, and Worksheet already configured in your ThoughtSpot environment

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Thoughtspot-Embed-app.git
cd Thoughtspot-Embed-app
```

### 2. Install dependencies

```bash
cd web
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your ThoughtSpot credentials:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```
NEXT_PUBLIC_TS_USERNAME='your-thoughtspot-username'
TS_PASSWORD='your-thoughtspot-password'
NEXT_PUBLIC_TS_HOST='https://your-instance.thoughtspot.cloud'
NEXT_PUBLIC_TS_LIVEBOARD_ID='your-liveboard-guid'
NEXT_PUBLIC_TS_VIZ_ID='your-visualization-guid'
NEXT_PUBLIC_TS_WORKSHEET_ID='your-worksheet-guid'
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_TS_USERNAME` | ThoughtSpot username for authentication |
| `TS_PASSWORD` | ThoughtSpot password (server-only, never exposed to the browser) |
| `NEXT_PUBLIC_TS_HOST` | Full URL of your ThoughtSpot instance |
| `NEXT_PUBLIC_TS_LIVEBOARD_ID` | GUID of the Liveboard to embed |
| `NEXT_PUBLIC_TS_VIZ_ID` | GUID of the specific visualization to embed |
| `NEXT_PUBLIC_TS_WORKSHEET_ID` | GUID of the worksheet used by Search and Spotter |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
web/
├── app/
│   ├── (embed_v01)/            # Embed page route group
│   │   ├── full_app/           # Full App embed page
│   │   ├── liveboard/          # Liveboard embed page
│   │   ├── search/             # Search embed page
│   │   ├── spotter/            # Spotter (AI) embed page
│   │   └── viz/                # Visualization embed page
│   ├── components/
│   │   ├── header/             # Navigation header with route links
│   │   ├── footer/             # Footer with doc/repo links
│   │   ├── intro/              # Landing page hero & feature cards
│   │   └── loading/            # Loading spinner component
│   ├── contexts/
│   │   └── AppContext.tsx      # React context for user state
│   ├── styles/                 # Global styles and page-level CSS modules
│   ├── types/                  # TypeScript type definitions
│   ├── api/
│   │   └── auth/
│   │       └── route.ts        # Server-side auth token proxy
│   ├── utils/
│   │   ├── auth.ts             # ThoughtSpot SDK initialization & auth
│   │   ├── constants.ts        # Environment vars, embed configs, URLs
│   │   ├── embedConfig.ts      # Embed component configuration
│   │   └── utils.ts            # Helper utilities
│   ├── layout.tsx              # Root layout (header + footer + metadata)
│   ├── page.tsx                # Home / landing page
│   ├── error.tsx               # Global error boundary
│   ├── not-found.tsx           # Custom 404 page
│   └── loading.tsx             # Root loading state
├── middleware.ts               # API origin validation
├── .env.example                # Environment variable template
├── next.config.ts              # Next.js config
├── package.json
└── tsconfig.json
```

## Available Scripts

Run these from the `web/` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Authentication

The app uses **ThoughtSpot Trusted Authentication (Cookieless)** to securely initialize the Embed SDK. The auth flow is:

1. The embed layout (`(embed_v01)/layout.tsx`) calls `authenticate()` once for all embed pages
2. The client requests a token from the Next.js API route (`/api/auth`)
3. The API route fetches a full auth token from ThoughtSpot server-side — credentials never reach the browser
4. The SDK is initialized with `AuthType.TrustedAuthTokenCookieless` and the returned token
5. Embed components render within authenticated iframes

## Security

- **Server-only credentials** — `TS_PASSWORD` is never exposed to the client bundle
- **API middleware** — Origin validation on all `/api/*` routes

## Resources

- [ThoughtSpot Visual Embed SDK Documentation](https://developers.thoughtspot.com/docs/)
- [Getting Started Guide](https://developers.thoughtspot.com/docs/getting-started)
- [Visual Embed SDK on GitHub](https://github.com/thoughtspot/visual-embed-sdk)
- [Visual Embed SDK on npm](https://www.npmjs.com/package/@thoughtspot/visual-embed-sdk)

## License

This project is provided as a demo / reference implementation. See your ThoughtSpot license terms for SDK usage.
