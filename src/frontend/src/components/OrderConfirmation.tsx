import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface OrderConfirmationProps {
  open: boolean;
  onClose: () => void;
  orderId: bigint;
  customerName: string;
  totalAmount: number;
  paymentMethod?: "online";
}

export default function OrderConfirmation({
  open,
  onClose,
  orderId,
  customerName,
  totalAmount,
}: OrderConfirmationProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-md rounded-card text-center"
        data-ocid="order.dialog"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-5 py-4"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.12 145), oklch(0.92 0.14 160))",
            }}
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </motion.div>

          <div>
            <h2 className="text-2xl font-black text-foreground mb-1">
              Order Confirmed! 🎉
            </h2>
            <p className="text-muted-foreground text-sm">
              Thank you, {customerName}! Your party order is confirmed.
            </p>
          </div>

          {/* Details card */}
          <div className="w-full bg-muted/40 rounded-xl p-4 space-y-3 text-left">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-semibold">
                Order ID
              </span>
              <span className="font-extrabold text-foreground text-sm">
                #{orderId.toString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-semibold">
                Amount Paid
              </span>
              <span className="font-extrabold text-primary text-lg">
                ₹{totalAmount.toFixed(0)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 pt-2 border-t border-border">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs text-emerald-700 font-semibold">
                Advance payment received — booking confirmed!
              </span>
            </div>
          </div>

          {/* ETA badge */}
          <div
            className="flex items-center gap-2 bg-accent/30 text-accent-foreground rounded-pill px-4 py-2"
            data-ocid="order.card"
          >
            <Clock className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-bold">
              We'll contact you to confirm your party details
            </span>
          </div>

          {/* Location note */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>
              Mother of Ice-cream · Mallickpur Habibchauk Chauk, Kolkata
            </span>
          </div>

          <Button
            asChild
            onClick={onClose}
            className="w-full rounded-pill gradient-pink border-0 text-white font-bold py-5 shadow-candy hover:shadow-candy-lg transition-all"
            data-ocid="order.primary_button"
          >
            <Link to="/menu">Back to Menu</Link>
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
