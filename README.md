# Sakshi Pandey — Personal Developer Portfolio 🚀✨

[![React 19](https://img.shields.io/badge/Frontend-React%2019-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%207-646CFF.svg)](https://vite.dev)
[![TailwindCSS v4](https://img.shields.io/badge/Styling-Tailwind%20v4-38B2AC.svg)](https://tailwindcss.com)
[![Convex](https://img.shields.io/badge/Backend-Convex-F05A28.svg)](https://www.convex.dev/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-FF0055.svg)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Maintainer](https://img.shields.io/badge/Maintainer-blue007--arc-blue)](https://github.com/blue007-arc)

The official personal developer portfolio web application for **[Sakshi Pandey](https://github.com/blue007-arc)** (231FA04H01@gmail.com), highlighting autonomous AI agents, distributed systems, quantitative finance engineering, and full-stack software development.

Developed and maintained by **[Sakshi Pandey](https://github.com/blue007-arc)**.

---

## 🏗️ Architecture & Tech Stack

`mermaid
graph TD
    classDef clientNode fill:#1E293B,stroke:#38BDF8,stroke-width:2px,color:#F8FAFC;
    classDef uiNode fill:#0F172A,stroke:#818CF8,stroke-width:2px,color:#F8FAFC;
    classDef convexNode fill:#7C2D12,stroke:#F97316,stroke-width:2px,color:#FFF;

    User["🌐 Visitor / Recruiter"] --> WebApp["💻 Portfolio Single Page Application"]:::clientNode

    subgraph FrontendFramework ["⚡ Modern React 19 + Vite Stack"]
        WebApp --> Router["🧭 React Router v7"]:::uiNode
        WebApp --> Styling["🎨 TailwindCSS v4 + Radix UI + Lucide"]:::uiNode
        WebApp --> Motion["✨ Framer Motion Animations & 3D Visuals"]:::uiNode
        WebApp --> Analytics["📊 Recharts Interactive Visualizations"]:::uiNode
    end

    subgraph ReactiveBackend ["🔥 Real-Time Convex Cloud Backend"]
        WebApp <--> ConvexClient["📡 Convex WebSocket Sync Client"]:::convexNode
        ConvexClient <--> Database[("🗄️ Convex Reactive Database & Documents")]:::convexNode
        ConvexClient <--> Auth["🔐 Convex Auth & Email OTP Verification"]:::convexNode
    end
`

---

## 🌟 Key Features

- **⚡ Blazing-Fast Performance**: Built on Vite 7 and React 19 for instant hot-module replacement and optimal production bundle sizes.
- **🎨 Modern Design System**: Styled with TailwindCSS v4 and Radix UI primitives, featuring dark/light theme support via 
ext-themes.
- **✨ Smooth Micro-Interactions**: Enhanced with Framer Motion transitions, interactive carousels, and fluid scroll animations.
- **🔥 Reactive Real-Time Backend**: Integrated with **Convex** for live database subscriptions, contact message logging, and authenticated admin sessions.
- **📱 Fully Responsive**: Tailored layout supporting mobile, tablet, and desktop screens with accessible ARIA components.

---

## 🛠️ Technology Stack Breakdown

| Layer | Technologies |
|---|---|
| **Core** | React 19, TypeScript 5.9, Vite 7 |
| **Routing** | React Router v7 (eact-router) |
| **Styling** | TailwindCSS v4, PostCSS, Radix UI Primitives, Lucide Icons |
| **Animation & Charts** | Framer Motion, Recharts, Embla Carousel |
| **Backend & DB** | Convex, Convex Auth, Hono |
| **Package Manager** | Bun / npm |

---

## 📁 Repository Structure

`	ext
sp-portfolio/
├── src/
│   ├── components/         # Reusable UI elements (cards, nav, dialogs, buttons)
│   ├── convex/             # Convex backend functions, schema, and auth config
│   │   ├── auth/           # OTP and authentication logic
│   │   ├── schema.ts       # Database document schemas
│   │   └── users.ts        # User queries and mutations
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and Tailwind merge helpers
│   ├── routes/             # Page components and views
│   ├── App.tsx             # Application root with theme providers
│   └── main.tsx            # DOM entry point
├── public/                 # Static favicon and media assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
├── components.json         # Shadcn / Radix configuration
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
└── LICENSE                 # MIT License
`

---

## ⚡ Getting Started

### 1. Prerequisites
- Node.js 18+ or [Bun](https://bun.sh/) (recommended)
- A [Convex](https://www.convex.dev/) account for backend functions

### 2. Installation

`ash
# Clone the repository
git clone https://github.com/blue007-arc/sp-portfolio.git
cd sp-portfolio

# Install dependencies with Bun
bun install
# Or with npm
npm install
`

### 3. Environment Configuration

`ash
cp .env.example .env.local
`

Configure your .env.local:
`env
# Run 'npx convex dev' to provision a cloud backend and get this URL
VITE_CONVEX_URL=https://your-convex-deployment.convex.cloud
CONVEX_SITE_URL=http://localhost:5173
`

### 4. Start Development Server

`ash
# Start Vite development server
bun run dev
# Or with npm
npm run dev
`

Open http://localhost:5173 in your browser.

---

## 🚢 Production Build

`ash
bun run build
# Or with npm
npm run build
`

The optimized static bundle will be generated in the dist/ directory, ready to deploy to Vercel, Netlify, or Cloudflare Pages.

---

## 👤 Author & Maintainer

**Sakshi Pandey**
- GitHub: [@blue007-arc](https://github.com/blue007-arc)
- Email: [231FA04H01@gmail.com](mailto:231FA04H01@gmail.com)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
