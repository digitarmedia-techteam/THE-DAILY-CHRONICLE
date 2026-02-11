import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "World News - International Headlines & Breaking News | globex.news",
  description:
    "Latest world news from trusted sources. Breaking international news, analysis, and coverage from UK, Europe, Asia, and beyond.",
  keywords: [
    "world news",
    "international news",
    "global headlines",
    "UK news",
    "Europe news",
    "breaking world news",
    "foreign affairs",
  ],
  openGraph: {
    title: "World News - International Headlines | globex.news",
    description:
      "Latest world news from trusted sources around the globe. Coverage of UK, Europe, and international events.",
    type: "website",
    locale: "en_US",
    siteName: "globex.news",
  },
  twitter: {
    card: "summary_large_image",
    title: "World News - globex.news",
    description:
      "Latest world news and international coverage from globex.news.",
  },
};

export default function WorldPage() {
  return <CategoryPage category="world" />;
}
