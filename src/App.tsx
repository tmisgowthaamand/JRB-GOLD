import { useEffect, Suspense } from 'react';
import { Toaster as SonarToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Location from './pages/Location';
import Schemes from './pages/Schemes';
import Consultation from './pages/Consultation';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import TermsConditions from './pages/policies/TermsConditions';
import ShippingPolicy from './pages/policies/ShippingPolicy';
import CancellationRefund from './pages/policies/CancellationRefund';
import { CartProvider } from './contexts/CartContext';
import NotFound from './pages/NotFound';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Error Boundary Component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <SonarToaster />
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-background">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/shipping-policy" element={<ShippingPolicy />} />
                  <Route path="/cancellation-refund" element={<CancellationRefund />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/schemes" element={<Schemes />} />
                  <Route path="/consultation" element={<Consultation />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Sonner />
              </div>
            </Router>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
