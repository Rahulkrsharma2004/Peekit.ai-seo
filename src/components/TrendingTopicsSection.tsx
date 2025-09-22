import { useEffect, useState } from "react";
import { format, startOfDay } from "date-fns";
import { useTrending } from "./contexts/TrendingContext";

interface TrendingTopicsProps {
  source: string;
}

export default function TrendingTopicsSection({ source }: TrendingTopicsProps) {
  const [loading, setLoading] = useState(true);
  const { trendingData, setTrendingData } = useTrending();

  useEffect(() => {
    fetchTrendingData();
  }, [source]);

  const fetchTrendingData = async () => {
    try {
      setLoading(true);
      const today = startOfDay(new Date());
      const formattedDate = format(today, "yyyy-MM-dd");

      const response = await fetch(
        `https://trends.simulyst.com/api/trends?timestamp=${formattedDate}`
      );

      const data = await response.json();
      console.log("Raw fetched data:", data);

      // ✅ Step 1: Filter all items for this source
      const sourceData = data.filter((item: any) => item.source.toLowerCase() === source.toLowerCase());

      // ✅ Step 2: Filter today's items for this source
      let todayData = sourceData.filter((item: any) => {
        const itemDate = format(new Date(item.timestamp), "yyyy-MM-dd");
        return itemDate === formattedDate;
      });

      // ✅ Step 3: If no today data → pick latest available date for that source
      if (todayData.length === 0 && sourceData.length > 0) {
        // Find latest date in this source
        const latestDate = sourceData.reduce((latest: Date, item: any) => {
          const d = new Date(item.timestamp);
          return d > latest ? d : latest;
        }, new Date(0));

        const latestFormatted = format(latestDate, "yyyy-MM-dd");

        todayData = sourceData.filter((item: any) => {
          const itemDate = format(new Date(item.timestamp), "yyyy-MM-dd");
          return itemDate === latestFormatted;
        });
      }

      setTrendingData(todayData);

      console.log("Fetched trending data:", todayData);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-6 pt-4 pb-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">
          Trending topics on {source} today
        </h2>

        {trendingData.length > 0 && (
          <p className="text-foreground text-base leading-relaxed mb-8">
            <strong className="text-instagram-purple">
              "{trendingData[0].title}"
            </strong>{" "}
            is the most trending topic on {source} today. It has more than{" "}
            <span className="font-semibold">{trendingData[0].engagement}</span>{" "}
            engagement on {source} and covers topics such as{" "}
            {trendingData[0].hashtags
              .slice(0, 5) // ✅ take first 5 hashtags
              .map(
                (tag) =>
                  `"${tag
                    .replace(/^#/, "")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}"`
              )
              .join(", ")}{" "}
            and more.{" "}
            <span className="text-black">
              These trending topics have been gathered from {source} as a source
              and it covers {source} Stories, Reels and Posts.
            </span>
          </p>
        )}

        <div className="bg-card border border-data-border rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-data-header">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                    Trending topic
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                    Engagement
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                    Trend Overview
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                    Sector
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                    Searched Topics
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-data-border">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        {/* Spinner */}
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        {/* Text */}
                        <span className="text-sm text-muted-foreground">
                          Loading...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  trendingData.slice(0, 5).map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-black">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-black">
                          "{item.title}"
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {item.engagement}
                      </td>
                      <td className="px-6 py-4 text-sm text-black max-w-xs">
                        {item.description}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-secondary text-black rounded-full">
                          {item.theme}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {item.hashtags
                          .slice(0, 5)
                          .map((tag) =>
                            tag
                              .replace(/^#/, "")
                              .replace(/\b\w/g, (c) => c.toUpperCase())
                          )
                          .join(", ")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Button only after data loads */}
          {!loading && (
            <div className="p-6 text-center border-t border-data-border bg-muted/20">
              <a
                href="https://Peekit.ai/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View All Trending Topics
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
