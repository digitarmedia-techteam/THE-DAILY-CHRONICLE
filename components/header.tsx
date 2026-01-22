'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Moon, Sun, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NAV_CATEGORIES } from '@/lib/rss-config'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark)
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

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

  return (
    <header className="sticky top-0 z-50 bg-[#1a2744] text-white">
      {/* Top bar with logo */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
              THE DAILY CHRONICLE
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-sm text-white/80">
                {isDark ? 'DARK MODE' : 'LIGHT MODE'}
              </span>
              <button
                onClick={() => {}}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#1a2744]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_CATEGORIES.map((cat) => {
                const href = cat.slug ? `/${cat.slug}` : '/'
                const isActive = pathname === href || (cat.slug === '' && pathname === '/')
                return (
                  <li key={cat.slug || 'home'}>
                    <Link
                      href={href}
                      className={cn(
                        'block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors',
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

            {/* Theme toggle */}
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
            <ul className="md:hidden py-4 border-t border-white/10">
              {NAV_CATEGORIES.map((cat) => {
                const href = cat.slug ? `/${cat.slug}` : '/'
                const isActive = pathname === href || (cat.slug === '' && pathname === '/')
                return (
                  <li key={cat.slug || 'home'}>
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors',
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
              <li className="px-4 py-3">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span className="text-xs">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  )
}
