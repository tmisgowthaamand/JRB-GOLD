import { useState, useEffect, Suspense, lazy } from 'react';
import { Toaster as SonarToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { CartProvider } from './contexts/CartContext';

// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Location = lazy(() => import('./pages/Location'));
const Schemes = lazy(() => import('./pages/Schemes'));
const Consultation = lazy(() => import('./pages/Consultation'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Checkout = lazy(() => import('./pages/Checkout'));
const PrivacyPolicy = lazy(() => import('./pages/policies/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/policies/TermsConditions'));
const ShippingPolicy = lazy(() => import('./pages/policies/ShippingPolicy'));
const CancellationRefund = lazy(() => import('./pages/policies/CancellationRefund'));

// Error boundary fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-background p-4">
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

// Loading component
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Wrapper component for routes with Suspense and ErrorBoundary
const RouteElement = ({ element: Element }: { element: React.ComponentType }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<LoadingSpinner />}>
      <Element />
    </Suspense>
  </ErrorBoundary>
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <SonarToaster />
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<RouteElement element={Index} />} />
                <Route path="/shop" element={<RouteElement element={Shop} />} />
                <Route path="/privacy-policy" element={<RouteElement element={PrivacyPolicy} />} />
                <Route path="/terms-conditions" element={<RouteElement element={TermsConditions} />} />
                <Route path="/shipping-policy" element={<RouteElement element={ShippingPolicy} />} />
                <Route path="/cancellation-refund" element={<RouteElement element={CancellationRefund} />} />
                <Route path="/cart" element={<RouteElement element={Cart} />} />
                <Route path="/checkout" element={<RouteElement element={Checkout} />} />
                <Route path="/favorites" element={<RouteElement element={Favorites} />} />
                <Route path="/about" element={<RouteElement element={About} />} />
                <Route path="/services" element={<RouteElement element={Services} />} />
                <Route path="/contact" element={<RouteElement element={Contact} />} />
                <Route path="/location" element={<RouteElement element={Location} />} />
                <Route path="/schemes" element={<RouteElement element={Schemes} />} />
                <Route path="/consultation" element={<RouteElement element={Consultation} />} />
                
                {/* Redirect any unknown paths to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
