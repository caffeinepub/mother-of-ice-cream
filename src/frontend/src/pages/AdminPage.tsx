import FlavorFormModal from "@/components/FlavorFormModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddFlavor,
  useAllFlavors,
  useClearAllFlavors,
  useContactMessages,
  useDeleteContactMessage,
  useDeleteFlavor,
  useDeleteOrder,
  useGetOrders,
  useGetUpiId,
  useSeedDefaultFlavors,
  useSetUpiId,
  useToggleAvailability,
  useToggleFeatured,
  useUpdateFlavor,
  useUpdateOrderStatus,
} from "@/hooks/useQueries";
import type {
  IceCreamFlavor,
  IceCreamFlavorInput,
  Order,
} from "@/hooks/useQueries";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  IceCream2,
  Loader2,
  Lock,
  MessageSquare,
  Pencil,
  Plus,
  ReceiptText,
  Save,
  Settings,
  Smartphone,
  Star,
  StarOff,
  Trash2,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "123456";
const SESSION_KEY = "mof_admin_auth";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="bg-card rounded-card shadow-candy border border-border/40 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-black text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-pw" className="font-bold text-sm">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-pw"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                  className={`rounded-xl border-2 pr-10 font-mono focus-visible:ring-primary ${
                    error
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  data-ocid="admin.password.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-xs text-destructive font-semibold">
                  Incorrect password. Try again.
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full rounded-pill gradient-pink border-0 text-white font-bold shadow-candy hover:shadow-candy-lg transition-all"
              data-ocid="admin.password.submit"
            >
              <Lock className="mr-2 h-4 w-4" /> Unlock Admin
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

const ORDER_STATUSES = [
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
];

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-yellow-100 text-yellow-700",
  ready: "bg-emerald-100 text-emerald-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

