/**
 * Portfolio content — single source of truth.
 *
 * Every fact here is sourced from the public GitHub profile of
 * @blue007-arc (profile README + GitHub REST API repo metadata).
 * Nothing invented: no fabricated metrics, clients, awards or technologies.
 */

export const GH_BASE = "https://github.com/blue007-arc";

export const profile = {
  name: "Sakshi Pandey",
  handle: "blue007-arc",
  role: "AI Systems Engineer",
  tagline: "Production-grade AI systems, not toy LLM wrappers.",
  bio: "Computer Science undergraduate (Class of 2027) building autonomous coding agents, fault-tolerant distributed workflows and auditable AI evaluation infrastructure.",
  avatar: "https://avatars.githubusercontent.com/u/225786690?v=4",
  github: GH_BASE,
  status: "Open to Software Engineering & AI Engineering internships and full-time opportunities (Class of 2027).",
} as const;

/* ------------------------------------------------------------------ */
/* Hero — rotating technical statements                                */
/* ------------------------------------------------------------------ */

export const heroPhrases: string[] = [
  "Autonomous coding agents with human gates.",
  "Durable workflows that survive failure.",
  "Evaluations you can actually trust.",
  "Auditable data, down to the pixel.",
];

/* ------------------------------------------------------------------ */
/* What I Build — focus areas                                          */
/* ------------------------------------------------------------------ */

export interface FocusArea {
  id: string;
  index: string;
  title: string;
  summary: string;
  points: string[];
  stack: string[];
}

export const focusAreas: FocusArea[] = [
  {
    id: "agents",
    index: "01",
    title: "AI Agents & Agentic Workflows",
    summary:
      "Multi-step agents with explicit control flow, state machines and human-in-the-loop gates — not single-shot prompt chains.",
    points: [
      "LangGraph interrupt() approval gates",
      "Sandboxed execution in E2B micro-VMs",
      "Mechanical diff computation before writes",
    ],
    stack: ["LangGraph", "LangChain", "Agno", "E2B"],
  },
  {
    id: "distributed",
    index: "02",
    title: "Distributed Systems",
    summary:
      "Fault-tolerant, long-running pipelines where every step survives worker crashes and retries are part of the design, not an afterthought.",
    points: [
      "Temporal durable execution workflows",
      "Confidence scoring + escalation queues",
      "Automated retry & compensation paths",
    ],
    stack: ["Temporal", "Python", "FastAPI"],
  },
  {
    id: "ai-infra",
    index: "03",
    title: "AI Infrastructure & Evaluation",
    summary:
      "Benchmarking harnesses and arenas that score models against deterministic, weighted, hidden test suites — measurement over vibes.",
    points: [
      "Weighted hidden unit-test suites",
      "Parallel contestant execution",
      "Independent blind judge reviews",
    ],
    stack: ["Python", "Timeout controls", "Blind judging"],
  },
  {
    id: "devtools",
    index: "04",
    title: "Developer Tools",
    summary:
      "Interfaces between humans and codebases — voice-driven inspection, MCP servers that plug models into real tools, precise surgical edits.",
    points: [
      "Real-time voice AI coding workspace",
      "Native MCP server for Claude & Cursor",
      "Sub-second streamed audio responses",
    ],
    stack: ["MCP", "Deepgram", "Cursor SDK", "Streamlit"],
  },
  {
    id: "fullstack",
    index: "05",
    title: "Full-Stack & Data Systems",
    summary:
      "Auditable platforms where every LLM output is traceable to its source — citations at pixel level, SQL guarded by AST validation.",
    points: [
      "Bounding-box citations on source PDFs",
      "AST-validated safe NL-to-SQL",
      "Next.js 15 + React 19 frontends",
    ],
    stack: ["Next.js 15", "PostgreSQL", "SQLAlchemy", "Zod"],
  },
];

/* ------------------------------------------------------------------ */
/* Featured work — mini case studies from real repositories            */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  id: string;
  name: string;
  language: string;
  license: string;
  url: string;
  role: string;
  oneLine: string;
  problem: string;
  solution: string;
  architecture: string;
  details: string[];
  technologies: string[];
  diagram: "agent" | "workflow" | "documents" | "arena" | "voice" | "research";
}

