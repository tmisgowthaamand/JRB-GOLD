import { RefreshCw, Banknote, TrendingUp, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: RefreshCw,
      title: "Exchange Old Gold",
      description: "Get the best value for your old jewelry at today's market rates. Transparent pricing with no hidden charges.",
      features: ["Today's market rate", "Instant evaluation", "No deduction charges"],
      cta: "Get Quote",
      accent: "gold",
    },
    {
      icon: Banknote,
      title: "Re-Pledge Transfer",
      description: "Transfer your pledged gold from other institutions to us for better rates and flexible terms.",
      features: ["Lower interest rates", "Easy documentation", "Quick processing"],
      cta: "Learn More",
      accent: "maroon",
    },
    {
      icon: TrendingUp,
      title: "Gold Bonds",
      description: "Invest in government-backed gold bonds for secure returns without physical storage concerns.",
      features: ["Government backed", "Annual interest", "Tax benefits"],
      cta: "Invest Now",
      accent: "gold",
    },
    {
      icon: GraduationCap,
      title: "Appraiser Training",
      description: "Professional jewelry appraisal certification course. Learn the skills to evaluate precious metals and gems.",
      features: ["Certified course", "Hands-on training", "Job placement"],
      cta: "Apply Now",
      accent: "maroon",
    },
  ];

  const goldSavingsScheme = {
    title: "Gold Savings Scheme",
    description: "Start your journey to owning beautiful jewelry with our flexible monthly savings plans.",
    benefits: [
      "11 months payment + 1 month bonus",
      "Choose your monthly amount",
      "Redeem as jewelry anytime",
      "No interest charges",
    ],
  };

  return (
    <section className="py-16 bg-gradient-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-display font-playfair text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive jewelry services designed to meet all your precious metal needs
          </p>
          <div className="divider-gold mt-6 max-w-24 mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="card-luxury group hover:shadow-elevated transition-all duration-300 flex flex-col h-full">
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto ${
                  service.accent === 'gold' 
                    ? 'bg-gradient-gold' 
                    : 'bg-gradient-to-br from-maroon to-maroon/80'
                }`}>
                  <service.icon className={`h-8 w-8 ${
                    service.accent === 'gold' ? 'text-charcoal' : 'text-ivory'
                  }`} />
                </div>
                <CardTitle className="text-xl font-playfair font-semibold text-foreground group-hover:text-gold transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <div className="flex flex-col flex-grow">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-foreground flex items-start justify-center">
                          <div className="w-1 h-1 bg-gold rounded-full mt-2 mr-2 flex-shrink-0" />
                          <span className="text-left">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button 
                  variant="outline-gold" 
                  className="group-hover:bg-gold group-hover:text-charcoal transition-all w-full mt-auto"
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gold Savings Scheme CTA */}
        <div className="bg-charcoal p-8 lg:p-12 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-playfair font-bold text-gold mb-4">
                {goldSavingsScheme.title}
              </h3>
              <p className="text-ivory text-lg mb-6 leading-relaxed">
                {goldSavingsScheme.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {goldSavingsScheme.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-ivory">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button size="lg" className="bg-gold text-charcoal hover:bg-gold/90 transition-colors">
                  Start Saving Today
                </Button>
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10">
                  Calculate Savings
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-gold p-8 rounded-xl text-charcoal">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">₹5,000</div>
                  <div className="text-sm mb-4">Monthly Investment</div>
                  <div className="divider-gold opacity-50" />
                  <div className="mt-4">
                    <div className="text-2xl font-semibold">₹60,000</div>
                    <div className="text-sm opacity-75">Total Value After 11 Months</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gold rounded-full opacity-60" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gold/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;