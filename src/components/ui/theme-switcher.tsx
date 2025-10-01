import React from 'react';
import { Check, Palette, Moon, Sun, Settings } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Switch } from './switch';
import { Separator } from './separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { useTheme, themes, type Theme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemePreviewProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, isSelected, onClick }) => {
  const themeConfig = themes.find(t => t.id === theme)!;
  
  // Get theme colors for preview
  const getThemeColors = (themeId: Theme) => {
    switch (themeId) {
      case 'sakura':
        return {
          primary: 'hsl(340, 82%, 52%)',
          secondary: 'hsl(280, 60%, 60%)',
          background: 'hsl(0, 0%, 100%)',
          accent: 'hsl(340, 82%, 65%)',
        };
      case 'corporate':
        return {
          primary: 'hsl(221.35, 78.78%, 48.04%)',
          secondary: 'hsl(221.35, 70%, 55%)',
          background: 'hsl(0, 0%, 100%)',
          accent: 'hsl(221.35, 78.78%, 58.04%)',
        };
      case 'lavender':
        return {
          primary: 'hsl(263, 70%, 50%)',
          secondary: 'hsl(280, 60%, 60%)',
          background: 'hsl(0, 0%, 100%)',
          accent: 'hsl(280, 60%, 85%)',
        };
      case 'midnight':
        return {
          primary: 'hsl(263, 70%, 50%)',
          secondary: 'hsl(280, 60%, 60%)',
          background: 'hsl(240, 10%, 3.9%)',
          accent: 'hsl(263, 70%, 60%)',
        };
      case 'neutral':
        return {
          primary: 'hsl(240, 5.9%, 10%)',
          secondary: 'hsl(240, 3.8%, 46.1%)',
          background: 'hsl(0, 0%, 100%)',
          accent: 'hsl(240, 5.9%, 20%)',
        };
      case 'huemint':
        return {
          primary: 'hsl(0, 100%, 50%)',
          secondary: 'hsl(0, 0%, 24%)',
          background: 'hsl(0, 0%, 100%)',
          accent: 'hsl(0, 100%, 60%)',
        };
      case 'dentsu':
        return {
          primary: 'hsl(0, 0%, 0%)',
          secondary: 'hsl(174, 64%, 47%)',
          background: 'hsl(200, 15%, 92%)',
          accent: 'hsl(14, 100%, 57%)',
        };
      default:
        return {
          primary: 'hsl(340, 82%, 52%)',
          secondary: 'hsl(280, 60%, 60%)',
          background: 'hsl(0, 0%, 100%)',
          accent: 'hsl(340, 82%, 65%)',
        };
    }
  };

  const colors = getThemeColors(theme);

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:scale-105 relative overflow-hidden",
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-medium text-sm">{themeConfig.name}</h4>
            <p className="text-xs text-muted-foreground">{themeConfig.description}</p>
          </div>
          {isSelected && (
            <div className="flex-shrink-0">
              <Check className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
        
        {/* Color Preview */}
        <div className="flex gap-1 mb-2">
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: colors.primary }}
          />
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: colors.secondary }}
          />
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: colors.accent }}
          />
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: colors.background }}
          />
        </div>

        {/* Mini UI Preview */}
        <div 
          className="h-12 rounded border border-border p-2 text-xs"
          style={{ backgroundColor: colors.background }}
        >
          <div className="flex items-center gap-1 mb-1">
            <div 
              className="w-2 h-2 rounded"
              style={{ backgroundColor: colors.primary }}
            />
            <div 
              className="w-8 h-1 rounded"
              style={{ backgroundColor: colors.secondary }}
            />
          </div>
          <div className="flex gap-1">
            <div 
              className="w-4 h-1 rounded"
              style={{ backgroundColor: colors.accent }}
            />
            <div 
              className="w-6 h-1 rounded"
              style={{ backgroundColor: colors.secondary }}
            />
          </div>
        </div>

        {themeConfig.isDark && (
          <Badge variant="secondary" className="mt-2 text-xs">
            Dark Theme
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export const ThemeSwitcher: React.FC = () => {
  const { 
    theme, 
    setTheme, 
    isDarkMode, 
    setIsDarkMode, 
    currentThemeConfig,
    shadowIntensity,
    setShadowIntensity,
    borderRadius,
    setBorderRadius
  } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">{currentThemeConfig.name}</span>
          <span className="sm:hidden">Theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Choose Theme</h3>
            <Badge variant="outline" className="text-xs">
              {themes.length} themes
            </Badge>
          </div>

          {/* Dark Mode Toggle (except for midnight theme) */}
          {theme !== 'midnight' && (
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                {isDarkMode ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          )}

          {/* Theme Grid */}
          <div className="grid grid-cols-2 gap-3">
            {themes.map((themeConfig) => (
              <ThemePreview
                key={themeConfig.id}
                theme={themeConfig.id}
                isSelected={theme === themeConfig.id}
                onClick={() => setTheme(themeConfig.id)}
              />
            ))}
          </div>

          <Separator />

          {/* Design Configuration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <h4 className="font-medium text-sm">Design Settings</h4>
            </div>

            <div className="flex flex-row gap-3 w-full">
              {/* Shadow Intensity */}
              <div className="flex-1 min-w-0 space-y-2">
                <label className="text-xs font-medium text-muted-foreground block">
                  Shadow Intensity
                </label>
                <Select value={shadowIntensity} onValueChange={setShadowIntensity}>
                  <SelectTrigger className="h-8 text-xs w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subtle">Subtle</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="strong">Strong</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Border Radius */}
              <div className="flex-1 min-w-0 space-y-2">
                <label className="text-xs font-medium text-muted-foreground block">
                  Border Radius
                </label>
                <Select value={borderRadius} onValueChange={setBorderRadius}>
                  <SelectTrigger className="h-8 text-xs w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sharp">Sharp</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="rounded">Rounded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preview of current settings */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground mb-2">Preview:</div>
              <div 
                className={cn(
                  "h-8 bg-primary/10 border border-primary/20",
                  shadowIntensity === 'subtle' && "shadow-sm",
                  shadowIntensity === 'normal' && "shadow-md", 
                  shadowIntensity === 'strong' && "shadow-lg",
                  borderRadius === 'sharp' && "rounded-sm",
                  borderRadius === 'normal' && "rounded-md",
                  borderRadius === 'rounded' && "rounded-lg"
                )}
                style={{
                  boxShadow: shadowIntensity === 'subtle' 
                    ? '0 1px 2px 0 hsl(var(--primary) / 0.1)' 
                    : shadowIntensity === 'strong'
                    ? '0 6px 12px -2px hsl(var(--primary) / 0.2)'
                    : '0 4px 6px -1px hsl(var(--primary) / 0.15)'
                }}
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            All preferences are saved automatically
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}; 