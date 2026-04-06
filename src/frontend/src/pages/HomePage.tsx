import FlavorCard from "@/components/FlavorCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedFlavors } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, MapPin, Play, Star, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const SPRINKLES = [
  {
    id: "sp1",
    top: "12%",
    left: "8%",
    size: 12,
    color: "oklch(0.64 0.22 355 / 0.4)",
    delay: 0,
  },
  {
    id: "sp2",
    top: "25%",
    left: "3%",
    size: 8,
    color: "oklch(0.88 0.16 85 / 0.5)",
    delay: 0.5,
  },
  {
    id: "sp3",
    top: "60%",
    left: "5%",
    size: 10,
    color: "oklch(0.82 0.13 185 / 0.45)",
    delay: 1,
  },
  {
    id: "sp4",
    top: "8%",
    right: "6%",
    size: 14,
    color: "oklch(0.88 0.16 85 / 0.4)",
    delay: 0.3,
  },
  {
    id: "sp5",
    top: "40%",
    right: "4%",
    size: 9,
    color: "oklch(0.64 0.22 355 / 0.35)",
    delay: 0.8,
  },
  {
    id: "sp6",
    top: "70%",
    right: "7%",
    size: 11,
    color: "oklch(0.82 0.13 185 / 0.4)",
    delay: 0.2,
  },
];

const USP_ITEMS = [
  {
    id: "natural",
    icon: <Leaf className="w-6 h-6" />,
    bg: "bg-secondary/20",
    color: "text-secondary-foreground",
    label: "100% Natural",
    desc: "No artificial flavors or preservatives",
  },
  {
    id: "flavors",
    icon: <Star className="w-6 h-6" />,
    bg: "bg-primary/15",
    color: "text-primary",
    label: "50+ Flavors",
    desc: "Always something new to discover",
  },
  {
    id: "dairy",
    icon: <Truck className="w-6 h-6" />,
    bg: "bg-accent/30",
    color: "text-accent-foreground",
    label: "Local Dairy",
    desc: "Farm-fresh from our local partners",
  },
];

const FALLBACK_FLAVORS = [
  {
    id: 1n,
    name: "Classic Vanilla Dream",
    description:
      "Smooth Madagascar vanilla with real vanilla bean specks in every creamy spoonful.",
    price: 3.99,
    category: "Classic",
    imageUrl: "/assets/generated/flavor-vanilla.dim_400x300.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 2n,
    name: "Strawberry Bliss",
    description:
      "Sun-ripened strawberries blended into our signature creamy base for the perfect pink scoop.",
    price: 4.49,
    category: "Classic",
    imageUrl: "/assets/generated/flavor-strawberry.dim_400x300.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 3n,
    name: "Midnight Chocolate",
    description:
      "Intense Belgian dark chocolate swirled into our richest, most indulgent base.",
    price: 4.49,
    category: "Classic",
    imageUrl: "/assets/generated/flavor-chocolate.dim_400x300.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 9n,
    name: "Rainbow Sherbet",
    description:
      "A swirly, vibrant blend of fruity rainbow flavors — bright, refreshing, and impossible to resist.",
    price: 3.5,
    category: "Premium",
    imageUrl: "/assets/generated/rainbow-sherbet.dim_600x600.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 10n,
    name: "Special of the Day",
    description:
      "Our chef's seasonal creation — a limited-edition scoop made with the freshest ingredients of the season.",
    price: 4.0,
    category: "Seasonal",
    imageUrl:
      "/assets/img-20260406-wa0000-019d6174-18d6-704c-951e-02bfcabea472.jpg",
    isAvailable: true,
    isFeatured: true,
  },
];

function PartyOrderBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full py-3 px-4 text-center font-black text-white text-sm sm:text-base tracking-wide"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.58 0.24 20) 0%, oklch(0.65 0.22 355) 40%, oklch(0.72 0.20 45) 100%)",
      }}
      data-ocid="home.section"
    >
      🎉 We are currently only taking{" "}
      <span className="underline underline-offset-2">PARTY ORDERS</span> —
      Contact us to place your order!
    </motion.div>
  );
}

