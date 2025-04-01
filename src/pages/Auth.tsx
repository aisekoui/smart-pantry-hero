
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const Auth = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSubmitSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate and authenticate the user
    if (email && password) {
      // Store login state in localStorage
      localStorage.setItem('smartPantryUser', JSON.stringify({
        email,
        isLoggedIn: true,
        username: email.split('@')[0],
        avatar: null
      }));
      
      toast({
        title: "Login successful!",
        description: "Welcome back to Smart Pantry",
      });
      
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const handleSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate and create a user account
    if (email && password && username) {
      // Store user data in localStorage
      localStorage.setItem('smartPantryUser', JSON.stringify({
        email,
        isLoggedIn: true,
        username,
        avatar: null
      }));
      
      toast({
        title: "Account created!",
        description: "Welcome to Smart Pantry",
      });
      
      navigate('/');
    } else {
      toast({
        title: "Registration failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-12"
         style={{backgroundImage: "url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"}}>
      <div 
        className={`relative mx-auto overflow-hidden rounded-xl shadow-2xl transition-all duration-500 md:w-[800px] h-[550px] ${
          isRightPanelActive ? 'auth-container-right-active' : ''
        }`}
      >
        {/* Sign Up Form */}
        <div className="absolute top-0 left-0 z-10 h-full w-1/2 transform opacity-0 transition-all duration-600 ease-in-out 
          auth-container-signup">
          <div className="flex h-full flex-col items-center justify-center bg-card px-10 py-8">
            <div className="mb-8 flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <h2 className="text-3xl font-bold mb-2 text-foreground font-playfair">Create Account</h2>
              <p className="text-muted-foreground text-center max-w-xs">Join Smart Pantry to start organizing your kitchen intelligently</p>
            </div>

            <form onSubmit={handleSubmitSignUp} className="w-full space-y-4">
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Username" 
                  className="border-0 focus-visible:ring-0" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="border-0 focus-visible:ring-0" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="border-0 focus-visible:ring-0" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full group">
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="absolute top-0 left-0 z-20 h-full w-1/2 transition-all duration-600 ease-in-out 
          auth-container-signin">
          <div className="flex h-full flex-col items-center justify-center bg-card px-10 py-8">
            <div className="mb-8 flex flex-col items-center">
              <img 
                src="/lovable-uploads/81b81798-a0fc-452c-8e3c-c3176ffd9868.png" 
                alt="Smart Pantry Logo" 
                className="h-20 w-20 mb-4"
              />
              <h2 className="text-3xl font-bold mb-2 text-foreground font-playfair">Welcome Back</h2>
              <p className="text-muted-foreground text-center max-w-xs">Sign in to access your Smart Pantry account</p>
            </div>

            <form onSubmit={handleSubmitSignIn} className="w-full space-y-4">
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="border-0 focus-visible:ring-0" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="border-0 focus-visible:ring-0" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a href="#" className="block text-sm text-primary hover:underline text-right">
                Forgot your password?
              </a>
              <Button type="submit" className="w-full group">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute top-0 left-1/2 z-100 h-full w-1/2 overflow-hidden transition-transform duration-600 ease-in-out
          auth-container-overlay">
          <div className="relative h-full w-[200%] -left-full transform translate-x-0 transition-transform duration-600 ease-in-out bg-gradient-to-r from-primary/90 to-primary auth-overlay">
            {/* Left Panel */}
            <div className="absolute top-0 flex h-full w-1/2 flex-col items-center justify-center transform -translate-x-[20%] transition-transform duration-600 ease-in-out text-center
              auth-overlay-left">
              <h2 className="text-2xl font-bold mb-4 text-white font-playfair">Welcome Back!</h2>
              <p className="mb-6 max-w-xs text-white/90">
                To keep connected with us, please login with your personal info
              </p>
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Kitchen Organization"
                  className="h-40 w-56 object-cover"
                />
              </div>
              <Button 
                onClick={handleSignInClick}
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </div>
            
            {/* Right Panel */}
            <div className="absolute top-0 right-0 flex h-full w-1/2 flex-col items-center justify-center transform translate-x-0 transition-transform duration-600 ease-in-out text-center
              auth-overlay-right">
              <h2 className="text-2xl font-bold mb-4 text-white font-playfair">Hello, Friend!</h2>
              <p className="mb-6 max-w-xs text-white/90">
                Enter your personal details and start your journey with us
              </p>
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Fresh Ingredients"
                  className="h-40 w-56 object-cover"
                />
              </div>
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
