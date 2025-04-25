import { useMenu } from "@/context/MenuContext";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const IntroSection = () => {
  const { timeOfDay } = useMenu();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, y, scale }}
    >
      <div className="absolute inset-0 transition-all duration-1000 bg-gradient-to-b from-cafe-cream to-cafe-paper" />
      
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-brand text-5xl md:text-6xl lg:text-7xl font-bold mb-6 cafe-text-shadow text-cafe-mocha">
            Café Noir
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="font-body text-xl md:text-2xl font-light mb-8 text-cafe-espresso">
            A culinary journey throughout the day
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <p className="font-body text-sm max-w-md mx-auto text-cafe-espresso/80">
            Scroll down to explore our menu, carefully crafted for each moment of the day. From sunrise to sunset, we welcome you to savor the experience.
          </p>
          
          <div className="mt-12 animate-bounce">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-cafe-mocha"
            >
              <path 
                d="M12 5V19M12 19L5 12M12 19L19 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default IntroSection;
