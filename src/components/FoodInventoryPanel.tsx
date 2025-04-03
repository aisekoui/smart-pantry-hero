import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Trash2, Edit, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";

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
  quantity: z.string().optional(),
  notes: z.string().optional(),
});

// Define the food item type
type FoodItem = {
  id: string;
  name: string;
  category: string;
  expirationDate: string;
  quantity?: string;
  notes?: string;
};

export function FoodInventoryPanel() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      expirationDate: "",
      quantity: "",
      notes: "",
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
  
  // Set form values when editing an item
  useEffect(() => {
    if (editingItem) {
      form.reset({
        name: editingItem.name,
        category: editingItem.category,
        expirationDate: editingItem.expirationDate,
        quantity: editingItem.quantity || "",
        notes: editingItem.notes || "",
      });
    } else {
      form.reset({
        name: "",
        category: "",
        expirationDate: "",
        quantity: "",
        notes: "",
      });
    }
  }, [editingItem, form]);
  
  // Add or update a food item
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingItem) {
      // Update existing item
      setFoodItems(foodItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...values } 
          : item
      ));
      toast.success("Item updated successfully!");
    } else {
      // Add new item
      const newItem: FoodItem = {
        id: crypto.randomUUID(),
        name: values.name,
        category: values.category,
        expirationDate: values.expirationDate,
        quantity: values.quantity,
        notes: values.notes,
      };
      
      setFoodItems([...foodItems, newItem]);
      toast.success("Item added to inventory!");
    }
    
    form.reset();
    setEditingItem(null);
    setIsDialogOpen(false);
  };
  
  // Start editing a food item
  const editItem = (item: FoodItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };
  
  // Delete a food item
  const deleteItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
    toast.info("Item removed from inventory");
  };
  
  // Check expiration status
  const getExpirationStatus = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiration < 0) {
      return "expired";
    } else if (daysUntilExpiration <= 3) {
      return "expiring-soon";
    } else {
      return "fresh";
    }
  };
  
  // Get human-readable expiration text
  const getExpirationText = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiration < 0) {
      return `Expired ${Math.abs(daysUntilExpiration)} days ago`;
    } else if (daysUntilExpiration === 0) {
      return "Expires today";
    } else if (daysUntilExpiration === 1) {
      return "Expires tomorrow";
    } else {
      return `Expires in ${daysUntilExpiration} days`;
    }
  };
  
  // Filter food items based on search term
  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort items with expired items first, then by expiration date
  const sortedItems = [...filteredItems].sort((a, b) => {
    const aStatus = getExpirationStatus(a.expirationDate);
    const bStatus = getExpirationStatus(b.expirationDate);
    
    if (aStatus === "expired" && bStatus !== "expired") return -1;
    if (aStatus !== "expired" && bStatus === "expired") return 1;
    if (aStatus === "expiring-soon" && bStatus === "fresh") return -1;
    if (aStatus === "fresh" && bStatus === "expiring-soon") return 1;
    
    return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
  });
  
  // Get status label and class
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "expired":
        return {
          label: "Expired",
          className: "status-expired",
          badgeClass: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
        };
      case "expiring-soon":
        return {
          label: "Expiring Soon",
          className: "status-expiring-soon",
          badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
        };
      default:
        return {
          label: "Fresh",
          className: "status-fresh",
          badgeClass: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
        };
    }
  };
  
  return (
    <div className="panel-container">
      <div className="panel-header">
        <h2>Food Inventory</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingItem(null);
        }}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Food Item" : "Add New Food Item"}</DialogTitle>
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
                        value={field.value}
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
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 500g, 2 packs" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any additional information" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-2">
                  <Button type="submit">{editingItem ? "Update Item" : "Add to Inventory"}</Button>
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
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Expiration</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.length > 0 ? (
                  sortedItems.map((item) => {
                    const status = getExpirationStatus(item.expirationDate);
                    const statusInfo = getStatusInfo(status);
                    const expirationText = getExpirationText(item.expirationDate);
                    
                    return (
                      <tr 
                        key={item.id}
                        className={`border-t hover:bg-muted/50 transition-colors ${status === "expired" ? "bg-red-50/50 dark:bg-red-900/5" : ""}`}
                      >
                        <td className="px-4 py-2">
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <div className="flex items-center">
                                <span className={`status-indicator ${status}`} />
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusInfo.badgeClass}`}>
                                  {statusInfo.label}
                                </span>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-auto">
                              <div className="flex">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>{expirationText}</span>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </td>
                        <td className="px-4 py-2">
                          <div className="font-medium">{item.name}</div>
                          {item.quantity && <div className="text-xs text-muted-foreground">{item.quantity}</div>}
                        </td>
                        <td className="px-4 py-2">{item.category}</td>
                        <td className="px-4 py-2">
                          {new Date(item.expirationDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-right space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => editItem(item)}
                            aria-label="Edit item"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteItem(item.id)}
                            aria-label="Delete item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
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
