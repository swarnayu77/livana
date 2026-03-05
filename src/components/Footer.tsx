import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border/20 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={livanaLogo} alt="LIVANA" className="h-7 w-7" />
            <span className="text-sm font-display font-bold text-gradient">LIVANA</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <a href="/#features" className="hover:text-foreground transition-colors">Features</a>
            <Link to="/meal-plans" className="hover:text-foreground transition-colors">Meal Plans</Link>
            <Link to="/coach" className="hover:text-foreground transition-colors">AI Coach</Link>
            <Link to="/recipes" className="hover:text-foreground transition-colors">Recipes</Link>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="w-3 h-3 text-primary fill-primary" /> for healthier living
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/15 text-center text-[11px] text-muted-foreground">
          © 2026 LIVANA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
