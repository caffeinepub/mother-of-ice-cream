import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useQueries";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_INFO = [
  {
    id: "address",
    icon: <MapPin className="w-5 h-5" />,
    bg: "bg-primary/15",
    color: "text-primary",
    label: "Find Us",
    value: "Mallickpur Habibchauk Chauk, Kolkata",
  },
  {
    id: "phone",
    icon: <Phone className="w-5 h-5" />,
    bg: "bg-secondary/20",
    color: "text-secondary-foreground",
    label: "Call Us",
    value: "+91 9007819261",
  },
  {
    id: "email",
    icon: <Mail className="w-5 h-5" />,
    bg: "bg-accent/30",
    color: "text-accent-foreground",
    label: "Email Us",
    value: "moficecream@gmail.com",
  },
  {
    id: "hours",
    icon: <Clock className="w-5 h-5" />,
    bg: "bg-purple-100",
    color: "text-purple-700",
    label: "Hours",
    value: "Mon\u2013Sun \u00b7 11:00am \u2013 10:00pm",
  },
];

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
      toast.success("Message sent! \ud83c\udf66 We'll be in touch soon.");
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
    <div className="bg-background">
      {/* Header */}
      <section
        className="py-16 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.978 0.012 55) 0%, oklch(0.97 0.025 15) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">
              \ud83d\udc8c Say Hello
            </p>
            <h1 className="text-5xl font-black text-foreground mb-3">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              We&apos;d love to hear from you \u2014 questions, catering
              inquiries, or just to say hi!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-card rounded-card shadow-candy p-8"
            data-ocid="contact.card"
          >
            <h2 className="text-2xl font-extrabold text-foreground mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name">Your Name</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                  placeholder="Maria Chen"
                  className="rounded-lg"
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

              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                  placeholder="you@example.com"
                  className="rounded-lg"
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

              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearError("message");
                  }}
                  placeholder="Tell us what's on your mind\u2026"
                  rows={5}
                  className="rounded-lg resize-none"
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

              <Button
                type="submit"
                disabled={submitContact.isPending}
                className="w-full rounded-pill gradient-pink border-0 text-white font-bold py-6 shadow-candy hover:shadow-candy-lg hover:scale-[1.02] transition-all duration-200"
                data-ocid="contact.submit_button"
              >
                {submitContact.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Sending\u2026
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>

              {submitContact.isSuccess && (
                <p
                  className="text-center text-sm font-semibold text-secondary-foreground"
                  data-ocid="contact.success_state"
                >
                  \u2705 Your message was sent successfully!
                </p>
              )}
            </form>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="bg-card rounded-card shadow-candy p-8 flex-1">
              <h2 className="text-2xl font-extrabold text-foreground mb-6">
                Visit the Shop
              </h2>
              <div className="space-y-5">
                {CONTACT_INFO.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-semibold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-card p-6 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.94 0.04 355), oklch(0.94 0.05 185))",
              }}
            >
              <p className="text-4xl mb-2">\ud83c\udf66</p>
              <h3 className="font-extrabold text-foreground text-lg mb-1">
                Catering &amp; Events
              </h3>
              <p className="text-muted-foreground text-sm">
                Planning a party? We offer ice cream catering for birthdays,
                weddings, and corporate events!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
