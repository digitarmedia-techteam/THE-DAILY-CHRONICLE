import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms of Service - The Daily Chronicle',
  description: 'Terms of Service for The Daily Chronicle. Read our terms and conditions for using our website.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using The Daily Chronicle (&quot;the Website&quot;), you agree to be bound by 
              these Terms of Service. If you do not agree to these terms, please do not use our Website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Daily Chronicle is a news aggregation service that curates headlines and brief 
              descriptions from various RSS feeds. We provide links to original news sources and 
              do not host or reproduce full articles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Content Ownership</h2>
            <p className="text-muted-foreground leading-relaxed">
              All news content displayed on our Website belongs to its original publishers. We 
              aggregate publicly available RSS feeds and link to original sources. The Daily 
              Chronicle does not claim ownership of any third-party content.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              The Website design, layout, and original content created by The Daily Chronicle 
              are protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">
              When using our Website, you agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to scrape or collect data from our Website</li>
              <li>Interfere with the proper functioning of the Website</li>
              <li>Reproduce, duplicate, or exploit our content for commercial purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Website contains links to third-party websites. These links are provided for 
              convenience only. We are not responsible for the content, accuracy, or practices 
              of any third-party websites. Clicking on external links will redirect you away 
              from our Website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Website and its content are provided &quot;as is&quot; without warranties of any kind, 
              either express or implied. We do not guarantee the accuracy, completeness, or 
              timeliness of any information displayed on our Website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, The Daily Chronicle shall not be liable 
              for any direct, indirect, incidental, special, consequential, or punitive damages 
              arising from your use of the Website or any content obtained through it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Advertising</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Website may display advertisements from third-party advertising networks. 
              These advertisements may be targeted based on your browsing behavior. By using 
              our Website, you consent to receiving such advertisements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will 
              be effective immediately upon posting to the Website. Your continued use of the 
              Website after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with 
              applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms of Service, please contact us through our{' '}
              <a href="/contact" className="text-[#1a2744] dark:text-white underline hover:no-underline">
                Contact page
              </a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
