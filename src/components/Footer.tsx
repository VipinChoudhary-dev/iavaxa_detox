export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-6 mt-20">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-serif font-bold text-gold">J</span>
            <span className="text-xl font-serif font-semibold tracking-widest">IAVAXA</span>
          </div>
          <p className="text-sm opacity-75">
            Natural overnight wellness, crafted with herbal ingredients for a refreshed you.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#how">How It Works</a></li>
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#calculator">Reseller Margin</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gold">Contact</h4>
          <p className="text-sm opacity-80">sanctuarystriker@gmail.com</p>
          <p className="text-xs opacity-70 mt-2">For order queries, contact us via email above.</p>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl mt-10 pt-6 border-t border-white/10 text-xs opacity-60 text-center">
        © {new Date().getFullYear()} IAVAXA. All rights reserved.
      </div>
    </footer>
  );
}
