import { ArrowUpRight } from "lucide-react";
import { about, profile, githubStats } from "@/data/portfolio";
import { Reveal, SectionHeader } from "./primitives";

export function About() {
  return (
    <section id="about" className="scroll-mt-14 border-t border-border">
      <div className="swiss-container py-20 md:py-28">
        <SectionHeader
          label="06 — ABOUT"
          index="EST. 2025"
          title="Short. Technical. Human."
        />

        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="font-mono text-lg text-swiss-red">{about.heading}</p>
            <div className="mt-8 space-y-2 font-mono text-xs text-muted-foreground">
              <p>NAME · {profile.name.toUpperCase()}</p>
              <p>GITHUB · @{profile.handle}</p>
              <p>FOCUS · AI SYSTEMS ENGINEERING</p>
              <p>CLASS OF · 2027</p>
              <p>REPOSITORIES · {githubStats.publicRepos} PUBLIC</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-7">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-xl leading-relaxed md:text-2xl md:leading-relaxed"
                    : "mt-6 text-base leading-relaxed text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}

            <div className="mt-8 border-l-2 border-swiss-red pl-5">
              <p className="text-sm leading-relaxed text-foreground/90">
                {profile.status}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-14 border-t border-border">
      <div className="swiss-container py-20 md:py-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="sq" aria-hidden="true" />
            <span className="label-mono text-muted-foreground">07 — CONTACT</span>
          </div>

          <h2 className="mt-8 max-w-4xl text-4xl font-extrabold leading-[0.98] tracking-tighter md:text-7xl">
            Building something
            <br />
            that needs to <span className="text-swiss-red">work?</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Open to Software Engineering and AI Engineering internships and
            full-time roles. The fastest way in is through the code.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 border-t border-l border-border md:grid-cols-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-r border-border p-8 transition-colors hover:bg-accent/40 md:p-10"
            >
              <div>
                <span className="label-mono text-muted-foreground">GITHUB</span>
                <p className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                  @{profile.handle}
                </p>
              </div>
              <ArrowUpRight className="size-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-swiss-red" />
            </a>

            <a
              href="https://github.com/blue007-arc?tab=repos"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-r border-border p-8 transition-colors hover:bg-accent/40 md:p-10"
            >
              <div>
                <span className="label-mono text-muted-foreground">REPOSITORIES</span>
                <p className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                  {githubStats.publicRepos} public projects
                </p>
              </div>
              <ArrowUpRight className="size-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-swiss-red" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
