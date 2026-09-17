import { focusAreas } from "@/data/portfolio";
import { Reveal, SectionHeader } from "./primitives";

export function Focus() {
  return (
    <section id="focus" className="scroll-mt-14 border-t border-border">
      <div className="swiss-container py-20 md:py-28">
        <SectionHeader
          label="01 — WHAT I BUILD"
          index="AREAS 01–05"
          title="Five surfaces of one discipline: systems that behave."
        />

        <div className="grid grid-cols-1 border-t border-l border-border md:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, i) => (
            <Reveal key={area.id} delay={i * 0.05} className="border-b border-r border-border">
              <article className="group flex h-full flex-col p-6 transition-colors hover:bg-accent/40 md:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="outline-numeral text-5xl font-extrabold leading-none md:text-6xl">
                    {area.index}
                    </span>
                  <span className="label-mono text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight md:text-xl">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {area.summary}
                </p>

                <ul className="mt-5 space-y-2">
                  {area.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 inline-block size-1 shrink-0 bg-swiss-blue" aria-hidden="true" />
                      <span className="text-foreground/90">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5 pt-2">
                  {area.stack.map((t) => (
                    <span key={t} className="label-mono text-[10px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}

          {/* filler cell keeps the Swiss grid square on 2/3-col layouts */}
          <div className="hidden border-b border-r border-border md:flex md:items-end">
            <div className="flex w-full flex-col gap-3 p-8">
              <span className="sq" aria-hidden="true" />
              <p className="label-mono text-muted-foreground">
                NOT TOY LLM WRAPPERS.{" "}
                <span className="text-foreground">SYSTEMS.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
