import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { SEED_IMAGE_MAP } from "@/utils/seedImages";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { IceCreamFlavor } from "../hooks/useQueries";

const CATEGORY_CONFIG: Record<
  string,
  { emoji: string; labelClass: string; glowClass: string; borderClass: string }
> = {
  Classic: {
    emoji: "🍦",
    labelClass: "bg-primary/20 text-primary border border-primary/40",
    glowClass: "group-hover:glow-fuchsia",
    borderClass: "group-hover:border-primary/60",
  },
  Vegan: {
    emoji: "🌱",
    labelClass: "bg-secondary/20 text-secondary border border-secondary/40",
    glowClass: "group-hover:glow-pink",
    borderClass: "group-hover:border-secondary/60",
  },
  Seasonal: {
    emoji: "🍂",
    labelClass: "bg-pink-500/20 text-pink-300 border border-pink-400/40",
    glowClass: "group-hover:shadow-[0_0_20px_oklch(0.63_0.27_345/0.5)]",
    borderClass: "group-hover:border-pink-400/60",
  },
  Premium: {
    emoji: "👑",
    labelClass: "bg-accent/20 text-accent border border-accent/40",
    glowClass: "group-hover:glow-gold",
    borderClass: "group-hover:border-accent/60",
  },
};

const DEFAULT_CONFIG = {
  emoji: "🍨",
  labelClass: "bg-primary/20 text-primary border border-primary/40",
  glowClass: "group-hover:glow-fuchsia",
  borderClass: "group-hover:border-primary/60",
};

interface FlavorCardProps {
  flavor: IceCreamFlavor;
  index?: number;
  compact?: boolean;
}

function resolveImage(flavor: IceCreamFlavor): string | null {
  const raw = Array.isArray(flavor.imageUrl)
    ? (flavor.imageUrl[0] ?? null)
    : ((flavor.imageUrl as string | null | undefined) ?? null);
  if (raw && raw.trim().length > 0) return raw;
  const key = flavor.name.toLowerCase().trim();
  return SEED_IMAGE_MAP[key] ?? null;
}

export default function FlavorCard({
  flavor,
  index = 0,
  compact = false,
}: FlavorCardProps) {
  const config = CATEGORY_CONFIG[flavor.category] ?? DEFAULT_CONFIG;
  const imageUrl = resolveImage(flavor);
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, setDrawerOpen } = useCart();

  function handleAdd() {
    if (!flavor.isAvailable || isAdding) return;
    setIsAdding(true);
    addItem(flavor);
    toast.success(`${flavor.name} added to cart! 🍦`, { duration: 2000 });
    setDrawerOpen(true);
    setTimeout(() => setIsAdding(false), 600);
  }

  const showImage = imageUrl && !imgError;

  return (
    <motion.article
      data-ocid={`flavors.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300",
        "bg-[oklch(0.18_0.06_275/0.7)] backdrop-blur-md",
        "border-[oklch(0.28_0.08_280/0.5)]",
        config.borderClass,
        "shadow-luxury hover:shadow-luxury-xl hover:-translate-y-2",
        !flavor.isAvailable && "opacity-60",
      )}
    >
      {/* Image area */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          compact ? "h-44" : "h-52",
        )}
      >
        {showImage ? (
          <>
            <img
              src={imageUrl}
              alt={`${flavor.name} — ${flavor.description || "ice cream"}`}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            {/* Gradient overlay at bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.15 0.07 275) 0%, oklch(0.15 0.07 275 / 0.6) 35%, transparent 70%)",
              }}
            />
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-6xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.20 0.10 290) 0%, oklch(0.25 0.08 310) 100%)",
            }}
          >
            <span className="select-none drop-shadow-lg">{config.emoji}</span>
          </div>
        )}

        {/* Category badge — top left */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span
            className={cn(
              "text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm uppercase tracking-wide",
              config.labelClass,
            )}
          >
            {config.emoji} {flavor.category}
          </span>
        </div>

        {/* Featured badge — top right */}
        {flavor.isFeatured && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm uppercase tracking-wide bg-accent/25 text-accent border border-accent/50">
              ✦ Featured
            </span>
          </div>
        )}

        {/* Unavailable overlay */}
        {!flavor.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm z-20">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest px-3 py-1.5 rounded-full border border-border bg-card/80">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Name */}
        <h3
          className={cn(
            "font-black text-foreground leading-tight tracking-tight truncate",
            compact ? "text-sm" : "text-base",
          )}
        >
          {flavor.name}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-muted-foreground leading-snug flex-1 line-clamp-2",
            compact ? "text-xs" : "text-sm",
          )}
        >
          {flavor.description || "\u00A0"}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-1 gap-2">
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Price
            </span>
            <span className="text-xl font-black text-accent drop-shadow-sm">
              ₹{Number(flavor.price).toFixed(0)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!flavor.isAvailable || isAdding}
            data-ocid={`flavors.add.${index + 1}`}
            className={cn(
              "relative overflow-hidden rounded-xl font-black text-white transition-all duration-200",
              compact ? "text-xs px-3 py-2" : "text-sm px-4 py-2.5",
              flavor.isAvailable
                ? [
                    "glow-fuchsia hover:scale-105 active:scale-95",
                    "shadow-[0_4px_15px_oklch(0.65_0.29_310/0.5)]",
                    "hover:shadow-[0_6px_25px_oklch(0.65_0.29_310/0.7)]",
                  ]
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50",
            )}
            style={
              flavor.isAvailable
                ? {
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                  }
                : undefined
            }
          >
            {isAdding ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Adding…
              </span>
            ) : flavor.isAvailable ? (
              "Add to Cart +"
            ) : (
              "Unavailable"
            )}
          </button>
        </div>
      </div>

      {/* Hover glow border effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.29 310 / 0.08), oklch(0.63 0.27 345 / 0.04))",
        }}
      />
    </motion.article>
  );
}
