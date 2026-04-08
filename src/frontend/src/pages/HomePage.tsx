import FlavorCard from "@/components/FlavorCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedFlavors } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Leaf,
  MapPin,
  Play,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

// ─── Floating decorative emojis ───────────────────────────────────────────────
const FLOATERS = [
  {
    id: "f1",
    emoji: "🍦",
    top: "8%",
    left: "4%",
    size: "text-3xl",
    delay: 0,
    duration: 6,
  },
  {
    id: "f2",
    emoji: "🍧",
    top: "20%",
    left: "92%",
    size: "text-2xl",
    delay: 1.2,
    duration: 7,
  },
  {
    id: "f3",
    emoji: "✨",
    top: "45%",
    left: "1%",
    size: "text-xl",
    delay: 0.8,
    duration: 5,
  },
  {
    id: "f4",
    emoji: "🍨",
    top: "70%",
    left: "94%",
    size: "text-3xl",
    delay: 2,
    duration: 8,
  },
  {
    id: "f5",
    emoji: "⭐",
    top: "85%",
    left: "5%",
    size: "text-lg",
    delay: 0.4,
    duration: 6,
  },
  {
    id: "f6",
    emoji: "💫",
    top: "60%",
    left: "96%",
    size: "text-lg",
    delay: 1.5,
    duration: 5,
  },
];

// ─── USP items ────────────────────────────────────────────────────────────────
const USP_ITEMS = [
  {
    id: "natural",
    icon: <Leaf className="w-7 h-7" />,
    gradientFrom: "oklch(0.65 0.29 310)",
    gradientTo: "oklch(0.63 0.27 345)",
    label: "100% Natural",
    desc: "No artificial flavors or preservatives — ever.",
  },
  {
    id: "flavors",
    icon: <Star className="w-7 h-7" />,
    gradientFrom: "oklch(0.84 0.18 85)",
    gradientTo: "oklch(0.78 0.15 100)",
    label: "13+ Flavors",
    desc: "Handcrafted seasonal specials every single week.",
  },
  {
    id: "dairy",
    icon: <Truck className="w-7 h-7" />,
    gradientFrom: "oklch(0.63 0.27 345)",
    gradientTo: "oklch(0.65 0.29 310)",
    label: "Local Dairy",
    desc: "Farm-fresh from our trusted Kolkata partners.",
  },
];

const FALLBACK_FLAVORS = [
  {
    id: 1n,
    name: "Classic Vanilla Dream",
    description: "Smooth Madagascar vanilla with real vanilla bean specks.",
    price: 3.99,
    category: "Classic",
    imageUrl: "/assets/generated/flavor-vanilla.dim_400x300.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 2n,
    name: "Strawberry Bliss",
    description: "Sun-ripened strawberries in our signature creamy base.",
    price: 4.49,
    category: "Classic",
    imageUrl: "/assets/generated/flavor-strawberry.dim_400x300.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 3n,
    name: "Midnight Chocolate",
    description: "Intense Belgian dark chocolate in our richest base.",
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
      "A vibrant blend of fruity rainbow flavors — bright and refreshing.",
    price: 3.5,
    category: "Premium",
    imageUrl: "/assets/generated/rainbow-sherbet.dim_600x600.jpg",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 10n,
    name: "Special of the Day",
    description: "Our chef's seasonal creation with the freshest ingredients.",
    price: 4.0,
    category: "Seasonal",
    imageUrl:
      "/assets/img-20260406-wa0000-019d6174-18d6-704c-951e-02bfcabea472.jpg",
    isAvailable: true,
    isFeatured: true,
  },
];

