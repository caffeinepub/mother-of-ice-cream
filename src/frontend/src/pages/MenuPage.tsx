import FlavorCard from "@/components/FlavorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllFlavors, useFlavorsByCategory } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { SEED_PRODUCT_IMAGES } from "@/utils/seedImages";
import { Phone, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// Preload seed images so the build pipeline keeps them in the bundle
const _SEED_IMAGES = SEED_PRODUCT_IMAGES;

const CATEGORIES = ["All", "Classic", "Vegan", "Seasonal", "Premium"];

const CATEGORY_ICONS: Record<string, string> = {
  All: "✦",
  Classic: "🍦",
  Vegan: "🌱",
  Seasonal: "🍂",
  Premium: "👑",
};

function PartyOrderBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      data-ocid="menu.party_banner"
      className="w-full"
    >
      <div
        className="relative overflow-hidden rounded-2xl mx-4 sm:mx-6 my-4 p-[1.5px]"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85 / 0.8), oklch(0.63 0.27 345))",
        }}
      >
        <div
          className="rounded-[calc(1rem-1.5px)] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.16 0.09 280), oklch(0.20 0.07 295))",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.29 310 / 0.3), oklch(0.84 0.18 85 / 0.2))",
              }}
            >
              🎉
            </div>
            <div>
              <p className="font-black text-sm sm:text-base text-foreground tracking-wide">
                Currently Accepting{" "}
                <span
                  className="font-black"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  PARTY ORDERS ONLY
                </span>
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                Advance online payment required to confirm your booking
              </p>
            </div>
          </div>
          <a
            href="tel:+919007819261"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
              boxShadow: "0 4px 15px oklch(0.65 0.29 310 / 0.4)",
            }}
          >
            <Phone className="w-4 h-4" />
            +91 9007819261
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const { data: allFlavors, isLoading: loadingAll } = useAllFlavors();
  const { data: categoryFlavors, isLoading: loadingCat } =
    useFlavorsByCategory(activeCategory);

  const isLoading = activeCategory === "All" ? loadingAll : loadingCat;
  const rawFlavors =
    (activeCategory === "All" ? allFlavors : categoryFlavors) ?? [];

  const flavors = search.trim()
    ? rawFlavors.filter(
        (f) =>
          f.name.toLowerCase().includes(search.toLowerCase()) ||
          f.description.toLowerCase().includes(search.toLowerCase()),
      )
    : rawFlavors;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.12 0.08 275)" }}
    >
      {/* ===== HERO HEADER ===== */}
      <section className="relative overflow-hidden pt-12 pb-10">
        {/* Radial fuchsia glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.65 0.29 310 / 0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.63 0.27 345 / 0.12) 0%, transparent 60%)",
          }}
        />

        {/* Decorative blobs */}
        <div
          className="absolute top-4 left-8 w-24 h-24 rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.65 0.29 310 / 0.15)" }}
        />
        <div
          className="absolute top-8 right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.84 0.18 85 / 0.12)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border text-sm font-bold tracking-widest uppercase"
              style={{
                background: "oklch(0.65 0.29 310 / 0.12)",
                borderColor: "oklch(0.65 0.29 310 / 0.35)",
                color: "oklch(0.80 0.20 310)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              The Full Collection
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.94 0.02 55) 0%, oklch(0.84 0.18 85) 40%, oklch(0.65 0.29 310) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Menu 🍨
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Handcrafted flavors — classic, seasonal, premium &amp; more.
              <br />
              <span className="text-sm">
                Every scoop is a luxury experience.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== PARTY ORDER BANNER ===== */}
      <PartyOrderBanner />

      {/* ===== PRICE RANGE + SEARCH + FILTERS ===== */}
      <div className="max-w-6xl mx-auto px-6 mt-2">
        {/* Price range glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="rounded-xl px-5 py-3 mb-6 flex items-center justify-between gap-4 border"
          style={{
            background: "oklch(0.18 0.06 275 / 0.55)",
            backdropFilter: "blur(12px)",
            borderColor: "oklch(0.84 0.18 85 / 0.3)",
            boxShadow: "0 0 20px oklch(0.84 0.18 85 / 0.08)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Price Range
              </p>
              <p className="font-black text-sm text-foreground">
                <span style={{ color: "oklch(0.84 0.18 85)" }}>₹40</span> —{" "}
                <span style={{ color: "oklch(0.84 0.18 85)" }}>₹140</span>
                <span className="text-muted-foreground font-normal ml-2 text-xs">
                  per serving
                </span>
              </p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            🍦 A treat for every craving
          </span>
        </motion.div>

        {/* Search + Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center"
        >
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid="menu.tab"
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black transition-all duration-200 border",
                  activeCategory === cat
                    ? "text-white border-transparent scale-105"
                    : "text-muted-foreground hover:text-foreground hover:scale-105",
                )}
                style={
                  activeCategory === cat
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                        boxShadow:
                          "0 0 16px oklch(0.65 0.29 310 / 0.5), 0 0 32px oklch(0.65 0.29 310 / 0.2)",
                        borderColor: "transparent",
                      }
                    : {
                        background: "oklch(0.18 0.06 275 / 0.6)",
                        backdropFilter: "blur(8px)",
                        borderColor: "oklch(0.28 0.08 280 / 0.6)",
                      }
                }
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                {cat}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flavors…"
              data-ocid="menu.search_input"
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm font-medium text-foreground placeholder-muted-foreground outline-none border transition-all duration-200"
              style={{
                background: "oklch(0.18 0.06 275 / 0.65)",
                backdropFilter: "blur(12px)",
                borderColor: "oklch(0.28 0.08 280 / 0.6)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  "oklch(0.65 0.29 310 / 0.8)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px oklch(0.65 0.29 310 / 0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor =
                  "oklch(0.28 0.08 280 / 0.6)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </motion.div>

        {/* ===== PRODUCT GRID ===== */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-16"
            data-ocid="menu.loading_state"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                key={`skeleton-${i}`}
                className="rounded-2xl overflow-hidden border"
                style={{
                  borderColor: "oklch(0.24 0.08 280 / 0.5)",
                  background: "oklch(0.18 0.06 275 / 0.7)",
                }}
              >
                <Skeleton
                  className="h-44 w-full"
                  style={{ background: "oklch(0.22 0.07 275 / 0.8)" }}
                />
                <div className="p-4 space-y-2">
                  <Skeleton
                    className="h-4 w-3/4"
                    style={{ background: "oklch(0.22 0.07 275 / 0.8)" }}
                  />
                  <Skeleton
                    className="h-3 w-full"
                    style={{ background: "oklch(0.22 0.07 275 / 0.6)" }}
                  />
                  <Skeleton
                    className="h-8 w-1/2 mt-4"
                    style={{ background: "oklch(0.22 0.07 275 / 0.6)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : flavors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
            data-ocid="menu.empty_state"
          >
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl text-5xl mb-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.20 0.10 290), oklch(0.25 0.08 310))",
                boxShadow: "0 0 40px oklch(0.65 0.29 310 / 0.15)",
              }}
            >
              🍦
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2">
              {search
                ? `No flavors match "${search}"`
                : "No flavors in this category yet"}
            </h3>
            <p className="text-muted-foreground text-sm">
              Check back soon — we&apos;re always churning up something new!
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-16"
              data-ocid="menu.list"
            >
              {flavors.map((flavor, idx) => (
                <FlavorCard
                  key={String(flavor.id)}
                  flavor={flavor}
                  index={idx}
                  compact
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
