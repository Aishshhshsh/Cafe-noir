
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`, {
      description: `Enjoy our ${newTheme === 'light' ? 'daytime' : 'evening'} ambiance.`,
      duration: 2000,
    });
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 bg-background/70 backdrop-blur border-cafe-latte/30 hover:bg-background/90 shadow-md"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-cafe-gold animate-fade-in" />
      ) : (
        <Moon className="h-5 w-5 text-cafe-espresso animate-fade-in" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
