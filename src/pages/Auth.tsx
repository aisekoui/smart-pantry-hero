
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, LogIn, UserPlus } from "lucide-react";

const Auth = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSubmitSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to main page
    navigate('/');
  };

  const handleSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to main page
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div 
        className={`relative bg-card rounded-xl shadow-xl overflow-hidden w-full max-w-4xl h-[500px] transition-all duration-500 ${
          isRightPanelActive ? 'auth-container-right-active' : ''
        }`}
      >
        {/* Sign Up Form */}
        <div className="absolute top-0 h-full transition-all duration-600 ease-in-out w-1/2 opacity-0 z-10 left-0 transform translate-x-0 
          auth-container-signup">
          <form onSubmit={handleSubmitSignUp} className="flex flex-col items-center justify-center h-full px-10 py-8 bg-card">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Sign Up</h2>
            <div className="space-y-4 w-full">
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input type="text" placeholder="Username" className="border-0 focus-visible:ring-0" />
              </div>
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <LogIn className="h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="Email" className="border-0 focus-visible:ring-0" />
              </div>
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="Password" className="border-0 focus-visible:ring-0" />
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </div>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="absolute top-0 h-full transition-all duration-600 ease-in-out w-1/2 z-20 left-0 
          auth-container-signin">
          <form onSubmit={handleSubmitSignIn} className="flex flex-col items-center justify-center h-full px-10 py-8 bg-card">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Sign In</h2>
            <div className="space-y-4 w-full">
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <LogIn className="h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="Email" className="border-0 focus-visible:ring-0" />
              </div>
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="Password" className="border-0 focus-visible:ring-0" />
              </div>
              <a href="#" className="block text-sm text-primary hover:underline text-right">
                Forgot your password?
              </a>
              <Button type="submit" className="w-full">Sign In</Button>
            </div>
          </form>
        </div>

        {/* Overlay */}
        <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100
          auth-container-overlay">
          <div className="bg-gradient-to-r from-primary/90 to-primary relative h-full w-[200%] -left-full transform translate-x-0 transition-transform duration-600 ease-in-out auth-overlay">
            {/* Left Panel */}
            <div className="absolute flex flex-col items-center justify-center top-0 h-full w-1/2 transform -translate-x-[20%] transition-transform duration-600 ease-in-out
              auth-overlay-left">
              <h2 className="text-2xl font-bold mb-4 text-white">Welcome Back!</h2>
              <p className="text-center text-white/90 mb-6 max-w-xs">
                To keep connected with us please login with your personal info
              </p>
              <Button 
                onClick={handleSignInClick}
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </div>
            
            {/* Right Panel */}
            <div className="absolute flex flex-col items-center justify-center top-0 right-0 h-full w-1/2 transform translate-x-0 transition-transform duration-600 ease-in-out
              auth-overlay-right">
              <h2 className="text-2xl font-bold mb-4 text-white">Hello, Friend!</h2>
              <p className="text-center text-white/90 mb-6 max-w-xs">
                Enter your personal details and start your journey with us
              </p>
              <Button 
                onClick={handleSignUpClick}
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
