import Link from 'next/link'
import { Twitter, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            ABOUT US
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              CONTACT
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              PRIVACY
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              TERMS
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="nofollow noopener sponsored"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="nofollow noopener sponsored"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          <p>
            All content is sourced from public RSS feeds and redirects to original sources.
            We do not host or reproduce full articles.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} The Daily Chronicle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
