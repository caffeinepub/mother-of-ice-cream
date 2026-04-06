import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useActor } from "@/hooks/useActor";
import { CreditCard, Loader2, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import OrderConfirmation from "./OrderConfirmation";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ConfirmedOrder {
  orderId: bigint;
  customerName: string;
  totalAmount: number;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: { contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
}

interface RazorpayInstance {
  open(): void;
}

async function loadRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) return true;
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function GoogleIcon({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Google Pay"
    >
      <circle cx="24" cy="24" r="24" fill="white" />
      <path
        d="M34.5 24.2c0-.7-.1-1.4-.2-2H24v3.8h5.9c-.3 1.4-1 2.6-2.1 3.4v2.8h3.4c2-1.8 3.3-4.5 3.3-8z"
        fill="#4285F4"
      />
      <path
        d="M24 35c2.9 0 5.3-1 7.1-2.6l-3.4-2.8c-1 .7-2.2 1-3.7 1-2.8 0-5.2-1.9-6-4.5h-3.5v2.9C16.4 32.7 20 35 24 35z"
        fill="#34A853"
      />
      <path
        d="M18 26.1c-.2-.7-.3-1.4-.3-2.1s.1-1.4.3-2.1v-2.9h-3.5C13.6 20.7 13 22.3 13 24s.6 3.3 1.5 4.9l3.5-2.8z"
        fill="#FBBC05"
      />
      <path
        d="M24 17.4c1.6 0 3 .5 4.1 1.6l3.1-3.1C29.2 14.1 26.8 13 24 13c-4 0-7.6 2.3-9.5 5.7l3.5 2.9c.8-2.6 3.2-4.2 6-4.2z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function CheckoutModal({
  open,
  onOpenChange,
}: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { actor } = useActor();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPaying, setIsPaying] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null,
  );

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(phone.trim()))
      errs.phone = "Enter a valid 10-digit Indian mobile number";
    if (!address.trim() || address.trim().length < 10)
      errs.address = "Please enter your full delivery address";
    return errs;
  }

  async function handlePayment() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    if (!actor) {
      toast.error("Not connected. Please refresh and try again.");
      return;
    }

    setIsPaying(true);

    // Capture actor reference to use safely inside async handler
    const currentActor = actor;

    // Snapshot cart items before async payment flow
    const cartItems = items.map((item) => ({
      flavorId: item.flavorId,
      flavorName: item.flavorName,
      // quantity must be BigInt for Motoko Nat
      quantity: BigInt(item.quantity),
      price: item.price,
    }));
    const snapshotTotal = totalPrice;
    const snapshotName = name.trim();
    const snapshotPhone = phone.trim();
    const snapshotAddress = address.trim();

    try {
      // Fetch Razorpay key from backend
      const keyResult = await (currentActor as any).getRazorpayKeyId();
      const razorpayKey: string | null =
        Array.isArray(keyResult) && keyResult.length > 0 ? keyResult[0] : null;

      if (!razorpayKey) {
        // No Razorpay key configured — fall back to Cash on Delivery
        const orderId = await (currentActor as any).placeOrder(
          snapshotName,
          snapshotPhone,
          snapshotAddress,
          cartItems,
          snapshotTotal,
          "", // no razorpay order id
          "", // no razorpay payment id
        );
        clearCart();
        setConfirmedOrder({
          orderId,
          customerName: snapshotName,
          totalAmount: snapshotTotal,
        });
        onOpenChange(false);
        setIsPaying(false);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error(
          "Failed to load payment gateway. Please check your connection.",
        );
        setIsPaying(false);
        return;
      }

      const amountInPaise = Math.round(totalPrice * 100);

      const rzpOptions: RazorpayOptions = {
        key: razorpayKey,
        amount: amountInPaise,
        currency: "INR",
        name: "Mother of Ice-cream",
        description: "Ice Cream Order — Mallickpur Habibchauk Chauk, Kolkata",
        prefill: { contact: snapshotPhone },
        theme: { color: "#FF4FA3" },
        handler: async (response: RazorpayResponse) => {
          try {
            const orderId = await (currentActor as any).placeOrder(
              snapshotName,
              snapshotPhone,
              snapshotAddress,
              cartItems,
              snapshotTotal,
              response.razorpay_order_id ?? "",
              response.razorpay_payment_id,
            );

            clearCart();
            setConfirmedOrder({
              orderId,
              customerName: snapshotName,
              totalAmount: snapshotTotal,
            });
            onOpenChange(false);
          } catch (_err) {
            toast.error(
              `Payment received but order not saved. Contact shop with payment ID: ${response.razorpay_payment_id}`,
            );
          } finally {
            setIsPaying(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsPaying(false);
          },
        },
      };

      const rzp = new window.Razorpay(rzpOptions);
      rzp.open();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
      setIsPaying(false);
    }
  }

  async function handleRazorpayKeyCheck(): Promise<string | null> {
    if (!actor) return null;
    try {
      const keyResult = await (actor as any).getRazorpayKeyId();
      return Array.isArray(keyResult) && keyResult.length > 0
        ? keyResult[0]
        : null;
    } catch {
      return null;
    }
  }

  // Determine button label — we optimistically show COD label if no key
  // but the actual check happens in handlePayment
  const [razorpayAvailable, setRazorpayAvailable] = useState<boolean | null>(
    null,
  );

  // Check on modal open
  if (open && razorpayAvailable === null) {
    handleRazorpayKeyCheck().then((key) => setRazorpayAvailable(!!key));
  }
  if (!open && razorpayAvailable !== null) {
    // Reset when closed
  }

  function handleClose() {
    if (!isPaying) {
      onOpenChange(false);
      setTimeout(() => {
        setName("");
        setPhone("");
        setAddress("");
        setErrors({});
        setRazorpayAvailable(null);
      }, 300);
    }
  }

  const hasOnlinePayment = razorpayAvailable === true;

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          className="sm:max-w-lg rounded-card"
          data-ocid="checkout.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Checkout
            </DialogTitle>
          </DialogHeader>

          {/* Payment method section */}
          {hasOnlinePayment ? (
            <div className="rounded-xl border-2 border-pink-200 bg-pink-50/60 p-4 mb-1">
              <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">
                Pay instantly with UPI
              </p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Google Pay tile */}
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[#4285F4] p-4 shadow-md">
                  <GoogleIcon size={38} />
                  <span className="text-white font-extrabold text-sm tracking-wide">
                    Google Pay
                  </span>
                </div>
                {/* PhonePe tile */}
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[#5F259F] p-4 shadow-md">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <span className="font-black text-[#5F259F] text-base leading-none">
                      Pe
                    </span>
                  </div>
                  <span className="text-white font-extrabold text-sm tracking-wide">
                    PhonePe
                  </span>
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground font-medium">
                Also accepts UPI, Debit &amp; Credit Cards
              </p>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-green-200 bg-green-50/60 p-4 mb-1">
              <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1">
                Cash on Delivery
              </p>
              <p className="text-sm text-green-800">
                Pay when your order arrives at your door. No online payment
                required.
              </p>
            </div>
          )}

          {/* Order summary */}
          <div className="bg-muted/40 rounded-xl p-4 mb-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
              Order Summary
            </p>
            <div className="space-y-1.5">
              {items.map((item) => (
                <div
                  key={item.flavorId.toString()}
                  className="flex justify-between text-sm"
                >
                  <span className="text-foreground">
                    {item.flavorName}
                    <span className="text-muted-foreground ml-1">
                      × {item.quantity}
                    </span>
                  </span>
                  <span className="font-bold">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
              <span className="font-extrabold text-foreground">Total</span>
              <span className="text-xl font-black text-primary">
                ₹{totalPrice.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Delivery form */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="checkout-name"
                className="font-bold flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-primary" /> Full Name
              </Label>
              <Input
                id="checkout-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="rounded-xl border-2 focus-visible:ring-primary"
                autoComplete="name"
                data-ocid="checkout.input"
              />
              {errors.name && (
                <p
                  className="text-destructive text-xs font-semibold"
                  data-ocid="checkout.error_state"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="checkout-phone"
                className="font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-primary" /> Mobile Number
              </Label>
              <Input
                id="checkout-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                type="tel"
                className="rounded-xl border-2 focus-visible:ring-primary"
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                data-ocid="checkout.input"
              />
              {errors.phone && (
                <p
                  className="text-destructive text-xs font-semibold"
                  data-ocid="checkout.error_state"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="checkout-address"
                className="font-bold flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-primary" /> Delivery Address
              </Label>
              <Textarea
                id="checkout-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/flat no., street, area, Kolkata — PIN code"
                className="rounded-xl border-2 focus-visible:ring-primary resize-none"
                rows={3}
                autoComplete="street-address"
                data-ocid="checkout.textarea"
              />
              {errors.address && (
                <p
                  className="text-destructive text-xs font-semibold"
                  data-ocid="checkout.error_state"
                >
                  {errors.address}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              onClick={handlePayment}
              disabled={isPaying || !actor}
              className="w-full rounded-pill gradient-pink border-0 text-white font-bold py-6 shadow-candy hover:shadow-candy-lg transition-all"
              data-ocid="checkout.submit_button"
            >
              {isPaying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing…
                </>
              ) : hasOnlinePayment ? (
                <>🔒 Pay ₹{totalPrice.toFixed(0)} Now</>
              ) : (
                <>Place Order (Pay on Delivery)</>
              )}
            </Button>

            {/* Payment method badges */}
            {hasOnlinePayment && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                  <GoogleIcon size={14} />
                  Google Pay
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#5F259F]">
                    <span
                      className="text-white font-black"
                      style={{ fontSize: "7px", lineHeight: 1 }}
                    >
                      Pe
                    </span>
                  </span>
                  PhonePe
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground text-xs font-semibold">
                  UPI / Cards
                </span>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground">
              {hasOnlinePayment
                ? "Secured by Razorpay"
                : "Pay cash when delivered"}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {confirmedOrder && (
        <OrderConfirmation
          open={!!confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
          orderId={confirmedOrder.orderId}
          customerName={confirmedOrder.customerName}
          totalAmount={confirmedOrder.totalAmount}
        />
      )}
    </>
  );
}
