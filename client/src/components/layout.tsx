import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PenSquare, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/support", label: "Support" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/10 selection:text-primary">
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-white/80 backdrop-blur-md border-border py-3 shadow-sm" : "bg-transparent border-transparent py-5"
      )}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              B
            </div>
            <span className="text-xl font-bold font-display tracking-tight">BlogGo</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/profile/demo-user">
              <Button variant="ghost" className="font-medium">Sign in</Button>
            </Link>
            <Link href="/editor/new">
              <Button variant="premium" className="gap-2">
                <PenSquare className="w-4 h-4" />
                Start Writing
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-muted",
                  location === link.href ? "bg-primary/5 text-primary" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <Link href="/profile/demo-user">
              <Button variant="ghost" className="w-full justify-start px-4">Sign in</Button>
            </Link>
            <Link href="/editor/new">
              <Button variant="default" className="w-full gap-2">
                <PenSquare className="w-4 h-4" />
                Start Writing
              </Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1 pt-24">
        {children}
      </main>

      <footer className="bg-muted/30 border-t border-border mt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
                  B
                </div>
                <span className="text-lg font-bold font-display">BlogGo</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Beautiful, fast, and simple publishing for everyone. Start your blog in seconds.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/editor/new" className="hover:text-primary transition-colors">Editor</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BlogGo Inc. All rights reserved.</p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
