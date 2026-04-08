import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" as const },
  { label: "Menu", href: "/menu" as const },
  { label: "About", href: "/about" as const },
  { label: "Contact", href: "/contact" as const },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, setDrawerOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: location.pathname is the reactive value
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const pathname = location.pathname;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-[oklch(0.10_0.07_275/0.97)] backdrop-blur-xl shadow-[0_4px_30px_oklch(0.65_0.29_310/0.15),0_1px_0_oklch(0.65_0.29_310/0.2)]"
            : "bg-[oklch(0.12_0.08_275/0.85)] backdrop-blur-md border-b border-[oklch(0.65_0.29_310/0.15)]",
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-ocid="nav.link"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md bg-[oklch(0.65_0.29_310/0.5)]" />
              <img
                src="/assets/logo.png"
                alt="Mother of Ice-cream logo"
                className="relative h-11 w-11 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_oklch(0.65_0.29_310/0.6)]"
              />
            </div>
            <span
              className="hidden sm:inline text-xl font-extrabold tracking-tight font-display"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.84 0.18 85))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mother of Ice-cream
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 group overflow-hidden",
                  pathname === link.href
                    ? "text-cream"
                    : "text-cream/60 hover:text-cream",
                )}
              >
                {/* Active/hover underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300",
                    "bg-gradient-to-r from-[oklch(0.65_0.29_310)] to-[oklch(0.63_0.27_345)]",
                    pathname === link.href ? "w-4/5" : "w-0 group-hover:w-4/5",
                  )}
                />
                {/* Hover bg glow */}
                <span
                  className={cn(
                    "absolute inset-0 rounded-lg transition-all duration-200",
                    pathname === link.href
                      ? "bg-[oklch(0.65_0.29_310/0.12)]"
                      : "group-hover:bg-[oklch(0.65_0.29_310/0.08)]",
                  )}
                />
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative p-2.5 rounded-full text-cream/70 hover:text-cream transition-all duration-200 hover:bg-[oklch(0.65_0.29_310/0.12)] group"
              aria-label="Open cart"
              data-ocid="nav.toggle"
            >
              <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full text-white text-[10px] font-extrabold flex items-center justify-center px-1 animate-[glow-pulse_2s_ease-in-out_infinite] bg-gradient-to-br from-[oklch(0.65_0.29_310)] to-[oklch(0.63_0.27_345)] shadow-[0_0_10px_oklch(0.65_0.29_310/0.7)]">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              to="/admin"
              data-ocid="nav.link"
              className="text-xs font-semibold text-cream/40 hover:text-cream/70 transition-colors"
            >
              Admin
            </Link>

            <Button
              asChild
              className="rounded-pill border-0 text-cream font-bold px-6 bg-gradient-to-r from-[oklch(0.65_0.29_310)] to-[oklch(0.63_0.27_345)] hover:shadow-[0_0_20px_oklch(0.65_0.29_310/0.5),0_0_40px_oklch(0.65_0.29_310/0.2)] hover:scale-105 transition-all duration-300"
            >
              <Link to="/menu" data-ocid="nav.primary_button">
                Order Now ✨
              </Link>
            </Button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 rounded-full text-cream/70 hover:text-cream transition-colors"
              aria-label="Open cart"
              data-ocid="nav.toggle"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[oklch(0.65_0.29_310)] to-[oklch(0.63_0.27_345)] text-white text-[10px] font-extrabold flex items-center justify-center px-1 shadow-[0_0_10px_oklch(0.65_0.29_310/0.7)]">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              type="button"
              className="p-2 rounded-lg text-cream/70 hover:text-cream transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-[oklch(0.65_0.29_310/0.2)] bg-[oklch(0.10_0.07_275/0.97)] backdrop-blur-xl px-6 py-5 flex flex-col gap-1.5 shadow-[0_8px_32px_oklch(0.65_0.29_310/0.1)]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className={cn(
                  "py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 border",
                  pathname === link.href
                    ? "text-cream bg-[oklch(0.65_0.29_310/0.15)] border-[oklch(0.65_0.29_310/0.4)] shadow-[inset_0_0_20px_oklch(0.65_0.29_310/0.05)]"
                    : "text-cream/60 border-transparent hover:text-cream hover:bg-[oklch(0.65_0.29_310/0.08)] hover:border-[oklch(0.65_0.29_310/0.2)]",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              data-ocid="nav.link"
              className="py-2.5 px-4 rounded-xl font-semibold text-xs text-cream/30 hover:text-cream/60 transition-all border border-transparent"
            >
              Admin
            </Link>
            <Button
              asChild
              className="mt-3 rounded-pill border-0 text-cream font-bold bg-gradient-to-r from-[oklch(0.65_0.29_310)] to-[oklch(0.63_0.27_345)] shadow-[0_0_20px_oklch(0.65_0.29_310/0.3)] hover:shadow-[0_0_30px_oklch(0.65_0.29_310/0.5)]"
            >
              <Link to="/menu" data-ocid="nav.primary_button">
                Order Now ✨
              </Link>
            </Button>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
