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
      const yesterday = startOfDay(
        new Date(today.getTime() - 24 * 60 * 60 * 1000)
      );

      const formattedToday = format(today, "yyyy-MM-dd");
      const formattedYesterday = format(yesterday, "yyyy-MM-dd");

      let finalData = [];

      // ✅ Step 1: First try to fetch only today's data
      let response = await fetch(
        `https://trends.simulyst.com/api/trends?timestamp=${formattedToday}`
      );
      let data = await response.json();
      console.log("Today's API data length:", data.length);

      // ✅ Step 2: Filter today's data for the source
      const todayData = data.filter((item: any) => {
        const isSourceMatch =
          item.source?.toLowerCase().trim() === source.toLowerCase().trim();
        return isSourceMatch;
      });

      console.log("Today's source data:", todayData.length);

      if (todayData.length > 0) {
        finalData = todayData;
      } else {
        // ✅ Step 3: If no today data, fetch only yesterday's data
        console.log("No today data, fetching yesterday's data only");

        response = await fetch(
          `https://trends.simulyst.com/api/trends?timestamp=${formattedYesterday}`
        );
        data = await response.json();
        console.log("Yesterday's API data length:", data.length);

        const yesterdayData = data.filter((item: any) => {
          const isSourceMatch =
            item.source?.toLowerCase().trim() === source.toLowerCase().trim();
          return isSourceMatch;
        });

        console.log("Yesterday's source data:", yesterdayData.length);

        if (yesterdayData.length > 0) {
          finalData = yesterdayData;
        } else {
          // ✅ Step 4: If no yesterday data, fetch ALL data as fallback
          console.log("No yesterday data, fetching ALL data as fallback");

          response = await fetch("https://trends.simulyst.com/api/trends");
          data = await response.json();
          console.log("All trends data length:", data.length);

          const allSourceData = data.filter((item: any) => {
            const isSourceMatch =
              item.source?.toLowerCase().trim() === source.toLowerCase().trim();
            return isSourceMatch;
          });

          console.log("All source data fallback:", allSourceData.length);
          finalData = allSourceData;
        }
      }

      console.log("Final data length:", finalData.length);
      setTrendingData(finalData);
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
                    <span className="relative group cursor-help">
                      Engagement
                      <div
                        className="absolute left-0 top-full mt-2 w-56 p-2 text-xs text-white bg-black rounded-md shadow-lg 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
                      >
                        Engagement represents the total number of interactions a
                        topic has received (likes, comments, shares, reposts,
                        etc.) on {source}.
                      </div>
                    </span>
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
                className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
