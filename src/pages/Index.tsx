import { useState, useEffect, useRef } from "react";
import { MenuProvider, useMenu } from "@/context/MenuContext";
import { useTray } from "@/context/TrayContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";

// Components
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import MenuSection from "@/components/MenuSection";
import MenuNav from "@/components/MenuNav";
import ChefNote from "@/components/ChefNote";
import CustomCursor from "@/components/CustomCursor";

// Data
import { breakfastItems, lunchItems, dinnerItems } from "@/data/menuData";
import { MenuItem } from "@/components/MenuCard";

const CafeNoir = () => {
  const { timeOfDay, currentTime, setCurrentTime } = useMenu();
  const { addToTray } = useTray();
  const [surpriseItem, setSurpriseItem] = useState<MenuItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const surpriseSectionRef = useRef<HTMLDivElement>(null);
  const landingSectionRef = useRef<HTMLDivElement>(null);
  
  // Handle initial setup when component mounts
  useEffect(() => {
    setMounted(true);
    
    // Reset to landing section on page refresh
    window.scrollTo(0, 0);
    
    // If we're in surprise mode but don't have an item yet, select one
    if (currentTime === 'surprise' && !surpriseItem) {
      selectSurpriseItem();
    } else {
      // Ensure we start at breakfast section on refresh
      setCurrentTime('breakfast');
    }
  }, []);
  
  // Reset surprise item when time changes (except when specifically set to surprise)
  useEffect(() => {
    if (currentTime !== 'surprise') {
      setSurpriseItem(null);
    }
  }, [currentTime]);
  
  // Scroll to surprise section whenever we have a surprise item
  useEffect(() => {
    if (currentTime === 'surprise' && surpriseItem && surpriseSectionRef.current) {
      setTimeout(() => {
        surpriseSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [surpriseItem, currentTime]);

  const selectSurpriseItem = () => {
    let allItems = [...breakfastItems, ...lunchItems, ...dinnerItems];
    let specialItems = allItems.filter(item => item.isChefSpecial);
    
    // Fallback to random item if no chef specials
    if (specialItems.length === 0) {
      specialItems = allItems;
    }
    
    if (specialItems.length > 0) {
      const randomSpecial = specialItems[Math.floor(Math.random() * specialItems.length)];
      setSurpriseItem(randomSpecial);
    }
  };

  const handleSurpriseMe = () => {
    // Set to surprise theme first
    setCurrentTime('surprise');
    // Select a surprise item
    selectSurpriseItem();
  };

  // Function to close surprise section and return to landing
  const closeSurpriseSection = () => {
    setCurrentTime('breakfast');
    landingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-1000 ${
      timeOfDay === 'morning' ? 'menu-section-morning' :
      timeOfDay === 'afternoon' ? 'menu-section-afternoon' :
      timeOfDay === 'surprise' ? 'menu-section-surprise' :
      'menu-section-evening dark'
    }`}>
      <CustomCursor />
      <Header />
      <ChefNote />
      
      <main>
        <div ref={landingSectionRef}>
          <IntroSection />
        </div>
        
        {/* Conditional surprise section */}
        {currentTime === 'surprise' && surpriseItem && (
          <motion.div 
            id="surprise-section" 
            ref={surpriseSectionRef}
            className="max-w-6xl mx-auto px-6 py-16 my-16 border-t border-b border-cafe-gold/30 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full bg-cafe-cream/80 text-cafe-mocha hover:bg-cafe-cream transition-colors z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeSurpriseSection}
              aria-label="Close surprise section"
            >
              <X size={20} />
            </motion.button>
            
            <motion.div 
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold font-brand mb-4 text-cafe-cream">Chef's Special Selection</h2>
              <p className="text-lg text-cafe-cream/90 max-w-2xl mx-auto font-body">
                Our chef has personally selected this dish for you to enjoy. A perfect embodiment of our culinary philosophy.
              </p>
            </motion.div>
            
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="menu-card surprise-badge border-cafe-gold/50 shadow-lg overflow-hidden relative bg-cafe-cream/90">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-cafe-gold/20 via-cafe-cream/10 to-cafe-gold/20 z-0 opacity-0"
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    x: ['0%', '100%'] 
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
                <div className="relative z-10 flex flex-col md:flex-row gap-6 p-8">
                  {surpriseItem.image && (
                    <motion.div 
                      className="w-full md:w-2/5"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={surpriseItem.image} 
                        alt={surpriseItem.name} 
                        className="rounded-md object-cover w-full h-60 md:h-full shadow-md"
                      />
                    </motion.div>
                  )}
                  <div className="w-full md:w-3/5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-bold font-card text-cafe-mocha">{surpriseItem.name}</h3>
                        <span className="font-accent text-xl text-cafe-gold">{surpriseItem.price}</span>
                      </div>
                      <p className="text-cafe-mocha font-body mb-6">{surpriseItem.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {surpriseItem.dietaryInfo && surpriseItem.dietaryInfo.map((tag) => (
                          <motion.span 
                            key={tag} 
                            className="text-xs px-2 py-1 rounded-full bg-cafe-cream text-cafe-mocha font-accent"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(184, 134, 11, 0.2)' }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.div 
                      className="mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <Button 
                        className="w-full md:w-auto bg-cafe-gold hover:bg-cafe-gold/80 text-cafe-mocha font-accent text-base py-6"
                        onClick={() => {
                          addToTray(surpriseItem, 1);
                          toast.success(`Added ${surpriseItem.name} to your tray!`);
                          // Close surprise section after adding to tray
                          setTimeout(() => {
                            closeSurpriseSection();
                          }, 1000);
                        }}
                      >
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ShoppingBag size={18} />
                          <span>Add to Tray</span>
                        </motion.div>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        <div>
          <MenuSection 
            id="breakfast" 
            title="Breakfast" 
            subtitle="Start your morning right with our handcrafted breakfast offerings." 
            items={breakfastItems} 
          />
          
          <MenuSection 
            id="lunch" 
            title="Lunch" 
            subtitle="Mid-day delights to fuel your afternoon." 
            items={lunchItems} 
          />
          
          <MenuSection 
            id="dinner" 
            title="Dinner" 
            subtitle="Evening elegance for a perfect night." 
            items={dinnerItems} 
          />
        </div>
      </main>
      
      <MenuNav onSurpriseMe={handleSurpriseMe} />
      
      <footer className="py-8 text-center text-sm text-muted-foreground mt-12 mb-16 md:mb-0">
        <p>© 2025 Café Noir • An immersive dining experience</p>
      </footer>
    </div>
  );
};

const Index = () => {
  return <CafeNoir />;
};

export default Index;
