import { Link, useLocation } from "react-router-dom";

const SectorExploration = () => {
  const { pathname } = useLocation(); // ✅ current active route

  const platforms = [
    { title: "What is trending on Instagram today?", route: "/instagram" },
    { title: "What is trending on Youtube today?", route: "/youtube" },
    { title: "What is trending on Reddit today?", route: "/reddit" },
    { title: "What is trending on X today?", route: "/x" },
    { title: "What is trending on Tiktok today?", route: "/tiktok" },
    { title: "What is trending on Google Trends today?", route: "/google-trends" },
    { title: "What is trending on Google News today?", route: "/google-news" }
  ];

  // ✅ filter out the active platform
  const filteredPlatforms = platforms.filter(
    (platform) => platform.route !== pathname
  );

  return (
    <section className="container mx-auto px-6 py-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-data-border pb-4">
          Explore what is trending on other platforms
        </h2>

        <div className="space-y-0 divide-y divide-data-border">
          {filteredPlatforms.map((platform, index) => (
            <div key={index} className="group py-4">
              <Link
                to={platform.route}
                className="block py-2 hover:bg-muted/20 transition-all duration-200 rounded"
              >
                <h3 className="text-lg font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                  {platform.title}
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
      </div>
    </section>
  );
};

export default SectorExploration;
