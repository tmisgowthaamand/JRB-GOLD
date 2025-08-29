import { Toaster as SonarToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Location from './pages/Location';
import Schemes from './pages/Schemes';
import Consultation from './pages/Consultation';
import SignIn from './pages/auth/SignIn';
import CreateAccount from './pages/auth/CreateAccount';
import MyOrders from './pages/account/MyOrders';
import ProfileSettings from './pages/account/ProfileSettings';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import OrderDetails from './pages/OrderDetails';
import Help from './pages/Help';
import RePledgeTransfer from './pages/services/RePledgeTransfer';
import { CartProvider } from './contexts/CartContext';


// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check authentication from localStorage
  const authToken = localStorage.getItem('authToken');
  const userEmail = localStorage.getItem('userEmail');
  const isAuthenticated = !!(authToken && userEmail);
  
  if (!isAuthenticated) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
};

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
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/location" element={<Location />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route path="/help" element={<Help />} />
                <Route path="/services/re-pledge-transfer" element={<RePledgeTransfer />} />
                
                {/* Authentication Routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<CreateAccount />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/account/orders" 
                  element={
                    <ProtectedRoute>
                      <MyOrders />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/account/settings" 
                  element={
                    <ProtectedRoute>
                      <ProfileSettings />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 Not Found */}
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
