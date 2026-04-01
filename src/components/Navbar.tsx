import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import livanaLogo from "@/assets/livana-logo-new.png";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Health Twin", href: "/health-twin" },
  { label: "Tracker", href: "/tracker" },
  { label: "AI Coach", href: "/coach" },
  { label: "Consultation", href: "/consultation" },
  { label: "Scanner", href: "/scanner" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={livanaLogo} alt="LIVANA" className="h-7 w-7 object-contain" />
            <span className="text-[15px] font-bold text-foreground tracking-tight">LIVANA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const el = (
                <span className={cn(
                  "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors duration-150",
                  active
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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

          {/* Right */}
          <div className="hidden md:flex items-center gap-1.5">
            <ThemeToggle />
            {user ? (
              <>
                <Link to="/tracker">
                  <Button variant="ghost" size="sm" className="text-[13px] h-8 rounded-lg gap-1.5 px-2.5">
                    <User className="w-3.5 h-3.5" />
                    {user.email?.split("@")[0] || "Dashboard"}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="h-8 rounded-lg px-2" onClick={handleSignOut}>
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-[13px] h-8 rounded-lg">Sign In</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="text-[13px] h-8 rounded-lg px-4">
                    Get Started <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-2xl">
          <div className="px-5 py-4 space-y-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const el = (
                <span onClick={() => setMobileOpen(false)} className={cn(
                  "block px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors",
                  active ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
            <div className="pt-4 flex flex-col gap-2 border-t border-border mt-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[13px] text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              {user ? (
                <>
                  <Link to="/tracker" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full rounded-lg gap-2 h-9 text-[13px]">
                      <User className="w-4 h-4" /> Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full rounded-lg gap-2 h-9 text-[13px]" onClick={() => { handleSignOut(); setMobileOpen(false); }}>
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full rounded-lg h-9 text-[13px]">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-lg h-9 text-[13px]">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
