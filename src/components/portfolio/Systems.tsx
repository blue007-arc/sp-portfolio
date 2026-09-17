import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { systems, type SystemDiagram } from "@/data/portfolio";
import { Reveal, SectionHeader } from "./primitives";
import { cn } from "@/lib/utils";

interface DNode { id: string; x: number; y: number; w?: number; label: string; accent?: boolean }
interface DEdge { from: string; to: string; label?: string }
interface DiagramSpec { nodes: DNode[]; edges: DEdge[]; annotations: string[] }

const NW = 62; // default node width
const NH = 24; // node height

const diagrams: Record<SystemDiagram["id"], DiagramSpec> = {
  agent: {
    nodes: [
      { id: "task", x: 8, y: 58, label: "TASK" },
      { id: "plan", x: 108, y: 20, label: "PLAN" },
      { id: "propose", x: 108, y: 96, label: "PROPOSE DIFF" },
      { id: "gate", x: 216, y: 58, label: "APPROVE", accent: true, w: 70 },
      { id: "e2b", x: 324, y: 20, label: "E2B TEST" },
      { id: "write", x: 324, y: 96, label: "WRITE DISK" },
    ],
    edges: [
      { from: "task", to: "plan" }, { from: "task", to: "propose" },
      { from: "plan", to: "gate" }, { from: "propose", to: "gate" },
      { from: "gate", to: "e2b", label: "TEST" }, { from: "e2b", to: "write", label: "WRITE" },
    ],
    annotations: ["LANGGRAPH INTERRUPT()", "MECHANICAL DIFF", "E2B MICRO-VM"],
  },
  workflow: {
    nodes: [
      { id: "tx", x: 8, y: 58, label: "TRANSACTION" },
      { id: "enrich", x: 108, y: 58, label: "ENRICH" },
      { id: "vec", x: 216, y: 20, label: "VECTOR SEARCH", w: 84 },
      { id: "llm", x: 216, y: 96, label: "LLM ANALYSIS" },
      { id: "score", x: 324, y: 20, label: "SCORE" },
      { id: "esc", x: 324, y: 96, label: "ESCALATE", accent: true },
    ],
    edges: [
      { from: "tx", to: "enrich" },
      { from: "enrich", to: "vec" }, { from: "enrich", to: "llm" },
      { from: "vec", to: "score" }, { from: "llm", to: "score" }, { from: "llm", to: "esc" },
    ],
    annotations: ["TEMPORAL DURABLE EXECUTION", "COUCHBASE VECTOR FTS", "RETRY + REPLAY SAFE"],
  },
  documents: {
    nodes: [
      { id: "pdf", x: 8, y: 58, label: "PDF PAGES" },
      { id: "parse", x: 108, y: 58, label: "PARSE" },
      { id: "db", x: 216, y: 20, label: "POSTGRES", w: 70 },
      { id: "ast", x: 216, y: 96, label: "AST-GUARD SQL", accent: true, w: 84 },
      { id: "nl", x: 324, y: 58, label: "ANSWER + CITATION", w: 100 },
    ],
    edges: [
      { from: "pdf", to: "parse" },
      { from: "parse", to: "db" }, { from: "parse", to: "ast" },
      { from: "db", to: "nl" }, { from: "ast", to: "nl" },
    ],
    annotations: ["BOUNDING-BOX CITATIONS", "SQLALCHEMY SCHEMA", "NO UNSAFE SQL PATH"],
  },
  arena: {
    nodes: [
      { id: "task", x: 8, y: 58, label: "PROMPT" },
      { id: "a", x: 118, y: 20, label: "MODEL A" },
      { id: "b", x: 118, y: 96, label: "MODEL B" },
      { id: "tests", x: 228, y: 58, label: "HIDDEN TESTS", accent: true, w: 80 },
      { id: "judge", x: 336, y: 58, label: "BLIND JUDGE" },
    ],
    edges: [
      { from: "task", to: "a" }, { from: "task", to: "b" },
      { from: "a", to: "tests" }, { from: "b", to: "tests" },
      { from: "tests", to: "judge", label: "ANON" },
    ],
    annotations: ["WEIGHTED SCORING", "TIMEOUT CONTROLS", "IDENTITY-BLIND REVIEW"],
  },
  voice: {
    nodes: [
      { id: "mic", x: 8, y: 58, label: "VOICE IN" },
      { id: "ws", x: 108, y: 58, label: "DEEPGRAM WS", w: 80 },
      { id: "reason", x: 216, y: 58, label: "REASONING" },
      { id: "cursor", x: 324, y: 20, label: "CURSOR SDK", w: 76 },
      { id: "audio", x: 324, y: 96, label: "AUDIO OUT", w: 70 },
    ],
    edges: [
      { from: "mic", to: "ws" }, { from: "ws", to: "reason" },
      { from: "reason", to: "cursor" }, { from: "reason", to: "audio" },
    ],
    annotations: ["SUB-SECOND STREAMING", "NEBIUS MINIMAX", "VERIFIED FILE EDITS"],
  },
  research: {
    nodes: [
      { id: "q", x: 8, y: 58, label: "QUESTION" },
      { id: "search", x: 108, y: 20, label: "SEARCHER" },
      { id: "analyst", x: 216, y: 20, label: "ANALYST" },
      { id: "writer", x: 324, y: 20, label: "WRITER" },
      { id: "mcp", x: 216, y: 96, label: "MCP SERVER", accent: true, w: 76 },
      { id: "ui", x: 324, y: 96, label: "STREAMLIT", w: 66 },
    ],
    edges: [
      { from: "q", to: "search" }, { from: "search", to: "analyst" },
      { from: "analyst", to: "writer" },
      { from: "analyst", to: "mcp" }, { from: "mcp", to: "ui" },
    ],
    annotations: ["CLAUDE DESKTOP", "CURSOR", "TYPED STAGE HANDOFFS"],
  },
};

