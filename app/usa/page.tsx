import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "USA News - Latest Breaking News & Headlines | globex.news",
  description:
    "Get the latest breaking news, analysis, and in-depth coverage from the USA. Politics, business, technology, and more from across America.",
  keywords: [
    "USA news",
    "US politics",
    "American news",
    "United States headlines",
    "breaking news US",
    "national news",
  ],
  openGraph: {
    title: "USA News - Latest Breaking News & Headlines | globex.news",
    description:
      "Stay updated with the latest news, politics, and events from the United States.",
    type: "website",
    locale: "en_US",
    siteName: "globex.news",
  },
  twitter: {
    card: "summary_large_image",
    title: "USA News - globex.news",
    description: "Comprehensive coverage of USA news and current affairs.",
  },
};

export default function USAPage() {
  return <CategoryPage category="usa" />;
}
