import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial Glow - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] radial-glow opacity-30 pointer-events-none" />
      
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="w-full max-w-3xl mx-auto px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-hero mb-10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80 tracking-tight">AI-Powered Nutrition Intelligence</span>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6 animate-scale-in">
            <div className="relative group">
              <img 
                src={livanaLogo} 
                alt="LIVANA Logo" 
                className="w-24 h-24 lg:w-28 lg:h-28 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10 scale-150 animate-pulse-glow" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-none mb-5 animate-slide-up tracking-tighter">
            <span className="text-gradient">LIVANA</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-5 animate-slide-up delay-100 tracking-tight">
            Fuel Your Best Self
          </p>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-slide-up delay-200 leading-relaxed">
            Transform your health with AI-powered meal plans, smart nutrient analysis, 
            and personalized guidance — all designed for your unique goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="group min-w-[180px] h-12 text-base rounded-xl">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="heroOutline" size="lg" className="min-w-[180px] h-12 text-base rounded-xl">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-10 max-w-lg mx-auto mt-16 animate-fade-in delay-400">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">10K+</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">500+</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Recipes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">95%</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
