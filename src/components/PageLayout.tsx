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
        <div className="max-w-[1120px] mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/50">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/" className="flex items-center gap-2 group">
                <img 
                  src={livanaLogo} 
                  alt="LIVANA" 
                  className="h-7 w-7 transition-transform duration-200 group-hover:scale-105" 
                />
                <span className="text-[15px] font-bold text-foreground tracking-tight">LIVANA</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-0.5">
              {[
                { label: "Tracker", href: "/tracker" },
                { label: "AI Coach", href: "/coach" },
                { label: "Consultation", href: "/consultation" },
                { label: "Scanner", href: "/scanner" },
              ].map(link => (
                <Link key={link.label} to={link.href} className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              {user ? (
                <>
                  <Link to="/tracker">
                    <Button variant="ghost" size="sm" className="text-[13px] h-8 rounded-lg gap-1.5 px-2.5">
                      <User className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="h-8 rounded-lg px-2" onClick={handleSignOut}>
                    <LogOut className="w-3.5 h-3.5" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm" className="text-[13px] h-8">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button size="sm" className="text-[13px] h-8 rounded-lg px-4">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-6">
          {/* Page Header */}
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-2">
              {subtitle || "LIVANA"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
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
