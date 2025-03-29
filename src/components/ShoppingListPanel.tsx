import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Edit, Check, X, Pencil, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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

// Define the recipe note type
type RecipeNote = {
  id: string;
  title: string;
  content: string;
};

export function ShoppingListPanel() {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [recipeNotes, setRecipeNotes] = useState<RecipeNote[]>([]);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [editingMealValue, setEditingMealValue] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  
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
    
    const storedRecipeNotes = localStorage.getItem("recipeNotes");
    if (storedRecipeNotes) {
      setRecipeNotes(JSON.parse(storedRecipeNotes));
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
    localStorage.setItem("recipeNotes", JSON.stringify(recipeNotes));
  }, [recipeNotes]);
  
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

  // Start editing a meal
  const startEditingMeal = (id: string, currentValue: string) => {
    setEditingMealId(id);
    setEditingMealValue(currentValue);
  };

  // Save edited meal
  const saveEditedMeal = (id: string) => {
    if (editingMealValue.trim() === "") return;
    
    setMealPlans(
      mealPlans.map(meal =>
        meal.id === id ? { ...meal, recipe: editingMealValue } : meal
      )
    );
    setEditingMealId(null);
    toast.success("Meal plan updated!");
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingMealId(null);
  };

  // Add a new recipe note
  const addRecipeNote = () => {
    if (newNoteTitle.trim() === "") return;
    
    const newNote: RecipeNote = {
      id: crypto.randomUUID(),
      title: newNoteTitle,
      content: newNoteContent,
    };
    
    setRecipeNotes([...recipeNotes, newNote]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setIsAddingNote(false);
    toast.success("Recipe note added!");
  };

  // Delete a recipe note
  const deleteRecipeNote = (id: string) => {
    setRecipeNotes(recipeNotes.filter(note => note.id !== id));
    toast.info("Recipe note removed");
  };
  
  // Sample data for demonstration - meal plans now have blank recipe fields
  const sampleMealPlans: MealPlan[] = [
    { id: "1", day: "Monday", meal: "Breakfast", recipe: "" },
    { id: "2", day: "Monday", meal: "Lunch", recipe: "" },
    { id: "3", day: "Monday", meal: "Dinner", recipe: "" },
    { id: "4", day: "Tuesday", meal: "Breakfast", recipe: "" },
    { id: "5", day: "Tuesday", meal: "Lunch", recipe: "" },
    { id: "6", day: "Tuesday", meal: "Dinner", recipe: "" },
    { id: "7", day: "Wednesday", meal: "Breakfast", recipe: "" },
    { id: "8", day: "Wednesday", meal: "Lunch", recipe: "" },
    { id: "9", day: "Wednesday", meal: "Dinner", recipe: "" },
    { id: "10", day: "Thursday", meal: "Breakfast", recipe: "" },
    { id: "11", day: "Thursday", meal: "Lunch", recipe: "" },
    { id: "12", day: "Thursday", meal: "Dinner", recipe: "" },
    { id: "13", day: "Friday", meal: "Breakfast", recipe: "" },
    { id: "14", day: "Friday", meal: "Lunch", recipe: "" },
    { id: "15", day: "Friday", meal: "Dinner", recipe: "" },
    { id: "16", day: "Saturday", meal: "Breakfast", recipe: "" },
    { id: "17", day: "Saturday", meal: "Lunch", recipe: "" },
    { id: "18", day: "Saturday", meal: "Dinner", recipe: "" },
    { id: "19", day: "Sunday", meal: "Breakfast", recipe: "" },
    { id: "20", day: "Sunday", meal: "Lunch", recipe: "" },
    { id: "21", day: "Sunday", meal: "Dinner", recipe: "" },
  ];
  
  const sampleRecipeNotes: RecipeNote[] = [
    { 
      id: "1", 
      title: "Classic Spaghetti", 
      content: "Pasta, Tomato Sauce, Garlic, Onion, Ground Beef. Cook pasta al dente, sauté garlic and onion, add beef, then sauce. Mix and serve."
    },
    { 
      id: "2", 
      title: "Greek Salad", 
      content: "Cucumber, Tomato, Feta Cheese, Olive Oil, Olives. Chop vegetables, add cheese and olives, dress with olive oil and lemon juice."
    },
    { 
      id: "3", 
      title: "Avocado Toast", 
      content: "Bread, Avocado, Lemon Juice, Salt, Pepper. Toast bread, mash avocado with lemon juice, spread on toast, season with salt and pepper."
    },
  ];
  
  // Initialize with sample data if empty
  useEffect(() => {
    if (mealPlans.length === 0) {
      setMealPlans(sampleMealPlans);
    }
    
    if (recipeNotes.length === 0) {
      setRecipeNotes(sampleRecipeNotes);
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
          <TabsTrigger value="favorites">Recipe Notes</TabsTrigger>
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
                            
                            {editingMealId === plan.id ? (
                              <div className="flex items-center gap-1">
                                <Input 
                                  value={editingMealValue}
                                  onChange={(e) => setEditingMealValue(e.target.value)}
                                  className="h-6 py-1 w-32"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      saveEditedMeal(plan.id);
                                    }
                                  }}
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => saveEditedMeal(plan.id)}
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={cancelEditing}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <span>{plan.recipe}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 ml-1" 
                                  onClick={() => startEditingMeal(plan.id, plan.recipe)}
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
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
                <CardTitle className="text-lg">Recipe Notes</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsAddingNote(true)}
                  className="h-7 w-7"
                >
                  <Plus className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isAddingNote ? (
                <div className="space-y-3 mb-4 border rounded-md p-3">
                  <Input 
                    placeholder="Note title..." 
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                  />
                  <Textarea 
                    placeholder="Write your recipe note here..." 
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setIsAddingNote(false);
                        setNewNoteTitle("");
                        setNewNoteContent("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={addRecipeNote}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Note
                    </Button>
                  </div>
                </div>
              ) : null}
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {recipeNotes.map(note => (
                  <div key={note.id} className="border rounded-md p-3 hover:bg-muted/50">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{note.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteRecipeNote(note.id)}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {note.content}
                    </p>
                  </div>
                ))}
                
                {recipeNotes.length === 0 && !isAddingNote && (
                  <div className="text-center py-4 text-muted-foreground">
                    No recipe notes yet. Click the + button to add one!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
