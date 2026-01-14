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
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Powered by <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            LIVANA combines advanced AI with nutrition science to help you achieve 
            your health goals sustainably.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center group hover:border-primary/40 transition-all duration-300">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.href}
              className="group glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Feature highlights */}
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight) => (
                    <span 
                      key={highlight}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
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
