import { ChevronLeft, ChevronRight, Shield, Award, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-jewelry.jpg";
import craftsmanshipImage from "@/assets/craftsmanship.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      <div className="relative h-[80vh] min-h-[600px]">
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl">
                    <div className="animate-fade-in">
                      <h1 className="text-hero text-ivory mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-2xl text-gold font-playfair font-medium mb-6">
                        {slide.subtitle}
                      </p>
                      <p className="text-lg text-ivory/90 mb-8 leading-relaxed max-w-2xl">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a href={slide.primaryLink} className="block">
                          <Button size="lg" variant="hero">
                            {slide.primaryCTA}
                          </Button>
                        </a>
                        <a href={slide.secondaryLink} className="block">
                          <Button size="lg" variant="outline-gold">
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
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory hover:bg-ivory/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory hover:bg-ivory/20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-gold" : "bg-ivory/50"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="bg-ink text-ivory py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center justify-center space-x-3">
                <highlight.icon className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;