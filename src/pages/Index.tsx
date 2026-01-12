import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GoalsSection from "@/components/GoalsSection";
import MealPlanPreview from "@/components/MealPlanPreview";
import AICoachPreview from "@/components/AICoachPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <GoalsSection />
        <MealPlanPreview />
        <AICoachPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
