import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "feature" | "hero" | "travel";
  glow?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-white/10 backdrop-blur-glass border border-white/20",
      feature: "bg-white/15 backdrop-blur-glass border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105",
      hero: "bg-white/20 backdrop-blur-glass border border-white/40 shadow-glass",
      travel: "bg-white/8 backdrop-blur-glass border border-white/15 shadow-travel hover:shadow-glow-primary transition-all duration-500"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 shadow-soft",
          variants[variant],
          glow && "hover:shadow-glow-primary",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };