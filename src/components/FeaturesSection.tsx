import { Bot, Utensils, Target, ChefHat, TrendingUp, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Utensils,
    title: "Smart Meal Plans",
    description: "AI-generated meal plans tailored to your dietary preferences, allergies, and nutritional goals.",
    href: "/meal-plans",
    highlight: "Popular"
  },
  {
    icon: Bot,
    title: "AI Coach",
    description: "24/7 personalized nutrition guidance from your AI health companion. Ask anything, anytime.",
    href: "/coach",
    highlight: "New"
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set and track your health goals with intelligent progress monitoring and adaptive recommendations.",
    href: "/goals",
  },
  {
    icon: ChefHat,
    title: "Recipe Library",
    description: "Explore 500+ healthy recipes with detailed nutrition info and step-by-step instructions.",
    href: "/recipes",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Visualize your health journey with beautiful charts and actionable insights.",
    href: "/progress",
  },
  {
    icon: FlaskConical,
    title: "Nutrient Analysis",
    description: "Deep dive into your daily nutrition with comprehensive macro and micronutrient breakdowns.",
    href: "/nutrient-analysis",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Comprehensive tools designed to transform your nutrition and health journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.href}
                className={cn(
                  "group relative p-6 rounded-2xl",
                  "bg-card/50 backdrop-blur-sm",
                  "border border-border/40",
                  "hover:bg-card/80 hover:border-primary/30",
                  "hover:shadow-xl hover:shadow-primary/5",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-1"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Highlight Badge */}
                {feature.highlight && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-primary/15 text-primary text-xs font-medium rounded-full border border-primary/20">
                    {feature.highlight}
                  </span>
                )}

                {/* Icon */}
                <div className="mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    "bg-primary/10 group-hover:bg-primary/15",
                    "transition-colors duration-300"
                  )}>
                    <Icon className="w-5 h-5 text-primary stroke-[1.5]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-semibold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
