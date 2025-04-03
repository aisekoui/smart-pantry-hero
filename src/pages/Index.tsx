
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeFinderPanel } from "@/components/RecipeFinderPanel";
import { FoodInventoryPanel } from "@/components/FoodInventoryPanel";
import { ShoppingListPanel } from "@/components/ShoppingListPanel";
import { FloatingContactForm } from "@/components/FloatingContactForm";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* Left Panel - AI Recipe Finder - Now extends to edge */}
        <div className="hidden lg:block lg:w-1/3">
          <RecipeFinderPanel />
        </div>
        
        <div className="container py-6 lg:w-2/3">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            {/* Center Panel - Food Inventory */}
            <div className="lg:col-span-3">
              <FoodInventoryPanel />
            </div>
            
            {/* Right Panel - Shopping List & Extra Features */}
            <div className="lg:col-span-4">
              <ShoppingListPanel />
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
