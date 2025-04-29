import { useTray } from "@/context/TrayContext";
import { useMenu } from "@/context/MenuContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Send, Clock, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

export const Order = () => {
  const { items, totalItems, totalPrice, clearTray } = useTray();
  const { timeOfDay } = useMenu();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pickupTime: "",
    paymentMethod: "cash",
    notes: ""
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Reset cart after order
    setTimeout(() => {
      clearTray();
    }, 1000);
  };
  
  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  if (totalItems === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-title text-3xl mb-4">Your tray is empty</h1>
          <p className="font-body mb-6 max-w-md mx-auto">
            You need to add items to your tray before checking out.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="font-accent"
          >
            <ChevronLeft size={16} className="mr-2" />
            Return to Menu
          </Button>
        </motion.div>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h1 className="font-title text-3xl mb-2">Order Confirmed!</h1>
            <p className="font-body opacity-80">
              Thank you for your order, {formData.name}. We'll have it ready for you.
            </p>
          </div>
          
          <div className="bg-background/30 rounded-lg p-4 mb-6 border border-border/40">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} />
              <span className="font-accent">
                {formData.pickupTime || "As soon as possible"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="font-body text-sm">
                Café Noir, 123 Espresso Lane
              </span>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate("/")}
            className="font-accent"
          >
            Return to Menu
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className={min-h-screen ${
      timeOfDay === 'evening' ? 'bg-cafe-mocha text-cafe-cream' : 'bg-cafe-cream text-cafe-mocha'
    }}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ChevronLeft size={20} />
          </Button>
          <h1 className="font-title text-3xl">Complete Your Order</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-background/30 rounded-lg p-4 mb-6 border border-border/40">
              <h2 className="font-card text-xl mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex gap-2">
                      <span className="font-accent">{item.quantity}×</span>
                      <span className="font-body">{item.name}</span>
                    </div>
                    <span className="font-accent">
                      ₹{(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-border/40">
                <div className="flex justify-between font-body">
                  <span>Subtotal</span>
                  <span>{"₹" + totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body mt-1">
                  <span>Service Fee</span>
                  <span>{"₹" + (totalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-accent text-lg mt-4">
                  <span>Total</span>
                  <span>{"₹" + (totalPrice * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <motion.form 
              onSubmit={handleSubmit}
              className="bg-background/30 rounded-lg p-4 border border-border/40"
            >
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="font-card text-xl mb-4">Your Information</h2>
                    
                    <div>
                      <label className="font-accent text-sm block mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-background/50 border border-border rounded-md font-body"
                      />
                    </div>
                    
                    <div>
                      <label className="font-accent text-sm block mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-background/50 border border-border rounded-md font-body"
                      />
                    </div>
                    
                    <div>
                      <label className="font-accent text-sm block mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-background/50 border border-border rounded-md font-body"
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      onClick={goToNextStep}
                      className="w-full mt-4 font-accent"
                    >
                      Continue
                    </Button>
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="font-card text-xl mb-4">Pickup Details</h2>
                    
                    <div>
                      <label className="font-accent text-sm block mb-2">Pickup Time</label>
                      <select
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        className="w-full p-2 bg-background/50 border border-border rounded-md font-body"
                      >
                        <option value="">As soon as possible</option>
                        <option value="30min">In 30 minutes</option>
                        <option value="1hour">In 1 hour</option>
                        <option value="2hours">In 2 hours</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="font-accent text-sm block mb-2">Payment Method</label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full p-2 bg-background/50 border border-border rounded-md font-body"
                      >
                        <option value="cash">Cash on Pickup</option>
                        <option value="card">Pay Now by Card</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="font-accent text-sm block mb-2">Additional Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full p-2 bg-background/50 border border-border rounded-md font-body"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={goToPreviousStep}
                        className="font-accent"
                      >
                        Back
                      </Button>
                      
                      <Button 
                        type="submit"
                        className="flex-1 font-accent"
                      >
                        Place Order
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}; 
