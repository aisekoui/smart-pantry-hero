
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeFinderPanel } from "@/components/RecipeFinderPanel";
import { FoodInventoryPanel } from "@/components/FoodInventoryPanel";
import { ShoppingListPanel } from "@/components/ShoppingListPanel";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex min-h-screen flex-col">
        <Header />
        
        <main className="flex-grow">
          <div className="container py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Panel - AI Recipe Finder - Now takes more space */}
              <div className="lg:col-span-5">
                <RecipeFinderPanel />
              </div>
              
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
      </div>
    </ThemeProvider>
  );
};

export default Index;
