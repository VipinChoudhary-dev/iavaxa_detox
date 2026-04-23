import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarginCalculator } from "@/components/MarginCalculator";
import heroBogo from "@/assets/hero-bogo.png";
import beforeAfter from "@/assets/before-after.png";
import wakeLighter from "@/assets/wake-lighter.png";
import howItWorks from "@/assets/how-it-works.png";
import betterSleep from "@/assets/better-sleep.png";
import tryTonight from "@/assets/try-tonight.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IAVAXA Detox Foot Patches — Buy 1 Get 1 Free | Natural Overnight Detox" },
      {
        name: "description",
        content:
          "Wake up feeling lighter with IAVAXA Detox Foot Patches. Buy 1 Get 1 Free — 2 boxes at ₹250. Natural herbal overnight detox. Lowest RTO. Reseller margin calculator inside.",
      },
      { property: "og:title", content: "IAVAXA Detox Foot Patches — Buy 1 Get 1 Free" },
      { property: "og:description", content: "Natural overnight detox. 2 boxes at ₹250. Set your own reseller margin." },
      { property: "og:image", content: heroBogo },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/30 rounded-full blur-3xl animate-shimmer" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-leaf/20 rounded-full blur-3xl animate-shimmer" />
        </div>
        <div className="container mx-auto px-6 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
                🌿 100% Herbal · Made for Overnight Wellness
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-[1.05] text-primary">
                Experience a <br />
                <span className="text-gradient-gold italic">Natural Detox</span> <br />
                Overnight
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Draw out impurities from your body while you sleep. Wake up lighter, refreshed,
                and energized — the ancient wisdom of foot detoxification, reimagined.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="bg-card rounded-2xl px-5 py-3 shadow-soft border border-border/60">
                  <div className="text-xs text-muted-foreground line-through">₹500</div>
                  <div className="text-3xl font-serif font-bold text-primary">₹250</div>
                  <div className="text-xs text-gold-deep font-semibold">for 2 boxes</div>
                </div>
                <div className="bg-gradient-gold rounded-2xl px-5 py-3 shadow-gold">
                  <div className="text-xs uppercase tracking-widest text-primary/80 font-bold">Special Offer</div>
                  <div className="text-2xl font-serif font-bold text-primary">BUY 1 GET 1 FREE</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/checkout" className="rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold shadow-elegant hover:scale-105 transition-transform">
                  Try It Tonight →
                </Link>
                <a href="#calculator" className="rounded-full border-2 border-primary/30 text-primary px-8 py-4 font-semibold hover:bg-primary/5 transition">
                  Reseller? Set Margin
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">✓ Cash on Delivery</span>
                <span className="flex items-center gap-2">✓ Lowest RTO ₹49</span>
                <span className="flex items-center gap-2">✓ Pan India Shipping</span>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-gold rounded-[3rem] blur-3xl opacity-30" />
              <img
                src={heroBogo}
                alt="IAVAXA Detox Foot Patches Buy 1 Get 1 Free — 2 boxes"
                className="relative rounded-[2rem] shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS - Before/After */}
      <section id="benefits" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-serif font-semibold text-primary">
              See the <span className="text-gradient-gold italic">Difference</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">One night. Visible results.</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-elegant border border-border/60">
            <img src={beforeAfter} alt="Before and after using detox foot patches" className="w-full" />
          </div>
        </div>
      </section>

      {/* FEATURE GRID using uploaded images */}
      <section id="how" className="py-24 px-6 bg-gradient-hero">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-gold-deep uppercase">The IAVAXA Ritual</span>
            <h2 className="mt-3 text-4xl md:text-6xl font-serif font-semibold text-primary">
              Wellness, Step by Step
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard img={wakeLighter} num="01" title="Wake Up Feeling Lighter" desc="Overnight foot detox using ancient herbal wisdom — apply, sleep, and feel the difference." />
            <FeatureCard img={howItWorks} num="02" title="How It Works" desc="Apply before sleep. Remove in the morning. The pad's color change shows the absorption process." />
            <FeatureCard img={betterSleep} num="03" title="Enjoy Better Sleep" desc="Better sleep, less fatigue, a more relaxed body — feel the difference from day one." />
            <FeatureCard img={tryTonight} num="04" title="Try It Tonight" desc="Limited stock available. 30-pad packs designed for a full month of overnight wellness." />
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-gold-deep uppercase">How To Use</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-serif font-semibold text-primary">
                Three Simple Steps
              </h2>
              <ol className="mt-8 space-y-6">
                <Step n="1" title="Apply at night">Stick the patch to the bottom of your foot before sleep.</Step>
                <Step n="2" title="Leave overnight">Let it work for 7–12 hours while you rest.</Step>
                <Step n="3" title="Remove & feel lighter">Peel off in the morning. Wake up refreshed.</Step>
              </ol>
            </div>
            <div className="bg-gradient-leaf rounded-3xl p-10 text-primary-foreground shadow-elegant">
              <h3 className="text-2xl font-serif font-semibold text-gold mb-4">Key Benefits</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3"><span className="text-gold">✓</span> Supports natural detoxification</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> Promotes deeper, calmer sleep</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> Helps reduce fatigue</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> 100% herbal ingredients</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> Easy home wellness ritual</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> Visible color-change results</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MARGIN CALCULATOR */}
      <MarginCalculator />

      {/* LONG DESCRIPTION */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-primary">
            Ancient Wisdom, <span className="text-gradient-gold italic">Modern Living</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Introducing IAVAXA Detox Foot Patches — your natural companion on the journey to a
            refreshed and revitalized you. Harnessing the wisdom of traditional foot detoxification,
            these patches gently support your body's natural processes while you sleep, helping you
            feel rejuvenated from within.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Each patch is crafted with a blend of natural herbal ingredients traditionally known for
            their supportive properties. Regular use can help boost energy levels, support overall
            well-being, and create a calming nighttime routine.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-gradient-hero">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-center text-4xl md:text-5xl font-serif font-semibold text-primary mb-12">
            Frequently Asked
          </h2>
          <div className="space-y-4">
            <Faq q="What's included in the Buy 1 Get 1 Free offer?">
              You get 2 full boxes of IAVAXA Detox Foot Patches for just ₹250. That's twice the wellness at half the price.
            </Faq>
            <Faq q="How long does delivery take?">
              Orders are usually delivered within 4–7 business days across India. Cash on Delivery available.
            </Faq>
            <Faq q="What is the RTO charge for resellers?">
              Just ₹49 per RTO — one of the lowest in the industry. And if the parcel is later not returned to the customer within the eligible window, the RTO charge is refunded back to you.
            </Faq>
            <Faq q="Are the patches safe?">
              Yes. They're made with natural herbal ingredients and designed for external overnight use only.
            </Faq>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center bg-gradient-leaf text-primary-foreground rounded-[2.5rem] p-12 md:p-16 shadow-elegant relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
          <h2 className="relative text-4xl md:text-6xl font-serif font-semibold">
            Try It <span className="text-gradient-gold italic">Tonight</span>
          </h2>
          <p className="relative mt-4 text-lg opacity-90">Limited stock — Buy 1 Get 1 Free at just ₹250</p>
          <Link
            to="/checkout"
            className="relative inline-block mt-8 rounded-full bg-gradient-gold px-10 py-4 font-bold text-primary shadow-gold hover:scale-105 transition-transform"
          >
            Order Now — Cash on Delivery
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ img, num, title, desc }: { img: string; num: string; title: string; desc: string }) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden shadow-soft border border-border/60 hover:shadow-elegant transition-shadow">
      <img src={img} alt={title} className="w-full aspect-square object-cover" />
      <div className="p-6">
        <div className="text-xs font-bold text-gold-deep tracking-widest">{num}</div>
        <h3 className="mt-1 text-2xl font-serif font-semibold text-primary">{title}</h3>
        <p className="mt-2 text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center font-serif font-bold text-primary text-xl shadow-gold">
        {n}
      </span>
      <div>
        <h4 className="font-serif text-xl font-semibold text-primary">{title}</h4>
        <p className="text-muted-foreground mt-1">{children}</p>
      </div>
    </li>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group bg-card rounded-2xl border border-border/60 p-5 shadow-soft">
      <summary className="cursor-pointer flex justify-between items-center font-serif text-xl font-semibold text-primary list-none">
        {q}
        <span className="text-gold-deep group-open:rotate-45 transition-transform text-2xl">+</span>
      </summary>
      <p className="mt-3 text-muted-foreground leading-relaxed">{children}</p>
    </details>
  );
}
