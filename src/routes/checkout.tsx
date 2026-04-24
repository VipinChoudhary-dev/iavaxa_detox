import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import heroBogo from "@/assets/hero-bogo.png";
import paymentQr from "@/assets/payment-qr.png";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — IAVAXA Detox Foot Patches" },
      { name: "description", content: "Complete your order. Buy 1 Get 1 Free at ₹250. Pay only ₹49 advance RTO via UPI." },
    ],
  }),
  component: Checkout,
});

type Step = "form" | "qr" | "thankyou";

function Checkout() {
  const [step, setStep] = useState<Step>("form");
  const [customer, setCustomer] = useState({
    name: "", phone: "", address: "", city: "", state: "", pincode: "",
  });
  const [dropshipper, setDropshipper] = useState({
    name: "", phone: "", upi: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateCustomer = (k: string, v: string) => setCustomer((f) => ({ ...f, [k]: v }));
  const updateDropshipper = (k: string, v: string) => setDropshipper((f) => ({ ...f, [k]: v }));

  const onContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("qr");
  };

  const onPlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: customer.name,
            customer_phone: customer.phone,
            customer_address: customer.address,
            customer_city: customer.city,
            customer_state: customer.state,
            customer_pincode: customer.pincode,
            dropshipper_name: dropshipper.name,
            dropshipper_phone: dropshipper.phone,
            dropshipper_upi: dropshipper.upi,
            status: 'pending',
          }
        ]);
        
      if (error) {
        console.error("Error inserting order: ", error);
        alert("Failed to save order. Please check configuration & credentials.");
        return;
      }

      setStep("thankyou");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Unexpected error: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-primary text-center">
          Secure <span className="text-gradient-gold italic">Checkout</span>
        </h1>
        <p className="text-center text-sm sm:text-base text-muted-foreground mt-2 px-2">
          Fill customer & dropshipper details. Pay only ₹49 advance RTO.
        </p>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-8 sm:mt-12">
          <form onSubmit={onContinue} className="lg:col-span-2 space-y-5">
            {/* Customer Details */}
            <div className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-elegant border border-border/60 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-primary font-bold text-sm">1</span>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-primary">Customer Details</h2>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">The real person who'll receive the parcel</p>

              <Field label="Customer Full Name" required>
                <input required value={customer.name} onChange={(e) => updateCustomer("name", e.target.value)}
                  placeholder="Customer's full name" className="input" />
              </Field>

              <Field label="Customer Phone Number" required>
                <input required type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10}
                  value={customer.phone} onChange={(e) => updateCustomer("phone", e.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit mobile number" className="input" />
              </Field>

              <Field label="Full Delivery Address" required>
                <textarea required rows={3} value={customer.address} onChange={(e) => updateCustomer("address", e.target.value)}
                  placeholder="House no, street, area, landmark" className="input resize-none" />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Field label="City" required>
                  <input required value={customer.city} onChange={(e) => updateCustomer("city", e.target.value)} className="input" />
                </Field>
                <Field label="State" required>
                  <input required value={customer.state} onChange={(e) => updateCustomer("state", e.target.value)} className="input" />
                </Field>
                <Field label="Pincode" required>
                  <input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6}
                    value={customer.pincode} onChange={(e) => updateCustomer("pincode", e.target.value.replace(/\D/g, ""))}
                    className="input" />
                </Field>
              </div>
            </div>

            {/* Dropshipper Details */}
            <div className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-elegant border border-border/60 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-primary font-bold text-sm">2</span>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-primary">Your Details (Dropshipper)</h2>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">For order updates & RTO refund</p>

              <Field label="Your Full Name" required>
                <input required value={dropshipper.name} onChange={(e) => updateDropshipper("name", e.target.value)}
                  placeholder="Your full name" className="input" />
              </Field>

              <Field label="Your Phone Number" required>
                <input required type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10}
                  value={dropshipper.phone} onChange={(e) => updateDropshipper("phone", e.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit mobile number" className="input" />
              </Field>

              <Field label="Your UPI ID (Optional)">
                <input value={dropshipper.upi} onChange={(e) => updateDropshipper("upi", e.target.value)}
                  placeholder="yourname@upi (for refunds)" className="input" />
              </Field>
            </div>

            <button type="submit"
              className="w-full rounded-full bg-gradient-leaf text-primary-foreground py-4 font-semibold text-base sm:text-lg shadow-elegant active:scale-[0.99] transition-transform">
              Continue →
            </button>

            <p className="text-xs text-muted-foreground text-center px-2">
              For further communication regarding your order, contact at email{" "}
              <a href="mailto:sanctuarystriker@gmail.com" className="text-primary font-semibold underline">sanctuarystriker@gmail.com</a>
            </p>
          </form>

          {/* Order Summary */}
          <aside className="bg-gradient-hero rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-soft border border-border/60 h-fit lg:sticky lg:top-24 order-first lg:order-last">
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-primary mb-4">Your Order</h3>

            <div className="flex gap-3 sm:gap-4 pb-4 border-b border-border">
              <img src={heroBogo} alt="Detox Foot Patches" className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-serif font-semibold text-primary text-sm sm:text-base">Detox Foot Patches</div>
                <div className="text-xs text-gold-deep font-bold mt-1">BUY 1 GET 1 FREE</div>
                <div className="text-xs text-muted-foreground">2 boxes × 10 pads</div>
              </div>
            </div>

            <div className="py-4 space-y-2 text-sm border-b border-border">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹500</span></div>
              <div className="flex justify-between text-gold-deep"><span>BOGO Discount</span><span>−₹250</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-leaf font-semibold">FREE</span></div>
            </div>

            <div className="flex justify-between items-baseline pt-4">
              <span className="font-serif text-base sm:text-lg font-semibold text-primary">Order Total</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-primary">₹250</span>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-gold/10 border border-gold/30">
              <div className="text-xs font-semibold text-primary">Pay Now (Advance RTO)</div>
              <div className="font-serif text-2xl font-bold text-gold-deep">₹49 only</div>
              <div className="text-[11px] text-muted-foreground mt-1">Customer pays ₹250 on delivery (COD)</div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-xs text-primary leading-relaxed">
                <span className="font-semibold block mb-1">Why ₹49 Advance?</span>
                To ensure smooth delivery and minimize order returns (RTO), our team will personally contact each customer to verify their details before dispatch.
              </p>
              <p className="text-xs text-primary leading-relaxed mt-2">
                This extra verification step helps us maintain one of the lowest RTO rates in the market, ensuring higher delivery success and better profitability for you.
              </p>
            </div>

            <div className="mt-5 space-y-1.5 text-xs text-muted-foreground">
              <div>✓ 100% Herbal &amp; Safe</div>
              <div>✓ Lowest RTO ₹49 (Resellers)</div>
              <div>✓ Pan India Shipping</div>
            </div>

            <div className="mt-4 pt-4 border-t border-border text-[11px] text-muted-foreground leading-relaxed">
              For further communication regarding your order, contact at email{" "}
              <a href="mailto:sanctuarystriker@gmail.com" className="text-primary font-semibold">sanctuarystriker@gmail.com</a>
            </div>
          </aside>
        </div>
      </section>
      <Footer />

      {/* QR PAYMENT MODAL */}
      {step === "qr" && (
        <Modal onClose={() => setStep("form")}>
          <div className="text-center">
            <p className="text-sm font-semibold text-primary mb-1">
              Please fill customer and dropshipper details before payment
            </p>
            <h3 className="font-serif text-2xl font-bold text-primary mt-2">
              Pay ₹49 Advance RTO
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Scan the QR with any UPI app</p>

            <div className="my-5 mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-4 border-gold/30 shadow-elegant bg-white p-2">
              <img src={paymentQr} alt="UPI Payment QR Code" className="w-full h-full object-contain" />
            </div>

            <div className="text-xs text-muted-foreground mb-4">
              Customer pays ₹250 on delivery. You only pay ₹49 RTO advance now.
            </div>

            <button
              onClick={onPlaceOrder}
              disabled={isSubmitting}
              className="w-full rounded-full bg-gradient-leaf text-primary-foreground py-4 font-semibold text-base sm:text-lg shadow-elegant active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
            <button
              onClick={() => setStep("form")}
              className="mt-3 text-xs text-muted-foreground underline"
            >
              ← Back to details
            </button>
          </div>
        </Modal>
      )}

      {/* THANK YOU MODAL */}
      {step === "thankyou" && (
        <Modal onClose={() => setStep("form")} dismissible={false}>
          <div className="text-center py-2">
            <div className="text-5xl mb-3">🌿</div>
            <h3 className="font-serif text-3xl font-bold text-primary">
              Thank You for <span className="text-gradient-gold italic">Shopping</span> with Us!
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Your order for <strong className="text-primary">{customer.name || "the customer"}</strong> has been placed.
              We'll dispatch shortly to <strong>{customer.pincode || "your address"}</strong>.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-gradient-hero border border-border/60 text-xs text-muted-foreground leading-relaxed">
              For further communication regarding your order, contact at email{" "}
              <a href="mailto:sanctuarystriker@gmail.com" className="text-primary font-semibold">sanctuarystriker@gmail.com</a>
            </div>

            <Link
              to="/"
              className="inline-block mt-6 w-full rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold active:scale-[0.99]"
            >
              Back to Home
            </Link>
          </div>
        </Modal>
      )}

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--input);
          background: var(--background);
          font-size: 16px;
          outline: none;
          transition: all 0.15s;
        }
        .input:focus {
          border-color: var(--ring);
          box-shadow: 0 0 0 3px oklch(0.72 0.13 75 / 0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary mb-1.5 block">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

function Modal({ children, onClose, dismissible = true }: { children: React.ReactNode; onClose: () => void; dismissible?: boolean }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in"
      onClick={dismissible ? onClose : undefined}
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-elegant max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
