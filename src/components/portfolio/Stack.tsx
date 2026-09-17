import { useMemo, useState } from "react";
import { techStack, caseStudies } from "@/data/portfolio";
import { Reveal, SectionHeader } from "./primitives";
import { cn } from "@/lib/utils";

/* Aliases reconcile stack-map names with the exact tech names used in the
   repo metadata — same technology, different label. Nothing inferred. */
const ALIASES: Record<string, string[]> = {
  "python 3.11+": ["python"],
  "e2b cloud sandboxes": ["e2b"],
  "couchbase vector fts": ["couchbase"],
  "next.js 15": ["next.js"],
  "react 19": ["react"],
};

export function Stack() {
  const [selected, setSelected] = useState<string | null>(null);

  /* map each technology -> repos where it appears (from verified data) */
  const usage = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const c of caseStudies) {
      for (const t of c.technologies) {
        const key = t.toLowerCase();
        map.set(key, [...(map.get(key) ?? []), c.name]);
      }
    }
    return map;
  }, []);

  const usageFor = (item: string) => {
    const key = item.toLowerCase();
    const direct = usage.get(key) ?? [];
    const aliases = (ALIASES[key] ?? []).flatMap((a) => usage.get(a) ?? []);
    return [...direct, ...aliases];
  };

  return (
    <section id="stack" className="scroll-mt-14 border-t border-border">
      <div className="swiss-container py-20 md:py-28">
        <SectionHeader
          label="04 — TECH STACK"
          index="4 DOMAINS"
          title="A technology map, not a wall of logos."
        />

        <Reveal>
          <p className="-mt-6 mb-10 max-w-2xl text-sm text-muted-foreground md:-mt-8">
            Select a technology to trace where it appears across the case
            studies. Every link below is derived from the repositories
            themselves — nothing inferred.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 border-t border-l border-border md:grid-cols-2 xl:grid-cols-4">
          {techStack.map((group) => (
            <div key={group.id} className="border-b border-r border-border p-6 md:p-8">
              <div className="flex items-center gap-2.5">
                <span className="size-1.5 bg-swiss-blue" aria-hidden="true" />
                <h3 className="label-mono text-muted-foreground">{group.title}</h3>
              </div>

              <ul className="mt-5 space-y-1">
                {group.items.map((item) => {
                  const isSelected = selected === item.toLowerCase();
                  const used = usageFor(item);
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => setSelected(isSelected ? null : item.toLowerCase())}
                        aria-pressed={isSelected}
                        className={cn(
                          "flex w-full items-center justify-between border px-3 py-2.5 text-left font-mono text-sm transition-colors",
                          isSelected
                            ? "border-swiss-red text-swiss-red"
                            : "border-transparent hover:border-border hover:bg-accent/40",
                        )}
                      >
                        <span>{item}</span>
                        <span className="label-mono text-[10px] text-muted-foreground">
                          {used.length > 0 ? `${used.length}×` : "—"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* usage trace panel */}
        <Reveal className="mt-0">
          <div className="border border-t-0 border-border bg-accent/20 px-6 py-5 md:px-8">
            {selected ? (
              <div>
                <span className="label-mono text-swiss-red">TRACING — {selected.toUpperCase()}</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {usageFor(selected).map((repo) => (
                    <span key={repo} className="border border-border bg-card px-2.5 py-1.5 font-mono text-xs">
                      {repo}
                    </span>
                  ))}
                  {usageFor(selected).length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      Supporting technology across the stack.
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <p className="label-mono text-muted-foreground">
                SELECT A TECHNOLOGY ABOVE TO TRACE ITS USE ACROSS REPOSITORIES
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
