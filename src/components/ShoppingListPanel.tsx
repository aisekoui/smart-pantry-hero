
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Heart, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Define the shopping item type
type ShoppingItem = {
  id: string;
  name: string;
  completed: boolean;
};

// Define the meal plan type
type MealPlan = {
  id: string;
  day: string;
  meal: string;
  recipe: string;
};

// Define the favorite recipe type
type FavoriteRecipe = {
  id: string;
  name: string;
  ingredients: string[];
};

export function ShoppingListPanel() {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  
  // Load stored items on component mount
  useEffect(() => {
    const storedShoppingItems = localStorage.getItem("shoppingItems");
    if (storedShoppingItems) {
      setShoppingItems(JSON.parse(storedShoppingItems));
    }
    
    const storedMealPlans = localStorage.getItem("mealPlans");
    if (storedMealPlans) {
      setMealPlans(JSON.parse(storedMealPlans));
    }
    
    const storedFavoriteRecipes = localStorage.getItem("favoriteRecipes");
    if (storedFavoriteRecipes) {
      setFavoriteRecipes(JSON.parse(storedFavoriteRecipes));
    }
  }, []);
  
  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
  }, [shoppingItems]);
  
  useEffect(() => {
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
  }, [mealPlans]);
  
  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);
  
  // Add a new shopping item
  const addShoppingItem = () => {
    if (newItem.trim() === "") return;
    
    const newShoppingItem: ShoppingItem = {
      id: crypto.randomUUID(),
      name: newItem,
      completed: false,
    };
    
    setShoppingItems([...shoppingItems, newShoppingItem]);
    setNewItem("");
    toast.success("Item added to shopping list!");
  };
  
  // Toggle completion status of a shopping item
  const toggleCompleted = (id: string) => {
    setShoppingItems(
      shoppingItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  // Delete a shopping item
  const deleteShoppingItem = (id: string) => {
    setShoppingItems(shoppingItems.filter(item => item.id !== id));
    toast.info("Item removed from shopping list");
  };
  
  // Sample data for demonstration
  const sampleMealPlans: MealPlan[] = [
    { id: "1", day: "Monday", meal: "Breakfast", recipe: "Avocado Toast" },
    { id: "2", day: "Monday", meal: "Lunch", recipe: "Greek Salad" },
    { id: "3", day: "Monday", meal: "Dinner", recipe: "Baked Salmon" },
    { id: "4", day: "Tuesday", meal: "Breakfast", recipe: "Smoothie Bowl" },
    { id: "5", day: "Tuesday", meal: "Lunch", recipe: "Quinoa Bowl" },
    { id: "6", day: "Tuesday", meal: "Dinner", recipe: "Veggie Stir Fry" },
  ];
  
  const sampleFavoriteRecipes: FavoriteRecipe[] = [
    { 
      id: "1", 
      name: "Classic Spaghetti", 
      ingredients: ["Pasta", "Tomato Sauce", "Garlic", "Onion", "Ground Beef"]
    },
    { 
      id: "2", 
      name: "Greek Salad", 
      ingredients: ["Cucumber", "Tomato", "Feta Cheese", "Olive Oil", "Olives"]
    },
    { 
      id: "3", 
      name: "Avocado Toast", 
      ingredients: ["Bread", "Avocado", "Lemon Juice", "Salt", "Pepper"]
    },
  ];
  
  // Initialize with sample data if empty
  useEffect(() => {
    if (mealPlans.length === 0) {
      setMealPlans(sampleMealPlans);
    }
    
    if (favoriteRecipes.length === 0) {
      setFavoriteRecipes(sampleFavoriteRecipes);
    }
  }, []);
  
  return (
    <div className="panel-container">
      <div className="panel-header">
        <h2>Shopping & Meal Planning</h2>
      </div>
      
      <Tabs defaultValue="shopping" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shopping">Shopping List</TabsTrigger>
          <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shopping" className="panel-content">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Shopping List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input 
                  placeholder="Add item..." 
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addShoppingItem();
                    }
                  }}
                />
                <Button 
                  size="icon" 
                  onClick={addShoppingItem}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {shoppingItems.length > 0 ? (
                  shoppingItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-2 rounded-md border bg-background hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggleCompleted(item.id)}
                        >
                          {item.completed ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2" />
                          )}
                        </Button>
                        <span className={item.completed ? "line-through text-muted-foreground" : ""}>
                          {item.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteShoppingItem(item.id)}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No items in shopping list. Add some items to get started!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="meal-plan" className="panel-content">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Weekly Meal Plan</CardTitle>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="border rounded-md p-3">
                    <h4 className="font-medium mb-2">{day}</h4>
                    <div className="space-y-2">
                      {mealPlans
                        .filter(plan => plan.day === day)
                        .map(plan => (
                          <div key={plan.id} className="flex justify-between text-sm bg-muted p-2 rounded-md">
                            <span className="font-medium">{plan.meal}:</span>
                            <span>{plan.recipe}</span>
                          </div>
                        ))}
                      {mealPlans.filter(plan => plan.day === day).length === 0 && (
                        <div className="text-sm text-muted-foreground italic">
                          No meals planned yet
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites" className="panel-content">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Favorite Recipes</CardTitle>
                <Heart className="h-5 w-5 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {favoriteRecipes.map(recipe => (
                  <div key={recipe.id} className="border rounded-md p-3 hover:bg-muted/50">
                    <h4 className="font-medium mb-1">{recipe.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Ingredients: </span>
                      {recipe.ingredients.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
