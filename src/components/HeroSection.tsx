import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Dark Background with subtle pattern */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial Glow Behind Content - Softer and larger */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] radial-glow opacity-40" />
      
      {/* Secondary ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Glassmorphism */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-hero mb-12 animate-fade-in border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">AI-Powered Nutrition Intelligence</span>
          </div>

          {/* Logo - Clean without ring */}
          <div className="flex justify-center mb-8 animate-scale-in">
            <div className="relative group">
              <img 
                src={livanaLogo} 
                alt="LIVANA Logo" 
                className="w-28 h-28 lg:w-36 lg:h-36 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              {/* Soft glow behind logo */}
              <div className="absolute inset-0 bg-primary/15 rounded-full blur-3xl -z-10 scale-150 animate-pulse-glow" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold leading-none mb-8 animate-slide-up tracking-tight">
            <span className="text-gradient">LIVANA</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-foreground mb-6 animate-slide-up delay-100">
            Fuel Your Best Self
          </p>

          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 animate-slide-up delay-200 leading-relaxed">
            Transform your health with AI-powered meal plans, smart nutrient analysis, 
            and personalized guidance — all designed for your unique goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300">
            <Link to="/auth">
              <Button variant="hero" size="xl" className="group min-w-[220px]">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="heroOutline" size="xl" className="min-w-[220px]">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Stats / Trust Section */}
          <div className="grid grid-cols-3 gap-8 lg:gap-16 max-w-2xl mx-auto mt-24 animate-fade-in delay-400">
            <div className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-2">10K+</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-2">500+</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase">Recipes</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-2">95%</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;