// ─── Party Order Banner ───────────────────────────────────────────────────────
function PartyOrderBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full py-3 px-4 text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.65 0.29 310) 0%, oklch(0.63 0.27 345) 50%, oklch(0.84 0.18 85) 100%)",
      }}
      data-ocid="home.banner"
    >
      {/* shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.25) 50%, transparent 60%)",
          animation: "shimmer 3s infinite",
          backgroundSize: "600px 100%",
        }}
      />
      <p className="relative z-10 text-sm sm:text-base font-black tracking-wide text-foreground">
        🎉 Currently taking{" "}
        <span className="underline underline-offset-2 uppercase">
          PARTY ORDERS
        </span>{" "}
        only — &nbsp;
        <a
          href="tel:+919007819261"
          className="font-black hover:opacity-80 transition-opacity duration-200"
        >
          📞 +91 9007819261
        </a>
      </p>
    </motion.div>
  );
}

// ─── Video Section ────────────────────────────────────────────────────────────
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
    <section className="py-28 relative overflow-hidden gradient-hero">
      {/* Atmospheric orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: "oklch(0.65 0.29 310)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: "oklch(0.63 0.27 345)" }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill glass border border-primary/30 text-xs font-bold uppercase tracking-widest text-primary mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Behind the Scoop
          </div>
          <h2 className="text-4xl lg:text-6xl font-black leading-tight text-foreground mb-4">
            Watch Us Create{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Magic
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            From our kitchen to your hands — pure handcrafted goodness in every
            scoop.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative group cursor-pointer"
          onClick={togglePlay}
        >
          {/* Animated glow ring */}
          <div
            className="absolute -inset-2 rounded-3xl opacity-50 blur-2xl transition-opacity duration-700 group-hover:opacity-80 animate-glow-pulse"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345), oklch(0.84 0.18 85))",
            }}
          />
          <div
            className="absolute -inset-px rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.29 310 / 0.6), oklch(0.84 0.18 85 / 0.4))",
            }}
          />

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
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
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: isPlaying ? 0 : 1 }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center glow-fuchsia glass border border-primary/40">
                <Play className="w-10 h-10 text-foreground fill-foreground ml-1" />
              </div>
            </div>
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 text-xs font-bold px-3 py-1.5 rounded-pill glass border border-foreground/20 text-foreground">
              {isPlaying ? "⏸ Tap to pause" : "▶ Tap to play"}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {[
            "🍦 Fresh Daily",
            "🧁 Made with Love",
            "✨ Premium Ingredients",
          ].map((badge) => (
            <span
              key={badge}
              className="text-sm font-bold px-5 py-2 rounded-pill glass border border-primary/25 text-foreground hover:border-primary/50 transition-colors duration-200"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Shop Showcase Section ────────────────────────────────────────────────────
function ShopShowcaseSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.15 0.07 275)" }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-72 h-72 rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "oklch(0.63 0.27 345)" }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-72 h-72 rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ background: "oklch(0.84 0.18 85)" }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute -inset-4 rounded-3xl blur-3xl opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
              }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: "2px solid oklch(0.65 0.29 310 / 0.5)",
                boxShadow: "0 0 40px oklch(0.65 0.29 310 / 0.3)",
              }}
            >
              <img
                src="/assets/generated/hero-luxury-icecream.dim_900x600.jpg"
                alt="Premium ice cream display at Mother of Ice-cream"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.12 0.08 275 / 0.5), transparent 50%)",
                }}
              />
              <div
                className="absolute top-4 left-4 px-4 py-2 rounded-pill text-sm font-black"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                  color: "oklch(0.12 0.08 275)",
                  boxShadow: "0 4px 16px oklch(0.65 0.29 310 / 0.5)",
                }}
              >
                🏆 Kolkata&apos;s Favourite
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-foreground font-bold text-sm">
                  Mallickpur Habibchauk Chauk, Kolkata
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="flex flex-col gap-7"
          >
            <div>
              <p
                className="text-xs font-black uppercase tracking-widest mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🍨 Visit Our Shop
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1]">
                Experience the{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Magic
                </span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Nestled in the heart of Kolkata, our shop is a joyful celebration
              of flavour, colour, and happiness. Every scoop is made fresh daily
              with the finest local ingredients.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { emoji: "🌟", text: "Freshly churned every morning" },
                { emoji: "🎉", text: "Perfect for parties and celebrations" },
                {
                  emoji: "🍦",
                  text: "13+ handcrafted flavours to choose from",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 glass rounded-xl px-4 py-3 border border-primary/20"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-foreground font-semibold text-sm">
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
              className="self-start rounded-pill border-0 font-bold px-8 text-base transition-all duration-200 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                color: "oklch(0.94 0.02 55)",
                boxShadow: "0 8px 24px oklch(0.65 0.29 310 / 0.4)",
              }}
              data-ocid="home.shop_button"
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: featuredFlavors, isLoading } = useFeaturedFlavors();
  const displayFlavors =
    featuredFlavors && featuredFlavors.length > 0
      ? featuredFlavors
      : FALLBACK_FLAVORS;

  return (
    <div className="overflow-hidden">
      {/* ── PARTY BANNER ── */}
      <PartyOrderBanner />

      {/* ── HERO ── */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden gradient-hero">
        {/* Radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 30% 40%, oklch(0.65 0.29 310 / 0.22) 0%, transparent 55%)",
              "radial-gradient(ellipse at 75% 60%, oklch(0.63 0.27 345 / 0.18) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 90%, oklch(0.84 0.18 85 / 0.08) 0%, transparent 50%)",
            ].join(", "),
          }}
        />

        {/* Floating emojis */}
        {FLOATERS.map((f) => (
          <motion.div
            key={f.id}
            className={`absolute pointer-events-none ${f.size} select-none`}
            style={{ top: f.top, left: f.left }}
            animate={{ y: [0, -16, 0], rotate: [0, 8, -5, 0] }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {f.emoji}
          </motion.div>
        ))}

        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs font-bold uppercase tracking-widest mb-8 glass border border-primary/30"
              style={{ color: "oklch(0.84 0.18 85)" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Handcrafted with love in Kolkata
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight mb-6"
            >
              <span className="text-foreground">Mother</span>
              <br />
              <span className="text-foreground">of</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.29 310) 0%, oklch(0.63 0.27 345) 45%, oklch(0.84 0.18 85) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ice-cream
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground text-lg lg:text-xl leading-relaxed mb-10 max-w-md"
            >
              Kolkata's most beloved ice cream experience — handcrafted daily
              with local dairy and the freshest seasonal ingredients.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="rounded-pill border-0 font-black px-8 py-6 text-base transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                  color: "oklch(0.94 0.02 55)",
                  boxShadow:
                    "0 8px 32px oklch(0.65 0.29 310 / 0.5), 0 0 0 1px oklch(0.65 0.29 310 / 0.3)",
                }}
                data-ocid="home.hero_primary"
              >
                <Link to="/menu">
                  View Menu <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-pill font-black px-8 py-6 text-base transition-all duration-300 hover:scale-105"
                style={{
                  border: "2px solid oklch(0.84 0.18 85 / 0.6)",
                  color: "oklch(0.84 0.18 85)",
                  background: "transparent",
                }}
                data-ocid="home.hero_secondary"
              >
                <Link to="/contact">Order Now</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex gap-8 mt-12"
            >
              {[
                { value: "13+", label: "Flavors" },
                { value: "100%", label: "Natural" },
                { value: "Daily", label: "Fresh" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-2xl font-black"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Outer glow */}
            <div
              className="absolute w-[480px] h-[480px] rounded-full blur-3xl opacity-25 animate-glow-pulse"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
              }}
            />
            {/* Image frame */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  border: "2px solid oklch(0.65 0.29 310 / 0.5)",
                  boxShadow:
                    "0 0 60px oklch(0.65 0.29 310 / 0.4), 0 0 120px oklch(0.63 0.27 345 / 0.15), inset 0 0 30px oklch(0.65 0.29 310 / 0.05)",
                  width: 440,
                  height: 380,
                }}
              >
                <img
                  src="/assets/generated/hero-luxury-icecream.dim_900x600.jpg"
                  alt="Luxury premium ice cream by Mother of Ice-cream"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.12 0.08 275 / 0.6) 0%, transparent 60%)",
                  }}
                />
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
                className="absolute -top-5 -right-5 glass rounded-pill px-4 py-2 border border-primary/40 text-xs font-black"
                style={{
                  color: "oklch(0.84 0.18 85)",
                  boxShadow: "0 4px 20px oklch(0.65 0.29 310 / 0.3)",
                }}
              >
                ⭐ Best in Kolkata
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-5 glass rounded-pill px-4 py-2 border border-primary/40 text-xs font-black"
                style={{
                  color: "oklch(0.65 0.29 310)",
                  boxShadow: "0 4px 20px oklch(0.63 0.27 345 / 0.3)",
                }}
              >
                🎉 Party Orders
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
            Scroll
          </p>
          <motion.div
            className="w-0.5 h-10 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.65 0.29 310), transparent)",
            }}
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.7, 0.3, 0.7] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </section>

      {/* ── VIDEO ── */}
      <VideoSection />

      {/* ── SHOP SHOWCASE ── */}
      <ShopShowcaseSection />

      {/* ── FEATURED FLAVORS ── */}
      <section
        className="py-24 gradient-hero relative overflow-hidden"
        id="featured"
      >
        {/* Decorative orb */}
        <div
          className="absolute top-0 right-1/4 w-96 h-48 rounded-full opacity-10 blur-[80px] pointer-events-none"
          style={{ background: "oklch(0.65 0.29 310)" }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 rounded-pill px-4 py-1.5 glass border border-primary/30 text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.65 0.29 310)" }}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              Fan Favorites
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black text-foreground mb-3"
              data-ocid="home.featured_heading"
            >
              Our Featured{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Flavors
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Handpicked by our team and loved by thousands of happy customers.
            </p>
          </motion.div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="home.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass rounded-card overflow-hidden border border-primary/15"
                >
                  <Skeleton
                    className="h-48 w-full"
                    style={{ background: "oklch(0.22 0.05 275)" }}
                  />
                  <div className="p-4 space-y-3">
                    <Skeleton
                      className="h-5 w-3/4"
                      style={{ background: "oklch(0.22 0.05 275)" }}
                    />
                    <Skeleton
                      className="h-4 w-full"
                      style={{ background: "oklch(0.22 0.05 275)" }}
                    />
                    <Skeleton
                      className="h-4 w-2/3"
                      style={{ background: "oklch(0.22 0.05 275)" }}
                    />
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
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="rounded-pill border-0 font-black px-10 text-base transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                color: "oklch(0.94 0.02 55)",
                boxShadow: "0 8px 32px oklch(0.65 0.29 310 / 0.4)",
              }}
              data-ocid="home.view_all_button"
            >
              <Link to="/menu">
                View All Flavors <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── USP GRID ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "oklch(0.15 0.07 275)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.29 310 / 0.06), transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-foreground">
              Why{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Choose Us?
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USP_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative glass rounded-card p-8 border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-luxury-lg hover:-translate-y-1 flex flex-col items-center text-center gap-5"
                data-ocid={`home.usp_${item.id}`}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-foreground transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    boxShadow: `0 8px 24px ${item.gradientFrom.replace(")", " / 0.35)")}`,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-lg text-foreground mb-2">
                    {item.label}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="py-28 relative overflow-hidden gradient-hero">
        {/* Multi-layer glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 25% 50%, oklch(0.65 0.29 310 / 0.2), transparent 55%)",
              "radial-gradient(ellipse at 75% 50%, oklch(0.63 0.27 345 / 0.18), transparent 55%)",
              "radial-gradient(ellipse at 50% 100%, oklch(0.84 0.18 85 / 0.08), transparent 50%)",
            ].join(", "),
          }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-6xl mb-6"
            >
              🍧
            </motion.div>
            <h2
              className="text-4xl lg:text-6xl font-black mb-6 leading-tight"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.94 0.02 55) 0%, oklch(0.65 0.29 310) 50%, oklch(0.84 0.18 85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ready for Your Next Favourite Scoop?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              13+ flavors updated seasonally — there&apos;s always something new
              and exciting to try.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-pill border-0 font-black px-10 py-6 text-base transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                  color: "oklch(0.94 0.02 55)",
                  boxShadow:
                    "0 8px 40px oklch(0.65 0.29 310 / 0.5), 0 0 0 1px oklch(0.65 0.29 310 / 0.3)",
                }}
                data-ocid="home.cta_primary"
              >
                <Link to="/menu">Browse All Flavors</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-pill border-2 font-black px-10 py-6 text-base transition-all duration-300 hover:scale-105 bg-transparent"
                style={{
                  borderColor: "oklch(0.84 0.18 85 / 0.5)",
                  color: "oklch(0.84 0.18 85)",
                }}
                data-ocid="home.cta_secondary"
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
