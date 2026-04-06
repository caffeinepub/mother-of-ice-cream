import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
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
          className="w-full sm:max-w-md flex flex-col p-0"
          data-ocid="cart.sheet"
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
            <SheetTitle className="text-xl font-extrabold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Your Cart
              {totalItems > 0 && (
                <span className="ml-auto text-sm font-bold text-primary bg-primary/10 rounded-pill px-2.5 py-0.5">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div
              className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12"
              data-ocid="cart.empty_state"
            >
              <div className="text-6xl">🍦</div>
              <div className="text-center">
                <p className="font-extrabold text-foreground text-lg">
                  Your cart is empty
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Add some delicious scoops to get started!
                </p>
              </div>
              <Button
                onClick={() => setDrawerOpen(false)}
                variant="outline"
                className="rounded-pill border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
                data-ocid="cart.close_button"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 px-6 py-4">
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div
                      key={item.flavorId.toString()}
                      className="flex items-start gap-3 bg-muted/40 rounded-xl p-3"
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      {/* Item info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-sm text-foreground leading-tight">
                          {item.flavorName}
                        </p>
                        <p className="text-primary font-bold text-sm mt-0.5">
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
                          className="w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
                          aria-label="Decrease quantity"
                          data-ocid={`cart.item.${idx + 1}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-extrabold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.flavorId, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
                          aria-label="Increase quantity"
                          data-ocid={`cart.item.${idx + 1}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total + remove */}
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="font-extrabold text-sm text-foreground">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.flavorId)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
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
              <div className="px-6 py-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-semibold">
                    Subtotal
                  </span>
                  <span className="text-2xl font-black text-foreground">
                    ₹{totalPrice.toFixed(0)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Delivery charges will be calculated at checkout
                </p>
                <Button
                  className="w-full rounded-pill gradient-pink border-0 text-white font-bold py-6 shadow-candy hover:shadow-candy-lg hover:scale-[1.02] transition-all"
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
                  className="w-full text-center text-sm text-muted-foreground hover:text-primary font-semibold transition-colors"
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
