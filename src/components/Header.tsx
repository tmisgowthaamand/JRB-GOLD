import { useState, useEffect } from "react";
import { User, Heart, ShoppingCart, Menu, LogOut, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const { cart, favorites } = useCart();
  const navigate = useNavigate();

  // Check if user is logged in (in a real app, this would come from your auth context)
  useEffect(() => {
    // TODO: Replace with actual auth check
    const checkAuthStatus = () => {
      // For demo purposes, check if there's a token in localStorage
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
      
      // Set user initials for avatar
      const userName = localStorage.getItem('userName') || 'User';
      setUserInitials(
        userName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      );
    };
    
    checkAuthStatus();
    
    // Listen for auth state changes (in a real app, this would be from your auth context)
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);
  
  const handleLogout = () => {
    // TODO: Implement proper logout logic
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navigationLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Schemes", href: "/schemes" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];


  const handleAccountClick = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const [lastToggledProduct, setLastToggledProduct] = useState<string | null>(null);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/favorites');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top Bar - Gold Rate Ticker */}
      <div className="bg-gradient-gold text-charcoal py-2 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium">
            Today's Gold Rate (22k): ₹5,847/g*{' '}
            <span className="text-xs opacity-75">*Indicative—visit store for exact rate</span>
          </p>
        </div>
      </div>

      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center h-full">
              <a href="/" className="flex items-center space-x-3 h-full py-3">
                <img 
                  src="/logo.jpeg" 
                  alt="JRB Gold Logo" 
                  className="w-10 h-10 object-contain rounded-md shadow-sm"
                />
                <span className="font-playfair text-2xl font-bold text-foreground leading-none">
                  JRB Gold
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-gold transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Utilities */}
            <div className="flex items-center space-x-3">

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative ${lastToggledProduct ? 'animate-ping-once' : ''}`}
                  onClick={handleWishlistClick}
title="View Favorites"
                >
                  <Heart 
                    className={`h-5 w-5 ${lastToggledProduct ? 'fill-current text-red-500' : ''}`} 
                    fill={favorites.includes(lastToggledProduct || '') ? 'currentColor' : 'none'}
                  />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {favorites.length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={handleCartClick}
                  title="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
                
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-yellow-100 text-yellow-800">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/account/orders')}>
                        <Package className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/account/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="sm:hidden"
                      title="Account"
                      disabled
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </div>
                )}
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <div className="flex flex-col space-y-4 py-4">
                      {/* Mobile Navigation */}
                      <nav className="flex flex-col space-y-2">
                        {navigationLinks.map((link) => (
                          <Button
                            key={link.href}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => {
                              navigate(link.href);
                              // Close the sheet after navigation
                              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                            }}
                          >
                            {link.name}
                          </Button>
                        ))}
                        
                        {/* Mobile Menu Buttons */}
                        <Button variant="outline" className="justify-start" onClick={handleWishlistClick}>
                          <Heart className="h-4 w-4 mr-2" />
                          Wishlist ({favorites.length})
                        </Button>
                        <Button variant="outline" className="justify-start" onClick={handleCartClick}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Cart ({cart.length})
                        </Button>
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;