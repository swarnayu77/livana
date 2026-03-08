import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Recipes" },
  { value: "95%", label: "Success Rate" },
];

const HeroSection = () => {
  return (
    <section className="relative py-24 md:py-32 lg:py-40">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative text-center max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">AI-Powered Nutrition Intelligence</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6">
          Fuel Your Best Self
          <br />
          <span className="text-gradient">With LIVANA</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Transform your health with AI-powered meal plans, smart nutrient analysis,
          and personalized coaching — all designed for your unique goals.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="lg" className="group rounded-xl text-sm px-8">
              Start Free Today
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <a href="/#features">
            <Button variant="heroOutline" size="lg" className="rounded-xl text-sm px-8">
              <Play className="w-4 h-4 mr-2" />
              See How It Works
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-10 border-t border-border/20">
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-gradient">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
