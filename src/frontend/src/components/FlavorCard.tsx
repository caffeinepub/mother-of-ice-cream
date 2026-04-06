import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { IceCreamFlavor } from "../hooks/useQueries";

const CATEGORY_STYLES: Record<
  string,
  { bg: string; emoji: string; badgeClass: string }
> = {
  Classic: {
    bg: "bg-pink-light",
    emoji: "\ud83c\udf66",
    badgeClass: "bg-primary/15 text-primary",
  },
  Vegan: {
    bg: "bg-secondary-light",
    emoji: "\ud83c\udf31",
    badgeClass: "bg-secondary/20 text-secondary-foreground",
  },
  Seasonal: {
    bg: "bg-accent-light",
    emoji: "\ud83c\udf42",
    badgeClass: "bg-accent/25 text-accent-foreground",
  },
  Premium: {
    bg: "bg-purple-100",
    emoji: "\ud83d\udc51",
    badgeClass: "bg-purple-100 text-purple-700",
  },
};

const DEFAULT_STYLE = {
  bg: "bg-pink-light",
  emoji: "\ud83c\udf68",
  badgeClass: "bg-primary/15 text-primary",
};

interface FlavorCardProps {
  flavor: IceCreamFlavor;
  index?: number;
  compact?: boolean;
}

export default function FlavorCard({
  flavor,
  index = 0,
  compact = false,
}: FlavorCardProps) {
  const style = CATEGORY_STYLES[flavor.category] ?? DEFAULT_STYLE;
  const imageUrl = Array.isArray(flavor.imageUrl)
    ? (flavor.imageUrl[0] ?? null)
    : ((flavor.imageUrl as string | null | undefined) ?? null);
  const { addItem, setDrawerOpen } = useCart();

  function handleAdd() {
    addItem(flavor);
    toast.success(`${flavor.name} added to cart! \ud83c\udf66`, {
      duration: 2000,
    });
    setDrawerOpen(true);
  }

  return (
    <article
      data-ocid={`flavors.item.${index + 1}`}
      className={cn(
        "group bg-card rounded-card shadow-candy hover:shadow-candy-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden border border-border/40",
        !flavor.isAvailable && "opacity-75",
      )}
    >
      {/* Flavor Image */}
      {imageUrl ? (
        <div className="w-full h-40 overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={flavor.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div
          className={cn(
            "w-full flex items-center justify-center text-4xl",
            compact ? "h-24" : "h-32",
            style.bg,
          )}
        >
          {style.emoji}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex flex-col gap-1 min-w-0">
            <h3
              className={cn(
                "font-extrabold leading-tight",
                compact ? "text-sm" : "text-base",
              )}
            >
              {flavor.name}
            </h3>
            {/* Status badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {flavor.isFeatured && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-pill bg-accent text-accent-foreground">
                  \u2b50 Featured
                </span>
              )}
              {!flavor.isAvailable && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-pill bg-foreground/80 text-white">
                  Sold Out
                </span>
              )}
            </div>
          </div>
          <Badge
            className={cn(
              "rounded-pill text-[11px] font-bold px-2.5 shrink-0 border-0",
              style.badgeClass,
            )}
          >
            {flavor.category}
          </Badge>
        </div>

        <p
          className={cn(
            "text-muted-foreground leading-snug flex-1",
            compact ? "text-xs line-clamp-2" : "text-sm line-clamp-2",
          )}
        >
          {flavor.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-primary font-black text-base">
            ₹{Number(flavor.price).toFixed(0)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-end">
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              "rounded-pill font-bold text-white transition-all duration-200 hover:scale-105",
              compact ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2",
              flavor.isAvailable
                ? "gradient-pink shadow-candy hover:shadow-candy-lg"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
            disabled={!flavor.isAvailable}
            data-ocid={`flavors.item.${index + 1}`}
          >
            {flavor.isAvailable ? "Add +" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