function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.13 0.025 270), oklch(0.10 0.04 300), oklch(0.13 0.025 270))",
      }}
    >
      {/* Background glow accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.64 0.22 355 / 0.12), transparent 55%), radial-gradient(ellipse at 80% 50%, oklch(0.82 0.13 185 / 0.1), transparent 55%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.82 0.13 185)" }}
          >
            🎬 Behind the Scoop
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            Watch Us Create{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.64 0.22 355), oklch(0.88 0.16 85))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Magic
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            From our kitchen to your hands — pure handcrafted goodness in every
            scoop.
          </p>
        </motion.div>

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative group cursor-pointer"
          onClick={togglePlay}
        >
          {/* Glow ring */}
          <div
            className="absolute -inset-1 rounded-3xl opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.64 0.22 355), oklch(0.82 0.13 185))",
            }}
          />

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <video
              ref={videoRef}
              src="/assets/vid-20260406-wa0003-019d63d6-ed29-7618-9dc2-afc4cbd21b78.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover"
              style={{ maxHeight: "520px" }}
            />

            {/* Play/Pause overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: isPlaying ? 0 : 1 }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                style={{ background: "oklch(0.64 0.22 355 / 0.85)" }}
              >
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Tap-to-pause hint */}
            <div
              className="absolute bottom-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20"
              style={{ color: "white", background: "oklch(0 0 0 / 0.45)" }}
            >
              {isPlaying ? "Tap to pause" : "Tap to play"}
            </div>
          </div>
        </motion.div>

        {/* Bottom label badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {[
            "🍦 Fresh Daily",
            "🧁 Made with Love",
            "✨ Premium Ingredients",
          ].map((badge) => (
            <span
              key={badge}
              className="text-sm font-semibold px-5 py-2 rounded-full border border-white/15"
              style={{
                color: "oklch(0.9 0.05 300)",
                background: "oklch(1 0 0 / 0.07)",
              }}
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ShopShowcaseSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, oklch(0.97 0.03 15 / 0.6), transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow behind image */}
            <div
              className="absolute -inset-3 rounded-3xl blur-2xl opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.64 0.22 355), oklch(0.88 0.16 85))",
              }}
            />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/assets/generated/mother-of-icecream-shop.dim_800x500.jpg"
                alt="Mother of Ice-cream shop in Kolkata — vibrant display of handcrafted ice cream flavors"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Floating badge */}
              <div
                className="absolute top-4 left-4 px-4 py-2 rounded-full text-white text-sm font-black shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.64 0.22 355), oklch(0.72 0.20 45))",
                }}
              >
                🏆 Kolkata's Favourite
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p
                className="text-sm font-black uppercase tracking-widest mb-3"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.64 0.22 355), oklch(0.72 0.20 45))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🍨 Visit Our Shop
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-tight">
                Experience the Magic of{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.64 0.22 355), oklch(0.82 0.13 185))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Mother of Ice-cream
                </span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Nestled in the heart of Kolkata, our shop is a joyful celebration
              of flavour, colour, and happiness. Every scoop is made fresh daily
              with the finest local ingredients — because you deserve nothing
              less than the best.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { emoji: "🌟", text: "Freshly churned every morning" },
                { emoji: "🎉", text: "Perfect for parties and celebrations" },
                {
                  emoji: "🍦",
                  text: "13+ handcrafted flavours to choose from",
                },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-foreground font-semibold">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
              <MapPin className="w-4 h-4 text-primary" />
              Mallickpur Habibchauk Chauk, Kolkata
            </div>

            <Button
              asChild
              size="lg"
              className="rounded-pill gradient-pink border-0 text-white font-bold px-8 shadow-candy hover:shadow-candy-lg hover:scale-105 transition-all duration-200 self-start"
              data-ocid="home.secondary_button"
            >
              <Link to="/contact">
                Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { data: featuredFlavors, isLoading } = useFeaturedFlavors();
  const displayFlavors =
    featuredFlavors && featuredFlavors.length > 0
      ? featuredFlavors
      : FALLBACK_FLAVORS;

  return (
    <div className="overflow-hidden">
      {/* ===== PARTY ORDER ANNOUNCEMENT BANNER ===== */}
      <PartyOrderBanner />

      {/* ===== HERO ===== */}
      <section className="gradient-hero relative min-h-[90vh] flex items-center">
        {SPRINKLES.map((s, i) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: s.top,
              left: (s as { left?: string }).left,
              right: (s as { right?: string }).right,
              width: s.size,
              height: s.size,
              background: s.color,
            }}
            animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
            transition={{
              duration: 4 + i * 0.5,
              delay: s.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-pill px-4 py-1.5 text-sm font-bold mb-6"
            >
              <span>🎉</span> Handcrafted with love in Kolkata
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-foreground mb-6">
              Life is Sweet.
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.64 0.22 355), oklch(0.82 0.13 185))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Scoop it Up!
              </span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Discover 50+ handcrafted flavors made from local dairy and the
              freshest seasonal ingredients. Every scoop is a moment of pure
              delight.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-pill gradient-pink border-0 text-white font-bold px-8 py-6 text-base shadow-candy hover:shadow-candy-lg hover:scale-105 transition-all duration-200"
                data-ocid="home.primary_button"
              >
                <Link to="/menu">
                  Explore Flavors <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-pill border-2 border-primary text-primary font-bold px-8 py-6 text-base hover:bg-primary hover:text-white transition-all duration-200"
                data-ocid="home.secondary_button"
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right — hero art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div
              className="absolute w-[420px] h-[420px] blob-shape"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.94 0.04 355), oklch(0.94 0.05 185))",
              }}
            />
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 2, -1, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <img
                src="/assets/generated/hero-ice-cream-cone-transparent.dim_600x650.png"
                alt="Delicious ice cream cone with colorful scoops"
                className="w-[340px] h-[370px] object-contain drop-shadow-2xl"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
                ease: "easeInOut",
              }}
              className="absolute top-6 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-pill shadow-sm"
            >
              🌟 Best Seller
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
                ease: "easeInOut",
              }}
              className="absolute bottom-16 right-2 bg-secondary/30 text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-pill shadow-sm"
            >
              🌿 Vegan Options
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.2,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-0 bg-white text-foreground text-xs font-bold px-3 py-1.5 rounded-pill shadow-candy"
            >
              🆕 New Flavors!
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <VideoSection />

      {/* ===== SHOP SHOWCASE ===== */}
      <ShopShowcaseSection />

      {/* ===== FEATURED FLAVORS ===== */}
      <section className="py-20 bg-white" id="featured">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">
              ✨ Fan Favorites
            </p>
            <h2 className="text-4xl font-black text-foreground mb-3">
              Our Featured Flavors
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Handpicked by our team and loved by thousands of happy customers.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-card overflow-hidden"
                  data-ocid="home.loading_state"
                >
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {displayFlavors.slice(0, 6).map((flavor, idx) => (
                <motion.div
                  key={String(flavor.id)}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <FlavorCard flavor={flavor} index={idx} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Button
              asChild
              size="lg"
              className="rounded-pill gradient-pink border-0 text-white font-bold px-10 shadow-candy hover:shadow-candy-lg hover:scale-105 transition-all duration-200"
              data-ocid="home.view_all_button"
            >
              <Link to="/menu">
                View All Flavors <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== USP BAND ===== */}
      <section className="py-16 gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {USP_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-foreground">
                    {item.label}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="py-20 bg-foreground relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, oklch(0.64 0.22 355), transparent 60%),radial-gradient(circle at 70% 50%, oklch(0.82 0.13 185), transparent 60%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-4xl mb-4">🍧</p>
            <h2 className="text-4xl font-black text-white mb-4">
              Ready for Your Next Favorite Scoop?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              With 50+ flavors updated seasonally, there&apos;s always something
              exciting to try.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-pill gradient-pink border-0 text-white font-bold px-10 py-6 shadow-candy-lg hover:scale-105 transition-all duration-200"
                data-ocid="home.cta_button"
              >
                <Link to="/menu">Browse All Flavors</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-pill border-2 border-white/40 text-white font-bold px-10 py-6 hover:bg-white hover:text-foreground transition-all duration-200"
                data-ocid="home.contact_button"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
