"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Extend Window interface to include adsbygoogle property
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdPlacementProps {
  slot: string;
  format?:
    | "auto"
    | "fluid"
    | "rectangle"
    | "vertical"
    | "horizontal"
    | "autorelaxed";
  responsive?: boolean;
  className?: string;
  label?: string;
  layout?: string;
}

export function AdPlacement({
  slot,
  format = "auto",
  responsive = true,
  className,
  label = "Advertisement",
  layout,
}: AdPlacementProps) {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only initialize once per component instance
    if (isAdLoaded.current) return;

    // Use IntersectionObserver to only load ads when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before visible
        threshold: 0.01,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || isAdLoaded.current) return;

    const loadAd = () => {
      try {
        if (
          typeof window !== "undefined" &&
          adRef.current &&
          containerRef.current
        ) {
          // Check if container has width
          const containerWidth = containerRef.current.offsetWidth;

          if (containerWidth === 0) {
            // Skip loading if container has no width yet
            // This prevents the "No slot size for availableWidth=0" error
            console.log(
              `Ad container for slot ${slot} has no width yet, skipping load`,
            );
            return;
          }

          // Check if this specific ad element already has content
          const hasContent =
            adRef.current.getAttribute("data-ad-status") === "filled";

          if (!hasContent) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            isAdLoaded.current = true;
          }
        }
      } catch (e: any) {
        // Suppress the common availableWidth=0 error during development
        if (!e?.message?.includes("availableWidth=0")) {
          console.error("AdSense error:", e);
        }
      }
    };

    // Longer delay to ensure DOM is fully rendered and has dimensions
    const timer = setTimeout(loadAd, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, slot]); // Re-run when visibility changes

  // IMPORTANT: Replace 'pub-XXXXXXXXXXXXXXXX' with your actual publisher ID in layout.tsx
  return (
    <div
      ref={containerRef}
      className={cn("my-8 w-full overflow-hidden", className)}
    >
      {label && (
        <span className="block text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-2 text-center font-bold">
          {label}
        </span>
      )}
      <div className="bg-muted/30 border border-border/50 rounded-lg min-h-[100px] flex items-center justify-center relative overflow-hidden group">
        {/* Placeholder styling for development or when ads haven't loaded */}
        <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">
            Ad Space: {slot}
          </div>
        </div>

        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight: "50px",
            textAlign: "center",
          }}
          data-ad-client="ca-pub-7084079995330446"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
          data-ad-layout={layout}
        />
      </div>
    </div>
  );
}
