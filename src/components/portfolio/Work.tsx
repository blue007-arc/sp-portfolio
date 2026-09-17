import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { caseStudies, githubStats } from "@/data/portfolio";
import { Reveal, SectionHeader } from "./primitives";
import { cn } from "@/lib/utils";

function CaseRow({ study, index, open, onToggle }: {
  study: (typeof caseStudies)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <Reveal delay={index * 0.04}>
      <article
        className={cn(
          "border-b border-border transition-colors",
          open ? "bg-accent/30" : "hover:bg-accent/20",
        )}
      >
        {/* collapsed header row */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-1 py-6 text-left md:grid-cols-[3rem_1fr_auto_2rem] md:gap-8 md:py-8"
        >
          <span className="label-mono text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xl font-semibold tracking-tight md:text-2xl">
              {study.name}
            </span>
            <span className="mt-1 block truncate text-sm text-muted-foreground">
              {study.role}
            </span>
          </span>
          <span className="hidden md:block">
            <span className="label-mono text-muted-foreground">{study.language}</span>
          </span>
          <span
            className={cn(
              "flex size-8 items-center justify-center border border-border transition-transform duration-300",
              open && "rotate-45 bg-primary text-primary-foreground",
            )}
            aria-hidden="true"
          >
            <Plus className="size-4" />
          </span>
        </button>

        {/* expanded case study body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-10 px-1 pb-10 pt-2 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-5">
                  <p className="text-lg leading-snug md:text-xl">{study.oneLine}</p>
                  <dl className="mt-6 space-y-3">
                    {[
                      ["Problem", study.problem],
                      ["Solution", study.solution],
                      ["Architecture", study.architecture],
                    ].map(([k, v]) => (
                      <div key={k} className="border-t border-border pt-3">
                        <dt className="label-mono text-muted-foreground">{k}</dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="md:col-span-4">
                  <span className="label-mono text-muted-foreground">Engineering details</span>
                  <ul className="mt-3 space-y-3">
                    {study.details.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <span className="mt-1.5 inline-block size-1 shrink-0 bg-swiss-red" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 md:col-span-3">
                  <div>
                    <span className="label-mono text-muted-foreground">Technologies</span>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {study.technologies.map((t) => (
                        <span
                          key={t}
                          className="border border-border px-2 py-1 font-mono text-[11px] text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="label-mono text-muted-foreground">Meta</span>
                    <div className="mt-3 space-y-1 font-mono text-[11px] text-muted-foreground">
                      <p>{study.license} License</p>
                      <p>{study.language}</p>
                    </div>
                  </div>
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 self-start border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-swiss-red hover:text-swiss-red"
                  >
                    View repository
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}

export function Work() {
  const [openId, setOpenId] = useState<string | null>("coding-agent-harness");

  return (
    <section id="work" className="scroll-mt-14 border-t border-border">
      <div className="swiss-container py-20 md:py-28">
        <SectionHeader
          label="02 — FEATURED WORK"
          index="07 CASE STUDIES"
          title="Repositories, treated as case studies."
        />
        <Reveal>
          <p className="-mt-6 mb-10 max-w-2xl text-sm text-muted-foreground md:-mt-8">
            Each entry links to a real public repository. Select a row to read
            the problem, the architecture, and the engineering details.
          </p>
        </Reveal>

        <div className="border-t border-border">
          {caseStudies.map((c, i) => (
            <CaseRow
              key={c.id}
              study={c}
              index={i}
              open={openId === c.id}
              onToggle={() => setOpenId(openId === c.id ? null : c.id)}
            />
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="label-mono text-muted-foreground">
            ALL PROJECTS PUBLIC · MIT / APACHE-2.0 · {caseStudies.length} OF {githubStats.publicRepos} REPOSITORIES FEATURED
          </p>
        </Reveal>
      </div>
    </section>
  );
}