export const caseStudies: CaseStudy[] = [
  {
    id: "coding-agent-harness",
    name: "coding-agent-harness",
    language: "Python",
    license: "MIT",
    url: "https://github.com/blue007-arc/coding-agent-harness",
    role: "Autonomous SWE agent · Devin / SWE-bench pattern",
    oneLine:
      "An autonomous coding agent that cannot touch your disk until a human says yes.",
    problem:
      "Fully autonomous coding agents break trust the moment they edit files unreviewed. Production needs an agent that plans and executes like Devin, but where every write is a deliberate, inspectable decision.",
    solution:
      "A LangGraph state-machine agent with interrupt() calls before disk writes: the agent proposes a change, computes the diff mechanically, and execution pauses until a human approves. All code execution happens in isolated E2B micro-VM test loops, so failures stay contained.",
    architecture:
      "LangGraph graph nodes for plan → propose → gate → execute → verify. A mechanical diff computation layer produces exact, reviewable changes. E2B sandboxes run the test loop with no host access.",
    details: [
      "LangGraph interrupt() halts the graph — approval state lives in the workflow, not a flag",
      "Diffs are computed mechanically, never generated as free text",
      "E2B micro-VMs give every test run a clean, disposable environment",
    ],
    technologies: ["Python", "LangGraph", "LangChain", "E2B"],
    diagram: "agent",
  },
  {
    id: "temporal-ai-fraud-detection",
    name: "temporal-ai-fraud-detection",
    language: "Python",
    license: "Apache-2.0",
    url: "https://github.com/blue007-arc/temporal-ai-fraud-detection",
    role: "Enterprise fintech transaction pipeline",
    oneLine:
      "Fraud analysis that survives crashes, with similarity search across millions of transactions.",
    problem:
      "A fraud-detection pipeline is long-running and stateful: if a worker dies mid-analysis, naive implementations either lose work or double-spend compute on retried transactions.",
    solution:
      "Temporal durable workflows carry each transaction through LLM reasoning and Couchbase vector similarity search. Confidence scoring runs automatically, and low-confidence cases land in a human escalation queue instead of a dead letter folder.",
    architecture:
      "Temporal workflow engine orchestrates ingest → enrich → vector-search → LLM analysis → score → escalate. Couchbase FTS provides vector similarity over transaction embeddings.",
    details: [
      "Durable execution: every step is replayable after worker crashes",
      "Couchbase vector similarity search over transaction history",
      "Automated confidence scoring feeds a human escalation queue",
    ],
    technologies: ["Temporal", "Couchbase", "Python", "LLM reasoning"],
    diagram: "workflow",
  },
  {
    id: "financial-document-os",
    name: "financial-document-os",
    language: "Python",
    license: "MIT",
    url: "https://github.com/blue007-arc/financial-document-os",
    role: "Full-stack document intelligence platform",
    oneLine:
      "Turns unsearchable financial PDFs into queryable relational databases — every number traceable to its pixel.",
    problem:
      "Financial PDFs are dense, unstructured and non-queryable. And LLM answers about them are unverifiable: a wrong figure has no receipt.",
    solution:
      "A full-stack OS that parses PDFs into relational tables, then answers natural-language questions with AST-validated SQL — no destructive queries possible. Every returned number links to a bounding-box citation on the original PDF page, so verification is one click.",
    architecture:
      "Ingestion pipeline → relational schema (SQLAlchemy/PostgreSQL) → NL-to-SQL layer guarded by AST validation → frontend rendering citations over the rendered PDF pages.",
    details: [
      "AST validation means only whitelisted query shapes ever reach the database",
      "Pixel-level bounding-box citations: every claim points at the source region",
      "Relational modeling makes documents queryable, not just searchable",
    ],
    technologies: ["Python", "PostgreSQL", "SQLAlchemy", "AST validation", "PDF"],
    diagram: "documents",
  },
  {
    id: "coding-model-arena",
    name: "coding-model-arena",
    language: "Python",
    license: "MIT",
    url: "https://github.com/blue007-arc/coding-model-arena",
    role: "LLM evaluation arena · LMSYS-style",
    oneLine:
      "Two models enter. Hidden weighted tests decide. A blind judge reviews.",
    problem:
      "Most LLM 'benchmarks' are vibes: qualitative reviews, cherry-picked prompts, no determinism. Comparing coding models needs measurement that cannot be gamed.",
    solution:
      "An arena that runs two contestant models in parallel against hidden unit-test suites with weighted scoring and timeout controls. Verdicts are deterministic test outcomes first; an independent blind judge reviews without knowing which model wrote which solution.",
    architecture:
      "Contestant runners execute in parallel with per-test timeouts. A scoring core applies weighted pass/fail across hidden suites. The judge sees anonymized outputs and casts an independent review.",
    details: [
      "Weighted hidden unit tests — models never see the tests they are scored on",
      "Timeout controls stop slow models from stalling the match",
      "Blind judging removes identity bias from qualitative review",
    ],
    technologies: ["Python", "Hidden test suites", "Parallel runners", "Blind judge"],
    diagram: "arena",
  },
  {
    id: "voxcode-voice-coding-agent",
    name: "voxcode-voice-coding-agent",
    language: "TypeScript",
    license: "MIT",
    url: "https://github.com/blue007-arc/voxcode-voice-coding-agent",
    role: "Real-time voice AI coding workspace",
    oneLine:
      "Speak to your codebase — inspect, question, and direct verified surgical edits.",
    problem:
      "Asking questions about a codebase is a slow, hands-on-keyboard loop. Existing voice tools respond slowly and write code without verification.",
    solution:
      "A local workspace where natural speech drives codebase inspection and architecture questions over Deepgram Voice Agent WebSockets, with sub-second streamed audio responses. Edits are delegated to the Cursor SDK and executed as surgical, verified file changes.",
    architecture:
      "Deepgram WebSocket voice loop → reasoning layer (Nebius MiniMax) → codebase context assembly → Cursor SDK edit executor with post-edit verification.",
    details: [
      "Streaming WebSockets keep end-to-end voice latency sub-second",
      "Cursor SDK performs the edits — the agent directs, the editor executes",
      "Post-edit verification closes the loop on every change",
    ],
    technologies: ["TypeScript", "Deepgram", "Nebius MiniMax", "Cursor SDK"],
    diagram: "voice",
  },
  {
    id: "deep-researcher-agent-mcp",
    name: "deep-researcher-agent-mcp",
    language: "Python",
    license: "MIT",
    url: "https://github.com/blue007-arc/deep-researcher-agent-mcp",
    role: "Multi-stage research pipeline with MCP server",
    oneLine:
      "A research pipeline that ships as a tool, not a demo — native MCP for Claude Desktop and Cursor.",
    problem:
      "Deep-research demos die in notebooks. They are neither reusable inside the tools engineers already use nor inspectable stage by stage.",
    solution:
      "A Searcher → Analyst → Writer pipeline exposed two ways: a Streamlit dashboard for humans and a native Model Context Protocol server, so Claude Desktop and Cursor can call the whole pipeline as a first-class tool.",
    architecture:
      "Three explicit stages with typed handoffs — Searcher gathers, Analyst synthesizes, Writer composes. The MCP server wraps the pipeline so any MCP client can invoke it; Streamlit gives a live UI over the same core.",
    details: [
      "MCP-native: usable from Claude Desktop and Cursor, not just a UI",
      "Explicit stage boundaries make each step independently inspectable",
      "Streamlit dashboard for interactive runs alongside the programmatic path",
    ],
    technologies: ["Python", "MCP", "Streamlit", "Claude Desktop", "Cursor"],
    diagram: "research",
  },
  {
    id: "ai-hedgefund",
    name: "ai-hedgefund",
    language: "TypeScript",
    license: "MIT",
    url: "https://github.com/blue007-arc/ai-hedgefund",
    role: "Autonomous multi-agent quant workflow",
    oneLine:
      "Fundamental, technical, risk and portfolio agents running in parallel — TypeScript end to end.",
    problem:
      "Investment reasoning mixes four different disciplines. Running them as one monolithic prompt buries disagreement and produces confident-sounding nonsense.",
    solution:
      "Parallel specialist agents — fundamental, technical, risk, and portfolio management — analyze the same market data independently, each with its own model of evidence, feeding a combined portfolio decision. Real-time financial market data in, structured signal out.",
    architecture:
      "A fan-out/fan-in agent graph: parallel analyst agents over shared market data, their outputs reconciled by the portfolio-management agent into a final structured decision.",
    details: [
      "Fan-out/fan-in: specialists disagree independently before reconciliation",
      "Separation of risk management from analysis keeps constraints explicit",
      "TypeScript runtime — one language across agents and data flow",
    ],
    technologies: ["TypeScript", "Multi-agent", "Market data APIs"],
    diagram: "workflow",
  },
];

