import { useTray } from "@/context/TrayContext";
import { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import React from "react";

// Custom DialogContent without default close button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
CustomDialogContent.displayName = "CustomDialogContent"

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  ingredients: string[];
  image?: string;
  isChefSpecial?: boolean;
  dietaryInfo?: string[];
  preparation?: string;
}

interface MenuCardProps {
  item: MenuItem;
  index: number;
  animate?: boolean;
  direction?: "left" | "right";
  isVisible?: boolean;
}

// Helper function to generate image path from item name
const getImagePath = (itemName: string): string => {
  // Extract first two words and convert to camelCase
  const words = itemName.split(' ').slice(0, 2).map((word, i) => {
    return i === 0 
      ? word.toLowerCase() 
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return `/images/${words.join('')}.png`;
};

export const MenuCard = ({ 
  item, 
  index, 
  animate = true, 
  direction = "left",
  isVisible = false 
}: MenuCardProps) => {
  const { addToTray } = useTray();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [shouldAnimateText, setShouldAnimateText] = useState(false);
  
  // Use provided image or generate from name
  const imagePath = item.image || getImagePath(item.name);

  // Start text animation after card is visible with a delay
  useEffect(() => {
    // Special handling for breakfast section items
    const isBreakfastItem = document.getElementById(`item-${item.id}`)?.closest('#breakfast') !== null;
    
    if (isVisible || (isBreakfastItem && index < 3)) {
      const timer = setTimeout(() => {
        setShouldAnimateText(true);
      }, 800 + (index * 100));
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, index, item.id]);

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      x: direction === "left" ? -80 : 80,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5
      }
    }
  };

  // Description text animation variants
  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  // Split description into words for staggered animation
  const words = item.description.split(' ');
  
  // Add animation for add to tray button
  const handleAddToTray = () => {
    setIsAdding(true);
    addToTray(item, quantity, instructions);
    toast.success(`Added ${item.name} to your tray!`);
    
    // Reset and close dialog after adding
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
      setInstructions("");
      setIsOpen(false);
    }, 800);
  };

  return (
    <>
      <motion.div 
        className="card-grid__item w-full"
        variants={cardVariants}
        viewport={{ once: true }}
      >
        <div className="card-wrapper">
          <button
            id={`item-${item.id}`}
            className={`card ${item.isChefSpecial ? 'card--special' : ''}`}
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
          >
            <div className="card__image-container">
              <img 
                src={imagePath} 
                alt={item.name} 
                className="card__image"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  (e.target as HTMLImageElement).src = '/images/placeholder-dish.jpg';
                }}
              />
              <div className="card__image-overlay"></div>
            </div>
            
            <div className="card__content">
              <div className="card__header">
                <h3 className="card__title font-card">{item.name}</h3>
                <span className="card__price font-ui">{item.price}</span>
              </div>
              
              <motion.div 
                className="card__description overflow-hidden font-body"
                initial="hidden"
                animate={shouldAnimateText ? "visible" : "hidden"}
                variants={containerVariants}
              >
                {words.map((word, idx) => (
                  <motion.span 
                    key={idx} 
                    className="inline-block mr-1"
                    variants={wordVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
              
              <div className="card__footer">
                {item.isChefSpecial && (
                  <Badge variant="outline" className="card__badge font-ui">
                    Chef's Pick
                  </Badge>
                )}
                
                <div className="card__tags">
                  {item.ingredients.slice(0, 3).map((ingredient, idx) => (
                    <Badge key={idx} variant="outline" className="card__tag font-ui">
                      {ingredient}
                    </Badge>
                  ))}
                  {item.ingredients.length > 3 && (
                    <span className="card__more">+{item.ingredients.length - 3}</span>
                  )}
                </div>
                
                {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                  <div className="card__dietary">
                    {item.dietaryInfo.map((info, idx) => (
                      <Badge key={idx} variant="secondary" className="card__tag">
                        {info}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Add a subtle "Add to Tray" hint */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-70 transition-opacity">
                <ShoppingBag size={16} />
              </div>
            </div>
          </button>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <CustomDialogContent className="max-w-4xl sm:w-[95%] md:w-[85%] lg:w-[75%] mx-auto rounded-xl paper-texture p-0 overflow-hidden shadow-xl border-0">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-2/5 h-full">
              <div className="h-48 md:h-full relative">
                <img 
                  src={imagePath} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    (e.target as HTMLImageElement).src = '/images/placeholder-dish.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-70"></div>
                {item.isChefSpecial && (
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-cafe-gold/80 text-cafe-espresso dark:text-cafe-espresso border-cafe-gold/30 text-xs">
                    Chef's Special
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="w-full md:w-3/5 p-5 md:p-6 bg-background/95 flex flex-col">
              <DialogHeader className="pb-2 space-y-0">
                <DialogTitle className="font-playfair text-xl">{item.name}</DialogTitle>
                <div className="flex justify-between items-center">
                  <span className="text-cafe-espresso dark:text-cafe-cream font-medium text-lg">{item.price}</span>
                </div>
                <DialogDescription className="text-sm mt-1 leading-relaxed">
                  {item.description}
                </DialogDescription>
              </DialogHeader>
              
              <Separator className="my-3" />
              
              <div className="space-y-3 text-sm flex-grow">
                <div>
                  <h4 className="text-xs font-medium mb-1.5 text-cafe-espresso dark:text-cafe-cream">Ingredients</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ingredient, idx) => (
                      <Badge key={idx} variant="outline" className="bg-background/50 dark:bg-background/20 text-xs py-0.5 px-2 rounded-full">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium mb-1.5 text-cafe-espresso dark:text-cafe-cream">Dietary Information</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.dietaryInfo.map((info, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs py-0.5 px-2 rounded-full">
                          {info}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-auto pt-3">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center bg-muted/50 rounded-full p-1">
                      <button 
                        className="bg-secondary/40 hover:bg-secondary/60 p-1.5 rounded-full transition-colors"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className="font-accent mx-4 text-base">
                        {quantity}
                      </span>
                      
                      <button 
                        className="bg-secondary/40 hover:bg-secondary/60 p-1.5 rounded-full transition-colors"
                        onClick={() => setQuantity(prev => prev + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex-grow">
                      <textarea
                        className="w-full p-2 text-xs bg-muted/50 border border-border rounded-md font-body h-9 resize-none"
                        placeholder="Special requests..."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddToTray} 
                    className="w-full font-accent tracking-wider text-sm py-2 rounded-full bg-primary hover:bg-primary/90 transition-colors"
                    disabled={isAdding}
                  >
                    {isAdding ? 
                      "Added to Tray!" : 
                      <div className="flex items-center justify-center gap-1.5"><ShoppingBag size={16} /> Add to Tray • {item.price}</div>
                    }
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogPrimitive.Close className="absolute right-3 top-3 rounded-full p-1.5 bg-black/30 text-white opacity-80 backdrop-blur-sm hover:opacity-100 hover:bg-black/40 transition-all focus:outline-none focus:ring-1 focus:ring-white/80 disabled:pointer-events-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </CustomDialogContent>
      </Dialog>
    </>
  );
};

export default MenuCard;
