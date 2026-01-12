import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Personalized meal plans for your goals",
  "AI-powered nutrition coaching",
  "Smart recipe suggestions",
  "Progress tracking & insights",
];

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="block text-gradient mt-2">Nutrition Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who are eating smarter, feeling better, 
            and achieving their health goals with LIVANA.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 glass rounded-full px-4 py-2"
              >
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="group">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
