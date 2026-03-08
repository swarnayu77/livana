import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/15 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <img src={livanaLogo} alt="LIVANA" className="h-8 w-8" />
              <span className="text-base font-display font-bold text-gradient">LIVANA</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered nutrition intelligence for a healthier you.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
            <div className="space-y-2.5">
              <a href="/#features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <Link to="/meal-plans" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Meal Plans</Link>
              <Link to="/coach" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">AI Coach</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <div className="space-y-2.5">
              <Link to="/recipes" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Recipes</Link>
              <Link to="/goals" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Goals</Link>
              <Link to="/progress" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Progress</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 LIVANA. All rights reserved.</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="w-3 h-3 text-primary fill-primary mx-0.5" /> for healthier living
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
