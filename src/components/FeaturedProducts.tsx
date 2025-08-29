import { useState } from "react";
import { Star, Heart, ShoppingCart, Eye, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { addToCart, toggleFavorite, favorites } = useCart();
  
  // Quantity state for each product
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  const products = [
    {
      id: "1",
      name: "Gold Bangle",
      category: "22k",
      price: 82543,
      compareAtPrice: 85000,
      weight: 8.5,
      image: productBangle,
      rating: { avg: 4.8, count: 24 },
      badges: ["no-wastage", "new"],
    },
    {
      id: "2",
      name: "Gold Coin",
      category: "24k",
      price: 20734,
      weight: 2.0,
      image: productCoin,
      rating: { avg: 4.9, count: 156 },
      badges: ["certified"],
    },
    {
      id: "3",
      name: "Silver Necklace",
      category: "Pure Silver",
      price: 3200,
      weight: 25.0,
      image: productNecklace,
      rating: { avg: 4.7, count: 43 },
      badges: ["handcrafted"],
    },
    {
      id: "4",
      name: "Gold Ring Set",
      category: "22k",
      price: 32400,
      compareAtPrice: 35200,
      weight: 6.2,
      image: "/gold ring set.jpg",
      rating: { avg: 4.8, count: 67 },
      badges: ["no-wastage", "sale"],
    },
    {
      id: "5",
      name: "Gold Chain",
      category: "22k",
      price: 98752.5,
      weight: 10.5,
      image: "/Gold Chain - Rope Design.jpg",
      rating: { avg: 4.9, count: 89 },
      badges: ["premium"],
    },
    {
      id: "6",
      name: "Silver Bracelet",
      category: "Pure Silver",
      price: 17587,
      weight: 130.0,
      image: "/Silver Bracelet.jpg",
      rating: { avg: 4.6, count: 32 },
      badges: ["handcrafted"],
    },
  ];

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

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case "no-wastage":
        return "No Wastage";
      case "new":
        return "New";
      case "sale":
        return "Sale";
      case "certified":
        return "Certified";
      case "handcrafted":
        return "Handcrafted";
      case "premium":
        return "Premium";
      default:
        return badge;
    }
  };

  const getQuantity = (productId: string) => {
    return quantities[productId] || 1;
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
    }
  };

  const handleAddToCart = (product: any) => {
    const quantity = getQuantity(product.id);
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart!`, {
      description: `Weight: ${product.weight}g each • Total: ₹${(product.price * quantity).toLocaleString()}`,
      duration: 3000,
    });
    // Reset quantity to 1 after adding to cart
    setQuantities(prev => ({
      ...prev,
      [product.id]: 1
    }));
  };

  const handleToggleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId);
    toggleFavorite(productId, product?.name);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-display font-playfair text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium jewelry crafted with precision and care
          </p>
          <div className="divider-gold mt-6 max-w-24 mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {products.slice(0, 8).map((product) => (
            <Card key={product.id} className="card-luxury group cursor-pointer">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {product.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant={getBadgeVariant(badge)}
                          className="badge-premium text-xs"
                        >
                          {getBadgeText(badge)}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="hero"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 lg:p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-foreground group-hover:text-gold transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating.avg)
                                ? "text-gold fill-gold"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">
                        {product.rating.avg} ({product.rating.count})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex flex-col space-y-1 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg sm:text-xl font-bold text-foreground">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Weight: {product.weight}g</span>
                      {product.compareAtPrice && (
                        <span className="text-green-600 font-medium">
                          Save ₹{(product.compareAtPrice - product.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                      disabled={getQuantity(product.id) <= 1}
                      className="h-9 w-9 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-semibold text-lg">{getQuantity(product.id)}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                      className="h-9 w-9 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full py-2 sm:py-3 text-xs sm:text-sm font-medium" 
                    variant="outline-gold"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add {getQuantity(product.id)} to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-charcoal">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => handleToggleFavorite(selectedProduct.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {selectedProduct.category}
                    </Badge>
                    <p className="text-muted-foreground">
                      Premium quality {selectedProduct.category} gold jewelry crafted with precision and care.
                    </p>
                  </div>

                  {/* Rating */}
                  {selectedProduct.rating && (
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
                  )}

                  {/* Specifications */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Weight:</span>
                        <span className="ml-2">{selectedProduct.weight}g</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Purity:</span>
                        <span className="ml-2">{selectedProduct.category}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2">{selectedProduct.category}</span>
                      </div>
                      {selectedProduct.badges && (
                        <div>
                          <span className="text-muted-foreground">Quality:</span>
                          <span className="ml-2">{selectedProduct.badges.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gold">
                        {formatPrice(selectedProduct.price)}
                      </span>
                      {selectedProduct.compareAtPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(selectedProduct.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Selector for Modal */}
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(selectedProduct.id, getQuantity(selectedProduct.id) - 1)}
                      disabled={getQuantity(selectedProduct.id) <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center font-medium">Qty: {getQuantity(selectedProduct.id)}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(selectedProduct.id, getQuantity(selectedProduct.id) + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      className="flex-1" 
                      variant="hero"
                      onClick={() => handleAddToCart(selectedProduct)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add {getQuantity(selectedProduct.id)} to Cart
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleToggleFavorite(selectedProduct.id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturedProducts;