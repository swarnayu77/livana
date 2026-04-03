import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import livanaLogo from "@/assets/livana-logo.png";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-muted/40">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/" className="flex items-center gap-2.5 group">
                <img 
                  src={livanaLogo} 
                  alt="LIVANA" 
                  className="h-7 w-7 transition-transform duration-200 group-hover:scale-105" 
                />
                <span className="text-[15px] font-bold text-foreground tracking-[-0.02em]">LIVANA</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: "Tracker", href: "/tracker" },
                { label: "AI Coach", href: "/coach" },
                { label: "Consultation", href: "/consultation" },
                { label: "Scanner", href: "/scanner" },
              ].map(link => (
                <Link key={link.label} to={link.href} className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all duration-150">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user ? (
                <>
                  <Link to="/tracker">
                    <Button variant="ghost" size="sm" className="text-[13px] h-9 rounded-lg gap-2 px-3">
                      <User className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="h-9 rounded-lg px-2.5" onClick={handleSignOut}>
                    <LogOut className="w-3.5 h-3.5" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm" className="text-[13px] h-9">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button size="sm" className="text-[13px] h-9 rounded-lg px-5 font-medium">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-[84px] pb-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              {subtitle || "LIVANA"}
            </p>
            <h1 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-foreground">
              {title}
            </h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
