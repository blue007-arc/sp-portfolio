import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "swiss-portfolio-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

type Listener = () => void;

let current: Theme = getInitialTheme();
const listeners = new Set<Listener>();

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/* Apply the resolved theme once at module load — before first paint of
   any consumer, so there is no flash of the wrong scheme. */
apply(current);

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Theme {
  return current;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot);

  const setTheme = useCallback((next: Theme) => {
    current = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for the session */
    }
    apply(next);
    for (const l of listeners) l();
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(current === "dark" ? "light" : "dark"),
    [setTheme],
  );

  return { theme, setTheme, toggleTheme };
}
