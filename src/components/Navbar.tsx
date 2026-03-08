import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import livanaLogo from "@/assets/livana-logo-new.png";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Meal Plans", href: "/meal-plans" },
  { label: "Food Scanner", href: "/scanner" },
  { label: "AI Coach", href: "/coach" },
  { label: "Recipes", href: "/recipes" },
  { label: "Goals", href: "/goals" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={livanaLogo} alt="LIVANA" className="h-8 w-8 object-contain" />
            <span className="text-lg font-display font-bold text-gradient tracking-tight">LIVANA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const el = (
                <span className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  active ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}>
                  {link.label}
                </span>
              );
              return link.href.startsWith("/#") ? (
                <a key={link.label} href={link.href}>{el}</a>
              ) : (
                <Link key={link.label} to={link.href}>{el}</Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">Sign In</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="sm" className="text-sm rounded-lg">
                <Sparkles className="w-3.5 h-3.5 mr-1" />Get Started
              </Button>
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-2xl">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const el = (
                <span onClick={() => setMobileOpen(false)} className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}>
                  {link.label}
                </span>
              );
              return link.href.startsWith("/#") ? (
                <a key={link.label} href={link.href}>{el}</a>
              ) : (
                <Link key={link.label} to={link.href}>{el}</Link>
              );
            })}
            <div className="pt-3 flex flex-col gap-2">
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-center">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)}>
                <Button variant="hero" className="w-full justify-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
