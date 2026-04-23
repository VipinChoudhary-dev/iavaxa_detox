import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-gold-deep">J</span>
          <span className="text-xl font-serif font-semibold tracking-widest text-primary">
            IAVAXA
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <a href="#how" className="hover:text-primary transition">How it works</a>
          <a href="#benefits" className="hover:text-primary transition">Benefits</a>
          <a href="#calculator" className="hover:text-primary transition">Reseller Margin</a>
          <a href="#faq" className="hover:text-primary transition">FAQ</a>
        </nav>
        <Link
          to="/checkout"
          className="rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-primary shadow-gold hover:scale-105 transition-transform"
        >
          Order Now
        </Link>
      </div>
    </header>
  );
}
