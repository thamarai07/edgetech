"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary:
    "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25",
  secondary:
    "btn-gradient-dark text-white shadow-lg shadow-secondary/20 hover:opacity-90",
  outline:
    "border border-secondary/80 bg-transparent text-secondary hover:bg-secondary hover:text-white",
  ghost: "text-secondary hover:text-primary",
};

const sizeClasses: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-8 py-4 text-base md:text-lg",
};

function useRipple() {
  const createRipple = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;
    const rect = target.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.transform = "scale(0)";
    circle.style.background = "rgba(255,255,255,0.45)";
    circle.style.pointerEvents = "none";
    circle.style.animation = "ripple-effect 600ms ease-out";

    const existing = target.getElementsByClassName("ripple-span")[0];
    if (existing) existing.remove();

    circle.classList.add("ripple-span");
    target.appendChild(circle);
    window.setTimeout(() => circle.remove(), 650);
  };
  return createRipple;
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;
  const ripple = useRipple();

  const classes = cn(
    "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 ease-out cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = rest as ButtonAsLink;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={(e) => ripple(e as unknown as React.MouseEvent<HTMLElement>)}
      >
        {children}
      </Link>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={classes}
      onClick={(e) => {
        ripple(e);
        buttonRest.onClick?.(e);
      }}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
