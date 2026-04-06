import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, B as Button, L as Link } from "./index-pbtFoexA.js";
import { F as FlavorCard } from "./FlavorCard-B-ARUpz7.js";
import { S as Skeleton } from "./skeleton-CGnmZ6VO.js";
import { u as useFeaturedFlavors } from "./useQueries-CGvCtvzL.js";
import { S as Star } from "./star-bXtPjTBX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const SPRINKLES = [
  {
    id: "sp1",
    top: "12%",
    left: "8%",
    size: 12,
    color: "oklch(0.64 0.22 355 / 0.4)",
    delay: 0
  },
  {
    id: "sp2",
    top: "25%",
    left: "3%",
    size: 8,
    color: "oklch(0.88 0.16 85 / 0.5)",
    delay: 0.5
  },
  {
    id: "sp3",
    top: "60%",
    left: "5%",
    size: 10,
    color: "oklch(0.82 0.13 185 / 0.45)",
    delay: 1
  },
  {
    id: "sp4",
    top: "8%",
    right: "6%",
    size: 14,
    color: "oklch(0.88 0.16 85 / 0.4)",
    delay: 0.3
  },
  {
    id: "sp5",
    top: "40%",
    right: "4%",
    size: 9,
    color: "oklch(0.64 0.22 355 / 0.35)",
    delay: 0.8
  },
  {
    id: "sp6",
    top: "70%",
    right: "7%",
    size: 11,
    color: "oklch(0.82 0.13 185 / 0.4)",
    delay: 0.2
  }
];
const USP_ITEMS = [
  {
    id: "natural",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-6 h-6" }),
    bg: "bg-secondary/20",
    color: "text-secondary-foreground",
    label: "100% Natural",
    desc: "No artificial flavors or preservatives"
  },
  {
    id: "flavors",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6" }),
    bg: "bg-primary/15",
    color: "text-primary",
    label: "50+ Flavors",
    desc: "Always something new to discover"
  },
  {
    id: "dairy",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-6 h-6" }),
    bg: "bg-accent/30",
    color: "text-accent-foreground",
    label: "Local Dairy",
    desc: "Farm-fresh from our local partners"
  }
];
const FALLBACK_FLAVORS = [
  {
    id: 1n,
    name: "Classic Vanilla Dream",
    description: "Smooth Madagascar vanilla with real vanilla bean specks in every creamy spoonful.",
    price: 3.99,
    category: "Classic",
    imageUrl: "/assets/generated/flavor-vanilla.dim_400x300.jpg",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: 2n,
    name: "Strawberry Bliss",
    description: "Sun-ripened strawberries blended into our signature creamy base for the perfect pink scoop.",
    price: 4.49,
    category: "Classic",
    imageUrl: "/assets/generated/flavor-strawberry.dim_400x300.jpg",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: 3n,
    name: "Midnight Chocolate",
    description: "Intense Belgian dark chocolate swirled into our richest, most indulgent base.",
    price: 4.49,
    category: "Classic",
    imageUrl: "/assets/generated/flavor-chocolate.dim_400x300.jpg",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: 9n,
    name: "Rainbow Sherbet",
    description: "A swirly, vibrant blend of fruity rainbow flavors — bright, refreshing, and impossible to resist.",
    price: 3.5,
    category: "Premium",
    imageUrl: "/assets/generated/rainbow-sherbet.dim_600x600.jpg",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: 10n,
    name: "Special of the Day",
    description: "Our chef's seasonal creation — a limited-edition scoop made with the freshest ingredients of the season.",
    price: 4,
    category: "Seasonal",
    imageUrl: "/assets/img-20260406-wa0000-019d6174-18d6-704c-951e-02bfcabea472.jpg",
    isAvailable: true,
    isFeatured: true
  }
];
function HomePage() {
  const { data: featuredFlavors, isLoading } = useFeaturedFlavors();
  const displayFlavors = featuredFlavors && featuredFlavors.length > 0 ? featuredFlavors : FALLBACK_FLAVORS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-hero relative min-h-[90vh] flex items-center", children: [
      SPRINKLES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute rounded-full pointer-events-none",
          style: {
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            background: s.color
          },
          animate: { y: [0, -12, 0], rotate: [0, 15, 0] },
          transition: {
            duration: 4 + i * 0.5,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }
        },
        s.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -40 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.7, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.1, duration: 0.5 },
                  className: "inline-flex items-center gap-2 bg-primary/10 text-primary rounded-pill px-4 py-1.5 text-sm font-bold mb-6",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🎉" }),
                    " Handcrafted with love in Kolkata"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-foreground mb-6", children: [
                "Life is Sweet.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "linear-gradient(135deg, oklch(0.64 0.22 355), oklch(0.82 0.13 185))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: "Scoop it Up!"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed mb-8 max-w-md", children: "Discover 50+ handcrafted flavors made from local dairy and the freshest seasonal ingredients. Every scoop is a moment of pure delight." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    className: "rounded-pill gradient-pink border-0 text-white font-bold px-8 py-6 text-base shadow-candy hover:shadow-candy-lg hover:scale-105 transition-all duration-200",
                    "data-ocid": "home.primary_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/menu", children: [
                      "Explore Flavors ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    variant: "outline",
                    className: "rounded-pill border-2 border-primary text-primary font-bold px-8 py-6 text-base hover:bg-primary hover:text-white transition-all duration-200",
                    "data-ocid": "home.secondary_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: "Our Story" })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.85, rotate: -5 },
            animate: { opacity: 1, scale: 1, rotate: 0 },
            transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
            className: "hidden lg:flex items-center justify-center relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute w-[420px] h-[420px] blob-shape",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.94 0.04 355), oklch(0.94 0.05 185))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, -14, 0], rotate: [0, 2, -1, 0] },
                  transition: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  },
                  className: "relative z-10",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/hero-ice-cream-cone-transparent.dim_600x650.png",
                      alt: "Delicious ice cream cone with colorful scoops",
                      className: "w-[340px] h-[370px] object-contain drop-shadow-2xl",
                      loading: "eager",
                      fetchPriority: "high"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, -8, 0] },
                  transition: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                    ease: "easeInOut"
                  },
                  className: "absolute top-6 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-pill shadow-sm",
                  children: "🌟 Best Seller"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, -8, 0] },
                  transition: {
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                    ease: "easeInOut"
                  },
                  className: "absolute bottom-16 right-2 bg-secondary/30 text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-pill shadow-sm",
                  children: "🌿 Vegan Options"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, -8, 0] },
                  transition: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.2,
                    ease: "easeInOut"
                  },
                  className: "absolute top-1/2 left-0 bg-white text-foreground text-xs font-bold px-3 py-1.5 rounded-pill shadow-candy",
                  children: "🆕 New Flavors!"
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", id: "featured", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1, margin: "-80px" },
          transition: { duration: 0.6 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-sm uppercase tracking-widest mb-2", children: "✨ Fan Favorites" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-foreground mb-3", children: "Our Featured Flavors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-md mx-auto", children: "Handpicked by our team and loved by thousands of happy customers." })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-card overflow-hidden",
          "data-ocid": "home.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
            ] })
          ]
        },
        i
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.1, margin: "-60px" },
          variants: {
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          },
          children: displayFlavors.slice(0, 6).map((flavor, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: {
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 }
                }
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlavorCard, { flavor, index: idx })
            },
            String(flavor.id)
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.5, delay: 0.3 },
          className: "text-center mt-10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "rounded-pill gradient-pink border-0 text-white font-bold px-10 shadow-candy hover:shadow-candy-lg hover:scale-105 transition-all duration-200",
              "data-ocid": "home.view_all_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/menu", children: [
                "View All Flavors ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
              ] })
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 gradient-hero", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.6 },
        className: "grid grid-cols-1 md:grid-cols-3 gap-8",
        children: USP_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.1 },
            transition: { duration: 0.5, delay: i * 0.12 },
            className: "flex flex-col items-center text-center gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-16 h-16 rounded-full flex items-center justify-center ${item.bg} ${item.color}`,
                  children: item.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-lg text-foreground", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: item.desc })
              ] })
            ]
          },
          item.id
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 bg-foreground relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none opacity-10",
          style: {
            background: "radial-gradient(circle at 30% 50%, oklch(0.64 0.22 355), transparent 60%),radial-gradient(circle at 70% 50%, oklch(0.82 0.13 185), transparent 60%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 text-center relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-4", children: "🍧" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-white mb-4", children: "Ready for Your Next Favorite Scoop?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-lg mb-8", children: "With 50+ flavors updated seasonally, there's always something exciting to try." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  className: "rounded-pill gradient-pink border-0 text-white font-bold px-10 py-6 shadow-candy-lg hover:scale-105 transition-all duration-200",
                  "data-ocid": "home.cta_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", children: "Browse All Flavors" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  variant: "outline",
                  className: "rounded-pill border-2 border-white/40 text-white font-bold px-10 py-6 hover:bg-white hover:text-foreground transition-all duration-200",
                  "data-ocid": "home.contact_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Get in Touch" })
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  HomePage as default
};
