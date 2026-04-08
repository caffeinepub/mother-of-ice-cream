import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { IceCreamFlavor, IceCreamFlavorInput } from "../hooks/useQueries";

const CATEGORIES = ["Classic", "Vegan", "Seasonal", "Premium"];

interface FlavorFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flavor?: IceCreamFlavor | null;
  onSave: (data: IceCreamFlavorInput) => Promise<void>;
  isPending: boolean;
}

const EMPTY_FORM: IceCreamFlavorInput = {
  name: "",
  description: "",
  price: 80,
  category: "Classic",
  imageUrl: undefined,
  isAvailable: true,
  isFeatured: false,
};

function resolveImageUrl(flavor: IceCreamFlavor): string | undefined {
  if (Array.isArray(flavor.imageUrl)) return flavor.imageUrl[0] ?? undefined;
  return (flavor.imageUrl as string | undefined) ?? undefined;
}

export default function FlavorFormModal({
  open,
  onOpenChange,
  flavor,
  onSave,
  isPending,
}: FlavorFormModalProps) {
  const [form, setForm] = useState<IceCreamFlavorInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only runs when `open` changes
  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    if (!open) return;
    if (flavor) {
      setForm({
        name: flavor.name,
        description: flavor.description,
        price: flavor.price,
        category: flavor.category,
        imageUrl: resolveImageUrl(flavor),
        isAvailable: flavor.isAvailable,
        isFeatured: flavor.isFeatured,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [open, flavor]);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (form.price <= 0) errs.price = "Price must be greater than 0";
    if (!form.category) errs.category = "Category is required";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const trimmedUrl = form.imageUrl?.trim();
    const submitData: IceCreamFlavorInput = {
      ...form,
      imageUrl: trimmedUrl || undefined,
    };
    await onSave(submitData);
  }

  const set = (field: keyof IceCreamFlavorInput, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md rounded-card"
        data-ocid="admin.flavor.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">
            {flavor ? "Edit Flavor" : "Add New Flavor"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="flavor-name">Name</Label>
            <Input
              id="flavor-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Strawberry Dream"
              className="rounded-lg"
              data-ocid="admin.flavor.input"
            />
            {errors.name && (
              <p
                className="text-xs text-destructive"
                data-ocid="admin.flavor.error_state"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="flavor-desc">Description</Label>
            <Textarea
              id="flavor-desc"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe this delicious flavor…"
              rows={3}
              className="rounded-lg resize-none"
              data-ocid="admin.flavor.textarea"
            />
            {errors.description && (
              <p
                className="text-xs text-destructive"
                data-ocid="admin.flavor.error_state"
              >
                {errors.description}
              </p>
            )}
          </div>

          {/* Price + Category row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="flavor-price">Price (₹)</Label>
              <Input
                id="flavor-price"
                type="number"
                step="1"
                min="1"
                value={form.price}
                onChange={(e) =>
                  set("price", Number.parseFloat(e.target.value) || 0)
                }
                className="rounded-lg"
                data-ocid="admin.flavor.input"
              />
              {errors.price && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="admin.flavor.error_state"
                >
                  {errors.price}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => set("category", v)}
              >
                <SelectTrigger
                  className="rounded-lg"
                  data-ocid="admin.flavor.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <Label htmlFor="flavor-img">Image URL (optional)</Label>
            <Input
              id="flavor-img"
              value={form.imageUrl ?? ""}
              onChange={(e) => set("imageUrl", e.target.value || undefined)}
              placeholder="https://…"
              className="rounded-lg"
              data-ocid="admin.flavor.input"
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="available"
                checked={form.isAvailable}
                onCheckedChange={(v) => set("isAvailable", v)}
                data-ocid="admin.flavor.switch"
              />
              <Label htmlFor="available" className="cursor-pointer">
                Available
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={form.isFeatured}
                onCheckedChange={(v) => set("isFeatured", v)}
                data-ocid="admin.flavor.switch"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured
              </Label>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-pill"
              onClick={() => onOpenChange(false)}
              data-ocid="admin.flavor.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-pill gradient-pink border-0 text-white font-bold"
              data-ocid="admin.flavor.submit_button"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Saving…" : flavor ? "Save Changes" : "Add Flavor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
