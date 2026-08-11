# ThoughtSpot Embed App

A demo monorepo showcasing how to embed [ThoughtSpot](https://try-everywhere.thoughtspot.cloud/v2/#/everywhere/playground/search) analytics into modern web apps using the [Visual Embed SDK](https://github.com/thoughtspot/visual-embed-sdk). It ships two standalone implementations — one in **Next.js** and one in **React + Vite** — so you can pick the stack that matches your project.

## Apps

| App | Directory | Stack | Auth model |
|-----|-----------|-------|------------|
| **Next.js App** | [`next-app/`](./next-app) | Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 | Server-side trusted auth — credentials never reach the browser |
| **React App** | [`react-app/`](./react-app) | React 19 · Vite 8 · React Router 7 · TypeScript 6 · Tailwind CSS 4 | Client-side auth — configure credentials from an in-browser form |

## Features

Both apps cover the same core embed surfaces:

- **Liveboard Embed** — Interactive dashboards with real-time data visualizations
- **Visualization Embed** — Individual chart embeds for focused, contextual insights
- **Search Embed** — Natural language search over your data
- **Spotter (AI) Embed** — AI-powered conversational analytics assistant
- **Full App Embed** — The complete ThoughtSpot experience with full navigation and discovery

The Next.js app adds one extra surface:

- **Spotter Agent** _(Next.js only)_ — Headless chat interface powered by `SpotterAgentEmbed`, with a custom message list, typing indicator, inline visualization rendering, and full conversation state management

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm (or yarn/pnpm)
- A ThoughtSpot instance with valid credentials
- A Liveboard, Visualization, and Worksheet already configured in your ThoughtSpot environment

---

## Next.js App

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Analytics | [@thoughtspot/visual-embed-sdk](https://www.npmjs.com/package/@thoughtspot/visual-embed-sdk) |
| Auth | ThoughtSpot Trusted Auth (Cookieless) via [@thoughtspot/rest-api-sdk](https://www.npmjs.com/package/@thoughtspot/rest-api-sdk) |

### Getting Started

```bash
git clone https://github.com/your-username/Thoughtspot-Embed-app.git
cd Thoughtspot-Embed-app/next-app
npm install
```

Copy the example env file and fill in your ThoughtSpot credentials:

```bash
cp .env.example .env
```

Edit `.env`:

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

```bash
npm run dev      # http://localhost:3000
```

### Project Structure

```
next-app/
├── app/
│   ├── (embed_v01)/                  # Embed page route group
│   │   ├── layout.tsx                # Shared layout — calls authenticate() once
│   │   ├── full_app/                 # Full App embed page
│   │   ├── liveboard/                # Liveboard embed page
│   │   ├── search/                   # Search embed page
│   │   ├── spotter/                  # Spotter (AI) embed page
│   │   ├── spotter_agent/            # Spotter Agent — custom chat UI
│   │   │   ├── page.tsx              # Main page: wires hook + child components
│   │   │   ├── page.module.css       # Chat layout, bubbles, typing indicator, responsive
│   │   │   ├── loading.tsx           # Route-level loading state
│   │   │   └── components/
│   │   │       ├── EmptyState.tsx    # Welcome screen with suggestion chips
│   │   │       ├── InputArea.tsx     # Textarea + send/clear buttons
│   │   │       ├── MessagesList.tsx  # Scrollable message list with viz containers
│   │   │       └── Svgs.tsx          # Inline SVG icons used by child components
│   │   └── viz/                      # Visualization embed page
│   ├── components/
│   │   ├── header/                   # Navigation header with route links
│   │   ├── footer/                   # Footer with doc/repo links
│   │   ├── intro/                    # Landing page hero & feature cards
│   │   ├── loading/                  # Loading spinner component
│   │   └── notification/             # Toast notification component
│   ├── contexts/
│   │   ├── AppContext.tsx            # React context for user state
│   │   └── NotificationContext.tsx   # Toast notification context & provider
│   ├── hooks/
│   │   └── useSpotterAgent.ts        # All Spotter Agent state & SDK logic
│   ├── styles/                       # Global styles and page-level CSS modules
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript types (Message, Role, etc.)
│   ├── api/
│   │   └── auth/
│   │       └── route.ts              # Server-side auth token proxy
│   ├── utils/
│   │   ├── auth.ts                   # ThoughtSpot SDK initialization & auth
│   │   ├── constants.ts              # Environment vars, embed configs, URLs
│   │   ├── embedConfig.ts            # Embed component configuration
│   │   └── utils.ts                  # Helper utilities (ID generation, etc.)
│   ├── layout.tsx                    # Root layout (header + footer + metadata)
│   ├── page.tsx                      # Home / landing page
│   ├── error.tsx                     # Global error boundary
│   ├── not-found.tsx                 # Custom 404 page
│   └── loading.tsx                   # Root loading state
├── middleware.ts                     # API origin validation
├── .env.example                      # Environment variable template
├── next.config.ts                    # Next.js config
├── package.json
└── tsconfig.json
```

### Available Scripts

Run from `next-app/`:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

### Authentication

The app uses **ThoughtSpot Trusted Authentication (Cookieless)**. The auth flow is:

1. The embed layout (`(embed_v01)/layout.tsx`) calls `authenticate()` once for all embed pages
2. The client requests a token from the Next.js API route (`/api/auth`)
3. The API route fetches a full auth token from ThoughtSpot server-side — credentials never reach the browser
4. The SDK is initialized with `AuthType.TrustedAuthTokenCookieless` and the returned token
5. Embed components render within authenticated iframes

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

---

## React App

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| UI | [Tailwind CSS 4](https://tailwindcss.com/) |
| Language | [TypeScript 6](https://www.typescriptlang.org/) |
| Analytics | [@thoughtspot/visual-embed-sdk](https://www.npmjs.com/package/@thoughtspot/visual-embed-sdk) |
| Auth | ThoughtSpot Trusted Auth — credentials configured via in-browser form and stored in `localStorage` |

### Getting Started

```bash
cd Thoughtspot-Embed-app/react-app
npm install
```

Optionally create a `.env` file to pre-fill defaults (all values can also be entered through the in-app **Connection Settings** form):

```
VITE_TS_USERNAME='your-thoughtspot-username'
VITE_TS_HOST='https://your-instance.thoughtspot.cloud'
VITE_TS_LIVEBOARD_ID='your-liveboard-guid'
VITE_TS_VIZ_ID='your-visualization-guid'
VITE_TS_WORKSHEET_ID='your-worksheet-guid'
```

> **Note:** The React app does **not** support a server-side password variable. The ThoughtSpot password is entered through the UI form and persisted in `localStorage` — do not use this app in production with sensitive credentials.

| Variable | Description |
|----------|-------------|
| `VITE_TS_USERNAME` | ThoughtSpot username (build-time default; overridden by the form) |
| `VITE_TS_HOST` | Full URL of your ThoughtSpot instance |
| `VITE_TS_LIVEBOARD_ID` | GUID of the Liveboard to embed |
| `VITE_TS_VIZ_ID` | GUID of the specific visualization to embed |
| `VITE_TS_WORKSHEET_ID` | GUID of the worksheet used by Search and Spotter |

```bash
npm run dev      # http://localhost:5173
```

### Project Structure

```
react-app/
├── src/
│   ├── (embed_v01)/              # Embed page components (mirrors Next.js route group)
│   │   ├── full_app/             # Full App embed page
│   │   ├── liveboard/            # Liveboard embed page
│   │   ├── search/               # Search embed page
│   │   ├── spotter/              # Spotter (AI) embed page
│   │   └── viz/                  # Visualization embed page
│   ├── components/
│   │   ├── envConfig/            # In-browser Connection Settings form
│   │   ├── header/               # Navigation header with route links
│   │   ├── footer/               # Footer with doc/repo links
│   │   ├── intro/                # Landing page hero & feature cards
│   │   ├── loading/              # Loading spinner component
│   │   └── notification/         # Toast notification component
│   ├── contexts/
│   │   ├── AppContext.tsx        # React context for initialization state
│   │   └── NotificationContext.tsx # Toast notification context & provider
│   ├── styles/                   # Global styles and page-level CSS modules
│   ├── types/
│   │   └── index.ts              # Shared TypeScript types
│   ├── utils/
│   │   ├── auth.ts               # ThoughtSpot SDK initialization & auth
│   │   ├── constants.ts          # Environment vars, embed configs, URLs
│   │   ├── embedConfig.ts        # Embed component configuration
│   │   ├── embedEnv.ts           # localStorage-backed credential store
│   │   └── utils.ts              # Helper utilities
│   ├── App.tsx                   # React Router routes
│   ├── AppInit.tsx               # Root shell — header, footer, auth bootstrap
│   ├── main.tsx                  # Vite entry point
│   └── not-found.tsx             # Custom 404 page
├── index.html                    # Vite HTML entry
├── vite.config.ts                # Vite config
├── package.json
└── tsconfig.json
```

### Available Scripts

Run from `react-app/`:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

### Authentication

The React app uses **client-side ThoughtSpot Trusted Authentication**. The auth flow is:

1. On app mount, `AppInit.tsx` calls `authenticate()` with credentials read from `localStorage` (falling back to `VITE_TS_*` env defaults)
2. `authenticate()` calls the ThoughtSpot REST API directly from the browser to fetch a token
3. The SDK is initialized with the returned token
4. Users can update credentials at any time from the **Connection Settings** form on the home page — changes are saved to `localStorage` and take effect on the next page load

---

## Security

- **Next.js app** — `TS_PASSWORD` is a server-only variable; it is never bundled into client code. API routes validate request origin via `middleware.ts`.
- **React app** — All credentials (including password) are stored in `localStorage` and sent from the browser. Intended for local development and demos only.

## Resources

- [ThoughtSpot Visual Embed SDK Documentation](https://developers.thoughtspot.com/docs/)
- [Getting Started Guide](https://developers.thoughtspot.com/docs/getting-started)
- [Visual Embed SDK on GitHub](https://github.com/thoughtspot/visual-embed-sdk)
- [Visual Embed SDK on npm](https://www.npmjs.com/package/@thoughtspot/visual-embed-sdk)

## License

This project is provided as a demo / reference implementation. See your ThoughtSpot license terms for SDK usage.
