import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, B as Button, L as Link } from "./index-CkGatz-Q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2h8", key: "1ssgc1" }],
  [
    "path",
    {
      d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",
      key: "qtp12x"
    }
  ],
  ["path", { d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0", key: "ygeh44" }]
];
const Milk = createLucideIcon("milk", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const OWNER_PHOTO = "/assets/img-20260406-wa0001-019d61c1-2f09-7078-a6aa-26e16fd56d5b.jpg";
const STATS = [
  { id: "flavors", value: "50+", label: "Unique Flavors", icon: "🍨" },
  { id: "location", value: "Kolkata", label: "Our City", icon: "📍" },
  { id: "dairy", value: "100%", label: "Local Dairy", icon: "🐄" },
  { id: "customers", value: "25k+", label: "Happy Customers", icon: "😊" }
];
const VALUES = [
  {
    id: "love",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6" }),
    bg: "bg-primary/15",
    color: "text-primary",
    title: "Made with Love",
    desc: "Every batch is hand-crafted by our team of passionate ice cream artisans who take pride in every single scoop."
  },
  {
    id: "local",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Milk, { className: "w-6 h-6" }),
    bg: "bg-secondary/20",
    color: "text-secondary-foreground",
    title: "Local Ingredients",
    desc: "We partner with local dairy farms and fruit growers to ensure the freshest, highest-quality ingredients in every flavor."
  },
  {
    id: "community",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }),
    bg: "bg-accent/30",
    color: "text-accent-foreground",
    title: "Community First",
    desc: "We're a neighborhood institution. From school fundraisers to birthday parties, we're here for every sweet moment."
  },
  {
    id: "award",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-6 h-6" }),
    bg: "bg-purple-100",
    color: "text-purple-700",
    title: "Award Winning",
    desc: 'Winner of "Best Local Ice Cream" five years running. Our recipes have stood the test of time and taste.'
  }
];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative overflow-hidden",
        style: {
          background: "linear-gradient(160deg, oklch(0.978 0.012 55) 0%, oklch(0.97 0.025 15) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-72 sm:h-96 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: OWNER_PHOTO,
              alt: "Mother of Ice-cream",
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/20 to-black/55" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.65 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 font-bold text-sm uppercase tracking-widest mb-2", children: "🌸 Our Story" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-black text-white mb-3 drop-shadow-lg", children: "More Than Just Ice Cream" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-lg max-w-2xl mx-auto leading-relaxed", children: "We're a family-owned sweet shop on a mission to bring joy, one scoop at a time." })
              ]
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute -top-4 -left-4 w-full h-full rounded-card",
                style: {
                  background: "linear-gradient(135deg, oklch(0.94 0.04 355), oklch(0.94 0.05 185))"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: OWNER_PHOTO,
                alt: "Mother of Ice-cream - Our Story",
                className: "relative z-10 w-full rounded-card object-cover shadow-candy-lg",
                style: { maxHeight: "420px" },
                loading: "lazy"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7, delay: 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-foreground mb-6", children: "A Sweet Legacy, Born in the Heart of Kolkata" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mother of Ice-cream was born in the heart of Kolkata, where a family passion for handcrafted ice cream turned into a beloved neighbourhood institution. What began as a small stall at the local market quickly grew into the shop you know and love today." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We believe that great ice cream starts with great ingredients. Every flavour is made fresh daily using milk and cream sourced from trusted local dairy farms across Bengal." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "With 50+ flavours and a growing family of happy customers, our mission remains the same: to create that perfect moment of joy with every single scoop." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "mt-8 rounded-pill gradient-pink border-0 text-white font-bold px-8 shadow-candy hover:shadow-candy-lg hover:scale-105 transition-all duration-200",
                "data-ocid": "about.primary_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", children: "Explore Our Flavors" })
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 gradient-hero", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-8",
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        },
        children: STATS.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            variants: {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            },
            className: "text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: stat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-black text-foreground mb-1", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-muted-foreground", children: stat.label })
            ]
          },
          stat.id
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-foreground mb-3", children: "What We Stand For" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-md mx-auto", children: "The values that guide every scoop we make." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          className: "bg-background rounded-card p-6 shadow-candy text-center flex flex-col items-center gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-14 h-14 rounded-full flex items-center justify-center ${v.bg} ${v.color}`,
                children: v.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-foreground mb-2", children: v.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: v.desc })
            ] })
          ]
        },
        v.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-foreground mb-3", children: "Meet the Team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-10", children: "The people behind every delicious scoop." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute -top-4 -left-4 w-full h-full rounded-card",
                style: {
                  background: "linear-gradient(135deg, oklch(0.94 0.05 355), oklch(0.93 0.06 50))"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: OWNER_PHOTO,
                alt: "The Mother of Ice-cream Team",
                className: "relative z-10 w-full max-w-xl mx-auto rounded-card object-cover shadow-candy-lg",
                style: { maxHeight: "480px" },
                loading: "lazy"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground font-semibold text-lg", children: "The Team — Mallickpur Habibchauk Chauk, Kolkata" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16 bg-foreground text-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none opacity-10",
          style: {
            background: "radial-gradient(circle at 50% 50%, oklch(0.64 0.22 355), transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🎉" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-white mb-3", children: "Come Visit Us Today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mb-6", children: "Mallickpur Habibchauk Chauk, Kolkata · Open daily 11am – 10pm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "rounded-pill gradient-pink border-0 text-white font-bold px-10 py-6 shadow-candy-lg hover:scale-105 transition-all",
                "data-ocid": "about.contact_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Get Directions" })
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
export {
  AboutPage as default
};
