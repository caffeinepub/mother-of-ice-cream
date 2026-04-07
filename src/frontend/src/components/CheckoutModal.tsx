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
import { useGetUpiId } from "@/hooks/useQueries";
import {
  CheckCircle2,
  CreditCard,
  ExternalLink,
  Loader2,
  MapPin,
  Phone,
  User,
} from "lucide-react";
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
  paymentMethod: "online";
}

type PaymentMethod = "gpay" | "phonepe";

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
        d="M18 26.1c-.2-.7-.3-2.1-.3-2.1s.1-1.4.3-2.1v-2.9h-3.5C13.6 20.7 13 22.3 13 24s.6 3.3 1.5 4.9l3.5-2.8z"
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
  const { actor, isFetching } = useActor();
  const { data: upiId } = useGetUpiId();

  // isConnecting = still loading actor; if isFetching is false but actor is null,
  // the connection attempt is done (failed or not configured) — do NOT block the button.
  const isConnecting = isFetching && !actor;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPaying, setIsPaying] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gpay");

  // UPI confirmation flow state
  const [upiStep, setUpiStep] = useState<"idle" | "confirm">("idle");
  const [utrInput, setUtrInput] = useState("");
  const [utrError, setUtrError] = useState("");

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(phone.trim()))
      errs.phone = "Enter a valid 10-digit Indian mobile number";
    if (!address.trim() || address.trim().length < 10)
      errs.address = "Please enter your full delivery address";
    return errs;
  }

  function handleClose() {
    if (!isPaying) {
      onOpenChange(false);
      setTimeout(() => {
        setName("");
        setPhone("");
        setAddress("");
        setErrors({});
        setPaymentMethod("gpay");
        setUpiStep("idle");
        setUtrInput("");
        setUtrError("");
      }, 300);
    }
  }

  function buildUpiDeepLink(app: PaymentMethod) {
    const pa = encodeURIComponent(upiId ?? "");
    const pn = encodeURIComponent("Mother of Ice-cream");
    const am = totalPrice.toFixed(2);
    const tn = encodeURIComponent("Ice Cream Order");
    const base = `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`;
    if (app === "gpay") return `${base}&mc=5441`;
    return base;
  }

  function handleSelectPayment(method: PaymentMethod) {
    setPaymentMethod(method);
    setUpiStep("idle");
    setUtrInput("");
    setUtrError("");
  }

  function handleOpenUpiApp(app: PaymentMethod) {
    const link = buildUpiDeepLink(app);
    window.open(link, "_blank");
    setUpiStep("confirm");
  }

  async function handleConfirmUpiPayment() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const trimmedUtr = utrInput.trim();
    if (!trimmedUtr) {
      setUtrError("Please enter your UTR / transaction ID");
      return;
    }
    if (trimmedUtr.length < 8) {
      setUtrError("UTR number seems too short. Please check again.");
      return;
    }
    setUtrError("");
    setErrors({});

    if (!actor) {
      toast.error("Connection issue — please refresh the page and try again.");
      return;
    }

    setIsPaying(true);
    const cartItems = items.map((item) => ({
      flavorId: item.flavorId,
      flavorName: item.flavorName,
      quantity: BigInt(item.quantity),
      price: item.price,
    }));

    try {
      const orderId = await actor.placeOrder(
        name.trim(),
        phone.trim(),
        address.trim(),
        cartItems,
        totalPrice,
        "",
        `UTR:${trimmedUtr}`,
      );
      clearCart();
      setConfirmedOrder({
        orderId,
        customerName: name.trim(),
        totalAmount: totalPrice,
        paymentMethod: "online",
      });
      onOpenChange(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Order failed. Please try again.",
      );
    } finally {
      setIsPaying(false);
    }
  }

  const hasUpi = !!upiId;

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

          {/* Party orders advance payment notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm font-semibold text-amber-800">
            🎉 Party Orders Only — Advance payment required to confirm your
            booking
          </div>

          {/* Payment Method Selection */}
          {hasUpi && (
            <div className="mb-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Pay via UPI — advance payment required
              </p>

              {/* UPI Confirmation steps — replaces tiles when in confirm state */}
              {upiStep === "confirm" ? (
                <div className="rounded-xl border-2 border-blue-200 bg-blue-50/60 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                      {paymentMethod === "gpay" ? "Google Pay" : "PhonePe"}{" "}
                      Payment
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setUpiStep("idle");
                        setUtrInput("");
                        setUtrError("");
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      ← Change method
                    </button>
                  </div>

                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground mb-2">
                        Open{" "}
                        {paymentMethod === "gpay" ? "Google Pay" : "PhonePe"}{" "}
                        &amp; pay
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenUpiApp(paymentMethod)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-opacity hover:opacity-90 ${
                          paymentMethod === "gpay"
                            ? "bg-[#4285F4]"
                            : "bg-[#5F259F]"
                        }`}
                        data-ocid="checkout.primary_button"
                      >
                        {paymentMethod === "gpay" ? (
                          <GoogleIcon size={18} />
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <span
                              className="font-black text-[#5F259F]"
                              style={{ fontSize: "8px", lineHeight: 1 }}
                            >
                              Pe
                            </span>
                          </span>
                        )}
                        Open{" "}
                        {paymentMethod === "gpay" ? "Google Pay" : "PhonePe"}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-sm text-foreground">
                      Complete payment of{" "}
                      <span className="font-extrabold text-primary">
                        ₹{totalPrice.toFixed(0)}
                      </span>{" "}
                      in the app
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-bold text-foreground">
                        Enter your transaction reference (UTR)
                      </p>
                      <Input
                        value={utrInput}
                        onChange={(e) => setUtrInput(e.target.value)}
                        placeholder="Enter UTR / transaction ID"
                        className="rounded-xl border-2 font-mono text-sm focus-visible:ring-primary"
                        inputMode="numeric"
                        data-ocid="checkout.input"
                      />
                      {utrError && (
                        <p
                          className="text-destructive text-xs font-semibold"
                          data-ocid="checkout.error_state"
                        >
                          {utrError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Payment tiles grid — Google Pay + PhonePe */
                <div className="grid grid-cols-2 gap-3">
                  {/* Google Pay tile */}
                  <button
                    type="button"
                    onClick={() => handleSelectPayment("gpay")}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                      paymentMethod === "gpay"
                        ? "border-[#4285F4] bg-blue-50/80 shadow-md"
                        : "border-border bg-muted/30 hover:border-[#4285F4]/50 hover:bg-blue-50/30"
                    }`}
                    aria-pressed={paymentMethod === "gpay"}
                    data-ocid="checkout.toggle"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#4285F4] flex items-center justify-center">
                      <GoogleIcon size={28} />
                    </div>
                    <span
                      className={`font-bold text-xs ${
                        paymentMethod === "gpay"
                          ? "text-[#4285F4]"
                          : "text-foreground"
                      }`}
                    >
                      Google Pay
                    </span>
                    {paymentMethod === "gpay" && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#4285F4] text-white text-[9px] font-bold">
                        ✓
                      </span>
                    )}
                  </button>

                  {/* PhonePe tile */}
                  <button
                    type="button"
                    onClick={() => handleSelectPayment("phonepe")}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5F259F] ${
                      paymentMethod === "phonepe"
                        ? "border-[#5F259F] bg-purple-50/80 shadow-md"
                        : "border-border bg-muted/30 hover:border-[#5F259F]/50 hover:bg-purple-50/30"
                    }`}
                    aria-pressed={paymentMethod === "phonepe"}
                    data-ocid="checkout.toggle"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#5F259F] flex items-center justify-center">
                      <span
                        className="text-white font-black"
                        style={{ fontSize: "11px", lineHeight: 1 }}
                      >
                        Pe
                      </span>
                    </div>
                    <span
                      className={`font-bold text-xs ${
                        paymentMethod === "phonepe"
                          ? "text-[#5F259F]"
                          : "text-foreground"
                      }`}
                    >
                      PhonePe
                    </span>
                    {paymentMethod === "phonepe" && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#5F259F] text-white text-[9px] font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* When UPI not configured — contact notice */}
          {!hasUpi && (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/60 p-4 mb-1">
              <p className="text-sm text-amber-800 font-semibold">
                To place an order, please contact us at{" "}
                <a
                  href="tel:+919007819261"
                  className="font-extrabold underline hover:no-underline"
                >
                  +91 9007819261
                </a>
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
            {/* UPI confirm button */}
            {upiStep === "confirm" ? (
              <Button
                onClick={handleConfirmUpiPayment}
                disabled={isPaying || isConnecting}
                className="w-full rounded-pill border-0 text-white font-bold py-6 transition-all"
                style={{
                  background: paymentMethod === "gpay" ? "#4285F4" : "#5F259F",
                }}
                data-ocid="checkout.submit_button"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting…
                  </>
                ) : isPaying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Confirm &amp; Place Order
                  </>
                )}
              </Button>
            ) : hasUpi ? (
              /* Show the open-app button when UPI selected but not yet in confirm state */
              <Button
                onClick={() => {
                  const errs = validate();
                  if (Object.keys(errs).length > 0) {
                    setErrors(errs);
                    return;
                  }
                  setErrors({});
                  handleOpenUpiApp(paymentMethod);
                }}
                disabled={isConnecting}
                className="w-full rounded-pill border-0 text-white font-bold py-6 transition-all"
                style={{
                  background: paymentMethod === "gpay" ? "#4285F4" : "#5F259F",
                }}
                data-ocid="checkout.primary_button"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting…
                  </>
                ) : paymentMethod === "gpay" ? (
                  <>
                    <GoogleIcon size={20} />
                    <span className="ml-2">
                      Pay ₹{totalPrice.toFixed(0)} with Google Pay
                    </span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                      <span
                        className="font-black text-[#5F259F]"
                        style={{ fontSize: "8px", lineHeight: 1 }}
                      >
                        Pe
                      </span>
                    </span>
                    <span className="ml-2">
                      Pay ₹{totalPrice.toFixed(0)} with PhonePe
                    </span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : null}

            {hasUpi && upiStep === "idle" && (
              <p className="text-center text-xs text-muted-foreground">
                Advance payment confirms your party order booking
              </p>
            )}
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
          paymentMethod={confirmedOrder.paymentMethod}
        />
      )}
    </>
  );
}
