"use client"; // Client Component directive

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Asegura que el componente solo se renderice después de que se monte (para evitar discrepancias de hidratación)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      type="button"
      title="Cambiar tema"
      aria-label="Cambiar tema"
      onClick={() =>
        setTheme(currentTheme === "dark" ? "light" : "dark")
      }
      className="flex items-center gap-2 p-3  rounded-md transition-all cursor-pointer mb-2 dark:hover:bg-gray-300 dark:hover:text-gray-800 hover:bg-gray-800 hover:text-gray-100 w-full"
    >
      {currentTheme === "dark" ? (
        <>
          <Sun className="w-5 h-5" />
          <span>Modo Claro</span>
        </>
      ) : currentTheme === "light" ? (
        <>
          <Moon className="w-5 h-5" />
          <span>Modo Oscuro</span>
        </>
      ) : (
        <>
          <Monitor className="w-5 h-5" />
          <span>Modo Sistema</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
