import { ArrowUpRight } from "lucide-react";
import { githubStats, repoIndex, profile } from "@/data/portfolio";
import { Reveal, SectionHeader } from "./primitives";

export function GitHubSection() {
  return (
    <section id="github" className="scroll-mt-14 border-t border-border">
      <div className="swiss-container py-20 md:py-28">
        <SectionHeader
          label="05 — GITHUB"
          index={`@${profile.handle.toUpperCase()}`}
          title="The record, unedited."
        />

        {/* verified stat strip */}
        <Reveal>
          <div className="grid grid-cols-2 border-t border-l border-border md:grid-cols-4">
            <div className="border-b border-r border-border p-6 md:p-8">
              <p className="text-4xl font-extrabold tracking-tight md:text-5xl">
                {githubStats.publicRepos}
              </p>
              <p className="label-mono mt-2 text-muted-foreground">PUBLIC REPOSITORIES</p>
            </div>
            <div className="border-b border-r border-border p-6 md:p-8">
              <p className="text-4xl font-extrabold tracking-tight md:text-5xl">
                {githubStats.languages.join(" · ")}
              </p>
              <p className="label-mono mt-2 text-muted-foreground">PRIMARY LANGUAGES</p>
            </div>
            <div className="border-b border-r border-border p-6 md:p-8">
              <p className="text-4xl font-extrabold tracking-tight md:text-5xl">
                {githubStats.memberSince}
              </p>
              <p className="label-mono mt-2 text-muted-foreground">ON GITHUB SINCE</p>
            </div>
            <div className="border-b border-r border-border p-6 md:p-8">
              <p className="text-4xl font-extrabold tracking-tight md:text-5xl">
                {repoIndex.length}
              </p>
              <p className="label-mono mt-2 text-muted-foreground">FLAGSHIP SYSTEMS</p>
            </div>
          </div>
          <p className="label-mono mt-4 text-[10px] text-muted-foreground">
            {githubStats.note}
          </p>
        </Reveal>

        {/* repository index */}
        <Reveal className="mt-12 md:mt-16">
          <div className="border-t border-border">
            {repoIndex.map((repo, i) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-border px-1 py-5 transition-colors hover:bg-accent/30 md:grid-cols-[2.5rem_14rem_1fr_auto] md:gap-6"
              >
                <span className="label-mono text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate font-mono text-sm font-medium md:text-base">
                  {repo.name}
                </span>
                <span className="col-span-3 text-sm leading-relaxed text-muted-foreground md:col-span-1 md:pr-8">
                  {repo.description}
                </span>
                <span className="hidden items-center gap-4 md:flex">
                  <span className="label-mono text-[10px] text-muted-foreground">
                    {repo.language}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-swiss-red" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-8">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-swiss-red hover:text-white"
            >
              All {githubStats.publicRepos} repositories on GitHub
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
