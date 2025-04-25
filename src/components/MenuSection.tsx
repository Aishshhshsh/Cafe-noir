import { useInView } from "react-intersection-observer";
import { MenuCard, MenuItem } from "./MenuCard";
import { useMenu } from "@/context/MenuContext";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MenuSectionProps {
  title: string;
  subtitle: string;
  items: MenuItem[];
  id: string;
}

export const MenuSection = ({ title, subtitle, items, id }: MenuSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  // Separate InView references for top and bottom rows
  const [topRowRef, topRowInView] = useInView({ 
    threshold: 0.3,
    triggerOnce: true 
  });
  
  const [bottomRowRef, bottomRowInView] = useInView({ 
    threshold: 0.3,
    triggerOnce: true 
  });
  
  const { updateTimeFromScroll } = useMenu();
  const [hasAnimated, setHasAnimated] = useState(false);
  const firstRender = useRef(true);
  
  // Add a state to force animation
  const [forceAnimate, setForceAnimate] = useState(false);
  
  // Parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const subtitleScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  
  // Update the theme based on which section is in view
  useEffect(() => {
    if (inView) {
      updateTimeFromScroll(id);
    }
  }, [inView, id, updateTimeFromScroll]);

  // Set animation flag after first viewing
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  // Add this useEffect after the other useEffects
  useEffect(() => {
    // When section comes into view, force animate the top row after a delay
    if (inView && id === 'breakfast') {
      const timer = setTimeout(() => {
        setForceAnimate(true);
      }, 300); // Short delay to ensure animation happens after scrolling
      
      return () => clearTimeout(timer);
    }
  }, [inView, id]);

  // Container variants (shared)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  // Split items into two rows
  const topRowItems = items.slice(0, Math.min(3, items.length));
  const bottomRowItems = items.length > 3 ? items.slice(3) : [];
  
  // Special styling for dinner section 
  const getDinnerTitleStyles = () => {
    if (id === 'dinner') {
      return { 
        // More vibrant gold color with higher saturation
        color: 'rgb(255, 220, 120)',
        // Enhanced glow effect with stronger shadow
        textShadow: '0 2px 10px rgba(255, 180, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
        // Slightly larger scale for more prominence
        scale: titleScale,
        // Subtle letterSpacing for elegance
        letterSpacing: '0.03em',
        // Add a subtle border-bottom for emphasis
        borderBottom: '1px solid rgba(255, 215, 0, 0.3)',
        paddingBottom: '0.1em'
      };
    }
    return { scale: titleScale };
  };
  
  // Dinner subtitle styling
  const getDinnerSubtitleStyles = () => {
    if (id === 'dinner') {
      return { 
        color: 'rgb(230, 210, 180)',
        scale: subtitleScale
      };
    }
    return { scale: subtitleScale };
  };
  
  return (
    <section 
      id={id}
      ref={(node) => {
        // Assign to both refs
        if (node) {
          // @ts-ignore - this is a valid operation
          ref(node);
          sectionRef.current = node;
        }
      }}
      className={`section ${id === 'lunch' ? 'lunch-section' : ''}`}
      data-inview={inView ? "true" : "false"}
    >
      <div className="section__container">
        <motion.header 
          className="section__header"
          style={{ 
            y: headerY,
            opacity: headerOpacity
          }}
        >
          <motion.h2 
            className="section__title font-brand"
            style={getDinnerTitleStyles()}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="section__subtitle font-body"
            style={getDinnerSubtitleStyles()}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {subtitle}
          </motion.p>
        </motion.header>
        
        <div className="card-grid">
          {/* Top Row Container */}
          <motion.div 
            ref={topRowRef}
            className="flex flex-col md:flex-row w-full gap-8 mb-8"
            initial="hidden"
            animate={(topRowInView || (forceAnimate && id === 'breakfast')) ? "visible" : "hidden"}
            variants={containerVariants}
            viewport={{ once: true, amount: 0.2 }}
          >
            {topRowItems.map((item, index) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                index={index}
                animate={hasAnimated}
                direction="left"
                isVisible={topRowInView}
              />
            ))}
          </motion.div>
          
          {/* Bottom Row Container - Only render if there are items */}
          {bottomRowItems.length > 0 && (
            <motion.div 
              ref={bottomRowRef}
              className="flex flex-col md:flex-row w-full gap-8"
              initial="hidden"
              animate={bottomRowInView ? "visible" : "hidden"}
              variants={containerVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              {bottomRowItems.map((item, index) => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                  index={index}
                  animate={hasAnimated}
                  direction="right"
                  isVisible={bottomRowInView}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
