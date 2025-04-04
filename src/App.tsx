
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { AccessibilityProvider } from "./components/AccessibilityProvider";
import { FloatingRecipeButton } from "./components/FloatingRecipeButton";

const queryClient = new QueryClient();

// Route debugger component
const RouteDebugger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log("Current route:", {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    });
  }, [location]);
  
  return null;
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    console.log("ProtectedRoute checking auth for path:", location.pathname);
    checkAuthStatus();
  }, [location.pathname]);

  const checkAuthStatus = () => {
    // First check localStorage
    const storedUser = localStorage.getItem("smartPantryUser");
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.isLoggedIn) {
          console.log("User authenticated via localStorage");
          
          // Also sync to sessionStorage for consistent state across tabs
          sessionStorage.setItem("smartPantryUser", storedUser);
          
          setIsAuthenticated(true);
          return;
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
    
    // If not in localStorage, check sessionStorage
    const sessionUser = sessionStorage.getItem("smartPantryUser");
    if (sessionUser) {
      try {
        const user = JSON.parse(sessionUser);
        if (user.isLoggedIn) {
          console.log("User authenticated via sessionStorage");
          
          // Sync back to localStorage
          localStorage.setItem("smartPantryUser", sessionUser);
          
          setIsAuthenticated(true);
          return;
        }
      } catch (e) {
        console.error("Error parsing user from sessionStorage", e);
      }
    }
    
    console.log("Not authenticated");
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    // Still checking authentication
    console.log("Auth check in progress...");
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }
  
  console.log("Authentication confirmed, rendering protected content");
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="smart-pantry-theme">
      <AccessibilityProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteDebugger />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <>
                      <Index />
                      <FloatingRecipeButton />
                    </>
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
