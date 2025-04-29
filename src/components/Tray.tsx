import { useTray } from "@/context/TrayContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag, Plus, Minus, ChevronRight, Trash2, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Tray = () => {
  const { items, removeFromTray, updateQuantity, clearTray, totalItems, totalPrice, isOpen, toggleTray } = useTray();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  
  const handleCheckout = () => {
    toggleTray();
    navigate("/order");
    toast.success("Proceeding to checkout", {
      description: "Almost there! Just a few more steps to complete your order.",
      duration: 3000,
    });
  };
const handlePlaceOrder = async () => {
  const orderData = {
    customerName: enteredName, // from input field
    items: cartItems, // from tray context or state
    totalPrice: calculateTotal(cartItems),
  };

  await fetch('http://localhost:3001/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });
};

  // Animation variants
  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      x: "100%",
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  return (
    <>
      {/* Tray toggle button - desktop only */}
      <motion.button
        className="fixed md:bottom-6 md:right-6 hidden md:flex z-50 p-4 rounded-full shadow-lg bg-cafe-mocha text-cafe-cream hover:bg-cafe-espresso focus:outline-none focus:ring-2 focus:ring-cafe-gold/50 transition-shadow duration-300"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={toggleTray}
        aria-label="Open tray"
      >
        <div className="relative">
          <ShoppingBag size={24} />
          
          {totalItems > 0 && (
            <motion.div 
              className="absolute -top-2 -right-2 bg-cafe-gold text-cafe-mocha w-5 h-5 rounded-full flex items-center justify-center text-xs font-accent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={totalItems}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
              }}
            >
              {totalItems}
            </motion.div>
          )}
        </div>
      </motion.button>
      
      {/* Tray overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleTray}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      
      {/* Tray panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full md:w-[420px] z-50 shadow-xl bg-cafe-cream text-cafe-mocha"
            variants={prefersReducedMotion ? {} : drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              backgroundImage: "url('/paper-texture.png')",
              backgroundBlendMode: "multiply"
            }}
          >
            <div className="flex flex-col h-full">
              <motion.div 
                className="p-5 border-b border-cafe-gold/20 flex justify-between items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h2 className="font-brand text-3xl text-cafe-mocha">Your Tray</h2>
                <motion.button 
                  onClick={toggleTray} 
                  className="p-2 rounded-full hover:bg-cafe-paper transition-colors"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close tray"
                >
                  <X size={20} />
                </motion.button>
              </motion.div>
              
              {totalItems === 0 ? (
                <motion.div 
                  className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatType: "reverse"  
                      }}
                      className="mb-4 mx-auto w-fit"
                    >
                      <Coffee size={70} className="text-cafe-mocha/30" />
                    </motion.div>
                    <h3 className="font-brand text-2xl mb-3 text-cafe-mocha">Your tray is empty</h3>
                    <p className="font-body text-sm text-cafe-mocha/70 max-w-xs mx-auto">
                      Add some delicious items from our menu to get started on your culinary journey
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button 
                        onClick={toggleTray}
                        className="mt-8 font-accent bg-cafe-mocha hover:bg-cafe-espresso text-cafe-cream"
                        size="lg"
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2"
                        >
                          Browse Menu
                          <ChevronRight size={16} />
                        </motion.span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div 
                          key={item.id}
                          variants={prefersReducedMotion ? {} : itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="mb-5 p-5 rounded-lg bg-cafe-paper border border-cafe-gold/20 shadow-sm relative overflow-hidden group"
                          layout
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cafe-gold/5 to-transparent"
                            initial={{ x: '-100%', opacity: 0 }}
                            whileHover={{ x: '100%', opacity: 1 }}
                            transition={{ duration: 0.7 }}
                          />
                          
                          <div className="flex justify-between relative z-10">
                            <div>
                              <h3 className="font-card text-lg font-medium mb-1 text-cafe-mocha">{item.name}</h3>
                              <p className="font-accent text-base text-cafe-gold">{item.price}</p>
                            </div>
                            
                            <motion.button 
                              onClick={() => {
                                removeFromTray(item.id);
                                toast.info(`Removed ${item.name} from your tray`);
                              }}
                              className="opacity-50 hover:opacity-100 transition-opacity text-cafe-mocha/70 hover:text-cafe-mocha"
                              whileHover={{ scale: 1.1, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X size={18} />
                            </motion.button>
                          </div>
                          
                          {item.specialInstructions && (
                            <motion.p 
                              className="text-sm font-body mt-3 italic text-cafe-mocha/70 border-l-2 pl-3 border-cafe-gold/30 bg-cafe-gold/5 py-2 pr-2 rounded-r-sm"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                            >
                              {item.specialInstructions}
                            </motion.p>
                          )}
                          
                          <div className="flex items-center mt-4">
                            <motion.button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 rounded-full bg-cafe-paper hover:bg-cafe-gold/10 border border-cafe-gold/20 text-cafe-mocha"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus size={14} />
                            </motion.button>
                            
                            <motion.span 
                              key={item.quantity}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="font-accent text-lg mx-4 min-w-[1.5rem] text-center"
                            >
                              {item.quantity}
                            </motion.span>
                            
                            <motion.button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 rounded-full bg-cafe-paper hover:bg-cafe-gold/10 border border-cafe-gold/20 text-cafe-mocha"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus size={14} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <motion.div 
                    className="p-5 border-t border-cafe-gold/20 bg-cafe-paper/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-body text-cafe-mocha/80">Subtotal</span>
                      <motion.span 
                        className="font-brand text-xl text-cafe-mocha"
                        key={totalPrice}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {"₹" + totalPrice.toFixed(2)}
                      </motion.span>
                    </div>
                    
                    <div className="flex gap-3 mt-5">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            clearTray();
                            toast.info("Your tray has been cleared");
                          }}
                          className="font-accent text-sm flex items-center gap-1 bg-cafe-cream text-cafe-mocha border-cafe-gold/30 hover:bg-cafe-gold/10 hover:text-cafe-mocha"
                        >
                          <Trash2 size={14} />
                          Clear
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        className="flex-1"
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          onClick={handleCheckout}
                          className="w-full font-brand flex items-center justify-center gap-2 text-base bg-cafe-mocha hover:bg-cafe-espresso text-cafe-cream"
                          size="lg"
                        >
                          Checkout
                          <ChevronRight size={16} />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 
