import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-2.5">
              <img src={livanaLogo} alt="LIVANA" className="h-7 w-7" />
              <span className="text-[14px] font-bold text-foreground">LIVANA</span>
            </Link>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              AI-powered nutrition intelligence for a healthier you.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: [
                { label: "Features", href: "/#features" },
                { label: "Meal Plans", href: "/meal-plans" },
                { label: "AI Coach", href: "/coach" },
              ]
            },
            {
              title: "Resources",
              links: [
                { label: "Recipes", href: "/recipes" },
                { label: "Goals", href: "/goals" },
                { label: "Progress", href: "/progress" },
              ]
            },
            {
              title: "Company",
              links: [
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
                { label: "Contact", href: "#" },
              ]
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold text-foreground mb-3 uppercase tracking-wider">{col.title}</h4>
              <div className="space-y-2">
                {col.links.map(link => (
                  link.href.startsWith("/#") || link.href === "#" ? (
                    <a key={link.label} href={link.href} className="block text-[12px] text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>
                  ) : (
                    <Link key={link.label} to={link.href} className="block text-[12px] text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">© 2026 LIVANA. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            Made with <Heart className="w-3 h-3 text-primary fill-primary mx-0.5" /> for healthier living
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
