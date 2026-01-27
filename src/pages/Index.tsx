import { useState, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GoalsSection from "@/components/GoalsSection";
import MealPlanPreview from "@/components/MealPlanPreview";
import AICoachPreview from "@/components/AICoachPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [sidebarWidth, setSidebarWidth] = useState(220);

  useEffect(() => {
    const checkSidebar = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth);
      }
    };
    
    checkSidebar();
    const observer = new MutationObserver(checkSidebar);
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }
    
    window.addEventListener('resize', checkSidebar);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkSidebar);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main 
        className="transition-all duration-300 ease-out min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="max-w-6xl mx-auto">
          <HeroSection />
        </div>
        <FeaturesSection />
        <GoalsSection />
        <MealPlanPreview />
        <AICoachPreview />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
