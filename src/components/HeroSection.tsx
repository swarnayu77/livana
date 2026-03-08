import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressRing from "@/components/ProgressRing";

const HeroSection = () => {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Soft ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Text */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/12 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-xs font-medium text-primary">AI-Powered Health Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.08] mb-6 animate-fade-up delay-100 opacity-0">
            Fuel Your
            <br />
            <span className="text-gradient">Best Self</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-up delay-200 opacity-0">
            Transform your health with AI-powered meal plans, smart nutrient analysis, and personalized coaching — all designed for your unique goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 animate-fade-up delay-300 opacity-0">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="rounded-full text-sm px-8 btn-glow-hover group">
                Start Free Today
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a href="/#features">
              <Button variant="outline" size="lg" className="rounded-full text-sm px-8">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 pt-8 border-t border-border animate-fade-up delay-400 opacity-0">
            <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto lg:mx-0">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "500+", label: "Recipes" },
                { value: "95%", label: "Success Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Health Rings Dashboard */}
        <div className="hidden lg:flex items-center justify-center animate-scale-in delay-300 opacity-0">
          <div className="relative">
            {/* Glass card container */}
            <div className="glass-card rounded-3xl p-10 glow-soft">
              <div className="flex flex-col items-center gap-8">
                {/* Main ring */}
                <div className="relative">
                  <ProgressRing value={78} size={160} strokeWidth={10} label="78%" sublabel="Health Score" />
                </div>

                {/* Sub rings */}
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <ProgressRing value={85} size={72} strokeWidth={6} color="hsl(var(--primary))" label="85" />
                    <span className="text-[11px] text-muted-foreground font-medium">Protein</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ProgressRing value={62} size={72} strokeWidth={6} color="hsl(var(--accent))" label="62" />
                    <span className="text-[11px] text-muted-foreground font-medium">Carbs</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ProgressRing value={91} size={72} strokeWidth={6} color="hsl(152 60% 60%)" label="91" />
                    <span className="text-[11px] text-muted-foreground font-medium">Hydration</span>
                  </div>
                </div>

                {/* Quick stat bar */}
                <div className="w-full grid grid-cols-2 gap-3">
                  <div className="px-4 py-3 rounded-xl bg-secondary/60 text-center">
                    <p className="text-lg font-bold text-foreground">1,840</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Calories</p>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-secondary/60 text-center">
                    <p className="text-lg font-bold text-foreground">7/8</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Glasses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg animate-float-subtle">
              ✨ On Track!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
