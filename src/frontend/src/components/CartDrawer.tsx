import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQty,
    totalItems,
    totalPrice,
    isDrawerOpen,
    setDrawerOpen,
  } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md flex flex-col p-0 bg-[oklch(0.11_0.07_275)] border-l border-[oklch(0.65_0.29_310/0.25)]"
          data-ocid="cart.sheet"
          style={{ boxShadow: "-8px 0 40px oklch(0.65 0.29 310 / 0.12)" }}
        >
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-[oklch(0.65_0.29_310/0.2)] bg-[oklch(0.13_0.07_275/0.8)]">
            <SheetTitle className="text-xl font-extrabold font-display flex items-center gap-2 text-cream">
              <div className="w-9 h-9 rounded-xl bg-[oklch(0.65_0.29_310/0.15)] border border-[oklch(0.65_0.29_310/0.35)] flex items-center justify-center shadow-[0_0_12px_oklch(0.65_0.29_310/0.2)]">
                <ShoppingBag className="w-4.5 h-4.5 text-[oklch(0.65_0.29_310)]" />
              </div>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Your Cart
              </span>
              {totalItems > 0 && (
                <span className="ml-auto text-xs font-bold text-[oklch(0.65_0.29_310)] bg-[oklch(0.65_0.29_310/0.12)] border border-[oklch(0.65_0.29_310/0.3)] rounded-pill px-2.5 py-1">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div
              className="flex-1 flex flex-col items-center justify-center gap-5 px-6 py-12"
              data-ocid="cart.empty_state"
            >
              <div className="w-24 h-24 rounded-full bg-[oklch(0.65_0.29_310/0.08)] border border-[oklch(0.65_0.29_310/0.2)] flex items-center justify-center shadow-[0_0_30px_oklch(0.65_0.29_310/0.1)] animate-float">
                <span className="text-5xl">🍦</span>
              </div>
              <div className="text-center">
                <p className="font-extrabold text-cream text-lg font-display">
                  Your cart is empty
                </p>
                <p className="text-cream/50 text-sm mt-1.5">
                  Add some delicious scoops to get started!
                </p>
              </div>
              <Button
                onClick={() => setDrawerOpen(false)}
                variant="outline"
                className="rounded-pill border-2 border-[oklch(0.65_0.29_310/0.5)] text-[oklch(0.65_0.29_310)] bg-transparent font-bold hover:bg-[oklch(0.65_0.29_310/0.12)] hover:border-[oklch(0.65_0.29_310)] transition-all hover:shadow-[0_0_16px_oklch(0.65_0.29_310/0.3)]"
                data-ocid="cart.close_button"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 px-5 py-4">
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={item.flavorId.toString()}
                      className="flex items-center gap-3 bg-[oklch(0.16_0.06_275/0.6)] border border-[oklch(0.65_0.29_310/0.15)] rounded-2xl p-3.5 backdrop-blur-sm transition-all duration-200 hover:border-[oklch(0.65_0.29_310/0.3)] hover:bg-[oklch(0.16_0.06_275/0.8)]"
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      {/* Item info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-cream leading-tight truncate">
                          {item.flavorName}
                        </p>
                        <p
                          className="font-bold text-xs mt-0.5"
                          style={{ color: "oklch(0.84 0.18 85)" }}
                        >
                          ₹{item.price.toFixed(0)} each
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.flavorId, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full bg-[oklch(0.20_0.06_275)] border border-[oklch(0.65_0.29_310/0.25)] flex items-center justify-center hover:bg-[oklch(0.65_0.29_310/0.2)] hover:border-[oklch(0.65_0.29_310)] transition-all text-cream/70 hover:text-cream"
                          aria-label="Decrease quantity"
                          data-ocid={`cart.item.${idx + 1}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-extrabold text-sm text-cream">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.flavorId, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full bg-[oklch(0.20_0.06_275)] border border-[oklch(0.65_0.29_310/0.25)] flex items-center justify-center hover:bg-[oklch(0.65_0.29_310/0.2)] hover:border-[oklch(0.65_0.29_310)] transition-all text-cream/70 hover:text-cream"
                          aria-label="Increase quantity"
                          data-ocid={`cart.item.${idx + 1}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total + remove */}
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className="font-extrabold text-sm"
                          style={{ color: "oklch(0.84 0.18 85)" }}
                        >
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.flavorId)}
                          className="text-cream/30 hover:text-[oklch(0.63_0.27_345)] transition-colors"
                          aria-label="Remove item"
                          data-ocid={`cart.delete_button.${idx + 1}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="px-5 py-5 border-t border-[oklch(0.65_0.29_310/0.2)] space-y-4 bg-[oklch(0.13_0.07_275/0.8)]">
                <div className="flex items-center justify-between">
                  <span className="text-cream/60 font-semibold text-sm">
                    Total
                  </span>
                  <span
                    className="text-2xl font-black font-display"
                    style={{ color: "oklch(0.84 0.18 85)" }}
                  >
                    ₹{totalPrice.toFixed(0)}
                  </span>
                </div>
                <p className="text-xs text-cream/30">
                  Advance payment required · Party orders only
                </p>
                <Button
                  className="w-full rounded-pill border-0 text-cream font-bold py-6 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-[oklch(0.65_0.29_310)] to-[oklch(0.63_0.27_345)] hover:shadow-[0_0_24px_oklch(0.65_0.29_310/0.5),0_0_48px_oklch(0.65_0.29_310/0.2)]"
                  onClick={() => {
                    setDrawerOpen(false);
                    setCheckoutOpen(true);
                  }}
                  data-ocid="cart.primary_button"
                >
                  Proceed to Checkout →
                </Button>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full text-center text-sm text-cream/40 hover:text-cream/70 font-semibold transition-colors"
                  data-ocid="cart.close_button"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
}
