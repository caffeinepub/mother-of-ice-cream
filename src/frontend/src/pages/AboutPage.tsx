import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Award, Heart, Milk, Users } from "lucide-react";
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
    bg: "bg-primary/15",
    color: "text-primary",
    title: "Made with Love",
    desc: "Every batch is hand-crafted by our team of passionate ice cream artisans who take pride in every single scoop.",
  },
  {
    id: "local",
    icon: <Milk className="w-6 h-6" />,
    bg: "bg-secondary/20",
    color: "text-secondary-foreground",
    title: "Local Ingredients",
    desc: "We partner with local dairy farms and fruit growers to ensure the freshest, highest-quality ingredients in every flavor.",
  },
  {
    id: "community",
    icon: <Users className="w-6 h-6" />,
    bg: "bg-accent/30",
    color: "text-accent-foreground",
    title: "Community First",
    desc: "We're a neighborhood institution. From school fundraisers to birthday parties, we're here for every sweet moment.",
  },
  {
    id: "award",
    icon: <Award className="w-6 h-6" />,
    bg: "bg-purple-100",
    color: "text-purple-700",
    title: "Award Winning",
    desc: 'Winner of "Best Local Ice Cream" five years running. Our recipes have stood the test of time and taste.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero with banner photo */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.978 0.012 55) 0%, oklch(0.97 0.025 15) 100%)",
        }}
      >
        {/* Banner image */}
        <div className="relative w-full h-72 sm:h-96 overflow-hidden">
          <img
            src={OWNER_PHOTO}
            alt="Mother of Ice-cream"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <p className="text-white/80 font-bold text-sm uppercase tracking-widest mb-2">
                🌸 Our Story
              </p>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 drop-shadow-lg">
                More Than Just Ice Cream
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                We&apos;re a family-owned sweet shop on a mission to bring joy,
                one scoop at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="absolute -top-4 -left-4 w-full h-full rounded-card"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.94 0.04 355), oklch(0.94 0.05 185))",
              }}
            />
            <img
              src={OWNER_PHOTO}
              alt="Mother of Ice-cream - Our Story"
              className="relative z-10 w-full rounded-card object-cover shadow-candy-lg"
              style={{ maxHeight: "420px" }}
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="text-3xl font-black text-foreground mb-6">
              A Sweet Legacy, Born in the Heart of Kolkata
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
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
              className="mt-8 rounded-pill gradient-pink border-0 text-white font-bold px-8 shadow-candy hover:shadow-candy-lg hover:scale-105 transition-all duration-200"
              data-ocid="about.primary_button"
            >
              <Link to="/menu">Explore Our Flavors</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <section className="py-16 gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-black text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-foreground mb-3">
              What We Stand For
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              The values that guide every scoop we make.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-card p-6 shadow-candy text-center flex flex-col items-center gap-4"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${v.bg} ${v.color}`}
                >
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Owner photo */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-foreground mb-3">
              Meet the Team
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              The people behind every delicious scoop.
            </p>
            <div className="relative inline-block">
              <div
                className="absolute -top-4 -left-4 w-full h-full rounded-card"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.94 0.05 355), oklch(0.93 0.06 50))",
                }}
              />
              <img
                src={OWNER_PHOTO}
                alt="The Mother of Ice-cream Team"
                className="relative z-10 w-full max-w-xl mx-auto rounded-card object-cover shadow-candy-lg"
                style={{ maxHeight: "480px" }}
                loading="lazy"
              />
            </div>
            <p className="mt-6 text-muted-foreground font-semibold text-lg">
              The Team — Mallickpur Habibchauk Chauk, Kolkata
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.64 0.22 355), transparent 70%)",
          }}
        />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-4xl mb-3">🎉</p>
            <h2 className="text-3xl font-black text-white mb-3">
              Come Visit Us Today
            </h2>
            <p className="text-white/60 mb-6">
              Mallickpur Habibchauk Chauk, Kolkata · Open daily 11am – 10pm
            </p>
            <Button
              asChild
              className="rounded-pill gradient-pink border-0 text-white font-bold px-10 py-6 shadow-candy-lg hover:scale-105 transition-all"
              data-ocid="about.contact_button"
            >
              <Link to="/contact">Get Directions</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
