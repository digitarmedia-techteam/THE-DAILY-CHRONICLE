"use client";

import { useState, useEffect } from "react";
import { AdPlacement } from "@/components/ad-placement";
import { X } from "lucide-react";

export function StickyBottomAd() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiddenByScroll, setIsHiddenByScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Check if user previously dismissed the ad
    const dismissed = localStorage.getItem("stickyAdDismissed");
    if (dismissed) {
      setIsVisible(false);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Hide when scrolling down, show when scrolling up
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsHiddenByScroll(true);
          } else {
            setIsHiddenByScroll(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("stickyAdDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-t border-border/50 shadow-2xl transition-transform duration-300 ease-out ${
        isHiddenByScroll ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container max-w-[1600px] mx-auto px-1 py-0.5 relative">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-8 right-2 md:right-4 z-50 bg-background/95 hover:bg-background border border-border rounded-t-lg px-2 py-1 transition-colors group"
          aria-label="Dismiss ad"
        >
          <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
        </button>

        <div className="max-h-[60px] overflow-hidden">
          <AdPlacement
            slot="1701160406"
            format="horizontal"
            responsive={true}
            className="my-0 min-h-[50px]"
            label=""
          />
        </div>
      </div>
    </div>
  );
}
