import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Award, Heart, Milk, Sparkles, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const OWNER_PHOTO =
  "/assets/img-20260406-wa0001-019d61c1-2f09-7078-a6aa-26e16fd56d5b.jpg";

const STATS = [
  { id: "flavors", value: "50+", label: "Unique Flavors", icon: "🍨" },
  { id: "location", value: "Kolkata", label: "Our City", icon: "📍" },
  { id: "dairy", value: "100%", label: "Local Dairy", icon: "🐄" },
  { id: "customers", value: "25k+", label: "Happy Customers", icon: "😊" },
];

const VALUES = [
  {
    id: "love",
    icon: <Heart className="w-6 h-6" />,
    gradient: "from-fuchsia-600 via-pink-500 to-rose-500",
    glow: "glow-fuchsia",
    title: "Made with Love",
    desc: "Every batch is hand-crafted by our team of passionate ice cream artisans who take pride in every single scoop.",
  },
  {
    id: "local",
    icon: <Milk className="w-6 h-6" />,
    gradient: "from-pink-500 via-rose-400 to-pink-600",
    glow: "glow-pink",
    title: "Local Ingredients",
    desc: "We partner with local dairy farms and fruit growers to ensure the freshest, highest-quality ingredients in every flavor.",
  },
  {
    id: "community",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-amber-400 via-yellow-400 to-orange-400",
    glow: "glow-gold",
    title: "Community First",
    desc: "We're a neighborhood institution. From school fundraisers to birthday parties, we're here for every sweet moment.",
  },
  {
    id: "award",
    icon: <Award className="w-6 h-6" />,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    glow: "glow-fuchsia",
    title: "Award Winning",
    desc: 'Winner of "Best Local Ice Cream" five years running. Our recipes have stood the test of time and taste.',
  },
];

