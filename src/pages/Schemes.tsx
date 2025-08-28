import { useState } from "react";
import { Calculator, CheckCircle, Gift, TrendingUp, Users, Clock, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Schemes = () => {
  const [calculatorValues, setCalculatorValues] = useState({
    monthlyAmount: 5000,
    duration: 11,
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    monthlyAmount: '',
    preferredDuration: '',
  });

  const schemes = [
    {
      id: 'gold-11',
      name: 'Gold Savings Plan - 11 Months',
      duration: 11,
      bonus: '1 Month',
      minAmount: 2000,
      maxAmount: 50000,
      features: [
        'Pay for 11 months, get 12th month free',
        'Flexible monthly payment dates',
        'Redeem as jewelry or gold',
        'No interest charges',
        'Transferable to family members'
      ],
      popular: true,
    },
    {
      id: 'gold-24',
      name: 'Gold Savings Plan - 24 Months', 
      duration: 24,
      bonus: '2 Months',
      minAmount: 3000,
      maxAmount: 75000,
      features: [
        'Pay for 24 months, get 2 bonus months',
        'Higher bonus value',
        'Build substantial gold corpus',
        'Premium jewelry redemption options',
        'Anniversary bonus gifts'
      ],
      popular: false,
    },
    {
      id: 'wedding-special',
      name: 'Wedding Special Scheme',
      duration: 18,
      bonus: '1.5 Months + Gifts',
      minAmount: 5000,
      maxAmount: 100000,
      features: [
        'Designed for wedding jewelry',
        'Bonus month + wedding gifts',
        'Priority booking for occasions',
        'Complimentary jewelry cleaning',
        'Wedding consultation included'
      ],
      popular: false,
    },
  ];

  const benefits = [
    {
      icon: Gift,
      title: 'Bonus Months',
      description: 'Get extra months added to your savings completely free',
    },
    {
      icon: TrendingUp,
      title: 'No Market Risk',
      description: 'Fixed gold accumulation regardless of market fluctuations',
    },
    {
      icon: Clock,
      title: 'Flexible Payment',
      description: 'Choose your payment date within the month',
    },
    {
      icon: Users,
      title: 'Family Transferable',
      description: 'Transfer your scheme to any family member',
    },
  ];

  const steps = [
    {
      step: 1,
      title: 'Choose Your Plan',
      description: 'Select the scheme that fits your budget and timeline',
    },
    {
      step: 2,
      title: 'Make Monthly Payments',
      description: 'Pay your chosen amount every month on your preferred date',
    },
    {
      step: 3,
      title: 'Get Bonus Months',
      description: 'Receive additional months added to your total savings',
    },
    {
      step: 4,
      title: 'Redeem as Jewelry',
      description: 'Convert your savings to beautiful jewelry at maturity',
    },
  ];

  const faqs = [
    {
      question: 'What happens if I miss a monthly payment?',
      answer: 'You have a grace period of 10 days. After that, you can make the payment with a small late fee. Missing more than 3 consecutive payments may result in scheme cancellation with refund of paid amounts.'
    },
    {
      question: 'Can I redeem my scheme before maturity?',
      answer: 'Yes, you can redeem after completing at least 6 months of payments. However, bonus benefits will be proportionally adjusted based on the completion period.'
    },
    {
      question: 'How is the gold rate calculated at redemption?',
      answer: 'The gold rate is calculated based on the market rate prevailing on the day of redemption. You get the benefit of bulk rates and reduced making charges.'
    },
    {
      question: 'Can I increase my monthly payment amount?',
      answer: 'Yes, you can increase your monthly payment amount anytime. However, decreasing the amount is not allowed to maintain scheme integrity.'
    },
    {
      question: 'What jewelry can I choose at redemption?',
      answer: 'You can choose from our entire collection including rings, necklaces, earrings, bangles, and coins. Custom jewelry orders are also accepted.'
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      text: 'Started the 11-month scheme for my daughter\'s wedding. The bonus month helped me buy the complete jewelry set I had dreamed of.',
      rating: 5,
      scheme: '11-Month Plan'
    },
    {
      name: 'Rajesh Kumar', 
      location: 'Delhi',
      text: 'Been doing the gold scheme for 3 years now. It\'s the best way to save for gold without worrying about price fluctuations.',
      rating: 5,
      scheme: '24-Month Plan'
    },
  ];

  const calculateTotalValue = () => {
    const monthlyAmount = calculatorValues.monthlyAmount;
    const duration = calculatorValues.duration;
    const totalPaid = monthlyAmount * duration;
    const bonusValue = duration === 11 ? monthlyAmount : duration === 24 ? monthlyAmount * 2 : monthlyAmount * 1.5;
    return { totalPaid, bonusValue, totalValue: totalPaid + bonusValue };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency", 
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-hero font-playfair text-foreground mb-4">
                Gold Savings Schemes
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Start your journey to owning beautiful jewelry with our flexible monthly savings plans. 
                Build your gold corpus systematically and enjoy bonus benefits.
              </p>
              <div className="divider-gold mt-6 max-w-24 mx-auto" />
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">5,000+</div>
                <div className="text-muted-foreground text-sm">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">₹25Cr+</div>
                <div className="text-muted-foreground text-sm">Savings Collected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">100%</div>
                <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">15+</div>
                <div className="text-muted-foreground text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Schemes Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Choose Your Savings Plan
              </h2>
              <p className="text-lg text-muted-foreground">
                Flexible plans designed to fit every budget and timeline
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {schemes.map((scheme) => (
                <Card 
                  key={scheme.id} 
                  className={`card-luxury relative ${scheme.popular ? 'ring-2 ring-gold' : ''}`}
                >
                  {scheme.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gold text-charcoal font-semibold px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-playfair text-foreground mb-2">
                      {scheme.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-gold mb-2">
                      {scheme.duration} Months
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Bonus: {scheme.bonus}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-lg font-semibold text-foreground mb-1">
                        {formatPrice(scheme.minAmount)} - {formatPrice(scheme.maxAmount)}
                      </div>
                      <div className="text-sm text-muted-foreground">Monthly Amount</div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {scheme.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          variant={scheme.popular ? 'hero' : 'outline-gold'}
                        >
                          Join This Plan
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Join {scheme.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Full Name *</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone Number *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="city">City *</Label>
                              <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="monthlyAmount">Monthly Amount *</Label>
                              <Select
                                value={formData.monthlyAmount}
                                onValueChange={(value) => setFormData(prev => ({...prev, monthlyAmount: value}))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select amount" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2000">₹2,000</SelectItem>
                                  <SelectItem value="3000">₹3,000</SelectItem>
                                  <SelectItem value="5000">₹5,000</SelectItem>
                                  <SelectItem value="10000">₹10,000</SelectItem>
                                  <SelectItem value="15000">₹15,000</SelectItem>
                                  <SelectItem value="20000">₹20,000</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <Button type="submit" className="w-full" variant="hero">
                            Submit Application
                          </Button>
                          
                          <p className="text-xs text-muted-foreground text-center">
                            Our representative will contact you within 24 hours to complete the enrollment process.
                          </p>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 bg-ink text-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-ivory mb-4">
                Savings Calculator
              </h2>
              <p className="text-lg text-ivory/80">
                Calculate your potential savings and bonus benefits
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-ivory/10 border-ivory/20">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calculator Inputs */}
                    <div className="space-y-6">
                      <div>
                        <Label className="text-ivory mb-2 block">Monthly Investment Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/60">₹</span>
                          <Input
                            type="number"
                            value={calculatorValues.monthlyAmount}
                            onChange={(e) => setCalculatorValues(prev => ({
                              ...prev,
                              monthlyAmount: parseInt(e.target.value) || 0
                            }))}
                            className="pl-8 bg-ivory/10 border-ivory/20 text-ivory"
                            min="2000"
                            max="100000"
                            step="1000"
                          />
                        </div>
                        <p className="text-xs text-ivory/60 mt-1">Minimum ₹2,000, Maximum ₹1,00,000</p>
                      </div>

                      <div>
                        <Label className="text-ivory mb-2 block">Plan Duration</Label>
                        <Select
                          value={calculatorValues.duration.toString()}
                          onValueChange={(value) => setCalculatorValues(prev => ({
                            ...prev,
                            duration: parseInt(value)
                          }))}
                        >
                          <SelectTrigger className="bg-ivory/10 border-ivory/20 text-ivory">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="11">11 Months (+ 1 Bonus)</SelectItem>
                            <SelectItem value="18">18 Months (+ 1.5 Bonus)</SelectItem>
                            <SelectItem value="24">24 Months (+ 2 Bonus)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gradient-gold p-6 rounded-xl text-charcoal">
                      <h3 className="text-xl font-bold mb-4">Your Investment Summary</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Monthly Investment:</span>
                          <span className="font-bold">{formatPrice(calculatorValues.monthlyAmount)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Total Paid ({calculatorValues.duration} months):</span>
                          <span className="font-bold">{formatPrice(calculateTotalValue().totalPaid)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Bonus Value:</span>
                          <span className="font-bold text-green-700">{formatPrice(calculateTotalValue().bonusValue)}</span>
                        </div>
                        
                        <div className="border-t border-charcoal/20 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Total Value:</span>
                            <span className="text-2xl font-bold">{formatPrice(calculateTotalValue().totalValue)}</span>
                          </div>
                        </div>
                        
                        <div className="bg-charcoal/10 p-3 rounded-lg text-center">
                          <div className="text-sm">You Save</div>
                          <div className="text-xl font-bold text-green-700">
                            {formatPrice(calculateTotalValue().bonusValue)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple steps to start your gold savings journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.step} className="text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold to-gold/30" />
                  )}
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center text-charcoal font-bold text-xl mx-auto mb-4 relative z-10">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gradient-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Why Choose Our Schemes
              </h2>
              <p className="text-lg text-muted-foreground">
                Designed with your financial goals and convenience in mind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="card-luxury text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-charcoal" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-muted-foreground">
                Real experiences from our satisfied scheme members
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                      ))}
                    </div>
                    
                    <blockquote className="text-foreground mb-4 italic">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.scheme}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gradient-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about our gold savings schemes
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-ink text-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-display font-playfair text-ivory mb-4">
              Ready to Start Your Gold Savings Journey?
            </h2>
            <p className="text-lg text-ivory/80 mb-8">
              Join thousands of satisfied customers who have built their gold corpus with our trusted schemes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="hero">
                    Join Now
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start Your Gold Savings Plan</DialogTitle>
                  </DialogHeader>
                  {/* Reuse the same form as in scheme cards */}
                  <div className="text-sm text-muted-foreground">
                    Fill out the form to get started with any of our gold savings schemes.
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button size="lg" variant="outline-gold">
                Calculate Savings
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schemes;