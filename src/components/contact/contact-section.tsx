"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Clock, PhoneCall } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import company from "@/data/company.json";

const DETAILS = [
  { icon: MapPin, label: "Office Address", value: company.address },
  { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone}` },
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: company.whatsapp,
    href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
  },
  { icon: Clock, label: "Working Hours", value: "Mon – Sat, 9:00 AM – 7:00 PM IST" },
];

const CALL_CONTACTS = [
  { name: "Karthi", number: "9940729372" },
  { name: "Pandikannan", number: "8438021329" },
];

export function ContactSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl bg-secondary mb-12 shadow-2xl shadow-secondary/20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(125,199,255,0.2),transparent_50%)]" />

          <div className="relative p-8 md:p-10">
            <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              <PhoneCall className="size-3.5" />
              Talk To Us Directly
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white">
              Call Or WhatsApp Our Admissions Team
            </h3>
            <p className="mt-2 text-sm text-white/55 max-w-lg">
              Get instant answers on courses, fees, and batch timings — no forms, no waiting.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {CALL_CONTACTS.map((c) => (
                <div
                  key={c.number}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:border-primary/40 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-11 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                      {c.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                      <p className="text-xs text-white/50 font-mono tracking-wide">+91 {c.number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:+91${c.number}`}
                      aria-label={`Call ${c.name}`}
                      className="size-9 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                    >
                      <Phone className="size-4" />
                    </a>
                    <a
                      href={`https://wa.me/91${c.number}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`WhatsApp ${c.name}`}
                      className="size-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="size-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="rounded-xl border-2 border-border-soft bg-white p-6 md:p-8 shadow-md space-y-5">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <d.icon className="size-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-foreground/45">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noreferrer noopener" className="text-sm font-medium text-secondary hover:text-primary">
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-secondary">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden border-2 border-border-soft h-64">
            <iframe
              src={company.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Edge Tech Solution office location"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <ContactForm />
        </motion.div>
        </div>
      </div>
    </section>
  );
}
