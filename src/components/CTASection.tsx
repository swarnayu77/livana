import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Personalized meal plans for your goals",
  "AI-powered nutrition coaching",
  "Smart recipe suggestions",
  "Progress tracking & insights",
];

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-accent/2 to-primary/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow opacity-30" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 tracking-tight">
            Ready to Transform Your
            <span className="block text-gradient mt-1">Nutrition Journey?</span>
          </h2>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Join thousands of users who are eating smarter, feeling better, 
            and achieving their health goals with LIVANA.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5"
              >
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
