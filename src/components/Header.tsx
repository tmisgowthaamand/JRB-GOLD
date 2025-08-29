import { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingCart, Menu, X, LogIn, UserPlus, LogOut, Package, Settings, RefreshCw, Phone, Mail } from "lucide-react";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchBox from "@/components/SearchBox";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useGoldRates } from "@/hooks/useGoldRates";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const { cart, favorites } = useCart();
  const navigate = useNavigate();
  const { gold22k, silver, isLoading, error } = useGoldRates();

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

  const trendingProducts = [
    { id: '1', name: 'Gold Bangles', category: 'Bangles', price: 15999, image: productBangle },
    { id: '2', name: 'Diamond Rings', category: 'Rings', price: 45999, image: productCoin },
    { id: '3', name: 'Temple Jewelry', category: 'Necklaces', price: 32499, image: productNecklace },
    { id: '4', name: 'Antique Necklaces', category: 'Necklaces', price: 28999, image: productBangle },
  ];

  const handleProductSelect = (product: any) => {
    // Navigate to product detail page
    navigate(`/product/${product.id}`);
  };

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
      {/* Top Bar */}
      <div className="text-white" style={{background: 'rgb(202, 138, 4)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3 text-sm">
            <div className="flex items-center space-x-6 font-medium">
              <span className="tracking-wide">₹9,470/g Gold (22K)</span>
              <span className="tracking-wide">₹131/g Silver</span>
              <span className="text-xs opacity-75 ml-2">*Indicative rates—visit store for exact rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center h-full">
              <a href="/" className="group flex items-center space-x-3 sm:space-x-4 h-full py-2 transition-all duration-300 hover:scale-105">
                <img 
                  src="/logo1.png?v=1" 
                  alt="JRB Gold Pvt Ltd Logo" 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain brightness-110 contrast-110 flex-shrink-0 transition-transform duration-300 group-hover:rotate-3"
                />
                <span className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold leading-none tracking-wide whitespace-nowrap transition-colors duration-300 drop-shadow-lg" style={{color: 'rgb(202, 138, 4)'}}>
                  JRB GOLD PVt ltd
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
              {/* Search */}
              <div className="hidden sm:block relative w-48 md:w-56 lg:w-64">
                <SearchBox 
                  onProductSelect={handleProductSelect}
                  placeholder="Search jewelry..."
                  className="w-full"
                  trendingProducts={trendingProducts}
                  showTrending={true}
                />
              </div>

              <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-1 sm:space-x-2">
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
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate('/signin')}
                      className="hidden sm:flex items-center"
                    >
                      <LogIn className="h-4 w-4 mr-1" />
                      <span>Sign In</span>
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => navigate('/signup')}
                      className="hidden sm:flex items-center"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      <span>Sign Up</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="sm:hidden"
                      onClick={() => navigate('/signin')}
                      title="Account"
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
                      {/* Mobile Search */}
                      <SearchBox 
                        onProductSelect={handleProductSelect}
                        placeholder="Search jewelry..."
                        className="w-full"
                      />

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
                        
                        {/* Mobile Auth Buttons */}
                        {isLoggedIn ? (
                          <>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => {
                                navigate('/account/orders');
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              <Package className="mr-2 h-4 w-4" />
                              My Orders
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => {
                                navigate('/account/settings');
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Account Settings
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-red-600 hover:text-red-700"
                              onClick={handleLogout}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Sign Out
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => {
                                navigate('/signin');
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              <LogIn className="mr-2 h-4 w-4" />
                              Sign In
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => {
                                navigate('/signup');
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Create Account
                            </Button>
                          </>
                        )}
                      </nav>

                      {/* Mobile Cart and Wishlist */}
                      <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                        <Button variant="outline" className="justify-start" onClick={handleWishlistClick}>
                          <Heart className="h-4 w-4 mr-2" />
                          Wishlist ({favorites.length})
                        </Button>
                        <Button variant="outline" className="justify-start" onClick={handleCartClick}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Cart ({cart.length})
                        </Button>
                      </div>
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