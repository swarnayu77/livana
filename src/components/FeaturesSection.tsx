import { Link } from "react-router-dom";
import { 
  Brain, 
  ChefHat, 
  LineChart, 
  MessageCircle, 
  Salad, 
  Sparkles 
} from "lucide-react";

const features = [
  {
    icon: Salad,
    title: "Personalized Meal Plans",
    description: "Daily plans tailored to your goals, dietary preferences, and restrictions with balanced macronutrients.",
    href: "/meal-plans"
  },
  {
    icon: Brain,
    title: "Smart Nutrient Analysis",
    description: "Analyze any meal for calories, macros, vitamins, and get personalized improvement suggestions.",
    href: "/nutrient-analysis"
  },
  {
    icon: ChefHat,
    title: "Recipe Suggestions",
    description: "Get easy, healthy recipes based on ingredients you have, with nutritional highlights.",
    href: "/recipes"
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Monitor your nutrition journey with gentle, encouraging feedback and adaptive recommendations.",
    href: "/progress"
  },
  {
    icon: MessageCircle,
    title: "AI Nutrition Coach",
    description: "Chat with your personal nutrition assistant for guidance on food choices and healthy habits.",
    href: "/coach"
  },
  {
    icon: Sparkles,
    title: "Goal-Adaptive AI",
    description: "Intelligence that adapts to weight loss, muscle gain, diabetes management, or general fitness.",
    href: "/goals"
  },
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
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Powered by <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            LIVANA combines advanced AI with nutrition science to help you achieve 
            your health goals sustainably.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.href}
              className="group glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
