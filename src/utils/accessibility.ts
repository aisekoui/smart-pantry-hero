
// Utility functions for accessibility features

// Save accessibility preferences to localStorage
export const saveAccessibilityPreference = (
  key: 'highContrast' | 'fontSize' | 'reducedMotion',
  value: string | boolean | number
) => {
  try {
    localStorage.setItem(`smartPantry_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving accessibility preference:', error);
  }
};

// Get accessibility preference from localStorage
export const getAccessibilityPreference = (
  key: 'highContrast' | 'fontSize' | 'reducedMotion',
  defaultValue: string | boolean | number
) => {
  try {
    const value = localStorage.getItem(`smartPantry_${key}`);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Error getting accessibility preference:', error);
    return defaultValue;
  }
};

// Font size options
export const fontSizeOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

// Apply font size to body element
export const applyFontSize = (size: string) => {
  const bodyEl = document.documentElement;
  
  // Remove existing font size classes
  bodyEl.classList.remove('text-sm', 'text-base', 'text-lg');
  
  // Add appropriate class based on font size
  switch (size) {
    case 'small':
      bodyEl.classList.add('text-sm');
      break;
    case 'medium':
      bodyEl.classList.add('text-base');
      break;
    case 'large':
      bodyEl.classList.add('text-lg');
      break;
    default:
      bodyEl.classList.add('text-base');
  }
};

// Apply high contrast mode
export const applyHighContrast = (enabled: boolean) => {
  if (enabled) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
};

// Apply reduced motion
export const applyReducedMotion = (enabled: boolean) => {
  if (enabled) {
    document.documentElement.classList.add('reduced-motion');
  } else {
    document.documentElement.classList.remove('reduced-motion');
  }
};
