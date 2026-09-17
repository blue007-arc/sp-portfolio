import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile, heroPhrases } from "@/data/portfolio";

/* Animated system visual: LangGraph-style DAG with flowing edges,
   a pulsing human-approval gate, and a sandboxed execution block. */
function SystemVisual() {
  const reduce = useReducedMotion();

  const nodes = [
    { id: "ingest", x: 40, y: 60, label: "INGEST" },
    { id: "plan", x: 140, y: 30, label: "PLAN" },
    { id: "propose", x: 140, y: 96, label: "PROPOSE" },
    { id: "gate", x: 250, y: 60, label: "HUMAN GATE" },
    { id: "exec", x: 360, y: 30, label: "EXECUTE" },
    { id: "verify", x: 360, y: 96, label: "VERIFY" },
  ] as const;

  const edges: Array<[string, string]> = [
    ["ingest", "plan"],
    ["ingest", "propose"],
    ["plan", "gate"],
    ["propose", "gate"],
    ["gate", "exec"],
    ["gate", "verify"],
  ];

  const pos = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <figure className="relative border border-border bg-card" aria-label="Animated agent workflow diagram">
      {/* header strip */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="label-mono text-muted-foreground">FIG. 01 — AGENT CONTROL FLOW</span>
        <span className="flex items-center gap-1.5">
          <span className="anim-blip inline-block size-1.5 bg-swiss-red" aria-hidden="true" />
          <span className="label-mono text-[10px] text-muted-foreground">LIVE</span>
        </span>
        <figcaption className="sr-only">
          Agent control flow: ingest, plan, propose, human gate, execute, verify
        </figcaption>
      </div>

      <svg viewBox="0 0 440 160" className="block w-full" role="img" aria-hidden="true">
        <defs>
          <marker id="h-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 Z" fill="currentColor" className="text-muted-foreground/60" />
          </marker>
        </defs>

        {/* edges */}
        {edges.map(([a, b], i) => {
          const na = pos(a);
          const nb = pos(b);
          const x1 = na.x + 34;
          const y1 = na.y + 12;
          const x2 = nb.x - 4;
          const y2 = nb.y + 12;
          return (
            <g key={i}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="currentColor"
                className="text-border"
                strokeWidth="1"
                markerEnd="url(#h-arrow)"
              />
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="currentColor"
                className="text-swiss-red"
                strokeWidth="1.25"
                markerEnd="url(#h-arrow)"
                style={
                  reduce
                    ? undefined
                    : { strokeDasharray: "4 6", animation: `flow-dash 1.4s ${i * 0.18}s linear infinite` }
                }
              />
            </g>
            );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const isGate = n.id === "gate";
          return (
            <g key={n.id}>
              <rect
                x={n.x} y={n.y} width="38" height="24"
                fill={isGate ? "var(--swiss-red)" : "var(--card)"}
                stroke={isGate ? "var(--swiss-red)" : "var(--border)"}
                strokeWidth="1"
              />
              {isGate ? (
                <text
                  x={n.x + 19} y={n.y + 15.5}
                  textAnchor="middle"
                  fontSize="6.5"
                  letterSpacing="0.08em"
                  fill="#fff"
                  fontFamily="var(--font-mono)"
                >
                  HUMAN
                </text>
              ) : (
                <text
                  x={n.x + 19} y={n.y + 15.5}
                  textAnchor="middle"
                  fontSize="6.5"
                  letterSpacing="0.08em"
                  fill="var(--muted-foreground)"
                  fontFamily="var(--font-mono)"
                >
                  {n.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* footer legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border px-3 py-2">
        <span className="label-mono text-[10px] text-muted-foreground">LANGGRAPH INTERRUPT()</span>
        <span className="label-mono text-[10px] text-muted-foreground">E2B SANDBOX</span>
        <span className="label-mono text-[10px] text-muted-foreground">MECHANICAL DIFF</span>
      </div>
    </figure>
  );
}

export function Hero() {
  const [phrase, setPhrase] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setPhrase((p) => (p + 1) % heroPhrases.length), 3400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section id="top" className="relative overflow-hidden pt-14">
      {/* editorial background grid */}
      <div className="grid-vert pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="swiss-container relative">
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-12 md:py-24 lg:py-28">
          {/* left column — 7 of 12 */}
          <div className="md:col-span-7">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="label-mono text-muted-foreground"
            >
              SAKSHI PANDEY · AI SYSTEMS ENGINEER · EST. 2025
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              AI systems
              <br />
              that hold
              <br />
              <span className="text-swiss-red">up in production.</span>
            </motion.h1>

            <div className="mt-8 h-7 overflow-hidden" aria-live="polite">
              <motion.p
                key={phrase}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-sm text-muted-foreground"
              >
                {heroPhrases[phrase]}
              </motion.p>
            </div>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-swiss-red hover:text-white"
              >
                View the work
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-foreground/50"
              >
                GitHub
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href="#contact"
                className="label-mono link-sweep text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact →
              </a>
            </motion.div>
          </div>

          {/* right column — 5 of 12: the visual */}
          <div className="md:col-span-5">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:mt-14"
            >
              <SystemVisual />
            </motion.div>
          </div>
        </div>
      </div>

      {/* bottom hairline + corner marker */}
      <div className="swiss-container relative">
        <div className="border-t border-border pt-3 pb-4">
          <div className="flex items-center justify-between">
            <span className="label-mono text-[10px] text-muted-foreground">
              AGENTS / DISTRIBUTED / EVALUATION / DEVTOOLS
            </span>
            <span className="label-mono text-[10px] text-muted-foreground">SCROLL ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
