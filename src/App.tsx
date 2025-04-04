
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
    const user = localStorage.getItem("smartPantryUser");
    const authStatus = !!user;
    setIsAuthenticated(authStatus);
    console.log("Auth status:", authStatus ? "Authenticated" : "Not authenticated");
  }, [location.pathname]);

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
