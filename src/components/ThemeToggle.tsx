
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAccessibility } from "./AccessibilityProvider";
import { AccessibilityMenu } from "./AccessibilityMenu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  // Save theme to localStorage for persistence
  useEffect(() => {
    localStorage.setItem("smartPantryTheme", theme);
  }, [theme]);
  
  // Retrieve theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("smartPantryTheme");
    if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  return (
    <div className="flex items-center space-x-1">
      <AccessibilityMenu />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        className="rounded-full"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
