import { ArrowUp } from "lucide-react";
import { profile, navSections } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent/20">
      <div className="swiss-container py-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="sq" aria-hidden="true" />
              <span className="label-mono font-semibold">{profile.handle}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>
          </div>

          <nav className="md:col-span-4" aria-label="Footer">
            <span className="label-mono text-muted-foreground">SECTIONS</span>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
              {navSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="link-sweep w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="md:col-span-3">
            <span className="label-mono text-muted-foreground">ELSEWHERE</span>
            <div className="mt-3 flex flex-col gap-1.5">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub — @{profile.handle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="label-mono text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} {profile.name.toUpperCase()} · SWISS GRID · BUILT WITH REACT + TAILWIND
          </p>
          <div className="flex items-center gap-5">
            <span className="label-mono text-[10px] text-muted-foreground">
              PRESS ⌘K FOR COMMANDS
            </span>
            <a
              href="#top"
              className="flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
              aria-label="Back to top"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
