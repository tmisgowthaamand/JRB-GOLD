import { useState, useEffect, useRef } from "react";
import { Search, Eye, Heart, ShoppingCart, X, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  purity: string;
  price: number;
  compareAtPrice?: number;
  weight: number;
  makingCharges: number;
  image: string;
  rating: { avg: number; count: number };
  badges: string[];
  description: string;
  sku: string;
}

interface SearchBoxProps {
  onProductSelect?: (product: Product) => void;
  placeholder?: string;
  className?: string;
  trendingProducts?: Array<{id: string; name: string; category: string; price: number; image: string}>;
  showTrending?: boolean;
}

const SearchBox = ({ 
  onProductSelect, 
  placeholder = "Search jewelry...", 
  className = "",
  trendingProducts = [],
  showTrending = false
}: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { addToCart, toggleFavorite, favorites } = useCart();
  const searchRef = useRef<HTMLInputElement>(null);

  // Sample products data (in a real app, this would come from an API or context)
  const products: Product[] = [
    {
      id: "1",
      name: "Elegant Gold Bangle",
      category: "gold",
      subcategory: "bangles",
      purity: "22k",
      price: 45200,
      compareAtPrice: 48500,
      weight: 8.5,
      makingCharges: 2500,
      image: productBangle,
      rating: { avg: 4.8, count: 24 },
      badges: ["no-wastage", "new"],
      description: "Exquisite handcrafted gold bangle with traditional motifs",
      sku: "JRB-GB-001",
    },
    {
      id: "2",
      name: "Pure Gold Coin - Lakshmi",
      category: "coins",
      subcategory: "religious",
      purity: "24k",
      price: 7850,
      weight: 2.0,
      makingCharges: 150,
      image: productCoin,
      rating: { avg: 4.9, count: 156 },
      badges: ["certified"],
      description: "24k pure gold coin with Goddess Lakshmi design",
      sku: "JRB-GC-002",
    },
    {
      id: "3",
      name: "Silver Designer Necklace",
      category: "silver",
      subcategory: "necklaces",
      purity: "pure-silver",
      price: 3200,
      weight: 25.0,
      makingCharges: 800,
      image: productNecklace,
      rating: { avg: 4.7, count: 43 },
      badges: ["handcrafted"],
      description: "Contemporary silver necklace with oxidized finish",
      sku: "JRB-SN-003",
    },
    {
      id: "4",
      name: "Bridal Gold Ring Set",
      category: "gold",
      subcategory: "rings",
      purity: "22k",
      price: 32400,
      compareAtPrice: 35200,
      weight: 6.2,
      makingCharges: 1800,
      image: productBangle,
      rating: { avg: 4.8, count: 67 },
      badges: ["no-wastage", "sale"],
      description: "Complete bridal ring set with matching designs",
      sku: "JRB-GR-004",
    },
    {
      id: "5",
      name: "Gold Chain - Rope Design",
      category: "gold",
      subcategory: "chains",
      purity: "22k",
      price: 52800,
      weight: 10.5,
      makingCharges: 3200,
      image: productNecklace,
      rating: { avg: 4.9, count: 89 },
      badges: ["premium"],
      description: "Classic rope design gold chain for everyday wear",
      sku: "JRB-GC-005",
    },
    {
      id: "6",
      name: "Temple Jewelry Earrings",
      category: "gold",
      subcategory: "earrings",
      purity: "22k",
      price: 28900,
      weight: 5.4,
      makingCharges: 1500,
      image: productCoin,
      rating: { avg: 4.9, count: 78 },
      badges: ["traditional", "no-wastage"],
      description: "Traditional temple jewelry earrings with ruby stones",
      sku: "JRB-GE-007",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBadgeText = (badge: string) => {
    const badgeMap: { [key: string]: string } = {
      "no-wastage": "No Wastage",
      "new": "New",
      "sale": "Sale",
      "certified": "Certified",
      "handcrafted": "Handcrafted",
      "premium": "Premium",
      "traditional": "Traditional"
    };
    return badgeMap[badge] || badge;
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "sale":
        return "destructive";
      case "new":
        return "default";
      default:
        return "secondary";
    }
  };

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product => {
      const searchTerms = searchQuery.toLowerCase().split(" ");
      const searchableText = `
        ${product.name} 
        ${product.category} 
        ${product.subcategory} 
        ${product.purity} 
        ${product.description} 
        ${product.sku}
        ${product.badges.join(" ")}
      `.toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });

    setFilteredProducts(filtered.slice(0, 6)); // Limit to 6 results
  }, [searchQuery]);

  // Show trending products when search is empty and showTrending is true
  const showTrendingProducts = showTrending && searchQuery.trim() === "" && trendingProducts.length > 0;

  const handleProductClick = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
    searchRef.current?.focus();
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
    setIsOpen(false); // Close search dropdown
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleToggleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId);
    toggleFavorite(productId, product?.name);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          ref={searchRef}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => {
            if (searchQuery.length > 0 && filteredProducts.length > 0) {
              setIsOpen(true);
            }
          }}
          onBlur={() => {
            // Delay closing to allow clicking on results
            setTimeout(() => setIsOpen(false), 200);
          }}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {/* Search Results Dropdown */}
      {isOpen && (showTrendingProducts || filteredProducts.length > 0) && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-muted-foreground mb-2 px-2">
              {showTrendingProducts ? 'Trending Products' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
            </div>
            <div className="space-y-1">
              {showTrendingProducts ? (
                trendingProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-gray-50 cursor-pointer flex items-center"
                    onClick={() => handleProductClick(product as any)}
                  >
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.category}
                      </div>
                    </div>
                    <div className="ml-auto text-sm font-medium">
                      ₹{product.price.toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id}>
                    <Card 
                      className="cursor-pointer hover:bg-accent/50 transition-colors border-0 shadow-none"
                      onClick={() => handleProductClick(product)}
                    >
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-medium text-sm text-foreground truncate">
                                {product.name}
                              </h4>
                              <div className="flex items-center ml-2">
                                <Star className="h-3 w-3 text-gold fill-gold" />
                                <span className="text-xs text-muted-foreground ml-1">
                                  {product.rating.avg}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mb-2">
                              {product.purity} • {product.weight}g • SKU: {product.sku}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-sm text-foreground">
                                  {formatPrice(product.price)}
                                </span>
                                {product.compareAtPrice && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    {formatPrice(product.compareAtPrice)}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 px-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewProduct(product);
                                  }}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 px-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product);
                                  }}
                                >
                                  <ShoppingCart className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            {product.badges.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {product.badges.slice(0, 2).map((badge) => (
                                  <Badge
                                    key={badge}
                                    variant={getBadgeVariant(badge)}
                                    className="text-xs px-1 py-0"
                                  >
                                    {getBadgeText(badge)}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {isOpen && searchQuery && filteredProducts.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg">
          <div className="p-4 text-center text-sm text-muted-foreground">
            No products found for "{searchQuery}"
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-playfair text-foreground">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Product Image */}
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-96 object-cover"
                    />
                    {selectedProduct.badges && selectedProduct.badges.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {selectedProduct.badges.map((badge) => (
                          <Badge
                            key={badge}
                            variant={getBadgeVariant(badge)}
                            className="text-xs"
                          >
                            {getBadgeText(badge)}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(selectedProduct.rating.avg)
                              ? "text-gold fill-gold"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedProduct.rating.avg} ({selectedProduct.rating.count} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-foreground">
                        {formatPrice(selectedProduct.price)}
                      </span>
                      {selectedProduct.compareAtPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(selectedProduct.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    {selectedProduct.compareAtPrice && (
                      <div className="text-sm text-green-600">
                        You save {formatPrice(selectedProduct.compareAtPrice - selectedProduct.price)}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Purity:</span>
                        <span className="ml-2 text-foreground">{selectedProduct.purity}</span>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Weight:</span>
                        <span className="ml-2 text-foreground">{selectedProduct.weight}g</span>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Category:</span>
                        <span className="ml-2 text-foreground capitalize">{selectedProduct.category}</span>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">SKU:</span>
                        <span className="ml-2 text-foreground">{selectedProduct.sku}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">Making Charges:</span>
                      <span className="ml-2 text-foreground">{formatPrice(selectedProduct.makingCharges)}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Description</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      className="flex-1" 
                      variant="hero"
                      onClick={() => handleAddToCart(selectedProduct)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleToggleFavorite(selectedProduct.id)}
                      className={favorites.includes(selectedProduct.id) ? "bg-red-50 text-red-500 border-red-200" : ""}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(selectedProduct.id) ? "fill-red-500" : ""}`} />
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="border-t pt-4 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gold rounded-full mr-2" />
                      Certified Hallmark Gold
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gold rounded-full mr-2" />
                      30-Day Return Policy
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gold rounded-full mr-2" />
                      Free Shipping & Insurance
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBox;
