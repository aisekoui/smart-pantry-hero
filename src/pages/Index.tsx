
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeFinderPanel } from "@/components/RecipeFinderPanel";
import { FoodInventoryPanel } from "@/components/FoodInventoryPanel";
import { ShoppingListPanel } from "@/components/ShoppingListPanel";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

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
          
          {/* Contact Section */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex flex-col">
                        <h4 className="font-medium">Kris Daniel Bendicio</h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>krisdanielbendicio12@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>09683125168</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <h4 className="font-medium">Luis Kayne Dela Cruz</h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>luiskayne.delacruz2@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>09560852236</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <h4 className="font-medium">Raymund Macaraeg</h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>raymund.macaraeg.320401@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>09683125094</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
