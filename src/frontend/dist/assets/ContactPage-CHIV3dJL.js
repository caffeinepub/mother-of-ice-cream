import { c as createLucideIcon, r as reactExports, n as useSubmitContact, j as jsxRuntimeExports, m as motion, o as Label, I as Input, p as Textarea, B as Button, q as LoaderCircle, l as ue, s as MapPin, t as Phone, C as Clock } from "./index-Ce8U4DNM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const CONTACT_INFO = [
  {
    id: "address",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }),
    bg: "bg-primary/15",
    color: "text-primary",
    label: "Find Us",
    value: "Mallickpur Habibchauk Chauk, Kolkata"
  },
  {
    id: "phone",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }),
    bg: "bg-secondary/20",
    color: "text-secondary-foreground",
    label: "Call Us",
    value: "+91 9007819261"
  },
  {
    id: "email",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5" }),
    bg: "bg-accent/30",
    color: "text-accent-foreground",
    label: "Email Us",
    value: "moficecream@gmail.com"
  },
  {
    id: "hours",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
    bg: "bg-purple-100",
    color: "text-purple-700",
    label: "Hours",
    value: "Mon–Sun · 11:00am – 10:00pm"
  }
];
function ContactPage() {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const submitContact = useSubmitContact();
  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errs.email = "Please enter a valid email";
    if (!message.trim()) errs.message = "Message is required";
    return errs;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    try {
      await submitContact.mutateAsync({ name, email, message });
      ue.success("Message sent! 🍦 We'll be in touch soon.");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      ue.error("Oops! Something went wrong. Please try again.");
    }
  }
  const clearError = (field) => setErrors((prev) => {
    const next = { ...prev };
    delete next[field];
    return next;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 text-center relative overflow-hidden",
        style: {
          background: "linear-gradient(160deg, oklch(0.978 0.012 55) 0%, oklch(0.97 0.025 15) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-sm uppercase tracking-widest mb-2", children: "\\ud83d\\udc8c Say Hello" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-black text-foreground mb-3", children: "Get in Touch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-md mx-auto", children: "We'd love to hear from you \\u2014 questions, catering inquiries, or just to say hi!" })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.7 },
          className: "bg-card rounded-card shadow-candy p-8",
          "data-ocid": "contact.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold text-foreground mb-6", children: "Send Us a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-name", children: "Your Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "contact-name",
                    value: name,
                    onChange: (e) => {
                      setName(e.target.value);
                      clearError("name");
                    },
                    placeholder: "Maria Chen",
                    className: "rounded-lg",
                    "data-ocid": "contact.input"
                  }
                ),
                errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "contact.name_error",
                    children: errors.name
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-email", children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "contact-email",
                    type: "email",
                    value: email,
                    onChange: (e) => {
                      setEmail(e.target.value);
                      clearError("email");
                    },
                    placeholder: "you@example.com",
                    className: "rounded-lg",
                    "data-ocid": "contact.input"
                  }
                ),
                errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "contact.email_error",
                    children: errors.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-message", children: "Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "contact-message",
                    value: message,
                    onChange: (e) => {
                      setMessage(e.target.value);
                      clearError("message");
                    },
                    placeholder: "Tell us what's on your mind\\u2026",
                    rows: 5,
                    className: "rounded-lg resize-none",
                    "data-ocid": "contact.textarea"
                  }
                ),
                errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "contact.message_error",
                    children: errors.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: submitContact.isPending,
                  className: "w-full rounded-pill gradient-pink border-0 text-white font-bold py-6 shadow-candy hover:shadow-candy-lg hover:scale-[1.02] transition-all duration-200",
                  "data-ocid": "contact.submit_button",
                  children: submitContact.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                    " ",
                    "Sending\\u2026"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-4 w-4" }),
                    " Send Message"
                  ] })
                }
              ),
              submitContact.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-center text-sm font-semibold text-secondary-foreground",
                  "data-ocid": "contact.success_state",
                  children: "\\u2705 Your message was sent successfully!"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.7, delay: 0.1 },
          className: "flex flex-col gap-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-card shadow-candy p-8 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold text-foreground mb-6", children: "Visit the Shop" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: CONTACT_INFO.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color}`,
                    children: item.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5", children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: item.value })
                ] })
              ] }, item.id)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-card p-6 text-center",
                style: {
                  background: "linear-gradient(135deg, oklch(0.94 0.04 355), oklch(0.94 0.05 185))"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-2", children: "\\ud83c\\udf66" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-foreground text-lg mb-1", children: "Catering & Events" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Planning a party? We offer ice cream catering for birthdays, weddings, and corporate events!" })
                ]
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  ContactPage as default
};
