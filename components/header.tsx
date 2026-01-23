'use client'

import React from "react"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Moon, Sun, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { NAV_CATEGORIES } from '@/lib/rss-config'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark)
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    const newValue = !isDark
    setIsDark(newValue)
    if (newValue) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1a2744] text-white">
      {/* Top bar with logo */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight flex-shrink-0">
              <span className="text-white">globex</span>
              <span className="text-blue-400">.news</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden lg:inline text-sm text-white/80">
                {isDark ? 'DARK MODE' : 'LIGHT MODE'}
              </span>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label={searchOpen ? 'Close search' : 'Open search'}
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar (expandable) */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="mt-3 md:mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className="w-full pl-10 pr-20 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-[#1a2744] rounded text-xs sm:text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#1a2744]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-0.5 overflow-x-auto">
              {NAV_CATEGORIES.map((cat) => {
                const href = cat.slug ? `/${cat.slug}` : '/'
                const isActive = pathname === href || (cat.slug === '' && pathname === '/')
                return (
                  <li key={cat.slug || 'home'}>
                    <Link
                      href={href}
                      className={cn(
                        'block px-3 xl:px-4 py-3 text-xs xl:text-sm font-medium uppercase tracking-wide transition-colors whitespace-nowrap',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      {cat.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Tablet nav (horizontal scroll) */}
            <ul className="hidden md:flex lg:hidden items-center gap-0.5 overflow-x-auto scrollbar-hide -mx-4 px-4">
              {NAV_CATEGORIES.map((cat) => {
                const href = cat.slug ? `/${cat.slug}` : '/'
                const isActive = pathname === href || (cat.slug === '' && pathname === '/')
                return (
                  <li key={cat.slug || 'home'}>
                    <Link
                      href={href}
                      className={cn(
                        'block px-3 py-3 text-xs font-medium uppercase tracking-wide transition-colors whitespace-nowrap',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      {cat.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Theme toggle (desktop) */}
            <div className="hidden md:flex items-center gap-2 py-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="text-xs">{isDark ? 'Dark' : 'Light'}</span>
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <ul className="space-y-1">
                {NAV_CATEGORIES.map((cat) => {
                  const href = cat.slug ? `/${cat.slug}` : '/'
                  const isActive = pathname === href || (cat.slug === '' && pathname === '/')
                  return (
                    <li key={cat.slug || 'home'}>
                      <Link
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors rounded-lg',
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        {cat.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 px-4 pt-4 border-t border-white/10">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors w-full justify-center"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span className="text-sm">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
