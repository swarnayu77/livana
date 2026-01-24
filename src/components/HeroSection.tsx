import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroFood from "@/assets/hero-food.jpg";
import livanaLogo from "@/assets/livana-logo-new.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Premium Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroFood}
          alt="Healthy food"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      {/* Radial Glow Behind Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] radial-glow-intense opacity-60 animate-pulse-glow" />

      {/* Floating Glow Elements */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-subtle" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-float-subtle delay-200" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Glassmorphism */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-hero mb-10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">AI-Powered Nutrition Intelligence</span>
          </div>

          {/* Logo Icon */}
          <div className="flex justify-center mb-6 animate-scale-in">
            <div className="relative">
              <img 
                src={livanaLogo} 
                alt="LIVANA Logo" 
                className="w-24 h-24 lg:w-32 lg:h-32 drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl -z-10 animate-pulse-glow-intense" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold leading-none mb-6 animate-slide-up tracking-tight">
            <span className="text-gradient drop-shadow-lg">LIVANA</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-foreground mb-5 animate-slide-up delay-100">
            Fuel Your Best Self
          </p>

          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up delay-200 leading-relaxed">
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
          <div className="grid grid-cols-3 gap-6 lg:gap-12 max-w-xl mx-auto mt-20 animate-fade-in delay-400">
            <div className="text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-1">10K+</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide uppercase">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-1">500+</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide uppercase">Recipes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-1">95%</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide uppercase">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;