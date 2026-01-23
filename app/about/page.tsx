import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'About Us - globex.news',
  description: 'Learn about globex.news, your trusted source for curated news from around the world.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          <h1 className="text-3xl font-bold text-foreground mb-8">About globex.news</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              globex.news is a news aggregation platform dedicated to bringing you the latest 
              headlines from trusted sources around the world. We believe in the importance of staying 
              informed and making it easy for readers to access quality journalism.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">What We Do</h2>
            <p className="text-muted-foreground leading-relaxed">
              We curate news from reputable RSS feeds including BBC, Reuters, The Guardian, NPR, 
              and other trusted news organizations. Our platform provides headlines and brief 
              descriptions, then redirects readers to the original sources for the full articles.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We do not rewrite, modify, or reproduce full articles. All content remains the 
              intellectual property of its original publishers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Our Sources</h2>
            <p className="text-muted-foreground leading-relaxed">
              We partner with and aggregate content from leading news organizations including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>BBC News</li>
              <li>Reuters</li>
              <li>The Guardian</li>
              <li>NPR</li>
              <li>CNBC</li>
              <li>TechCrunch</li>
              <li>ESPN</li>
              <li>Al Jazeera</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Editorial Independence</h2>
            <p className="text-muted-foreground leading-relaxed">
              globex.news does not create original news content. We serve as a discovery 
              platform to help readers find stories from established news organizations. The views 
              and opinions expressed in the articles belong to their respective publishers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              Have questions or feedback? Visit our{' '}
              <a href="/contact" className="text-[#1a2744] dark:text-white underline hover:no-underline">
                Contact page
              </a>{' '}
              to get in touch with our team.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