function FloatingOrb({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-20 ${className}`}
    />
  );
}

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[520px] flex items-end">
        {/* Full-bleed photo */}
        <div className="absolute inset-0">
          <img
            src={OWNER_PHOTO}
            alt="Mother of Ice-cream"
            className="w-full h-full object-cover"
          />
          {/* Layered dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.08_275)] via-[oklch(0.12_0.08_275/0.7)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.08_275/0.5)] to-transparent" />
        </div>

        {/* Floating orbs for atmosphere */}
        <FloatingOrb className="w-72 h-72 bg-fuchsia-500 top-10 right-10" />
        <FloatingOrb className="w-48 h-48 bg-pink-500 top-32 right-1/3" />

        {/* Sparkle decorations */}
        <div className="absolute top-16 right-16 text-yellow-400 opacity-70">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute top-32 right-1/4 text-fuchsia-400 opacity-50">
          <Star
            className="w-5 h-5 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
        <div className="absolute top-20 left-1/3 text-pink-400 opacity-40">
          <Sparkles
            className="w-6 h-6 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Hero text */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-fuchsia-500" />
              <span className="text-fuchsia-400 font-bold text-sm uppercase tracking-widest">
                Our Story
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-black leading-none mb-6">
              <span className="text-foreground">More Than</span>
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Just Ice Cream
              </span>
            </h1>
            <p className="text-foreground/70 text-xl max-w-xl leading-relaxed">
              A family passion turned into Kolkata's most beloved ice cream
              destination — one handcrafted scoop at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story section ── */}
      <section className="py-24 relative overflow-hidden">
        <FloatingOrb className="w-96 h-96 bg-fuchsia-600 -left-32 top-0" />
        <FloatingOrb className="w-64 h-64 bg-pink-500 right-0 bottom-0" />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow ring behind image */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 opacity-30 blur-xl" />
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-500 opacity-60" />
            <img
              src={OWNER_PHOTO}
              alt="Mother of Ice-cream - Our Story"
              className="relative z-10 w-full rounded-xl object-cover shadow-luxury-xl"
              style={{ maxHeight: "460px" }}
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Fuchsia accent line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-12 bg-gradient-to-b from-fuchsia-500 to-pink-500 rounded-full glow-fuchsia" />
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
                A Sweet Legacy, Born in the Heart of{" "}
                <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Kolkata
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-foreground/70 leading-relaxed text-base">
              <p>
                Mother of Ice-cream was born in the heart of Kolkata, where a
                family passion for handcrafted ice cream turned into a beloved
                neighbourhood institution. What began as a small stall at the
                local market quickly grew into the shop you know and love today.
              </p>
              <p>
                We believe that great ice cream starts with great ingredients.
                Every flavour is made fresh daily using milk and cream sourced
                from trusted local dairy farms across Bengal.
              </p>
              <p>
                With 50+ flavours and a growing family of happy customers, our
                mission remains the same: to create that perfect moment of joy
                with every single scoop.
              </p>
            </div>
            <Button
              asChild
              className="mt-8 rounded-full font-bold px-9 py-6 text-foreground border-0 shadow-luxury-lg hover:shadow-luxury-xl hover:scale-105 transition-luxury"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
              }}
              data-ocid="about.primary_button"
            >
              <Link to="/menu">✨ Explore Our Flavors</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Stats grid ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-950/10 to-transparent" />
        <FloatingOrb className="w-80 h-80 bg-fuchsia-700 left-1/4 top-0 opacity-15" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="glass-lg rounded-2xl p-8 text-center border border-fuchsia-500/20 hover:border-fuchsia-500/50 transition-luxury hover:glow-fuchsia group cursor-default"
                data-ocid={`about.stat.${stat.id}`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-smooth">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 relative overflow-hidden">
        <FloatingOrb className="w-64 h-64 bg-pink-600 right-0 top-10" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-fuchsia-400 font-bold text-sm uppercase tracking-widest">
                Our Values
              </span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3">
              What We{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Stand For
              </span>
            </h2>
            <p className="text-foreground/60 text-lg max-w-md mx-auto">
              The values that guide every scoop we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass-lg rounded-2xl p-7 text-center flex flex-col items-center gap-5 border border-white/5 hover:border-fuchsia-500/30 transition-luxury group"
                data-ocid={`about.value.${v.id}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${v.gradient} text-white ${v.glow} group-hover:scale-110 transition-smooth shadow-luxury`}
                >
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground text-lg mb-2">
                    {v.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team section ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <FloatingOrb className="w-96 h-96 bg-fuchsia-600 left-1/2 top-0 -translate-x-1/2 opacity-10" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-fuchsia-400 font-bold text-sm uppercase tracking-widest">
                Meet the Team
              </span>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3">
              The People Behind Every{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Delicious Scoop
              </span>
            </h2>
            <p className="text-foreground/60 text-lg mb-12">
              Crafting happiness one flavour at a time in the heart of Kolkata.
            </p>

            {/* Circular photo with glow ring */}
            <div className="relative inline-flex items-center justify-center mb-8">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 opacity-60 blur-md scale-105" />
              {/* Gradient border ring */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-1 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-yellow-400 glow-fuchsia">
                <img
                  src={OWNER_PHOTO}
                  alt="The Mother of Ice-cream Owner"
                  className="w-full h-full rounded-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-2 -right-4 glass rounded-full px-3 py-1.5 text-xs font-bold text-yellow-400 border border-yellow-400/30">
                ⭐ 5★
              </div>
              <div className="absolute -bottom-2 -left-4 glass rounded-full px-3 py-1.5 text-xs font-bold text-fuchsia-400 border border-fuchsia-400/30">
                🏆 Award Winning
              </div>
            </div>

            <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-1">
              The Mother of Ice-cream Team
            </h3>
            <p className="text-foreground/60 text-base">
              📍 Mallickpur Habibchauk Chauk, Kolkata
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden">
        {/* Rich fuchsia gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.28 310) 0%, oklch(0.52 0.26 345) 50%, oklch(0.50 0.28 300) 100%)",
          }}
        />
        <FloatingOrb className="w-80 h-80 bg-pink-300 left-0 top-0 opacity-20" />
        <FloatingOrb className="w-64 h-64 bg-fuchsia-300 right-0 bottom-0 opacity-20" />
        {/* Sparkle accents */}
        <div className="absolute top-8 left-1/4 text-white/40">
          <Sparkles className="w-10 h-10 animate-pulse" />
        </div>
        <div className="absolute bottom-8 right-1/4 text-yellow-300/50">
          <Star
            className="w-8 h-8 animate-pulse"
            style={{ animationDelay: "0.8s" }}
          />
        </div>

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-5xl mb-4">🎉</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
              Come Visit Us Today
            </h2>
            <p className="text-white/75 text-lg mb-2">
              Mallickpur Habibchauk Chauk, Kolkata
            </p>
            <p className="text-white/60 mb-8">Open daily · 11am – 10pm</p>
            <Button
              asChild
              className="rounded-full font-bold px-10 py-6 text-base border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-luxury shadow-luxury-lg"
              data-ocid="about.contact_button"
            >
              <Link to="/contact">📍 Get Directions</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
