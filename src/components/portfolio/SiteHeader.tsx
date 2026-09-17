import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { navSections, profile } from "@/data/portfolio";
import { CommandPalette } from "./CommandPalette";
import { cn } from "@/lib/utils";

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Global keyboard shortcuts: ⌘K / Ctrl+K palette, ⌘/ theme */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b bg-background/85 backdrop-blur-sm transition-colors",
          scrolled ? "border-border" : "border-transparent",
        )}
      >
        <div className="swiss-container flex h-14 items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="sq" aria-hidden="true" />
            <span className="label-mono font-semibold text-foreground">
              {profile.handle}
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Sections">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="label-mono link-sweep text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 border border-border px-2.5 py-1.5 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground md:flex"
              aria-label="Open command palette"
            >
              <span className="label-mono">Menu</span>
              <kbd className="label-mono border border-border px-1 py-0.5 text-[10px]">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center border border-border text-muted-foreground lg:hidden"
              aria-label="Toggle section menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-background lg:hidden" aria-label="Sections">
            <div className="swiss-container grid grid-cols-2">
              {navSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="label-mono border-b border-r border-border px-4 py-4 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
