
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex-1"></div>
        <div className="flex items-center justify-center flex-1 space-x-3">
          <img 
            src="/lovable-uploads/81b81798-a0fc-452c-8e3c-c3176ffd9868.png" 
            alt="Smart Pantry Logo" 
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold text-primary font-playfair">Smart Pantry</h1>
        </div>
        <div className="flex items-center gap-2 justify-end flex-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
