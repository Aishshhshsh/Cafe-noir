import { Coffee, Sun, Moon, Sparkles } from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import { Button } from "@/components/ui/button";

interface MenuNavProps {
  onSurpriseMe: () => void;
}

export const MenuNav = ({ onSurpriseMe }: MenuNavProps) => {
  const { currentTime, setCurrentTime } = useMenu();

  const handleTimeChange = (time: 'breakfast' | 'lunch' | 'dinner') => {
    setCurrentTime(time);
    const element = document.getElementById(time);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSurprise = () => {
    onSurpriseMe();
    // Removed toast notification here
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-30 hidden md:block">
        <div className="bg-background/80 backdrop-blur-md rounded-full border border-border px-1.5 py-1.5 shadow-lg flex items-center space-x-1">
          <Button 
            variant={currentTime === 'breakfast' ? "default" : "ghost"} 
            size="sm" 
            className="rounded-full flex items-center gap-1.5"
            onClick={() => handleTimeChange('breakfast')}
          >
            <Sun className="h-4 w-4" />
            <span>Breakfast</span>
          </Button>
          <Button 
            variant={currentTime === 'lunch' ? "default" : "ghost"} 
            size="sm" 
            className="rounded-full flex items-center gap-1.5"
            onClick={() => handleTimeChange('lunch')}
          >
            <Coffee className="h-4 w-4" />
            <span>Lunch</span>
          </Button>
          <Button 
            variant={currentTime === 'dinner' ? "default" : "ghost"} 
            size="sm" 
            className="rounded-full flex items-center gap-1.5"
            onClick={() => handleTimeChange('dinner')}
          >
            <Moon className="h-4 w-4" />
            <span>Dinner</span>
          </Button>
          <Button 
            variant={currentTime === 'surprise' ? "default" : "ghost"} 
            size="sm" 
            className="rounded-full flex items-center gap-1.5"
            onClick={handleSurprise}
          >
            <Sparkles className="h-4 w-4" />
            <span>Surprise Me</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <button 
          className={`flex flex-col items-center justify-center ${currentTime === 'breakfast' ? 'text-cafe-espresso dark:text-cafe-cream' : 'text-muted-foreground'}`}
          onClick={() => handleTimeChange('breakfast')}
        >
          <Sun className="h-5 w-5 mb-1" />
          <span className="text-xs">Breakfast</span>
        </button>
        <button 
          className={`flex flex-col items-center justify-center ${currentTime === 'lunch' ? 'text-cafe-gold dark:text-cafe-gold' : 'text-muted-foreground'}`}
          onClick={() => handleTimeChange('lunch')}
        >
          <Coffee className="h-5 w-5 mb-1" />
          <span className="text-xs">Lunch</span>
        </button>
        <button 
          className={`flex flex-col items-center justify-center ${currentTime === 'dinner' ? 'text-cafe-espresso dark:text-cafe-cream' : 'text-muted-foreground'}`}
          onClick={() => handleTimeChange('dinner')}
        >
          <Moon className="h-5 w-5 mb-1" />
          <span className="text-xs">Dinner</span>
        </button>
        <button 
          className={`flex flex-col items-center justify-center ${currentTime === 'surprise' ? 'text-cafe-espresso dark:text-cafe-gold' : 'text-muted-foreground'}`}
          onClick={handleSurprise}
        >
          <Sparkles className="h-5 w-5 mb-1" />
          <span className="text-xs">Surprise</span>
        </button>
      </div>
    </>
  );
};

export default MenuNav;
