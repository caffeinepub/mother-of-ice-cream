import { Link } from "@tanstack/react-router";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍦</span>
              <span className="text-xl font-extrabold text-white">
                Mother of Ice-cream
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Handcrafted ice cream made with love, local dairy, and the finest
              ingredients. Every scoop is a little moment of joy.
            </p>
            <div className="flex gap-3 mt-5">
              <span
                role="img"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/80 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <SiInstagram size={15} />
              </span>
              <span
                role="img"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/80 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <SiX size={15} />
              </span>
              <span
                role="img"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/80 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <SiFacebook size={15} />
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white/80 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {(
                [
                  { label: "Home", href: "/" },
                  { label: "Our Flavors", href: "/menu" },
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ] as const
              ).map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-white/60 hover:text-primary text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white/80 mb-4">
              Visit Us
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>🏠 Mallickpur Habibchauk Chauk, Kolkata</li>
              <li>📞 +91 9007819261</li>
              <li>✉️ moficecream@gmail.com</li>
              <li className="mt-3">
                <span className="text-white/40 text-xs">
                  Mon–Sun · 11am – 10pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs">
            © Mother of Ice-cream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
