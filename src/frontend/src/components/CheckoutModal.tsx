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

function GlassInput({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  rows,
  isTextarea = false,
  "data-ocid": dataOcid,
}: {
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  rows?: number;
  isTextarea?: boolean;
  "data-ocid"?: string;
}) {
  const cls =
    "bg-[oklch(0.16_0.06_275/0.6)] border border-[oklch(0.65_0.29_310/0.2)] text-cream placeholder:text-cream/30 rounded-xl focus-visible:ring-1 focus-visible:ring-[oklch(0.65_0.29_310)] focus-visible:border-[oklch(0.65_0.29_310/0.6)] transition-all duration-200 hover:border-[oklch(0.65_0.29_310/0.35)]";

  if (isTextarea) {
    return (
      <Textarea
        id={id}
        value={value}
        onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
        placeholder={placeholder}
        className={`${cls} resize-none`}
        rows={rows}
        autoComplete={autoComplete}
        data-ocid={dataOcid}
      />
    );
  }

  return (
    <Input
      id={id}
      value={value}
      onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
      placeholder={placeholder}
      type={type}
      className={cls}
      autoComplete={autoComplete}
      inputMode={inputMode}
      maxLength={maxLength}
      data-ocid={dataOcid}
    />
  );
}

export default function CheckoutModal({
  open,
  onOpenChange,
}: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { actor, isFetching } = useActor();
  const { data: upiId } = useGetUpiId();

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
          className="sm:max-w-lg rounded-card p-0 overflow-hidden border border-[oklch(0.65_0.29_310/0.25)] bg-[oklch(0.12_0.07_275)]"
          style={{
            boxShadow:
              "0 25px 80px oklch(0.65 0.29 310 / 0.2), 0 0 0 1px oklch(0.65 0.29 310 / 0.1)",
          }}
          data-ocid="checkout.dialog"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-[oklch(0.65_0.29_310/0.2)] bg-[oklch(0.14_0.07_275/0.8)]">
            <DialogHeader>
              <DialogTitle className="text-xl font-extrabold font-display flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[oklch(0.65_0.29_310/0.15)] border border-[oklch(0.65_0.29_310/0.35)] flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-[oklch(0.65_0.29_310)]" />
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
                  Checkout
                </span>
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Party order notice */}
            <div className="bg-[oklch(0.84_0.18_85/0.08)] border border-[oklch(0.84_0.18_85/0.3)] rounded-xl px-4 py-3 text-sm font-semibold text-[oklch(0.84_0.18_85)]">
              🎉 Party Orders Only — Advance payment required to confirm your
              booking
            </div>

            {/* Payment method selection */}
            {hasUpi && (
              <div>
                <p className="text-xs font-bold text-cream/40 uppercase tracking-widest mb-3">
                  Pay via UPI — advance payment required
                </p>

                {upiStep === "confirm" ? (
                  <div className="rounded-2xl border border-[oklch(0.65_0.29_310/0.3)] bg-[oklch(0.65_0.29_310/0.06)] p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <p
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: "oklch(0.65 0.29 310)" }}
                      >
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
                        className="text-xs text-cream/40 hover:text-cream/70 underline"
                      >
                        ← Change method
                      </button>
                    </div>

                    {[
                      {
                        num: 1,
                        content: (
                          <div className="flex-1">
                            <p className="text-sm font-bold text-cream mb-2">
                              Open{" "}
                              {paymentMethod === "gpay"
                                ? "Google Pay"
                                : "PhonePe"}{" "}
                              &amp; pay
                            </p>
                            <button
                              type="button"
                              onClick={() => handleOpenUpiApp(paymentMethod)}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-opacity hover:opacity-90"
                              style={{
                                background:
                                  paymentMethod === "gpay"
                                    ? "#4285F4"
                                    : "#5F259F",
                              }}
                              data-ocid="checkout.primary_button"
                            >
                              {paymentMethod === "gpay" ? (
                                <GoogleIcon size={18} />
                              ) : (
                                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                  <span
                                    className="font-black text-[#5F259F]"
                                    style={{ fontSize: "8px" }}
                                  >
                                    Pe
                                  </span>
                                </span>
                              )}
                              Open{" "}
                              {paymentMethod === "gpay"
                                ? "Google Pay"
                                : "PhonePe"}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ),
                      },
                      {
                        num: 2,
                        content: (
                          <p className="text-sm text-cream/70">
                            Complete payment of{" "}
                            <span
                              className="font-extrabold"
                              style={{ color: "oklch(0.84 0.18 85)" }}
                            >
                              ₹{totalPrice.toFixed(0)}
                            </span>{" "}
                            in the app
                          </p>
                        ),
                      },
                      {
                        num: 3,
                        content: (
                          <div className="flex-1 space-y-2">
                            <p className="text-sm font-bold text-cream">
                              Enter your transaction reference (UTR)
                            </p>
                            <Input
                              value={utrInput}
                              onChange={(e) => setUtrInput(e.target.value)}
                              placeholder="Enter UTR / transaction ID"
                              className="bg-[oklch(0.16_0.06_275/0.6)] border border-[oklch(0.65_0.29_310/0.25)] text-cream placeholder:text-cream/30 rounded-xl font-mono text-sm focus-visible:ring-1 focus-visible:ring-[oklch(0.65_0.29_310)]"
                              inputMode="numeric"
                              data-ocid="checkout.input"
                            />
                            {utrError && (
                              <p
                                className="text-[oklch(0.63_0.27_345)] text-xs font-semibold"
                                data-ocid="checkout.error_state"
                              >
                                {utrError}
                              </p>
                            )}
                          </div>
                        ),
                      },
                    ].map(({ num, content }) => (
                      <div key={num} className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                          }}
                        >
                          {num}
                        </div>
                        {content}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {(["gpay", "phonepe"] as const).map((method) => {
                      const isSelected = paymentMethod === method;
                      const isGpay = method === "gpay";
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => handleSelectPayment(method)}
                          className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border-2 p-4 transition-all duration-200 focus-visible:outline-none"
                          style={{
                            background: isSelected
                              ? isGpay
                                ? "oklch(0.50 0.18 250 / 0.15)"
                                : "oklch(0.50 0.18 300 / 0.15)"
                              : "oklch(0.16 0.06 275 / 0.5)",
                            borderColor: isSelected
                              ? isGpay
                                ? "#4285F4"
                                : "#5F259F"
                              : "oklch(0.65 0.29 310 / 0.2)",
                            boxShadow: isSelected
                              ? isGpay
                                ? "0 0 20px #4285F440"
                                : "0 0 20px #5F259F40"
                              : "none",
                          }}
                          aria-pressed={isSelected}
                          data-ocid="checkout.toggle"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                              background: isGpay ? "#4285F4" : "#5F259F",
                            }}
                          >
                            {isGpay ? (
                              <GoogleIcon size={30} />
                            ) : (
                              <span
                                className="text-white font-black"
                                style={{ fontSize: "12px" }}
                              >
                                Pe
                              </span>
                            )}
                          </div>
                          <span
                            className="font-bold text-xs"
                            style={{
                              color: isSelected
                                ? isGpay
                                  ? "#4285F4"
                                  : "#5F259F"
                                : "oklch(0.94 0.02 55 / 0.7)",
                            }}
                          >
                            {isGpay ? "Google Pay" : "PhonePe"}
                          </span>
                          {isSelected && (
                            <span
                              className="text-white text-[9px] font-bold px-2 py-0.5 rounded-full"
                              style={{
                                background: isGpay ? "#4285F4" : "#5F259F",
                              }}
                            >
                              ✓ Selected
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* No UPI configured */}
            {!hasUpi && (
              <div className="rounded-xl border border-[oklch(0.84_0.18_85/0.3)] bg-[oklch(0.84_0.18_85/0.06)] p-4">
                <p className="text-sm font-semibold text-[oklch(0.84_0.18_85)]">
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
            <div className="bg-[oklch(0.16_0.06_275/0.6)] border border-[oklch(0.65_0.29_310/0.15)] rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-xs font-bold text-cream/40 uppercase tracking-widest mb-3">
                Order Summary
              </p>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.flavorId.toString()}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-cream/70">
                      {item.flavorName}
                      <span className="text-cream/40 ml-1">
                        × {item.quantity}
                      </span>
                    </span>
                    <span className="font-bold text-cream/80">
                      ₹{(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[oklch(0.65_0.29_310/0.15)]">
                <span className="font-extrabold text-cream">Total</span>
                <span
                  className="text-xl font-black font-display"
                  style={{ color: "oklch(0.84 0.18 85)" }}
                >
                  ₹{totalPrice.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Delivery form */}
            <div className="space-y-4">
              {[
                {
                  id: "checkout-name",
                  icon: User,
                  label: "Full Name",
                  value: name,
                  set: setName,
                  placeholder: "Your full name",
                  autoComplete: "name",
                  error: errors.name,
                  ocid: "checkout.input",
                },
                {
                  id: "checkout-phone",
                  icon: Phone,
                  label: "Mobile Number",
                  value: phone,
                  set: setPhone,
                  placeholder: "10-digit mobile number",
                  type: "tel",
                  autoComplete: "tel",
                  inputMode: "numeric" as const,
                  maxLength: 10,
                  error: errors.phone,
                  ocid: "checkout.input",
                },
              ].map(
                ({
                  id,
                  icon: Icon,
                  label,
                  value,
                  set,
                  placeholder,
                  type,
                  autoComplete,
                  inputMode,
                  maxLength,
                  error,
                  ocid,
                }) => (
                  <div key={id} className="space-y-1.5">
                    <Label
                      htmlFor={id}
                      className="font-bold flex items-center gap-1.5 text-cream/70 text-sm"
                    >
                      <div className="w-5 h-5 rounded bg-[oklch(0.65_0.29_310/0.15)] flex items-center justify-center">
                        <Icon className="w-3 h-3 text-[oklch(0.65_0.29_310)]" />
                      </div>
                      {label}
                    </Label>
                    <GlassInput
                      id={id}
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      placeholder={placeholder}
                      type={type}
                      autoComplete={autoComplete}
                      inputMode={inputMode}
                      maxLength={maxLength}
                      data-ocid={ocid}
                    />
                    {error && (
                      <p
                        className="text-[oklch(0.63_0.27_345)] text-xs font-semibold"
                        data-ocid="checkout.error_state"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                ),
              )}

              <div className="space-y-1.5">
                <Label
                  htmlFor="checkout-address"
                  className="font-bold flex items-center gap-1.5 text-cream/70 text-sm"
                >
                  <div className="w-5 h-5 rounded bg-[oklch(0.65_0.29_310/0.15)] flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-[oklch(0.65_0.29_310)]" />
                  </div>
                  Delivery Address
                </Label>
                <GlassInput
                  id="checkout-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/flat no., street, area, Kolkata — PIN code"
                  autoComplete="street-address"
                  isTextarea
                  rows={3}
                  data-ocid="checkout.textarea"
                />
                {errors.address && (
                  <p
                    className="text-[oklch(0.63_0.27_345)] text-xs font-semibold"
                    data-ocid="checkout.error_state"
                  >
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-3 pt-1 pb-1">
              {upiStep === "confirm" ? (
                <Button
                  onClick={handleConfirmUpiPayment}
                  disabled={isPaying || isConnecting}
                  className="w-full rounded-pill border-0 text-cream font-bold py-6 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-[oklch(0.65_0.29_310)] to-[oklch(0.63_0.27_345)] hover:shadow-[0_0_24px_oklch(0.65_0.29_310/0.5)]"
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
                  className="w-full rounded-pill border-0 text-cream font-bold py-6 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background:
                      paymentMethod === "gpay"
                        ? "linear-gradient(135deg, #4285F4, #1a73e8)"
                        : "linear-gradient(135deg, #5F259F, #8B46CA)",
                    boxShadow:
                      paymentMethod === "gpay"
                        ? "0 4px 20px #4285F430"
                        : "0 4px 20px #5F259F30",
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
                          style={{ fontSize: "8px" }}
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
                <p className="text-center text-xs text-cream/30">
                  Advance payment confirms your party order booking
                </p>
              )}
            </div>
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