function DiagramSVG({ spec }: { spec: DiagramSpec }) {
  const reduce = useReducedMotion();
  const node = (id: string) => spec.nodes.find((n) => n.id === id)!;

  return (
    <svg viewBox="0 0 460 140" className="block w-full" role="img" aria-hidden="true">
      <defs>
        <marker id="sys-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" fill="currentColor" className="text-muted-foreground/50" />
        </marker>
      </defs>

      {spec.edges.map((e, i) => {
        const a = node(e.from);
        const b = node(e.to);
        const aw = a.w ?? NW;
        const bw = b.w ?? NW;
        // vertical connector when nodes share the same column
        const overlapsX = b.x < a.x + aw + 8 && b.x + bw > a.x - 8;
        let path: string;
        let labelX = 0;
        let labelY = 0;
        if (overlapsX) {
          const x = (Math.max(a.x, b.x) + Math.min(a.x + aw, b.x + bw)) / 2;
          const y1 = b.y > a.y ? a.y + NH + 4 : a.y - 6;
          const y2 = b.y > a.y ? b.y - 6 : b.y + NH + 4;
          path = `M ${x} ${y1} L ${x} ${y2}`;
        } else {
          // horizontal-first routing: exit right of a, enter left of b
          const x1 = a.x + aw + 4;
          const y1 = a.y + NH / 2;
          const x2 = b.x - 6;
          const y2 = b.y + NH / 2;
          const midX = (x1 + x2) / 2;
          path = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
          labelX = midX;
          labelY = (y1 + y2) / 2 - 4;
        }
        return (
          <g key={i}>
            <path d={path} fill="none" stroke="currentColor" className="text-border" strokeWidth="1" markerEnd="url(#sys-arrow)" />
            <path
              d={path}
              fill="none"
              stroke="currentColor"
              className="text-swiss-red"
              strokeWidth="1.25"
              markerEnd="url(#sys-arrow)"
              style={reduce ? undefined : { strokeDasharray: "4 6", animation: `flow-dash 1.4s ${i * 0.15}s linear infinite` }}
            />
            {e.label && (
              <text x={labelX} y={labelY} textAnchor="middle" fontSize="6" letterSpacing="0.08em" fill="var(--muted-foreground)" fontFamily="var(--font-mono)">
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {spec.nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x} y={n.y} width={n.w ?? NW} height={NH}
            fill={n.accent ? "var(--swiss-red)" : "var(--card)"}
            stroke={n.accent ? "var(--swiss-red)" : "var(--border)"}
            strokeWidth="1"
          />
          <text
            x={n.x + (n.w ?? NW) / 2}
            y={n.y + NH / 2 + 3.5}
            textAnchor="middle"
            fontSize="6.5"
            letterSpacing="0.08em"
            fill={n.accent ? "#ffffff" : "var(--muted-foreground)"}
            fontFamily="var(--font-mono)"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Systems() {
  const [active, setActive] = useState<SystemDiagram["id"]>("agent");
  const sys = systems.find((s) => s.id === active)!;
  const spec = diagrams[active];

  return (
    <section id="systems" className="scroll-mt-14 border-t border-border">
      <div className="swiss-container py-20 md:py-28">
        <SectionHeader
          label="03 — SYSTEMS"
          index="6 DIAGRAMS"
          title="Architecture, drawn as it runs."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* selector */}
          <Reveal className="lg:col-span-4">
            <div className="border-t border-border">
              {systems.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  aria-pressed={active === s.id}
                  className={cn(
                    "flex w-full items-center gap-4 border-b border-border px-2 py-4 text-left transition-colors",
                    active === s.id ? "bg-accent/40" : "hover:bg-accent/20",
                  )}
                >
                  <span className={cn("label-mono", active === s.id ? "text-swiss-red" : "text-muted-foreground")}>
                    {s.label}
                  </span>
                  <span className="flex-1 truncate font-mono text-sm">
                    {s.title}
                  </span>
                  <span className={cn("size-1.5", active === s.id ? "bg-swiss-red" : "bg-transparent border border-border")} aria-hidden="true" />
                </button>
              ))}
              <p className="label-mono px-2 pt-4 text-[10px] text-muted-foreground">
                {String(systems.findIndex((s) => s.id === active) + 1).padStart(2, "0")} / {String(systems.length).padStart(2, "0")} SELECTED
              </p>
            </div>
          </Reveal>

          {/* diagram panel */}
          <Reveal delay={0.08} className="lg:col-span-8">
            <div className="border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="label-mono text-muted-foreground">FIG. {sys.label} — {sys.title.toUpperCase()}</span>
                <span className="flex items-center gap-1.5">
                  <span className="anim-blip inline-block size-1.5 bg-swiss-blue" aria-hidden="true" />
                  <span className="label-mono text-[10px] text-muted-foreground">RUNNING</span>
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <DiagramSVG spec={spec} />
                </motion.div>
              </AnimatePresence>

              <div className="border-t border-border px-4 py-3">
                <p className="text-sm leading-relaxed text-muted-foreground">{sys.caption}</p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-border px-4 py-2.5">
                {spec.annotations.map((a) => (
                  <span key={a} className="label-mono text-[10px] text-muted-foreground">{a}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
