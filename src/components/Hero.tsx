import { ChevronLeft, ChevronRight, Shield, Award, TrendingUp, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useGoldRates } from "@/hooks/useGoldRates";
import heroImage from "@/assets/hero-jewelry.jpg";
import craftsmanshipImage from "@/assets/craftsmanship.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { gold22k, silver, isLoading, error, lastUpdated } = useGoldRates();

  const slides = [
    {
      image: heroImage,
      title: "Trusted Gold & Silver",
      subtitle: "Fair Prices, Fine Craft",
      description: "Discover our premium collection of hallmarked jewelry with transparent pricing and zero wastage charges.",
      primaryCTA: "Shop Gold & Silver",
      primaryLink: "/shop",
      secondaryCTA: "Exchange Old Jewelry",
      secondaryLink: "/services#exchange"
    },
    {
      image: craftsmanshipImage,
      title: "Heritage Craftsmanship",
      subtitle: "Three Generations of Excellence",
      description: "Experience the artistry of traditional jewelry making with modern certified quality standards.",
      primaryCTA: "View Collection",
      primaryLink: "/shop?category=featured",
      secondaryCTA: "Learn More",
      secondaryLink: "/about#heritage"
    },
  ];

  const highlights = [
    { icon: CheckCircle, text: "Low Making Charges" },
    { icon: Shield, text: "No Wastage" },
    { icon: Award, text: "Certified Hallmark" },
    { icon: TrendingUp, text: "Today's Rate" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Hero Carousel */}
      <div className="relative h-[60vh] xs:h-[70vh] lg:h-[80vh] min-h-[500px] xs:min-h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-charcoal/60" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto">
                  <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                    <div className="animate-fade-in">
                      <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-ivory mb-3 xs:mb-4 lg:mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-gold font-playfair font-medium mb-4 xs:mb-6 lg:mb-8">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm xs:text-base lg:text-lg text-ivory/90 mb-6 xs:mb-8 leading-relaxed max-w-xl lg:max-w-2xl">
                        {slide.description}
                      </p>
                      <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
                        <a href={slide.primaryLink} className="block">
                          <Button size="lg" className="w-full xs:w-auto bg-gradient-gold hover:shadow-luxury text-charcoal font-semibold px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base">
                            {slide.primaryCTA}
                          </Button>
                        </a>
                        <a href={slide.secondaryLink} className="block">
                          <Button size="lg" variant="outline" className="w-full xs:w-auto border-2 border-gold text-gold hover:bg-gold/10 px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base">
                            {slide.secondaryCTA}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 xs:left-4 top-1/2 -translate-y-1/2 text-ivory hover:bg-ivory/20 h-8 w-8 xs:h-10 xs:w-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4 xs:h-6 xs:w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 xs:right-4 top-1/2 -translate-y-1/2 text-ivory hover:bg-ivory/20 h-8 w-8 xs:h-10 xs:w-10"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4 xs:h-6 xs:w-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 xs:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 xs:w-3 xs:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-gold" : "bg-ivory/50"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Live Gold Rates Bar */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-3 xs:py-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 xs:gap-4">
            <div className="flex flex-col xs:flex-row items-center gap-3 xs:gap-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 xs:h-5 xs:w-5" />
                <span className="font-semibold text-sm xs:text-base lg:text-lg">Today's Rates:</span>
              </div>
              <div className="flex items-center gap-3 xs:gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    {isLoading ? (
                      <RefreshCw className="h-3 w-3 xs:h-4 xs:w-4 animate-spin" />
                    ) : (
                      <span className="font-bold text-lg xs:text-xl">₹9,470/g</span>
                    )}
                  </div>
                  <div className="text-xs opacity-90">Gold (22K)</div>
                </div>
                <div className="h-6 xs:h-8 w-px bg-white/30"></div>
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    {isLoading ? (
                      <RefreshCw className="h-3 w-3 xs:h-4 xs:w-4 animate-spin" />
                    ) : (
                      <span className="font-bold text-lg xs:text-xl">₹131/g</span>
                    )}
                  </div>
                  <div className="text-xs opacity-90">Silver</div>
                </div>
              </div>
            </div>
            <div className="text-xs opacity-75 flex flex-col xs:flex-row items-center gap-1 xs:gap-2 text-center xs:text-left">
              {error ? (
                <span className="text-red-200">*Using indicative rates</span>
              ) : (
                <>
                  <span className="hidden lg:inline">*Live rates - Last updated: {new Date(lastUpdated).toLocaleTimeString()}</span>
                  <span className="lg:hidden">*Live rates updated</span>
                </>
              )}
              <span className="hidden xs:inline">|</span>
              <span>Visit store for exact rates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="bg-ink text-ivory py-4 xs:py-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 xs:space-x-3">
                <highlight.icon className="h-4 w-4 xs:h-5 xs:w-5 text-gold flex-shrink-0" />
                <span className="font-medium text-xs xs:text-sm lg:text-base">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;