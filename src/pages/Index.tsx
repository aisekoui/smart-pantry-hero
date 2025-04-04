
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeFinderPanel } from "@/components/RecipeFinderPanel";
import { FoodInventoryPanel } from "@/components/FoodInventoryPanel";
import { ShoppingListPanel } from "@/components/ShoppingListPanel";
import { FloatingContactForm } from "@/components/FloatingContactForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Mobile Recipe Finder Sheet */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="mx-auto my-2 flex items-center gap-2"
                aria-label="Open Recipe Finder"
              >
                <ChefHat className="h-4 w-4" />
                <span>Recipe Finder</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0">
              <RecipeFinderPanel />
            </SheetContent>
          </Sheet>
        )}
        
        {/* Desktop Recipe Finder Panel */}
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-1/3">
            <RecipeFinderPanel />
          </div>
          
          <div className="container mx-auto py-4 px-4 md:px-6 lg:w-2/3">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6">
              {/* Food Inventory Panel */}
              <div className="lg:col-span-3">
                <FoodInventoryPanel />
              </div>
              
              {/* Shopping List Panel */}
              <div className="lg:col-span-4">
                <ShoppingListPanel />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <FloatingContactForm />
    </div>
  );
};

export default Index;
