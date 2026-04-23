import { useState } from "react";
import { Link } from "@tanstack/react-router";

const PRODUCT_COST = 250;
const RTO_CHARGE = 49;
const MIN_PRICE = PRODUCT_COST + 1;

export function MarginCalculator() {
  const [priceInput, setPriceInput] = useState("500");
  const parsed = Number(priceInput) || 0;
  const sellingPrice = Math.max(parsed, 0);
  const validPrice = sellingPrice >= MIN_PRICE ? sellingPrice : MIN_PRICE;

  const margin = validPrice - PRODUCT_COST;
  const profitIfDelivered = margin;
  const lossIfRTO = RTO_CHARGE;
  const refundAfterReturn = margin + RTO_CHARGE;

  return (
    <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-hero">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            For Resellers & Dropshippers
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-semibold text-primary">
            Set Your Own <span className="text-gradient-gold italic">Margin</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We charge ₹{PRODUCT_COST} per order + ₹{RTO_CHARGE} RTO (one of the lowest in India).
            You decide the final selling price and pocket the rest.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Calculator inputs */}
          <div className="bg-card rounded-3xl p-5 sm:p-8 shadow-elegant border border-border/60">
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-primary mb-5 sm:mb-6">
              Your Selling Price
            </h3>

            <div className="space-y-5 sm:space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label className="text-sm font-medium text-muted-foreground">
                    Final price to customer
                  </label>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-primary">
                    ₹{validPrice}
                  </div>
                </div>
                <input
                  type="range"
                  min={MIN_PRICE}
                  max={1500}
                  step={1}
                  value={validPrice}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full accent-[oklch(0.62_0.13_70)]"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹{MIN_PRICE}</span>
                  <span>₹1500</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Or type exact amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value.replace(/[^0-9]/g, ""))}
                    onBlur={() => {
                      if (parsed < MIN_PRICE) setPriceInput(String(MIN_PRICE));
                    }}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-input bg-background text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                {parsed > 0 && parsed < MIN_PRICE && (
                  <p className="mt-2 text-xs text-destructive">
                    Minimum selling price is ₹{MIN_PRICE}
                  </p>
                )}
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 text-base font-semibold shadow-soft active:scale-95 transition-transform w-full"
              >
                Place an Order at ₹{validPrice} →
              </Link>

              <div className="pt-4 border-t border-border space-y-2 text-sm">
                <Row label="Product cost" value={`₹${PRODUCT_COST}`} />
                <Row label="RTO charge (lowest possible)" value={`₹${RTO_CHARGE}`} />
                <Row label="Includes Buy 1 Get 1 Free" value="2 boxes" highlight />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-leaf rounded-3xl p-5 sm:p-8 text-primary-foreground shadow-elegant relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
            <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-5 sm:mb-6 relative">Your Earnings</h3>

            <div className="relative space-y-6">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-xs uppercase tracking-widest text-gold opacity-90">
                  ✓ If order is delivered
                </div>
                <div className="mt-2 text-5xl font-serif font-bold text-gradient-gold">
                  ₹{profitIfDelivered}
                </div>
                <div className="mt-1 text-sm opacity-80">profit per order in your pocket</div>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="text-xs uppercase tracking-widest opacity-80">
                  If order returns (RTO)
                </div>
                <div className="mt-2 text-2xl font-serif font-semibold">
                  Only −₹{lossIfRTO} loss
                </div>
                <div className="mt-1 text-sm opacity-80">
                  And if the customer doesn't return it later, the ₹{RTO_CHARGE} RTO is
                  refunded — your earning becomes
                  <span className="font-bold text-gold"> ₹{refundAfterReturn}</span>.
                </div>
              </div>

              <div className="text-xs opacity-70 leading-relaxed">
                * RTO refund is processed when the parcel is undelivered &amp; not returned to customer
                within the eligible window. One of the lowest RTO charges in the industry.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "font-semibold text-gold-deep" : "font-medium text-foreground"}>
        {value}
      </span>
    </div>
  );
}
