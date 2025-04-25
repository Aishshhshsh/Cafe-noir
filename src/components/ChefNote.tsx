
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChefHat } from "lucide-react";

export const ChefNote = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 left-4 z-20 rounded-full h-12 w-12 bg-background/70 backdrop-blur shadow-lg border-cafe-latte/30"
        >
          <ChefHat className="h-5 w-5" />
          <span className="sr-only">Chef's Note</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="paper-texture">
        <SheetHeader>
          <SheetTitle className="font-playfair text-2xl">A Note from the Chef</SheetTitle>
          <SheetDescription>
            Today's culinary inspiration and special recommendations
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-playfair text-lg">Today's Inspiration</h3>
            <p className="text-sm text-muted-foreground">
              Our menu today celebrates the early spring harvest with locally-sourced ingredients from our partner farms. The morning dew on fresh herbs and the gentle warmth of the sun have inspired today's creations.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-playfair text-lg">Chef's Recommendations</h3>
            <ul className="space-y-3">
              <li className="text-sm">
                <span className="font-medium">For Breakfast:</span> The Truffle Mushroom Omelette, prepared with wild mushrooms foraged just yesterday.
              </li>
              <li className="text-sm">
                <span className="font-medium">For Lunch:</span> Our Herb-Crusted Salmon pairs wonderfully with the house-made lavender lemonade.
              </li>
              <li className="text-sm">
                <span className="font-medium">For Dinner:</span> The Braised Short Rib is particularly exceptional today, slow-cooked for 12 hours.
              </li>
            </ul>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm italic text-muted-foreground">
              "Cooking is an art, but all art requires knowing something about the techniques and materials" <br/>
              — Nathan Myhrvold
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChefNote;
