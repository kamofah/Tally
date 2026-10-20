import { useSyncExternalStore } from "react";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

// Keep STORAGE_KEY and the resolution logic in sync with the inline script in
// index.html, which applies the stored theme before first paint.
const STORAGE_KEY = "tally-theme";
const DEFAULT_THEME: ThemePreference = "light";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const isThemePreference = (value: unknown): value is ThemePreference =>
  value === "light" || value === "dark" || value === "system";

const readStoredTheme = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isThemePreference(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

let preference: ThemePreference = readStoredTheme();
const listeners = new Set<() => void>();

const resolveTheme = (theme: ThemePreference): ResolvedTheme => {
  if (theme !== "system") return theme;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
};

// The CSS variables for each theme live under :root[data-theme="..."] in index.css.
const applyTheme = () => {
  document.documentElement.dataset.theme = resolveTheme(preference);
};

// Call once at startup: applies the stored theme and keeps "system" in sync
// with the OS setting while the app is open.
const initTheme = () => {
  applyTheme();
  window.matchMedia(DARK_QUERY).addEventListener("change", () => {
    if (preference === "system") applyTheme();
  });
};

const setTheme = (next: ThemePreference) => {
  preference = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this session.
  }
  applyTheme();
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const useTheme = () =>
  [useSyncExternalStore(subscribe, () => preference), setTheme] as const;

export { initTheme, useTheme };
export type { ThemePreference };
