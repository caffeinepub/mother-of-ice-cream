import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Menu", href: "/menu" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const CONTACT_INFO = [
  {
    icon: MapPin,
    text: "Mallickpur Habibchauk Chauk, Kolkata",
  },
  {
    icon: Phone,
    text: "+91 9007819261",
    href: "tel:+919007819261",
  },
  {
    icon: Mail,
    text: "moficecream@gmail.com",
    href: "mailto:moficecream@gmail.com",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[oklch(0.09_0.06_275)] border-t border-[oklch(0.65_0.29_310/0.2)]">
      {/* Subtle glow backdrop */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-[oklch(0.65_0.29_310/0.04)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-40 bg-[oklch(0.63_0.27_345/0.04)] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-md bg-[oklch(0.65_0.29_310/0.3)]" />
                <img
                  src="/assets/logo.png"
                  alt="Mother of Ice-cream logo"
                  className="relative h-12 w-12 object-contain drop-shadow-[0_0_8px_oklch(0.65_0.29_310/0.5)]"
                />
              </div>
              <span
                className="text-xl font-extrabold font-display"
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
            </div>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs mb-6">
              Handcrafted ice cream made with love, local dairy, and the finest
              ingredients. Every scoop is a little moment of pure magic.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiX, label: "Twitter / X" },
                { Icon: SiFacebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group bg-[oklch(0.18_0.06_275/0.6)] border border-[oklch(0.65_0.29_310/0.2)] hover:border-[oklch(0.65_0.29_310/0.6)] hover:bg-[oklch(0.65_0.29_310/0.15)] hover:shadow-[0_0_16px_oklch(0.65_0.29_310/0.4)] hover:scale-110"
                >
                  <Icon
                    size={15}
                    className="text-cream/50 group-hover:text-cream transition-colors duration-200"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-extrabold text-xs uppercase tracking-widest mb-5 font-display"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-cream/50 hover:text-cream text-sm transition-all duration-200 group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-gradient-to-r from-[oklch(0.65_0.29_310)] to-[oklch(0.63_0.27_345)] group-hover:w-4 transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4
              className="font-extrabold text-xs uppercase tracking-widest mb-5 font-display"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Visit Us
            </h4>
            <ul className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-[oklch(0.65_0.29_310/0.12)] border border-[oklch(0.65_0.29_310/0.25)]">
                    <Icon className="w-3.5 h-3.5 text-[oklch(0.65_0.29_310)]" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-[oklch(0.84_0.18_85)] hover:text-[oklch(0.90_0.18_85)] transition-colors duration-200 font-semibold leading-relaxed"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-cream/50 leading-relaxed">
                      {text}
                    </span>
                  )}
                </li>
              ))}
              <li className="pl-11 text-xs text-cream/30">
                Mon–Sun · 11am – 10pm
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[oklch(0.65_0.29_310/0.12)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/30 text-xs">
            © {year} Mother of Ice-cream. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.29_310/0.5)] animate-[glow-pulse_2s_ease-in-out_infinite]" />
            <span className="text-cream/25 text-xs">
              Party orders only · Advance payment required
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
