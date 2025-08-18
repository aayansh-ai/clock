
"use client";

import { useState, useEffect, useCallback } from "react";
import { themes } from "@/lib/themes";

export function useTheme() {
  const [theme, setThemeState] = useState("dark");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const applyTheme = useCallback((themeName: string) => {
    const selectedTheme =
      themes.find((t) => t.name === themeName) ||
      themes.find((t) => t.name === "dark") ||
      themes[0];
    const root = document.documentElement;

    Object.entries(selectedTheme.colors).forEach(([key, value]) => {
      const propKey = `--${key.replace(/'/g, "")}`;
      root.style.setProperty(propKey, value);
    });

    if (selectedTheme.name === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("chrono-theme") || "dark";
    setThemeState(storedTheme);
    applyTheme(storedTheme);
    setIsThemeLoaded(true);
  }, [applyTheme]);

  const setTheme = (themeName: string) => {
    localStorage.setItem("chrono-theme", themeName);
    setThemeState(themeName);
    applyTheme(themeName);
  };

  return { theme, setTheme, isThemeLoaded };
}
