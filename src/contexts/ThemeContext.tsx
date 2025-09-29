import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'sakura' | 'corporate' | 'lavender' | 'midnight' | 'neutral';

export interface ThemeConfig {
  id: Theme;
  name: string;
  description: string;
  primaryColor: string;
  isDark?: boolean;
}

export const themes: ThemeConfig[] = [
  {
    id: 'sakura',
    name: 'Sakura',
    description: 'Cherry blossom pink/purple theme',
    primaryColor: 'hsl(340, 82%, 52%)',
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    description: 'Professional navy and steel blue',
    primaryColor: 'hsl(221.35, 78.78%, 48.04%)',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    description: 'Light theme with elegant purple accents',
    primaryColor: 'hsl(263, 70%, 50%)',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Dark theme with purple accents',
    primaryColor: 'hsl(263, 70%, 50%)',
    isDark: true,
  },
  {
    id: 'neutral',
    name: 'Neutral',
    description: 'Clean grays with subtle color hints',
    primaryColor: 'hsl(240, 5.9%, 10%)',
  },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  currentThemeConfig: ThemeConfig;
  shadowIntensity: 'subtle' | 'normal' | 'strong';
  setShadowIntensity: (intensity: 'subtle' | 'normal' | 'strong') => void;
  borderRadius: 'sharp' | 'normal' | 'rounded';
  setBorderRadius: (radius: 'sharp' | 'normal' | 'rounded') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('sakura-theme');
    return (saved as Theme) || 'sakura';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('sakura-dark-mode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Default to dark mode for midnight theme
    return theme === 'midnight';
  });

  const [shadowIntensity, setShadowIntensity] = useState<'subtle' | 'normal' | 'strong'>(() => {
    const saved = localStorage.getItem('sakura-shadow-intensity');
    return (saved as 'subtle' | 'normal' | 'strong') || 'normal';
  });

  const [borderRadius, setBorderRadius] = useState<'sharp' | 'normal' | 'rounded'>(() => {
    const saved = localStorage.getItem('sakura-border-radius');
    return (saved as 'sharp' | 'normal' | 'rounded') || 'normal';
  });

  const currentThemeConfig = themes.find(t => t.id === theme) || themes[0];

  // Apply theme attributes to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Set theme data attribute
    root.setAttribute('data-theme', theme);
    
    // Set shadow intensity attribute
    root.setAttribute('data-shadow-intensity', shadowIntensity);
    
    // Set border radius attribute
    root.setAttribute('data-border-radius', borderRadius);
    
    // Handle dark mode
    if (isDarkMode || theme === 'midnight') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('sakura-theme', theme);
    localStorage.setItem('sakura-dark-mode', JSON.stringify(isDarkMode));
    localStorage.setItem('sakura-shadow-intensity', shadowIntensity);
    localStorage.setItem('sakura-border-radius', borderRadius);
  }, [theme, isDarkMode, shadowIntensity, borderRadius]);

  // Auto-enable dark mode for midnight theme
  useEffect(() => {
    if (theme === 'midnight') {
      setIsDarkMode(true);
    }
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    isDarkMode,
    setIsDarkMode,
    currentThemeConfig,
    shadowIntensity,
    setShadowIntensity,
    borderRadius,
    setBorderRadius,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 