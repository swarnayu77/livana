import { Link } from "react-router-dom";
import { 
  Brain, 
  ChefHat, 
  LineChart, 
  MessageCircle, 
  Salad, 
  Sparkles,
  Zap,
  Shield,
  Clock,
  Target
} from "lucide-react";

const features = [
  {
    icon: Salad,
    title: "Personalized Meal Plans",
    description: "Daily plans tailored to your goals, dietary preferences, and restrictions with balanced macronutrients.",
    href: "/meal-plans",
    highlights: ["7-Day Plans", "Grocery Lists", "Macro Tracking"],
    gradient: "from-primary/20 to-accent/10"
  },
  {
    icon: Brain,
    title: "Smart Nutrient Analysis",
    description: "Analyze any meal for calories, macros, vitamins, and get personalized improvement suggestions.",
    href: "/nutrient-analysis",
    highlights: ["Photo Analysis", "Instant Results", "AI Insights"],
    gradient: "from-accent/20 to-primary/10"
  },
  {
    icon: ChefHat,
    title: "Recipe Suggestions",
    description: "Get easy, healthy recipes based on ingredients you have, with nutritional highlights.",
    href: "/recipes",
    highlights: ["500+ Recipes", "Dietary Filters", "Step-by-Step"],
    gradient: "from-primary/20 to-accent/10"
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Monitor your nutrition journey with gentle, encouraging feedback and adaptive recommendations.",
    href: "/progress",
    highlights: ["Visual Charts", "Weekly Reports", "Goal Tracking"],
    gradient: "from-accent/20 to-primary/10"
  },
  {
    icon: MessageCircle,
    title: "Mr. Livana AI Coach",
    description: "Chat with your personal nutrition assistant for guidance on food choices and healthy habits.",
    href: "/coach",
    highlights: ["24/7 Available", "Personalized Tips", "Real-time Chat"],
    gradient: "from-primary/20 to-accent/10"
  },
  {
    icon: Sparkles,
    title: "Goal-Adaptive AI",
    description: "Intelligence that adapts to weight loss, muscle gain, diabetes management, or general fitness.",
    href: "/goals",
    highlights: ["Smart Learning", "Auto-Adjust", "Custom Plans"],
    gradient: "from-accent/20 to-primary/10"
  },
];

const stats = [
  { icon: Zap, value: "10K+", label: "Active Users" },
  { icon: Shield, value: "99.9%", label: "Accuracy Rate" },
  { icon: Clock, value: "<2s", label: "Analysis Time" },
  { icon: Target, value: "85%", label: "Goal Achievement" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-accent/4 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 tracking-tight">
            Powered by <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            LIVANA combines advanced AI with nutrition science to help you achieve 
            your health goals sustainably.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-14">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-lg p-3 text-center group hover:border-primary/30 transition-all duration-300">
              <stat.icon className="w-4 h-4 text-primary mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xl font-heading font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.href}
              className="group glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {feature.description}
                </p>
                
                {/* Feature highlights */}
                <div className="flex flex-wrap gap-1.5">
                  {feature.highlights.map((highlight) => (
                    <span 
                      key={highlight}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
