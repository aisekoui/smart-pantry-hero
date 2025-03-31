
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(theme === "light" ? "dark" : "light");
      return;
    }

    document.startViewTransition(() => {
      setTheme(theme === "light" ? "dark" : "light");
    });
  };

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      className="w-10 h-10 rounded-full transition-colors hover:bg-accent relative"
      title={`Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] absolute transition-all ${theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] absolute transition-all ${theme === 'light' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
