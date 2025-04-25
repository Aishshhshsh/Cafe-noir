import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Order } from "./pages/Order";
import { TrayProvider } from "./context/TrayContext";
import { MenuProvider } from "./context/MenuContext";
import { Tray } from "./components/Tray";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MenuProvider>
        <TrayProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/order" element={<Order />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Tray />
          </BrowserRouter>
        </TrayProvider>
      </MenuProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
