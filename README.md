# ThoughtSpot Embed App

A demo application showcasing how to embed [ThoughtSpot](https://try-everywhere.thoughtspot.cloud/v2/#/everywhere/playground/search) analytics into a modern web app using the [Visual Embed SDK](https://github.com/thoughtspot/visual-embed-sdk). Built with Next.js 16, React 19, and TypeScript.

## Features

- **Liveboard Embed** — Interactive dashboards with real-time data visualizations
- **Visualization Embed** — Individual chart embeds for focused, contextual insights
- **Search Embed** — Natural language search over your data
- **Spotter (AI) Embed** — AI-powered conversational analytics assistant
- **Spotter Agent** — Headless chat interface powered by `SpotterAgentEmbed`, with a custom message list, typing indicator, inline visualization rendering, and full conversation state management
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
│   ├── (embed_v01)/                  # Embed page route group
│   │   ├── layout.tsx                # Shared layout — calls authenticate() once
│   │   ├── full_app/                 # Full App embed page
│   │   ├── liveboard/               # Liveboard embed page
│   │   ├── search/                  # Search embed page
│   │   ├── spotter/                 # Spotter (AI) embed page
│   │   ├── spotter_agent/           # Spotter Agent — custom chat UI
│   │   │   ├── page.tsx             # Main page: wires hook + child components
│   │   │   ├── page.module.css      # Chat layout, bubbles, typing indicator, responsive
│   │   │   ├── loading.tsx          # Route-level loading state
│   │   │   └── components/
│   │   │       ├── EmptyState.tsx    # Welcome screen with suggestion chips
│   │   │       ├── InputArea.tsx     # Textarea + send/clear buttons
│   │   │       ├── MessagesList.tsx  # Scrollable message list with viz containers
│   │   │       └── Svgs.tsx         # Inline SVG icons used by child components
│   │   └── viz/                     # Visualization embed page
│   ├── components/
│   │   ├── header/                  # Navigation header with route links
│   │   ├── footer/                  # Footer with doc/repo links
│   │   ├── intro/                   # Landing page hero & feature cards
│   │   ├── loading/                 # Loading spinner component
│   │   └── notification/            # Toast notification component
│   ├── contexts/
│   │   ├── AppContext.tsx           # React context for user state
│   │   └── NotificationContext.tsx  # Toast notification context & provider
│   ├── hooks/
│   │   └── useSpotterAgent.ts       # All Spotter Agent state & SDK logic
│   ├── styles/                      # Global styles and page-level CSS modules
│   ├── types/
│   │   └── index.ts                 # Shared TypeScript types (Message, Role, etc.)
│   ├── api/
│   │   └── auth/
│   │       └── route.ts             # Server-side auth token proxy
│   ├── utils/
│   │   ├── auth.ts                  # ThoughtSpot SDK initialization & auth
│   │   ├── constants.ts             # Environment vars, embed configs, URLs
│   │   ├── embedConfig.ts           # Embed component configuration
│   │   └── utils.ts                 # Helper utilities (ID generation, etc.)
│   ├── layout.tsx                   # Root layout (header + footer + metadata)
│   ├── page.tsx                     # Home / landing page
│   ├── error.tsx                    # Global error boundary
│   ├── not-found.tsx                # Custom 404 page
│   └── loading.tsx                  # Root loading state
├── middleware.ts                    # API origin validation
├── .env.example                     # Environment variable template
├── next.config.ts                   # Next.js config
├── package.json
└── tsconfig.json
```

### Spotter Agent Architecture

The Spotter Agent page (`/spotter_agent`) is a custom chat interface built on top of the headless `SpotterAgentEmbed` SDK class. Unlike the other embed pages that render a single iframe, Spotter Agent manages its own conversation loop:

```
page.tsx  ──uses──▸  useSpotterAgent (hook)
  │                      │
  │                      ├── SpotterAgentEmbed instance (ref)
  │                      ├── messages[] state
  │                      ├── sendMessage() → SDK.sendMessage() → appends viz container
  │                      └── handleNewConversation() → resets everything
  │
  ├── EmptyState        (shown before first message)
  ├── MessagesList      (renders user bubbles + agent viz containers)
  └── InputArea         (textarea + send/clear buttons)
```

Key design decisions:
- **Hook extraction** — All state, refs, and SDK interaction live in `useSpotterAgent`, keeping the page component purely presentational
- **Viz container refs** — Agent responses return raw `HTMLDivElement` containers from the SDK; these are stored in a `Map<id, div>` and attached to the DOM via React ref callbacks
- **Conversation reset** — "New conversation" clears the message array, destroys old viz containers, and creates a fresh `SpotterAgentEmbed` instance

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
