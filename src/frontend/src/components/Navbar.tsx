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

  // biome-ignore lint/correctness/useExhaustiveDependencies: location.pathname is the reactive value we want
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const pathname = location.pathname;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-candy"
            : "bg-cream/90 backdrop-blur-sm",
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <span className="text-3xl group-hover:animate-float">🍦</span>
            <span
              className="text-xl font-extrabold tracking-tight"
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
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className={cn(
                  "px-4 py-2 rounded-pill text-sm font-bold transition-all duration-200",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/[0.08]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Cart + Admin + Order Now */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart icon */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/[0.08] transition-all duration-200"
              aria-label="Open cart"
              data-ocid="nav.toggle"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full gradient-pink text-white text-[10px] font-extrabold flex items-center justify-center px-1 shadow-candy">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              to="/admin"
              data-ocid="nav.link"
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Admin
            </Link>
            <Button
              asChild
              className="rounded-pill gradient-pink border-0 text-white font-bold px-6 shadow-candy hover:shadow-candy-lg hover:scale-105 transition-all duration-200"
            >
              <Link to="/menu" data-ocid="nav.primary_button">
                Order Now
              </Link>
            </Button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 rounded-full text-foreground/70 hover:text-primary transition-colors"
              aria-label="Open cart"
              data-ocid="nav.toggle"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full gradient-pink text-white text-[10px] font-extrabold flex items-center justify-center px-1 shadow-candy">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              type="button"
              className="p-2 rounded-lg text-foreground/70 hover:text-primary transition-colors"
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
          <div className="md:hidden border-t border-border bg-white/98 backdrop-blur-md px-6 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className={cn(
                  "py-3 px-4 rounded-lg font-bold text-sm transition-all",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/[0.08]",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              data-ocid="nav.link"
              className="py-3 px-4 rounded-lg font-semibold text-xs text-muted-foreground hover:text-primary transition-all"
            >
              Admin
            </Link>
            <Button
              asChild
              className="mt-2 rounded-pill gradient-pink border-0 text-white font-bold shadow-candy"
            >
              <Link to="/menu" data-ocid="nav.primary_button">
                Order Now
              </Link>
            </Button>
          </div>
        )}
      </header>

      {/* Cart Drawer (outside header for proper stacking) */}
      <CartDrawer />
    </>
  );
}
