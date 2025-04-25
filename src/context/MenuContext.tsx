import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

type MenuTime = 'breakfast' | 'lunch' | 'dinner' | 'surprise';

interface MenuContextType {
  currentTime: MenuTime;
  setCurrentTime: (time: MenuTime) => void;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'surprise';
  updateTimeFromScroll: (sectionId: string) => void;
  isTransitioning: boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTime, setCurrentTime] = useState<MenuTime>('breakfast');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'surprise'>('morning');
  const [isScrollUpdate, setIsScrollUpdate] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<NodeJS.Timeout | null>(null);

  // Update time of day based on current menu selection
  useEffect(() => {
    // Start transition
    setIsTransitioning(true);
    
    // Clear any existing transition timer
    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current);
    }
    
    // Set the new time of day
    switch (currentTime) {
      case 'breakfast':
        setTimeOfDay('morning');
        // Set light mode for breakfast
        document.documentElement.classList.remove('dark');
        break;
      case 'lunch':
        setTimeOfDay('afternoon');
        // Set light mode for lunch
        document.documentElement.classList.remove('dark');
        break;
      case 'dinner':
        setTimeOfDay('evening');
        // Set dark mode for dinner
        document.documentElement.classList.add('dark');
        break;
      case 'surprise':
        setTimeOfDay('surprise');
        // Set special theme for surprise
        document.documentElement.classList.add('dark');
        break;
    }
    
    // End transition after the duration of the CSS transition
    transitionTimer.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
    
    return () => {
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, [currentTime]);

  // On first load, set menu based on actual time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      setCurrentTime('breakfast');
    } else if (hour >= 11 && hour < 17) {
      setCurrentTime('lunch');
    } else {
      setCurrentTime('dinner');
    }
  }, []);

  // Function to update time based on scroll position with debounce
  const updateTimeFromScroll = (sectionId: string) => {
    if (isScrollUpdate || isTransitioning) return; // Prevent updates during transitions
    
    setIsScrollUpdate(true);
    
    // Use a small delay to debounce scroll updates
    const timer = setTimeout(() => {
      if (sectionId === 'breakfast' && currentTime !== 'breakfast') {
        setCurrentTime('breakfast');
      } else if (sectionId === 'lunch' && currentTime !== 'lunch') {
        setCurrentTime('lunch');
      } else if (sectionId === 'dinner' && currentTime !== 'dinner') {
        setCurrentTime('dinner');
      }
      
      // Reset flag after a longer delay to prevent rapid updates
      setTimeout(() => {
        setIsScrollUpdate(false);
      }, 500);
    }, 50);
    
    return () => clearTimeout(timer);
  };

  return (
    <MenuContext.Provider value={{ 
      currentTime, 
      setCurrentTime, 
      timeOfDay,
      updateTimeFromScroll,
      isTransitioning
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