/* ------------------------------------------------------------------ */
/* Systems — architecture diagrams (rendered as interactive SVG)       */
/* ------------------------------------------------------------------ */

export interface SystemDiagram {
  id: string;
  label: string;
  title: string;
  caption: string;
}

export const systems: SystemDiagram[] = [
  {
    id: "agent",
    label: "SYS/01",
    title: "coding-agent-harness",
    caption:
      "LangGraph state machine. The human gate is a graph state, not an afterthought — execution cannot pass without approval.",
  },
  {
    id: "workflow",
    label: "SYS/02",
    title: "temporal-ai-fraud-detection",
    caption:
      "Temporal durable workflow. Any worker crash replays from the last completed activity; nothing is lost, nothing is double-run.",
  },
  {
    id: "documents",
    label: "SYS/03",
    title: "financial-document-os",
    caption:
      "Documents become rows; answers become SQL; every figure points back to a bounding box on the page it came from.",
  },
  {
    id: "arena",
    label: "SYS/04",
    title: "coding-model-arena",
    caption:
      "Deterministic scoring first, blind review second. The judge sees anonymized outputs; tests stay hidden from contestants.",
  },
  {
    id: "voice",
    label: "SYS/05",
    title: "voxcode-voice-coding-agent",
    caption:
      "Voice in, verified edits out. The agent reasons and directs; the Cursor SDK executes and re-verifies each change.",
  },
  {
    id: "research",
    label: "SYS/06",
    title: "deep-researcher-agent-mcp",
    caption:
      "One pipeline, two doors: the MCP server for Claude Desktop and Cursor, and a Streamlit dashboard for interactive runs.",
  },
];

