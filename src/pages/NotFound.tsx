
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [info, setInfo] = useState<{
    pathname: string;
    isAuthenticated: boolean | null;
    referrer: string;
  }>({
    pathname: "",
    isAuthenticated: null,
    referrer: "",
  });

  useEffect(() => {
    // Gather debugging information
    const user = localStorage.getItem("smartPantryUser");
    
    setInfo({
      pathname: location.pathname,
      isAuthenticated: !!user,
      referrer: document.referrer || "No referrer",
    });
    
    console.error(
      "404 Error: Route not found",
      {
        pathname: location.pathname,
        search: location.search,
        isAuthenticated: !!user,
        referrer: document.referrer || "No referrer",
        userAgent: navigator.userAgent
      }
    );
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-5xl font-bold mb-2 text-red-500">404</h1>
        <p className="text-xl text-gray-700 mb-4">Page not found</p>
        
        <div className="text-sm text-gray-600 mb-6">
          <p>The page <code className="bg-gray-100 p-1 rounded">{info.pathname}</code> does not exist.</p>
          {info.isAuthenticated !== null && (
            <p className="mt-2">
              Authentication status: {info.isAuthenticated ? "Logged in" : "Not logged in"}
            </p>
          )}
        </div>
        
        <Button 
          onClick={() => window.location.href = "/"}
          className="flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Home
        </Button>
        
        <p className="mt-4 text-xs text-gray-500">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
