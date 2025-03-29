
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Define food category options
const foodCategories = [
  "Fruits",
  "Vegetables",
  "Meat",
  "Seafood",
  "Dairy",
  "Grains",
  "Baking",
  "Spices",
  "Beverages",
  "Snacks",
  "Frozen",
  "Canned",
  "Other"
];

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  expirationDate: z.string().min(1, "Expiration date is required"),
});

// Define the food item type
type FoodItem = {
  id: string;
  name: string;
  category: string;
  expirationDate: string;
};

export function FoodInventoryPanel() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      expirationDate: "",
    },
  });
  
  // Load stored food items on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem("foodItems");
    if (storedItems) {
      setFoodItems(JSON.parse(storedItems));
    }
  }, []);
  
  // Save food items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
  }, [foodItems]);
  
  // Add a new food item
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newItem: FoodItem = {
      id: crypto.randomUUID(),
      name: values.name,
      category: values.category,
      expirationDate: values.expirationDate,
    };
    
    setFoodItems([...foodItems, newItem]);
    form.reset();
    setIsDialogOpen(false);
    toast.success("Item added to inventory!");
  };
  
  // Delete a food item
  const deleteItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
    toast.info("Item removed from inventory");
  };
  
  // Check if an item is expired
  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };
  
  // Filter food items based on search term
  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort items with expired items first, then by expiration date
  const sortedItems = [...filteredItems].sort((a, b) => {
    const aIsExpired = isExpired(a.expirationDate);
    const bIsExpired = isExpired(b.expirationDate);
    
    if (aIsExpired && !bIsExpired) return -1;
    if (!aIsExpired && bIsExpired) return 1;
    
    return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
  });
  
  return (
    <div className="panel-container">
      <div className="panel-header">
        <h2>Food Inventory</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Food Item</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter food name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {foodCategories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-2">
                  <Button type="submit">Add to Inventory</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="mb-4 flex items-center border rounded-md overflow-hidden bg-background">
        <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        <Input
          className="border-0 bg-transparent"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="panel-content">
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Expiration Date</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.length > 0 ? (
                  sortedItems.map((item) => {
                    const expired = isExpired(item.expirationDate);
                    return (
                      <tr 
                        key={item.id}
                        className={`border-t hover:bg-muted/50 ${expired ? 'bg-expired/10 text-destructive' : ''}`}
                      >
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.category}</td>
                        <td className="px-4 py-2">
                          {new Date(item.expirationDate).toLocaleDateString()}
                          {expired && <span className="ml-2 text-xs font-medium bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">Expired</span>}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      No items in inventory. Add some food items to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
