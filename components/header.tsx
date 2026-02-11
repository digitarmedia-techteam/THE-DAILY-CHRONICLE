"use client";

import React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Moon, Sun, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NAV_CATEGORIES } from "@/lib/rss-config";
import { AdPlacement } from "@/components/ad-placement";
import { MarketTicker } from "@/components/market-ticker";
import { BreakingNewsBanner } from "@/components/breaking-news-banner";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Prevent hydration mismatch
  const isDark = mounted && resolvedTheme === "dark";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1a2744] text-white transition-all duration-300 shadow-xl">
      <MarketTicker />
      {/* Top bar with logo */}
      <div className="border-b border-white/10 bg-[#1a2744] relative z-50">
        <div className="container max-w-[1600px] mx-auto px-8 py-1 md:py-1.5 flex items-center justify-between gap-4 md:gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg sm:text-xl md:text-xl font-bold tracking-tight flex-shrink-0"
          >
            <img
              src="/icon.svg"
              alt="Globex News Logo"
              className="w-8 h-8 md:w-8 md:h-8"
            />
            <div>
              <span className="text-white">globex</span>
              <span className="text-blue-400">.news</span>
            </div>
          </Link>

          {/* Desktop Header Ad Placement */}
          <div className="hidden lg:block flex-1 max-w-[728px] max-h-[40px] mx-auto overflow-hidden">
            <AdPlacement
              slot="header-leaderboard"
              format="horizontal"
              label=""
              className="my-0 min-h-[40px]"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <span className="hidden lg:inline text-xs font-bold text-white/50 tracking-widest"></span>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label={searchOpen ? "Close search" : "Open search"}
            >
              {searchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:bg-white/10 rounded-full transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search bar (expandable) */}
        {searchOpen && (
          <div className="container max-w-[1600px] mx-auto px-4 pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className="w-full pl-10 pr-20 py-1.5 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm md:text-base outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-white text-[#1a2744] rounded text-xs font-medium hover:bg-white/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="bg-[#1a2744] shadow-lg border-b border-white/5">
        <div className="container max-w-[1600px] mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-0.5 overflow-x-auto">
              {NAV_CATEGORIES.map((cat) => {
                const href = cat.slug ? `/${cat.slug}` : "/";
                const isActive =
                  pathname === href || (cat.slug === "" && pathname === "/");
                return (
                  <li key={cat.slug || "home"}>
                    <Link
                      href={href}
                      className={cn(
                        "block px-3 xl:px-4 py-1.5 text-xs xl:text-[11px] font-black uppercase tracking-widest transition-colors whitespace-nowrap",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {cat.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile/Tablet Category Scroller - Horizontal scroll for better UX */}
            <ul className="flex lg:hidden items-center gap-1 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4 mask-fade-edges">
              {NAV_CATEGORIES.map((cat) => {
                const href = cat.slug ? `/${cat.slug}` : "/";
                const isActive =
                  pathname === href || (cat.slug === "" && pathname === "/");
                return (
                  <li key={cat.slug || "home"} className="flex-shrink-0">
                    <Link
                      href={href}
                      className={cn(
                        "block px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-full",
                        isActive
                          ? "bg-white text-[#1a2744] shadow-sm"
                          : "text-white/80 hover:bg-white/10",
                      )}
                    >
                      {cat.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Theme toggle (desktop) */}
            <div className="hidden md:flex items-center gap-2 py-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
                <span className="text-xs">{isDark ? "Dark" : "Light"}</span>
              </button>
            </div>
          </div>

          {/* Full Screen Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-[#1a2744] animate-in slide-in-from-right duration-300 flex flex-col pt-16">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-white bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] mb-8">
                  Sections
                </p>
                <ul className="space-y-4">
                  {NAV_CATEGORIES.map((cat) => {
                    const href = cat.slug ? `/${cat.slug}` : "/";
                    const isActive =
                      pathname === href ||
                      (cat.slug === "" && pathname === "/");
                    return (
                      <li key={cat.slug || "home"}>
                        <Link
                          href={href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex justify-between items-center p-5 rounded-2xl border transition-all text-xl font-black",
                            isActive
                              ? "bg-white text-[#1a2744] border-white"
                              : "text-white/90 border-white/10 hover:bg-white/5",
                          )}
                        >
                          {cat.label}
                          <ChevronRight
                            className={cn(
                              "w-5 h-5",
                              isActive ? "text-[#1a2744]" : "text-white/30",
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-10">
                  <AdPlacement
                    slot="1701160406"
                    label="Sponsored"
                    className="my-0"
                  />
                </div>
              </div>

              <div className="p-8 border-t border-white/10 bg-black/10">
                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 text-white active:scale-95 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {isDark ? (
                      <Moon className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    )}
                    <span className="font-bold">Display Mode</span>
                  </div>
                  <span className="text-xs font-bold opacity-40 uppercase tracking-widest">
                    {isDark ? "Dark" : "Light"}
                  </span>
                </button>
                <p className="mt-8 text-center text-white/20 text-[10px] uppercase font-bold tracking-widest">
                  © 2026 Globex.news
                </p>
              </div>
            </div>
          )}
        </div>
      </nav>
      <BreakingNewsBanner />
    </header>
  );
}
