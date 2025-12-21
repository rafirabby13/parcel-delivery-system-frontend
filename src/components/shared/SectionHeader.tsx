import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  icon?: LucideIcon;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left" | "right";
}

export const SectionHeader = ({
  badge,
  icon: Icon,
  title,
  highlight,
  description,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) => {
  return (
    <header
      className={cn(
        // Added 'group' to handle hover states if needed
        "group relative mb-20 flex flex-col gap-6 select-none",
        {
          "items-center text-center": align === "center",
          "items-start text-left": align === "left",
          "items-end text-right": align === "right",
        },
        className
      )}
      {...props}
    >
      {/* Background Glow (Entrance: Fade in slow) */}
      <div className="absolute -top-10 left-1/2 -z-10 h-32 w-32 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px] animate-in fade-in duration-1000" />

      {/* Badge (Entrance: Zoom in + Fade) */}
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:shadow-md hover:scale-105",
            // Animation
            "animate-in zoom-in-50 fade-in duration-500 ease-out fill-mode-backwards",
            align === "center" && "mx-auto"
          )}
        >
          {Icon && <Icon size={14} className="opacity-90" />}
          <span className="leading-none">{badge}</span>
        </div>
      )}

      {/* Heading (Entrance: Slide up + Fade) */}
      <h2 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tighter text-foreground md:text-5xl lg:text-6xl animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100 fill-mode-backwards">
        {title}
        {highlight && (
          <span className="relative ml-2 inline-block">
            {/* Gradient Text */}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              {highlight}
            </span>

            {/* ANIMATED SVG UNDERLINE */}
            {/* This SVG creates a 'hand-drawn' feel and scales in */}
            <svg
              className="absolute -bottom-2 left-0 h-3 w-full -rotate-1 text-primary opacity-80"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                // This creates the drawing effect using dasharray
                className="animate-[draw_1s_ease-out_forwards] [stroke-dasharray:100] [stroke-dashoffset:100]"
              />
            </svg>
          </span>
        )}
      </h2>

      {/* Description (Entrance: Slide up + Fade + Delay) */}
      {description && (
        <p
          className={cn(
            "text-lg leading-relaxed text-muted-foreground/90 md:text-xl",
            "animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200 fill-mode-backwards",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}

      {/* Tailwind Custom Keyframes (Add this to your tailwind.config.js or global css if needed, 
          but standard 'animate-in' works for the blocks above. 
          The 'animate-[draw...]' is an arbitrary value that works out of the box in JIT mode.) */}
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </header>
  );
};