
import { Button } from "@/components/ui/button";
import { Eye, TextSize, ZoomIn, ZoomOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "./AccessibilityProvider";
import { fontSizeOptions } from "@/utils/accessibility";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AccessibilityMenu() {
  const { 
    highContrast, 
    toggleHighContrast, 
    fontSize, 
    setFontSize,
    reducedMotion,
    toggleReducedMotion
  } = useAccessibility();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Accessibility options"
          className="rounded-full"
        >
          <Eye className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Accessibility Settings</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>High Contrast Mode</span>
              </Label>
              <Switch 
                id="high-contrast" 
                checked={highContrast} 
                onCheckedChange={toggleHighContrast} 
                aria-label="Toggle high contrast mode"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex items-center gap-2">
                <ZoomIn className="h-4 w-4" />
                <span>Reduced Motion</span>
              </Label>
              <Switch 
                id="reduced-motion" 
                checked={reducedMotion} 
                onCheckedChange={toggleReducedMotion} 
                aria-label="Toggle reduced motion"
              />
            </div>
            
            <div className="pt-2">
              <Label className="flex items-center gap-2 mb-2">
                <TextSize className="h-4 w-4" />
                <span>Text Size</span>
              </Label>
              <RadioGroup 
                value={fontSize} 
                onValueChange={setFontSize}
                className="flex items-center justify-between"
              >
                {fontSizeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-1">
                    <RadioGroupItem 
                      value={option.value} 
                      id={`font-size-${option.value}`} 
                      aria-label={`Set font size to ${option.label}`}
                    />
                    <Label htmlFor={`font-size-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
