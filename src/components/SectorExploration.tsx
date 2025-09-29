import { Link, useLocation } from "react-router-dom";

const SectorExploration = () => {
  const { pathname } = useLocation(); // current URL

  const platforms = [
    { title: "Instagram", route: "/d/instagram" },
    { title: "YouTube", route: "/d/youtube" },
    { title: "Reddit", route: "/d/reddit" },
    { title: "X", route: "/d/x" },
    { title: "TikTok", route: "/d/tiktok" },
    { title: "Google Trends", route: "/d/google-trends" },
    { title: "Google News", route: "/d/google-news" }
  ];

  // Exclude the current active platform
  const filteredPlatforms = platforms.filter(
    (platform) => platform.route !== pathname
  );

  return (
    <section className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 border-b border-data-border pb-4">
        Explore what is trending on other platforms
      </h2>

      <div className="space-y-0 divide-y divide-data-border">
        {filteredPlatforms.map((platform, index) => (
          <div key={index} className="group py-4">
            <Link
              to={platform.route} // ✅ absolute path under /d
              className="block py-2 hover:bg-muted/20 transition-all duration-200 rounded"
            >
              <h3 className="text-lg font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                What is trending on {platform.title} today?
              </h3>
              <div className="mt-2 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                <span className="text-sm font-medium">Explore trends</span>
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectorExploration;
