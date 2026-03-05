import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Recipes" },
  { value: "95%", label: "Success Rate" },
];

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[calc(100vh-2rem)] py-24">
      {/* BG effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] radial-glow opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-hero mb-8">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground/70 tracking-wide">AI-Powered Nutrition Intelligence</span>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={livanaLogo} alt="LIVANA Logo" className="w-16 h-16 object-contain" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter leading-none mb-3">
          <span className="text-gradient">LIVANA</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4 tracking-tight">
          Fuel Your Best Self
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
          Transform your health with AI-powered meal plans, smart nutrient analysis, 
          and personalized guidance — all designed for your unique goals.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3">
          <Link to="/auth">
            <Button variant="hero" size="default" className="group h-10 px-6 text-sm rounded-lg">
              Start Your Journey
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <Link to="/#features">
            <Button variant="heroOutline" size="default" className="h-10 px-6 text-sm rounded-lg">
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-gradient">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
