import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { SEED_IMAGE_MAP } from "@/utils/seedImages";
import { useState } from "react";
import { toast } from "sonner";
import type { IceCreamFlavor } from "../hooks/useQueries";

const CATEGORY_STYLES: Record<
  string,
  { bg: string; emoji: string; badgeClass: string }
> = {
  Classic: {
    bg: "bg-pink-light",
    emoji: "🍦",
    badgeClass: "bg-primary/15 text-primary",
  },
  Vegan: {
    bg: "bg-secondary-light",
    emoji: "🌱",
    badgeClass: "bg-secondary/20 text-secondary-foreground",
  },
  Seasonal: {
    bg: "bg-accent-light",
    emoji: "🍂",
    badgeClass: "bg-accent/25 text-accent-foreground",
  },
  Premium: {
    bg: "bg-purple-100",
    emoji: "👑",
    badgeClass: "bg-purple-100 text-purple-700",
  },
};

const DEFAULT_STYLE = {
  bg: "bg-pink-light",
  emoji: "🍨",
  badgeClass: "bg-primary/15 text-primary",
};

interface FlavorCardProps {
  flavor: IceCreamFlavor;
  index?: number;
  compact?: boolean;
}

function resolveImage(flavor: IceCreamFlavor): string | null {
  // 1. Use imageUrl from backend if provided
  const raw = Array.isArray(flavor.imageUrl)
    ? (flavor.imageUrl[0] ?? null)
    : ((flavor.imageUrl as string | null | undefined) ?? null);

  if (raw && raw.trim().length > 0) return raw;

  // 2. Fallback: look up by normalized name in seed image map
  const key = flavor.name.toLowerCase().trim();
  return SEED_IMAGE_MAP[key] ?? null;
}

export default function FlavorCard({
  flavor,
  index = 0,
  compact = false,
}: FlavorCardProps) {
  const style = CATEGORY_STYLES[flavor.category] ?? DEFAULT_STYLE;
  const imageUrl = resolveImage(flavor);
  const [imgError, setImgError] = useState(false);
  const { addItem, setDrawerOpen } = useCart();

  function handleAdd() {
    addItem(flavor);
    toast.success(`${flavor.name} added to cart! 🍦`, {
      duration: 2000,
    });
    setDrawerOpen(true);
  }

  const showImage = imageUrl && !imgError;

  return (
    <article
      data-ocid={`flavors.item.${index + 1}`}
      className={cn(
        "group bg-card rounded-card shadow-candy hover:shadow-candy-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden border border-border/40",
        !flavor.isAvailable && "opacity-75",
      )}
    >
      {/* Flavor Image */}
      {showImage ? (
        <div className="w-full h-44 overflow-hidden bg-muted relative">
          <img
            src={imageUrl}
            alt={`${flavor.name} - ${flavor.description || "ice cream"}`}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category pill overlay */}
          <div className="absolute top-2 left-2">
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm",
                style.badgeClass,
                "bg-card/80",
              )}
            >
              {style.emoji} {flavor.category}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "w-full flex items-center justify-center text-5xl relative",
            compact ? "h-28" : "h-36",
            style.bg,
          )}
        >
          <span className="select-none">{style.emoji}</span>
          <div className="absolute top-2 left-2">
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                style.badgeClass,
              )}
            >
              {flavor.category}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex flex-col gap-1 min-w-0">
            <h3
              className={cn(
                "font-extrabold leading-tight truncate",
                compact ? "text-sm" : "text-base",
              )}
            >
              {flavor.name}
            </h3>
            {/* Status badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {flavor.isFeatured && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-pill bg-accent text-accent-foreground">
                  ⭐ Featured
                </span>
              )}
              {!flavor.isAvailable && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-pill bg-foreground/80 text-white">
                  Sold Out
                </span>
              )}
            </div>
          </div>
          {/* Hide duplicate badge when image is shown (already has overlay) */}
          {!showImage && (
            <Badge
              className={cn(
                "rounded-pill text-[11px] font-bold px-2.5 shrink-0 border-0",
                style.badgeClass,
              )}
            >
              {flavor.category}
            </Badge>
          )}
        </div>

        <p
          className={cn(
            "text-muted-foreground leading-snug flex-1",
            compact ? "text-xs line-clamp-2" : "text-sm line-clamp-2",
          )}
        >
          {flavor.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-primary font-black text-lg">
            ₹{Number(flavor.price).toFixed(0)}
          </span>

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
            data-ocid={`flavors.add.${index + 1}`}
          >
            {flavor.isAvailable ? "Add +" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
