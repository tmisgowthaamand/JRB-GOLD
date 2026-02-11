import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Exceptional quality and transparent pricing. I exchanged my old gold jewelry and got exactly the rate they promised. The craftsmanship of their new pieces is outstanding.",
      service: "Gold Exchange",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "The custom design services exceeded my expectations. They created a beautiful necklace set that matches my family heritage perfectly. Truly masterful work!",
      service: "Custom Design",
    },
    {
      id: 3,
      name: "Anita Patel",
      location: "Pune",
      rating: 5,
      text: "Professional appraiser training course was comprehensive. Now I'm certified and working with a reputed jewelry store. Great investment in my career.",
      service: "Appraiser Training",
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Bangalore",
      rating: 5,
      text: "Re-pledge transfer was seamless. Lower interest rates and better terms than my previous lender. The team handled all documentation professionally.",
      service: "Re-Pledge Transfer",
    },
    {
      id: 5,
      name: "Meera Reddy",
      location: "Hyderabad",
      rating: 5,
      text: "Beautiful craftsmanship and certified hallmark jewelry. The no wastage policy saved me significant money. Will definitely purchase again.",
      service: "Jewelry Purchase",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-16 bg-ink text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-display font-playfair text-ivory mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-ivory/80 max-w-2xl mx-auto">
            Trusted by thousands of customers for quality, transparency, and exceptional service
          </p>
          <div className="divider-gold mt-6 max-w-24 mx-auto" />
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleTestimonials().map((testimonial, index) => (
                <Card
                  key={`${testimonial.id}-${currentIndex}-${index}`}
                  className={`bg-ivory/10 border-ivory/20 transition-all duration-500 ${index === 1 ? 'md:scale-105 md:shadow-luxury' : 'md:scale-95'
                    }`}
                >
                  <CardContent className="p-6">
                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-ivory/90 text-center mb-6 leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Customer Info */}
                    <div className="text-center">
                      <div className="font-semibold text-ivory mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-ivory/70 mb-2">
                        {testimonial.location}
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold/20 border border-gold/30">
                        <span className="text-xs text-gold font-medium">
                          {testimonial.service}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-ivory hover:bg-ivory/20 hidden md:flex"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-ivory hover:bg-ivory/20 hidden md:flex"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-gold w-8" : "bg-ivory/30"
                }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center mt-6 space-x-4 md:hidden">
          <Button
            variant="outline"
            size="sm"
            className="text-ivory border-ivory/30 hover:bg-ivory/20"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-ivory border-ivory/30 hover:bg-ivory/20"
            onClick={nextTestimonial}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Trust Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-ivory/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">10,000+</div>
            <div className="text-ivory/80 text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">30+</div>
            <div className="text-ivory/80 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">99%</div>
            <div className="text-ivory/80 text-sm">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">₹50Cr+</div>
            <div className="text-ivory/80 text-sm">Gold Transacted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;