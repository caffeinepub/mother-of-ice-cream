import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useQueries";
import {
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_INFO = [
  {
    id: "address",
    icon: <MapPin className="w-5 h-5" />,
    gradient: "from-fuchsia-600 to-pink-500",
    glow: "glow-fuchsia",
    label: "Find Us",
    value: "Mallickpur Habibchauk Chauk, Kolkata",
  },
  {
    id: "phone",
    icon: <Phone className="w-5 h-5" />,
    gradient: "from-pink-500 to-rose-500",
    glow: "glow-pink",
    label: "Call Us",
    value: "+91 9007819261",
  },
  {
    id: "email",
    icon: <Mail className="w-5 h-5" />,
    gradient: "from-amber-400 to-yellow-400",
    glow: "glow-gold",
    label: "Email Us",
    value: "moficecream@gmail.com",
  },
  {
    id: "hours",
    icon: <Clock className="w-5 h-5" />,
    gradient: "from-violet-500 to-fuchsia-500",
    glow: "glow-fuchsia",
    label: "Hours",
    value: "Mon–Sun · 11:00am – 10:00pm",
  },
];

function FloatingOrb({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-20 ${className}`}
    />
  );
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submitContact = useSubmitContact();

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errs.email = "Please enter a valid email";
    if (!message.trim()) errs.message = "Message is required";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    try {
      await submitContact.mutateAsync({ name, email, message });
      toast.success("Message sent! 🍦 We'll be in touch soon.");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  }

  const clearError = (field: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

  return (
    <div className="bg-background min-h-screen">
      {/* ── Hero header ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 gradient-hero" />
        <FloatingOrb className="w-96 h-96 bg-fuchsia-600 -left-20 -top-20" />
        <FloatingOrb className="w-72 h-72 bg-pink-500 right-0 bottom-0" />
        <FloatingOrb className="w-48 h-48 bg-yellow-500 left-1/2 top-0" />

        {/* Sparkles */}
        <div className="absolute top-12 right-16 text-yellow-400 opacity-60">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute bottom-10 left-16 text-fuchsia-400 opacity-40">
          <Star
            className="w-6 h-6 animate-pulse"
            style={{ animationDelay: "0.7s" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-fuchsia-500" />
              <span className="text-fuchsia-400 font-bold text-sm uppercase tracking-widest">
                Say Hello
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <h1 className="text-6xl sm:text-7xl font-black leading-none mb-5">
              <span className="text-foreground">Get in</span>{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-foreground/65 text-xl max-w-lg mx-auto leading-relaxed">
              We'd love to hear from you — questions, catering inquiries, or
              just to say hi!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4 contact info cards ── */}
      <section className="pb-4 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_INFO.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-lg rounded-2xl p-6 border border-white/5 hover:border-fuchsia-500/30 transition-luxury group cursor-default"
              data-ocid={`contact.info.${item.id}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.gradient} text-white mb-4 ${item.glow} group-hover:scale-110 transition-smooth shadow-luxury`}
              >
                {item.icon}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-1">
                {item.label}
              </p>
              <p className="font-semibold text-foreground text-sm leading-snug">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form — takes 3/5 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
            data-ocid="contact.card"
          >
            <div className="glass-lg rounded-2xl p-8 border border-fuchsia-500/15 shadow-luxury-lg">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-500 flex items-center justify-center glow-fuchsia">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground">
                    Send Us a Message
                  </h2>
                  <p className="text-foreground/50 text-sm">
                    We reply within 24 hours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-name"
                    className="text-foreground/80 font-semibold text-sm"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearError("name");
                    }}
                    placeholder="Maria Chen"
                    className="bg-background/60 border-border/50 text-foreground placeholder:text-foreground/30 focus:border-fuchsia-500 focus:ring-fuchsia-500/30 rounded-xl h-12 transition-luxury"
                    data-ocid="contact.input"
                  />
                  {errors.name && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="contact.name_error"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="text-foreground/80 font-semibold text-sm"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError("email");
                    }}
                    placeholder="you@example.com"
                    className="bg-background/60 border-border/50 text-foreground placeholder:text-foreground/30 focus:border-fuchsia-500 focus:ring-fuchsia-500/30 rounded-xl h-12 transition-luxury"
                    data-ocid="contact.input"
                  />
                  {errors.email && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="contact.email_error"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-foreground/80 font-semibold text-sm"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      clearError("message");
                    }}
                    placeholder="Tell us what's on your mind…"
                    rows={5}
                    className="bg-background/60 border-border/50 text-foreground placeholder:text-foreground/30 focus:border-fuchsia-500 focus:ring-fuchsia-500/30 rounded-xl resize-none transition-luxury"
                    data-ocid="contact.textarea"
                  />
                  {errors.message && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="contact.message_error"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full rounded-xl font-bold py-6 text-base text-foreground border-0 glow-fuchsia hover:opacity-90 hover:scale-[1.02] transition-luxury shadow-luxury-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.29 310), oklch(0.63 0.27 345))",
                  }}
                  data-ocid="contact.submit_button"
                >
                  {submitContact.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>

                {submitContact.isSuccess && (
                  <p
                    className="text-center text-sm font-semibold text-fuchsia-400"
                    data-ocid="contact.success_state"
                  >
                    ✅ Your message was sent successfully!
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right column: map + event card — takes 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Map visual */}
            <div className="glass-lg rounded-2xl overflow-hidden border border-fuchsia-500/15 flex-1 shadow-luxury">
              {/* Stylized map placeholder */}
              <div
                className="relative h-48 lg:h-56"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.15 0.07 275) 0%, oklch(0.18 0.06 260) 100%)",
                }}
              >
                {/* Grid lines for map feel */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(0.65 0.29 310) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.29 310) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Concentric rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="absolute -inset-12 rounded-full border border-fuchsia-500/15 animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                    <div className="absolute -inset-8 rounded-full border border-fuchsia-500/20" />
                    <div className="absolute -inset-4 rounded-full border border-fuchsia-500/30" />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center glow-gold shadow-luxury">
                      <MapPin className="w-5 h-5 text-background" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-1">
                  📍 Location
                </p>
                <p className="font-semibold text-foreground text-sm leading-snug">
                  Mallickpur Habibchauk Chauk
                </p>
                <p className="text-foreground/60 text-sm">
                  Kolkata, West Bengal
                </p>
              </div>
            </div>

            {/* Catering card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-2xl p-7 overflow-hidden border border-fuchsia-500/20 shadow-luxury-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.26 310) 0%, oklch(0.52 0.24 345) 100%)",
              }}
            >
              <FloatingOrb className="w-32 h-32 bg-white right-0 top-0 opacity-10" />
              <p className="text-4xl mb-3">🍦</p>
              <h3 className="font-extrabold text-white text-xl mb-2">
                Catering &amp; Events
              </h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Planning a party? We offer ice cream catering for birthdays,
                weddings, and corporate events!
              </p>
              <div className="mt-4 flex items-center gap-2 text-yellow-300 text-xs font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>Party Orders Welcome</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