function OrdersTab({
  onDeleteRequest,
}: { onDeleteRequest: (id: bigint) => void }) {
  const { data: orders, isLoading: loadingOrders } = useGetOrders();
  const updateStatus = useUpdateOrderStatus();

  async function handleStatusChange(id: bigint, status: string) {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Order #${id} status updated to "${status}"`);
    } catch {
      toast.error("Failed to update order status.");
    }
  }

  if (loadingOrders) {
    return (
      <div className="space-y-3" data-ocid="admin.loading_state">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          <Skeleton key={i} className="h-20 w-full rounded-card" />
        ))}
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div
        className="bg-card rounded-card border-2 border-dashed border-border p-14 text-center"
        data-ocid="admin.orders.empty_state"
      >
        <p className="text-4xl mb-3">📦</p>
        <p className="font-bold text-foreground">No orders yet</p>
        <p className="text-muted-foreground text-sm mt-1">
          Orders will appear here once customers start buying.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="admin.orders.list">
      {orders.map((order: Order, idx: number) => (
        <motion.div
          key={order.id.toString()}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04 }}
          className="bg-card rounded-card shadow-candy border border-border/40 p-5"
          data-ocid={`admin.orders.item.${idx + 1}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-foreground">
                  #{order.id.toString()}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-pill ${
                    STATUS_STYLES[order.status] ??
                    "bg-muted text-muted-foreground"
                  }`}
                >
                  {order.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(
                    Number(order.timestamp / 1_000_000n),
                  ).toLocaleString("en-IN", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="font-bold text-sm mt-1">{order.customerName}</p>
              <p className="text-xs text-muted-foreground">
                📞 {order.customerPhone}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                📍 {order.deliveryAddress}
              </p>

              {/* Payment info */}
              {order.utrReference && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  💳{" "}
                  {order.utrReference.startsWith("UTR:")
                    ? `UPI Ref: ${order.utrReference.replace("UTR:", "")}`
                    : `Payment Ref: ${order.utrReference}`}
                </p>
              )}

              {/* Items */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {order.items.map((item, iIdx) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: order items have no stable key
                    key={iIdx}
                    className="text-xs bg-primary/10 text-primary font-semibold rounded-pill px-2.5 py-0.5"
                  >
                    {item.flavorName} ×{item.quantity.toString()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
              <span className="text-xl font-black text-primary">
                ₹{order.totalAmount.toFixed(0)}
              </span>
              <Select
                value={order.status}
                onValueChange={(val) => handleStatusChange(order.id, val)}
              >
                <SelectTrigger
                  className="w-36 h-8 rounded-pill text-xs font-bold border-2"
                  data-ocid={`admin.orders.select.${idx + 1}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="text-xs font-semibold"
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Quick-action buttons: Complete & Cancel */}
              {order.status !== "delivered" && order.status !== "cancelled" && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(order.id, "delivered")}
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-pill transition-colors bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    data-ocid={`admin.orders.confirm_button.${idx + 1}`}
                  >
                    <CheckCircle2 className="w-3 h-3" /> Complete
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(order.id, "cancelled")}
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-pill transition-colors bg-red-100 text-red-600 hover:bg-red-200"
                    data-ocid={`admin.orders.cancel_button.${idx + 1}`}
                  >
                    <XCircle className="w-3 h-3" /> Cancel
                  </button>
                </div>
              )}

              {/* Delete order button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDeleteRequest(order.id)}
                className="h-8 w-8 p-0 hover:text-destructive hover:bg-destructive/10 rounded-full"
                data-ocid={`admin.orders.delete_button.${idx + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SettingsTab() {
  const { data: existingUpiId, isLoading: loadingUpiId } = useGetUpiId();
  const setUpiId = useSetUpiId();
  const [upiInput, setUpiInput] = useState("");
  const [savedUpi, setSavedUpi] = useState(false);

  async function handleSaveUpiId() {
    const trimmed = upiInput.trim();
    if (!trimmed) {
      toast.error("Please enter your UPI ID.");
      return;
    }
    if (!trimmed.includes("@")) {
      toast.error("UPI ID must contain '@'. Example: 8961492669@jio");
      return;
    }
    try {
      await setUpiId.mutateAsync(trimmed);
      setSavedUpi(true);
      setUpiInput("");
      toast.success(
        "UPI ID saved! Customers can now pay via Google Pay & PhonePe.",
      );
      setTimeout(() => setSavedUpi(false), 3000);
    } catch {
      toast.error("Failed to save UPI ID.");
    }
  }

  return (
    <div className="max-w-xl space-y-6" data-ocid="admin.settings.panel">
      {/* UPI ID card */}
      <div className="bg-card rounded-card shadow-candy border border-border/40 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-extrabold text-foreground">
              UPI ID for Google Pay &amp; PhonePe
            </h3>
            <p className="text-xs text-muted-foreground">
              Customers pay directly to your UPI account — no extra setup needed
            </p>
          </div>
        </div>

        {loadingUpiId ? (
          <Skeleton
            className="h-10 w-full rounded-xl"
            data-ocid="admin.loading_state"
          />
        ) : (
          <>
            {existingUpiId && (
              <div className="mb-3 flex items-center gap-2 bg-blue-50 text-blue-700 rounded-xl px-4 py-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold">UPI ID configured</p>
                  <p className="text-sm font-mono font-bold truncate">
                    {existingUpiId}
                  </p>
                </div>
              </div>
            )}
            <div className="space-y-3">
              <Label htmlFor="upi-id" className="font-bold text-sm">
                {existingUpiId ? "Update UPI ID" : "Enter your UPI ID"}
              </Label>
              <Input
                id="upi-id"
                value={upiInput}
                onChange={(e) => setUpiInput(e.target.value)}
                placeholder="8961492669@jio or yourname@oksbi"
                className="rounded-xl border-2 font-mono text-sm focus-visible:ring-primary"
                autoComplete="off"
                data-ocid="admin.settings.input"
              />
              <p className="text-xs text-muted-foreground">
                Your UPI ID looks like: <strong>phonenumber@jio</strong>,{" "}
                <strong>phonenumber@ybl</strong>, <strong>name@oksbi</strong>,
                etc. Find it in your Google Pay or PhonePe app under Profile.
              </p>
              <Button
                onClick={handleSaveUpiId}
                disabled={setUpiId.isPending || !upiInput.trim()}
                className="rounded-pill border-0 text-white font-bold shadow-md hover:opacity-90 transition-all"
                style={{ background: "#4285F4" }}
                data-ocid="admin.settings.save_button"
              >
                {setUpiId.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : savedUpi ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Saved!
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save UPI ID
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="bg-accent/20 rounded-card border border-accent/30 p-5">
        <h4 className="font-extrabold text-sm text-foreground mb-3">
          💡 How to set up payments
        </h4>
        <div className="space-y-2">
          <p className="text-xs font-bold text-foreground">
            Direct UPI (Google Pay / PhonePe)
          </p>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Open Google Pay or PhonePe on your phone</li>
            <li>Go to Profile → find your UPI ID</li>
            <li>Paste it in the UPI ID field above and save</li>
            <li>Customers can now pay directly to your UPI account</li>
            <li>They enter their UTR number to confirm the payment</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1",
  );

  const { data: flavors, isLoading: loadingFlavors } = useAllFlavors();
  const { data: messages, isLoading: loadingMessages } = useContactMessages();

  const addFlavor = useAddFlavor();
  const updateFlavor = useUpdateFlavor();
  const deleteFlavor = useDeleteFlavor();
  const clearAllFlavors = useClearAllFlavors();
  const toggleAvail = useToggleAvailability();
  const toggleFeat = useToggleFeatured();
  const deleteOrder = useDeleteOrder();
  const deleteMessage = useDeleteContactMessage();
  const seedFlavors = useSeedDefaultFlavors();
  const hasSeededRef = useRef(false);

  useEffect(() => {
    if (
      !hasSeededRef.current &&
      !loadingFlavors &&
      flavors !== undefined &&
      flavors.length === 0 &&
      !seedFlavors.isPending
    ) {
      hasSeededRef.current = true;
      toast.loading("Adding products...", { id: "seeding" });
      seedFlavors.mutate(undefined, {
        onSuccess: () =>
          toast.success("13 products added to the menu! 🍦", { id: "seeding" }),
        onError: () =>
          toast.error("Failed to load default products.", { id: "seeding" }),
      });
    }
  }, [flavors, loadingFlavors, seedFlavors]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFlavor, setEditingFlavor] = useState<IceCreamFlavor | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);
  const [deleteOrderTarget, setDeleteOrderTarget] = useState<bigint | null>(
    null,
  );
  const [deleteMessageTarget, setDeleteMessageTarget] = useState<bigint | null>(
    null,
  );
  const [clearAllConfirm, setClearAllConfirm] = useState(false);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  async function handleSave(data: IceCreamFlavorInput) {
    try {
      if (editingFlavor) {
        await updateFlavor.mutateAsync({ id: editingFlavor.id, update: data });
        toast.success(`"${data.name}" updated successfully!`);
      } else {
        await addFlavor.mutateAsync(data);
        toast.success(`"${data.name}" added to the menu! 🍦`);
      }
      setModalOpen(false);
      setEditingFlavor(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  async function handleDelete() {
    if (deleteTarget === null) return;
    try {
      await deleteFlavor.mutateAsync(deleteTarget);
      toast.success("Flavor removed from the menu.");
    } catch {
      toast.error("Failed to delete flavor.");
    } finally {
      setDeleteTarget(null);
    }
  }

  async function handleClearAll() {
    try {
      await clearAllFlavors.mutateAsync();
      toast.success("All flavors cleared. Add your own from the admin panel.");
    } catch {
      toast.error("Failed to clear flavors.");
    } finally {
      setClearAllConfirm(false);
    }
  }

  async function handleDeleteOrder() {
    if (deleteOrderTarget === null) return;
    try {
      await deleteOrder.mutateAsync(deleteOrderTarget);
      toast.success(`Order #${deleteOrderTarget} deleted.`);
    } catch {
      toast.error("Failed to delete order.");
    } finally {
      setDeleteOrderTarget(null);
    }
  }

  async function handleDeleteMessage() {
    if (deleteMessageTarget === null) return;
    try {
      await deleteMessage.mutateAsync(deleteMessageTarget);
      toast.success("Message deleted.");
    } catch {
      toast.error("Failed to delete message.");
    } finally {
      setDeleteMessageTarget(null);
    }
  }

  async function handleToggleAvail(id: bigint, name: string, current: boolean) {
    try {
      await toggleAvail.mutateAsync(id);
      toast.success(
        `"${name}" is now ${current ? "unavailable" : "available"}.`,
      );
    } catch {
      toast.error("Failed to update availability.");
    }
  }

  async function handleToggleFeat(id: bigint, name: string, current: boolean) {
    try {
      await toggleFeat.mutateAsync(id);
      toast.success(
        `"${name}" ${current ? "removed from" : "added to"} featured.`,
      );
    } catch {
      toast.error("Failed to update featured status.");
    }
  }

  function openAdd() {
    setEditingFlavor(null);
    setModalOpen(true);
  }

  function openEdit(flavor: IceCreamFlavor) {
    setEditingFlavor(flavor);
    setModalOpen(true);
  }

  const totalFlavors = flavors?.length ?? 0;
  const availableFlavors = flavors?.filter((f) => f.isAvailable).length ?? 0;

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section
        className="py-10 border-b border-border"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.978 0.012 55) 0%, oklch(0.97 0.025 15) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-1">
              🔑 Admin Panel
            </p>
            <h1 className="text-3xl font-black text-foreground">
              Manage Mother of Ice-cream
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Flavors, messages, orders, and payment settings.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="flavors">
          <TabsList
            className="rounded-pill mb-6 bg-muted p-1 h-auto flex-wrap gap-1"
            data-ocid="admin.tab"
          >
            <TabsTrigger
              value="flavors"
              className="rounded-pill px-5 py-2 font-bold data-[state=active]:gradient-pink data-[state=active]:text-white data-[state=active]:shadow-none"
              data-ocid="admin.tab"
            >
              <IceCream2 className="mr-2 w-4 h-4" /> Flavors
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="rounded-pill px-5 py-2 font-bold data-[state=active]:gradient-pink data-[state=active]:text-white data-[state=active]:shadow-none"
              data-ocid="admin.tab"
            >
              <ReceiptText className="mr-2 w-4 h-4" /> Orders
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="rounded-pill px-5 py-2 font-bold data-[state=active]:gradient-pink data-[state=active]:text-white data-[state=active]:shadow-none"
              data-ocid="admin.tab"
            >
              <MessageSquare className="mr-2 w-4 h-4" /> Messages
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-pill px-5 py-2 font-bold data-[state=active]:gradient-pink data-[state=active]:text-white data-[state=active]:shadow-none"
              data-ocid="admin.tab"
            >
              <Settings className="mr-2 w-4 h-4" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* FLAVORS TAB */}
          <TabsContent value="flavors">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-extrabold text-foreground">
                  All Flavors ({totalFlavors})
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {availableFlavors} Available
                  {totalFlavors - availableFlavors > 0 && (
                    <span className="ml-2 text-red-500 font-semibold">
                      · {totalFlavors - availableFlavors} Sold Out
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => setClearAllConfirm(true)}
                  className="rounded-pill font-bold"
                  disabled={!flavors?.length}
                  data-ocid="admin.clear_all_flavors_button"
                >
                  Clear All
                </Button>
                <Button
                  onClick={openAdd}
                  className="rounded-pill gradient-pink border-0 text-white font-bold shadow-candy hover:shadow-candy-lg transition-all"
                  data-ocid="admin.add_flavor.open_modal_button"
                >
                  <Plus className="mr-1.5 w-4 h-4" /> Add Flavor
                </Button>
              </div>
            </div>

            {loadingFlavors ? (
              <div className="space-y-2" data-ocid="admin.loading_state">
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : !flavors?.length ? (
              <div
                className="bg-card rounded-card border-2 border-dashed border-border p-12 text-center"
                data-ocid="admin.flavors.empty_state"
              >
                <p className="text-4xl mb-3">🍦</p>
                <p className="font-bold text-foreground">No flavors yet</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Add your first flavor to get started!
                </p>
              </div>
            ) : (
              <div className="bg-card rounded-card shadow-candy overflow-hidden border border-border/40">
                <Table data-ocid="admin.flavors.table">
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-extrabold w-16">
                        Image
                      </TableHead>
                      <TableHead className="font-extrabold">Flavor</TableHead>
                      <TableHead className="font-extrabold">Category</TableHead>
                      <TableHead className="font-extrabold">Price</TableHead>
                      <TableHead className="font-extrabold">Status</TableHead>
                      <TableHead className="font-extrabold">Featured</TableHead>
                      <TableHead className="font-extrabold text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flavors.map((flavor, idx) => {
                      const imageUrl = Array.isArray(flavor.imageUrl)
                        ? (flavor.imageUrl[0] ?? null)
                        : ((flavor.imageUrl as string | null | undefined) ??
                          null);

                      return (
                        <TableRow
                          key={String(flavor.id)}
                          className="hover:bg-muted/30 transition-colors"
                          data-ocid={`admin.flavors.row.${idx + 1}`}
                        >
                          {/* Image thumbnail */}
                          <TableCell className="py-2">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={flavor.name}
                                loading="lazy"
                                decoding="async"
                                className="w-12 h-12 rounded-lg object-cover border border-border/40 shadow-sm"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-border/40 flex items-center justify-center text-xl">
                                🍦
                              </div>
                            )}
                          </TableCell>

                          <TableCell>
                            <div className="font-bold text-foreground">
                              {flavor.name}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                              {flavor.description}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="rounded-pill text-xs font-semibold"
                            >
                              {flavor.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-bold">
                            ₹{flavor.price.toFixed(0)}
                          </TableCell>
                          <TableCell>
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleAvail(
                                  flavor.id,
                                  flavor.name,
                                  flavor.isAvailable,
                                )
                              }
                              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-pill transition-colors ${
                                flavor.isAvailable
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                  : "bg-red-100 text-red-600 hover:bg-red-200"
                              }`}
                              data-ocid={`admin.flavors.toggle.${idx + 1}`}
                            >
                              {flavor.isAvailable ? (
                                <Eye className="w-3 h-3" />
                              ) : (
                                <EyeOff className="w-3 h-3" />
                              )}
                              {flavor.isAvailable ? "Available" : "Sold Out"}
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleFeat(
                                  flavor.id,
                                  flavor.name,
                                  flavor.isFeatured,
                                )
                              }
                              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-pill transition-colors ${
                                flavor.isFeatured
                                  ? "bg-accent/40 text-accent-foreground hover:bg-accent/60"
                                  : "bg-muted text-muted-foreground hover:bg-muted/60"
                              }`}
                              data-ocid={`admin.flavors.toggle.${idx + 1}`}
                            >
                              {flavor.isFeatured ? (
                                <Star className="w-3 h-3 fill-current" />
                              ) : (
                                <StarOff className="w-3 h-3" />
                              )}
                              {flavor.isFeatured ? "Featured" : "Normal"}
                            </button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEdit(flavor)}
                                className="h-8 w-8 p-0 hover:text-primary hover:bg-primary/10 rounded-full"
                                data-ocid={`admin.flavors.edit_button.${idx + 1}`}
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setDeleteTarget(flavor.id)}
                                className="h-8 w-8 p-0 hover:text-destructive hover:bg-destructive/10 rounded-full"
                                data-ocid={`admin.flavors.delete_button.${idx + 1}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* ORDERS TAB */}
          <TabsContent value="orders">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold text-foreground">
                Customer Orders
              </h2>
            </div>
            <OrdersTab onDeleteRequest={(id) => setDeleteOrderTarget(id)} />
          </TabsContent>

          {/* MESSAGES TAB */}
          <TabsContent value="messages">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold text-foreground">
                Contact Messages ({messages?.length ?? 0})
              </h2>
            </div>

            {loadingMessages ? (
              <div className="space-y-3" data-ocid="admin.loading_state">
                {Array.from({ length: 4 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                  <Skeleton key={i} className="h-24 w-full rounded-card" />
                ))}
              </div>
            ) : !messages?.length ? (
              <div
                className="bg-card rounded-card border-2 border-dashed border-border p-12 text-center"
                data-ocid="admin.messages.empty_state"
              >
                <p className="text-4xl mb-3">💌</p>
                <p className="font-bold text-foreground">No messages yet</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Customer messages will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="admin.messages.list">
                {messages.map((msg, idx) => (
                  <motion.div
                    // biome-ignore lint/suspicious/noArrayIndexKey: messages have no stable unique ID
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-card rounded-card shadow-candy p-5 border border-border/40"
                    data-ocid={`admin.messages.item.${idx + 1}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="font-extrabold text-foreground">
                          {msg.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {msg.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(
                            Number(msg.timestamp / 1_000_000n),
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteMessageTarget(msg.timestamp)}
                          className="h-8 w-8 p-0 hover:text-destructive hover:bg-destructive/10 rounded-full"
                          data-ocid={`admin.messages.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {msg.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings">
            <div className="mb-4">
              <h2 className="text-xl font-extrabold text-foreground">
                Payment Settings
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Configure your UPI ID to accept Google Pay &amp; PhonePe
                payments.
              </p>
            </div>
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Modal */}
      <FlavorFormModal
        open={modalOpen}
        onOpenChange={(v) => {
          setModalOpen(v);
          if (!v) setEditingFlavor(null);
        }}
        flavor={editingFlavor}
        onSave={handleSave}
        isPending={addFlavor.isPending || updateFlavor.isPending}
      />

      {/* Delete Flavor Confirm */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent
          className="rounded-card"
          data-ocid="admin.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-destructive" /> Delete Flavor?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the flavor from your menu. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-pill"
              data-ocid="admin.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-pill bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.delete.confirm_button"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Order Confirm */}
      <AlertDialog
        open={deleteOrderTarget !== null}
        onOpenChange={(v) => !v && setDeleteOrderTarget(null)}
      >
        <AlertDialogContent
          className="rounded-card"
          data-ocid="admin.delete_order.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-destructive" /> Delete Order?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the order record. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-pill"
              data-ocid="admin.delete_order.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOrder}
              className="rounded-pill bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.delete_order.confirm_button"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Message Confirm */}
      <AlertDialog
        open={deleteMessageTarget !== null}
        onOpenChange={(v) => !v && setDeleteMessageTarget(null)}
      >
        <AlertDialogContent
          className="rounded-card"
          data-ocid="admin.delete_message.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-destructive" /> Delete Message?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this contact message. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-pill"
              data-ocid="admin.delete_message.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMessage}
              className="rounded-pill bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.delete_message.confirm_button"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Flavors Confirm */}
      <AlertDialog
        open={clearAllConfirm}
        onOpenChange={(v) => !v && setClearAllConfirm(false)}
      >
        <AlertDialogContent
          className="rounded-card"
          data-ocid="admin.clear_all.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-destructive" /> Clear All Flavors?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete ALL {totalFlavors} flavors from your
              menu. This action cannot be undone. You can add your own flavors
              after clearing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-pill"
              data-ocid="admin.clear_all.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAll}
              className="rounded-pill bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.clear_all.confirm_button"
            >
              Yes, Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
