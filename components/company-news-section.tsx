import React from "react";
import { fetchCompanyNews } from "@/lib/finnhub-service";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdPlacement } from "@/components/ad-placement";

interface CompanyNewsSectionProps {
  symbol?: string;
}

export async function CompanyNewsSection({
  symbol = "AAPL",
}: CompanyNewsSectionProps) {
  const news = await fetchCompanyNews(symbol);

  if (!news || news.length === 0) {
    return null;
  }

  // Extra safety: deduplicate news items by ID
  const uniqueNews = Array.from(
    new Map(news.map((item) => [item.id, item])).values(),
  );

  return (
    <section className="mb-12 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            Company News: <span className="text-blue-600">{symbol}</span>
          </h2>
        </div>
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">
          Powered by Finnhub
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueNews.map((item, index) => (
          <React.Fragment key={item.id}>
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full bg-muted/30 border border-border/50 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              {item.image ? (
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.headline}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      {item.source}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  <span className="px-2 py-1 bg-muted-foreground/20 text-muted-foreground text-[10px] font-bold uppercase tracking-wider rounded">
                    {item.source}
                  </span>
                </div>
              )}

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground/70 font-medium">
                  <time>
                    {formatDistanceToNow(item.datetime * 1000, {
                      addSuffix: true,
                    })}
                  </time>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    Read Report <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

                <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                  {item.headline}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                  {item.summary}
                </p>
              </div>
            </Link>
            {index === 2 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-4">
                <AdPlacement
                  slot="1509588713"
                  format="fluid"
                  layout="in-article"
                  label="Sponsored Content"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <AdPlacement slot="1701160406" className="mt-8" />
    </section>
  );
}
