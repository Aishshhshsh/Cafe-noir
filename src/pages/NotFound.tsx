
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cafe-cream paper-texture">
      <div className="text-center max-w-md px-4">
        <Coffee className="mx-auto h-12 w-12 text-cafe-espresso mb-6" />
        <h1 className="font-playfair text-4xl font-bold mb-4 text-cafe-espresso">
          Page Not Found
        </h1>
        <p className="text-cafe-espresso/80 mb-8">
          It seems the page you're looking for has disappeared like the steam from a fresh cup of coffee.
        </p>
        <Button asChild>
          <a href="/" className="bg-cafe-espresso hover:bg-cafe-mocha text-cafe-cream">
            Return to Café
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
