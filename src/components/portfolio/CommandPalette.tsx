import { useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navSections, caseStudies, profile, GH_BASE } from "@/data/portfolio";
import { useTheme } from "@/hooks/use-theme";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  const go = (id: string) => {
    onOpenChange(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command palette"
      description="Navigate sections, open repositories, switch theme"
      className="sm:max-w-xl"
    >
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Sections">
          {navSections.map((s) => (
            <CommandItem key={s.id} onSelect={() => go(s.id)}>
              <span className="sq mr-1 !h-1.5 !w-1.5" aria-hidden="true" />
              Go to {s.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Case studies">
          {caseStudies.map((c) => (
            <CommandItem key={c.id} onSelect={() => go("work")}>
              <span className="label-mono text-muted-foreground">{c.id}</span>
              <span className="ml-auto label-mono text-[10px] text-muted-foreground/70">
                {c.language}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Repositories">
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              window.open(profile.github, "_blank", "noopener");
            }}
          >
            GitHub profile — @{profile.handle}
          </CommandItem>
          {caseStudies.map((c) => (
            <CommandItem
              key={c.id}
              onSelect={() => {
                onOpenChange(false);
                window.open(c.url, "_blank", "noopener");
              }}
            >
              Open repo — {c.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => setTheme("light")}>
            {theme === "light" ? "● " : ""}Light theme
          </CommandItem>
          <CommandItem onSelect={() => setTheme("dark")}>
            {theme === "dark" ? "● " : ""}Dark theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="border-t border-border px-3 py-2">
        <span className="label-mono text-[10px] text-muted-foreground">
          {GH_BASE.replace("https://", "")}
        </span>
      </div>
    </CommandDialog>
  );
}
