
import { createContext, useContext, useEffect, useState } from "react";
import { 
  applyFontSize, 
  applyHighContrast, 
  applyReducedMotion, 
  getAccessibilityPreference, 
  saveAccessibilityPreference 
} from "@/utils/accessibility";

type AccessibilityContextType = {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(() => 
    getAccessibilityPreference('highContrast', false)
  );
  
  const [fontSize, setFontSizeState] = useState(() => 
    getAccessibilityPreference('fontSize', 'medium')
  );
  
  const [reducedMotion, setReducedMotion] = useState(() => 
    getAccessibilityPreference('reducedMotion', false)
  );

  // Apply accessibility settings on mount and when they change
  useEffect(() => {
    applyHighContrast(highContrast);
    saveAccessibilityPreference('highContrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    applyFontSize(fontSize);
    saveAccessibilityPreference('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    applyReducedMotion(reducedMotion);
    saveAccessibilityPreference('reducedMotion', reducedMotion);
  }, [reducedMotion]);

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  // Set font size
  const setFontSize = (size: string) => {
    setFontSizeState(size);
  };

  // Toggle reduced motion
  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        reducedMotion,
        toggleReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  
  return context;
};
