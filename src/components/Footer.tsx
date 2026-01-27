import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/30 relative bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={livanaLogo} 
              alt="LIVANA" 
              className="h-9 w-9 group-hover:scale-105 transition-transform" 
            />
            <span className="text-lg font-display font-bold text-gradient tracking-tight">LIVANA</span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <a href="/#features" className="hover:text-foreground transition-colors">Features</a>
            <Link to="/meal-plans" className="hover:text-foreground transition-colors">Meal Plans</Link>
            <Link to="/coach" className="hover:text-foreground transition-colors">AI Coach</Link>
            <Link to="/recipes" className="hover:text-foreground transition-colors">Recipes</Link>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>for healthier living</span>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
          © 2026 LIVANA. All rights reserved. Your AI nutrition companion.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