/* ------------------------------------------------------------------ */
/* Tech stack — interactive technology map                             */
/* ------------------------------------------------------------------ */

export interface TechGroup {
  id: string;
  title: string;
  items: string[];
}

export const techStack: TechGroup[] = [
  {
    id: "ai",
    title: "AI & Agent Orchestration",
    items: ["LangGraph", "LangChain", "Agno", "Temporal", "E2B Cloud Sandboxes", "MCP"],
  },
  {
    id: "backend",
    title: "Backend & Databases",
    items: ["Python 3.11+", "FastAPI", "Uvicorn", "PostgreSQL", "Couchbase Vector FTS", "SQLAlchemy", "Zod"],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    items: ["Next.js 15", "React 19", "Streamlit", "TailwindCSS", "Rich CLI"],
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    items: ["Docker", "Docker Compose", "Git", "Linux", "GitHub Actions", "UV"],
  },
];

/* ------------------------------------------------------------------ */
/* GitHub — verified figures only (API, Sept 2026)                     */
/* ------------------------------------------------------------------ */

export const githubStats = {
  publicRepos: 12,
  languages: ["Python", "TypeScript"],
  memberSince: "2025",
  note: "Figures from the GitHub REST API. Languages reflect the primary languages of public repositories.",
} as const;

export const repoIndex: { name: string; language: string; license: string; url: string; description: string }[] = [
  {
    name: "coding-agent-harness",
    language: "Python",
    license: "MIT",
    url: "https://github.com/blue007-arc/coding-agent-harness",
    description:
      "Autonomous multi-agent coding harness with LangGraph, human-in-the-loop approval gates, and sandboxed E2B test execution.",
  },
  {
    name: "temporal-ai-fraud-detection",
    language: "Python",
    license: "Apache-2.0",
    url: "https://github.com/blue007-arc/temporal-ai-fraud-detection",
    description:
      "Enterprise financial transaction analysis & fraud detection powered by Temporal durable workflows, Couchbase vector search, and LLM reasoning.",
  },
  {
    name: "financial-document-os",
    language: "Python",
    license: "MIT",
    url: "https://github.com/blue007-arc/financial-document-os",
    description:
      "Full-stack system turning financial PDFs into queryable relational databases with bounding-box citations and safe AST-validated NL-to-SQL.",
  },
  {
    name: "coding-model-arena",
    language: "Python",
    license: "MIT",
    url: "https://github.com/blue007-arc/coding-model-arena",
    description:
      "LLM code evaluation and benchmarking arena testing models side-by-side against weighted hidden test suites with independent judge reviews.",
  },
  {
    name: "deep-researcher-agent-mcp",
    language: "Python",
    license: "MIT",
    url: "https://github.com/blue007-arc/deep-researcher-agent-mcp",
    description:
      "Autonomous multi-stage deep research pipeline with Streamlit dashboard and native Model Context Protocol (MCP) server.",
  },
  {
    name: "ai-hedgefund",
    language: "TypeScript",
    license: "MIT",
    url: "https://github.com/blue007-arc/ai-hedgefund",
    description:
      "Autonomous multi-agent financial hedge fund workflow running parallel fundamental, technical, risk, and portfolio analysis in TypeScript.",
  },
  {
    name: "voxcode-voice-coding-agent",
    language: "TypeScript",
    license: "MIT",
    url: "https://github.com/blue007-arc/voxcode-voice-coding-agent",
    description:
      "Local voice AI coding workspace powered by Deepgram Voice Agent WebSockets, Cursor SDK, and Nebius MiniMax reasoning.",
  },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  heading: "I am just here.",
  paragraphs: [
    "Computer Science undergraduate, Class of 2027. I build AI systems the way production software gets built: explicit control flow, durable state, human gates where failure is expensive, and evaluation that can be measured rather than admired.",
    "The common thread across my repositories is that the interesting problem is never the prompt — it is everything around it. Diffs that are computed, not hallucinated. Workflows that replay after a crash. SQL that cannot execute anything unsafe. Numbers that cite their own source.",
  ],
};

export const navSections = [
  { id: "focus", label: "Focus" },
  { id: "work", label: "Work" },
  { id: "systems", label: "Systems" },
  { id: "stack", label: "Stack" },
  { id: "github", label: "GitHub" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
