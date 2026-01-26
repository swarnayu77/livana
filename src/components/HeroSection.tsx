import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Radial Glow - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] radial-glow opacity-35" />
      
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/6 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-accent/5 rounded-full blur-[80px]" />

      {/* Content - Full width centered */}
      <div className="w-full px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-hero mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">AI-Powered Nutrition Intelligence</span>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-5 animate-scale-in">
            <div className="relative group">
              <img 
                src={livanaLogo} 
                alt="LIVANA Logo" 
                className="w-20 h-20 lg:w-24 lg:h-24 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/12 rounded-full blur-2xl -z-10 scale-150 animate-pulse-glow" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-none mb-4 animate-slide-up tracking-tight">
            <span className="text-gradient">LIVANA</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4 animate-slide-up delay-100">
            Fuel Your Best Self
          </p>

          {/* Subheadline */}
          <p className="text-base text-muted-foreground max-w-lg mx-auto mb-8 animate-slide-up delay-200 leading-relaxed">
            Transform your health with AI-powered meal plans, smart nutrient analysis, 
            and personalized guidance — all designed for your unique goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up delay-300">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="group min-w-[160px]">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="heroOutline" size="lg" className="min-w-[160px]">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-14 animate-fade-in delay-400">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-gradient mb-1">10K+</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-gradient mb-1">500+</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Recipes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-gradient mb-1">95%</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;