"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitEnquiry } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number").max(15, "Enter a valid phone number"),
  city: z.string().optional(),
  qualification: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function EnrollForm({ courseTitle, courseSlug }: { courseTitle: string; courseSlug: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSubmitError("");
    const result = await submitEnquiry({
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      qualification: data.qualification,
      message: data.message,
      courseTitle,
      courseSlug,
    });

    if (!result.success) {
      setSubmitError(result.error || "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border-2 border-border-soft bg-white p-6 md:p-8 shadow-md flex flex-col items-center text-center py-12"
      >
        <CheckCircle2 className="size-12 text-primary mb-4" />
        <h4 className="font-semibold text-secondary text-lg">Enrollment Request Received</h4>
        <p className="text-sm text-foreground/55 mt-1 max-w-xs">
          Thanks for your interest in {courseTitle}. Our admissions team will call you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-border-soft bg-white p-6 md:p-8 shadow-md sticky top-24">
      <h3 className="text-lg font-semibold text-secondary">Enroll In This Course</h3>
      <p className="text-sm text-foreground/55 mt-1">
        Fill this out and our admissions team will reach out with the next batch details.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        {submitError && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {submitError}
          </p>
        )}
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-secondary">City</label>
            <input
              {...register("city")}
              type="text"
              placeholder="Chennai"
              className="mt-1.5 w-full rounded-xl border border-border-soft px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-secondary">Qualification</label>
            <input
              {...register("qualification")}
              type="text"
              placeholder="B.E / B.Sc..."
              className="mt-1.5 w-full rounded-xl border border-border-soft px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-secondary">Message (optional)</label>
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Anything specific you'd like us to know?"
            className="mt-1.5 w-full rounded-xl border border-border-soft px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient w-full rounded-full py-3.5 text-white font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              Enroll Now <Send className="size-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
