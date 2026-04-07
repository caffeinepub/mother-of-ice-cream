import FlavorCard from "@/components/FlavorCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllFlavors, useFlavorsByCategory } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { SEED_PRODUCT_IMAGES } from "@/utils/seedImages";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// Preload seed images so the build pipeline keeps them in the bundle
const _SEED_IMAGES = SEED_PRODUCT_IMAGES;

const CATEGORIES = ["All", "Classic", "Vegan", "Seasonal", "Premium"];

function PartyOrderBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full py-3.5 px-4 text-center font-black text-white text-sm sm:text-base tracking-wide"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.58 0.24 20) 0%, oklch(0.65 0.22 355) 40%, oklch(0.72 0.20 45) 100%)",
      }}
      data-ocid="menu.party_banner"
    >
      🎉 Currently accepting{" "}
      <span className="underline underline-offset-2">PARTY ORDERS</span> only —
      Advance online payment required · Call{" "}
      <a
        href="tel:+919007819261"
        className="underline underline-offset-2 hover:text-accent transition-colors"
      >
        +91 9007819261
      </a>{" "}
      to book!
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
    <div className="bg-background min-h-screen">
      {/* ===== PARTY ORDER ANNOUNCEMENT BANNER ===== */}
      <PartyOrderBanner />

      {/* Header */}
      <section
        className="py-16 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.978 0.012 55) 0%, oklch(0.97 0.025 15) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">
              🍨 The Full Collection
            </p>
            <h1 className="text-5xl font-black text-foreground mb-3">
              Our Flavor Menu
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Handcrafted flavors — classic, seasonal, premium, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Range Banner */}
      <div
        className="w-full py-3 text-center font-bold text-white text-base tracking-wide"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.65 0.22 20) 0%, oklch(0.72 0.18 45) 100%)",
        }}
      >
        🍦 Prices starting from ₹40 — A treat for every craving!
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid="menu.tab"
                className={cn(
                  "px-4 py-2 rounded-pill text-sm font-bold transition-all duration-200",
                  activeCategory === cat
                    ? "gradient-pink text-white shadow-candy"
                    : "bg-card border-2 border-border text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flavors…"
              className="pl-9 rounded-pill border-2 focus-visible:ring-primary"
              data-ocid="menu.search_input"
            />
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            data-ocid="menu.loading_state"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              <div key={i} className="rounded-card overflow-hidden">
                <Skeleton className="h-44 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : flavors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            data-ocid="menu.empty_state"
          >
            <p className="text-6xl mb-4">🍦</p>
            <h3 className="text-xl font-extrabold text-foreground mb-2">
              {search
                ? `No flavors match "${search}"`
                : "No flavors in this category yet"}
            </h3>
            <p className="text-muted-foreground">
              Check back soon — we&apos;re always churning up something new!
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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
