import { Coffee, CoffeeIcon, ShoppingBag } from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import { useTray } from "@/context/TrayContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Header = () => {
  const { timeOfDay } = useMenu();
  const { toggleTray, totalItems } = useTray();
  const [scrolled, setScrolled] = useState(false);
  const [steamElements, setSteamElements] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Create multiple steam elements with random delays for the left coffee icon
    const newSteamElements = Array.from({ length: 3 }, (_, i) => (
      <div 
        key={i} 
        className={`coffee-steam ${
          timeOfDay === 'morning' ? 'menu-section-morning' : 
          timeOfDay === 'afternoon' ? 'menu-section-afternoon' : ''
        }`}
        style={{ 
          left: `${50 + (i - 1) * 8}%`,
          animationDelay: `${i * 0.4}s`,
          animation: `${
            timeOfDay === 'morning' ? 'steam-light' : 
            timeOfDay === 'afternoon' ? 'steam-afternoon' : 'steam'
          } 2s ease-out infinite`
        }} 
      />
    ));
    
    setSteamElements(newSteamElements);
  }, [timeOfDay]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-3 bg-background/80 backdrop-blur shadow-sm' : 'py-6'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Coffee className={`w-6 h-6 ${
              timeOfDay === 'morning' ? 'text-cafe-espresso' :
              timeOfDay === 'afternoon' ? 'text-cafe-gold' :
              timeOfDay === 'evening' ? 'text-cafe-gold' : 'text-cafe-espresso'
            }`} />
            {steamElements}
          </div>
          <h1 className={`text-xl md:text-2xl font-playfair font-bold tracking-tight ${scrolled ? 'text-cafe-espresso dark:text-cafe-cream' : timeOfDay === 'evening' ? 'text-cafe-cream' : 'text-cafe-mocha'}`}>
            Café Noir
          </h1>
        </div>
        
        {/* Mobile Tray Button */}
        <motion.button
          className="md:hidden relative rounded-full p-2 hover:bg-cafe-paper/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTray}
          aria-label="Open tray"
        >
          <ShoppingBag 
            className={`w-5 h-5 ${
              timeOfDay === 'morning' || timeOfDay === 'afternoon' ? 'text-cafe-mocha' : 'text-cafe-cream'
            }`} 
          />
          {totalItems > 0 && (
            <motion.div 
              className="absolute -top-1 -right-1 bg-cafe-gold text-cafe-mocha w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-accent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={totalItems}
            >
              {totalItems}
            </motion.div>
          )}
        </motion.button>
        
        <nav className="hidden md:flex items-center space-x-6">
          <MenuTimeIndicator />
        </nav>
      </div>
    </header>
  );
};

const MenuTimeIndicator = () => {
  const { timeOfDay } = useMenu();
  
  return (
    <div className="flex items-center">
      <div className="relative mr-3">
        <CoffeeIcon className={`w-5 h-5 ${timeOfDay === 'evening' || timeOfDay === 'surprise' ? 'text-cafe-gold' : 'text-cafe-espresso dark:text-cafe-latte'}`} />
      </div>
      <span className={`font-playfair italic text-sm ${
        timeOfDay === 'morning' ? 'text-cafe-espresso dark:text-cafe-cream' :
        timeOfDay === 'afternoon' ? 'text-cafe-gold dark:text-cafe-gold' :
        timeOfDay === 'surprise' ? 'text-cafe-gold' :
        'text-cafe-cream'
      }`}>
        {timeOfDay === 'morning' ? 'Good Morning' : 
         timeOfDay === 'afternoon' ? 'Good Afternoon' : 
         timeOfDay === 'surprise' ? 'Chef\'s Choice' :
         'Good Evening'}
      </span>
    </div>
  );
};

export default Header;
