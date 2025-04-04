
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, ChefHat } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  isLoggedIn: boolean;
  username: string;
  email: string;
  avatar: string | null;
  userId: string;
}

export function Header() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for user data in local and session storage
    checkUserData();
    
    // Listen for storage events (for cross-tab synchronization)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'smartPantryUser') {
      checkUserData();
    }
  };
  
  const checkUserData = () => {
    // First check localStorage
    const storedUser = localStorage.getItem("smartPantryUser");
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData(user);
        return;
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
    
    // If not in localStorage, check sessionStorage
    const sessionUser = sessionStorage.getItem("smartPantryUser");
    if (sessionUser) {
      try {
        const user = JSON.parse(sessionUser);
        setUserData(user);
        
        // Sync to localStorage for persistence
        localStorage.setItem("smartPantryUser", sessionUser);
      } catch (e) {
        console.error("Error parsing user from sessionStorage", e);
      }
    }
  };

  const handleLogout = () => {
    // Clear user data from both storages
    localStorage.removeItem("smartPantryUser");
    sessionStorage.removeItem("smartPantryUser");
    setUserData(null);
    
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    
    navigate("/auth");
  };
  
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
        <div className="flex items-center gap-3 justify-end flex-1">
          {userData?.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative group">
                  <Avatar className="h-8 w-8 transition-transform group-hover:scale-110">
                    {userData.avatar ? (
                      <AvatarImage src={userData.avatar} alt={userData.username} />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {userData.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userData.username}</p>
                    <p className="text-xs text-muted-foreground">{userData.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <ChefHat className="mr-2 h-4 w-4" />
                  <span>Meal Plans</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="group">
                Login
                <User className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
