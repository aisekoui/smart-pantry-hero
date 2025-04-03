
import { useState } from "react";
import { ChefHat, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecipeFinderPanel } from "@/components/RecipeFinderPanel";

export function FloatingRecipeButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleRecipeFinder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleRecipeFinder}
        className={`floating-button ${isOpen ? "open" : ""}`}
        aria-label="Open Recipe Finder"
      >
        <ChefHat className="h-6 w-6" />
      </button>

      <div className={`recipe-finder-modal ${isOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between bg-primary/20 p-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">AI Recipe Finder</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleRecipeFinder}
            aria-label="Close Recipe Finder"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-grow">
          <RecipeFinderPanel />
        </div>
      </div>
    </>
  );
}
