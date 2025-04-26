import { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "@/components/MenuCard";

interface TrayItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
}

interface TrayContextType {
  items: TrayItem[];
  addToTray: (item: MenuItem, quantity?: number, instructions?: string) => void;
  removeFromTray: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateInstructions: (itemId: string, instructions: string) => void;
  clearTray: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  toggleTray: () => void;
}

// Create context with a default value that matches the shape
const defaultContext: TrayContextType = {
  items: [],
  addToTray: () => {},
  removeFromTray: () => {},
  updateQuantity: () => {},
  updateInstructions: () => {},
  clearTray: () => {},
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
  toggleTray: () => {}
};

const TrayContext = createContext<TrayContextType>(defaultContext);

export const TrayProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<TrayItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // Add item to tray
  const addToTray = (item: MenuItem, quantity = 1, instructions = "") => {
    setItems(prev => {
      // Check if item already exists
      const existingItem = prev.find(i => i.id === item.id);
      
      if (existingItem) {
        // Update quantity if item exists
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantity, specialInstructions: instructions || i.specialInstructions } 
            : i
        );
      } else {
        // Add new item
        return [...prev, { ...item, quantity, specialInstructions: instructions }];
      }
    });
    
    // No longer automatically open tray when adding items
  };
  
  // Remove item from tray
  const removeFromTray = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromTray(itemId);
      return;
    }
    
    setItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  // Update special instructions
  const updateInstructions = (itemId: string, instructions: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, specialInstructions: instructions } : item
      )
    );
  };
  
  // Clear all items
  const clearTray = () => {
    setItems([]);
  };
  
  // Toggle tray visibility
  const toggleTray = () => {
    setIsOpen(prev => !prev);
  };
  
  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    // Handle price format - first extract number from string like '₹12.99'
    const priceString = item.price.replace(/[^0-9.]/g, '');
    const price = parseFloat(priceString) || 0; // Default to 0 if parsing fails
    return sum + (price * item.quantity);
  }, 0);
  
  return (
    <TrayContext.Provider value={{
      items,
      addToTray,
      removeFromTray,
      updateQuantity,
      updateInstructions,
      clearTray,
      totalItems,
      totalPrice,
      isOpen,
      toggleTray
    }}>
      {children}
    </TrayContext.Provider>
  );
};

export const useTray = () => {
  const context = useContext(TrayContext);
  if (!context) {
    throw new Error('useTray must be used within a TrayProvider');
  }
  return context;
}; 
