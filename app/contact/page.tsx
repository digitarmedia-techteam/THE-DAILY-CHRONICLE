import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - globex.news',
  description: 'Contact globex.news. Get in touch with our team for inquiries, feedback, or support.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Contact Us</h1>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Have a question, feedback, or concern? We&apos;d love to hear from you. Please use
            the contact information below or fill out our contact form.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a2744] text-white rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">contact@globex.news</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a2744] text-white rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground">
                    30 N Gould St Ste R<br />
                    Sheridan, WY 82801<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a2744] text-white rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Response Time</h3>
                  <p className="text-muted-foreground">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#1a2744] dark:focus:ring-white/20"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#1a2744] dark:focus:ring-white/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#1a2744] dark:focus:ring-white/20"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="technical">Technical Issue</option>
                    <option value="advertising">Advertising</option>
                    <option value="content">Content Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#1a2744] dark:focus:ring-white/20 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#1a2744] text-white font-medium rounded-lg hover:bg-[#2a3754] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <section className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground">How do I report incorrect content?</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Please use the contact form above and select &quot;Content Concern&quot; as the subject.
                  Include the article title and describe the issue.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Can I advertise on your platform?</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Yes! Select &quot;Advertising&quot; in the contact form to inquire about advertising opportunities.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">How do you select news sources?</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  We aggregate content from reputable, established news organizations with publicly
                  available RSS feeds. Visit our About page for more details.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
