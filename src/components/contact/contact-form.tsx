"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { getCourses, submitContact } from "@/lib/api";
import type { Course } from "@/components/shared/course-card";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSubmitError("");
    const result = await submitContact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      course: data.course,
      message: data.message,
    });

    if (!result.success) {
      setSubmitError(result.error || "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="rounded-xl border-2 border-border-soft bg-white p-6 md:p-8 shadow-md">
      <h3 className="text-xl font-semibold text-secondary">Send Us A Message</h3>
      <p className="text-sm text-foreground/55 mt-1">
        Fill this out and a mentor from your chosen track will reach out.
      </p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col items-center text-center py-10"
        >
          <CheckCircle2 className="size-12 text-primary mb-4" />
          <h4 className="font-semibold text-secondary text-lg">Message Sent</h4>
          <p className="text-sm text-foreground/55 mt-1 max-w-xs">
            Thanks for reaching out — our team will contact you within 24 hours.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          {submitError && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {submitError}
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-secondary">Full Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your name"
                className="mt-1.5 w-full rounded-xl border border-border-soft px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-secondary">Phone Number</label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="+91 98765 43210"
                className="mt-1.5 w-full rounded-xl border border-border-soft px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-secondary">Email Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-xl border border-border-soft px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-secondary">Course You&apos;re Interested In</label>
            <select
              {...register("course")}
              defaultValue=""
              className="mt-1.5 w-full rounded-xl border border-border-soft px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="" disabled>Select a course</option>
              {courses.map((c) => (
                <option key={c.slug} value={c.title}>{c.title}</option>
              ))}
              <option value="Not sure yet">Not sure yet — need guidance</option>
            </select>
            {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-secondary">Message</label>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="Tell us a bit about your background and what you're hoping to learn..."
              className="mt-1.5 w-full rounded-xl border border-border-soft px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gradient w-full rounded-full py-3.5 text-white font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:translate-y-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <Send className="size-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
