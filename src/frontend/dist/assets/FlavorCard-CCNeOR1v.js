import { l as useCart, j as jsxRuntimeExports, k as cn, n as ue } from "./index-ebqjeJ_x.js";
import { B as Badge } from "./skeleton-CdAKPTdi.js";
const CATEGORY_STYLES = {
  Classic: {
    bg: "bg-pink-light",
    emoji: "🍦",
    badgeClass: "bg-primary/15 text-primary"
  },
  Vegan: {
    bg: "bg-secondary-light",
    emoji: "🌱",
    badgeClass: "bg-secondary/20 text-secondary-foreground"
  },
  Seasonal: {
    bg: "bg-accent-light",
    emoji: "🍂",
    badgeClass: "bg-accent/25 text-accent-foreground"
  },
  Premium: {
    bg: "bg-purple-100",
    emoji: "👑",
    badgeClass: "bg-purple-100 text-purple-700"
  }
};
const DEFAULT_STYLE = {
  bg: "bg-pink-light",
  emoji: "🍨",
  badgeClass: "bg-primary/15 text-primary"
};
function FlavorCard({
  flavor,
  index = 0,
  compact = false
}) {
  const style = CATEGORY_STYLES[flavor.category] ?? DEFAULT_STYLE;
  const imageUrl = Array.isArray(flavor.imageUrl) ? flavor.imageUrl[0] ?? null : flavor.imageUrl ?? null;
  const { addItem, setDrawerOpen } = useCart();
  function handleAdd() {
    addItem(flavor);
    ue.success(`${flavor.name} added to cart! 🍦`, {
      duration: 2e3
    });
    setDrawerOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": `flavors.item.${index + 1}`,
      className: cn(
        "group bg-card rounded-card shadow-candy hover:shadow-candy-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden border border-border/40",
        !flavor.isAvailable && "opacity-75"
      ),
      children: [
        imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-40 overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: flavor.name,
            loading: "lazy",
            decoding: "async",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-full flex items-center justify-center text-4xl",
              compact ? "h-24" : "h-32",
              style.bg
            ),
            children: style.emoji
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: cn(
                    "font-extrabold leading-tight",
                    compact ? "text-sm" : "text-base"
                  ),
                  children: flavor.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                flavor.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-pill bg-accent text-accent-foreground", children: "\\u2b50 Featured" }),
                !flavor.isAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-pill bg-foreground/80 text-white", children: "Sold Out" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: cn(
                  "rounded-pill text-[11px] font-bold px-2.5 shrink-0 border-0",
                  style.badgeClass
                ),
                children: flavor.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-muted-foreground leading-snug flex-1",
                compact ? "text-xs line-clamp-2" : "text-sm line-clamp-2"
              ),
              children: flavor.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-black text-base", children: [
            "₹",
            Number(flavor.price).toFixed(0)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleAdd,
              className: cn(
                "rounded-pill font-bold text-white transition-all duration-200 hover:scale-105",
                compact ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2",
                flavor.isAvailable ? "gradient-pink shadow-candy hover:shadow-candy-lg" : "bg-muted text-muted-foreground cursor-not-allowed"
              ),
              disabled: !flavor.isAvailable,
              "data-ocid": `flavors.item.${index + 1}`,
              children: flavor.isAvailable ? "Add +" : "Unavailable"
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  FlavorCard as F
};
