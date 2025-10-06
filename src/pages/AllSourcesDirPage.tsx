import { Link } from "react-router-dom";

const TrendingHeader = () => {
  const sources = [
    { name: "Instagram", short: "IG" },
    { name: "X", short: "X" },
    { name: "TikTok", short: "TT" },
    { name: "YouTube", short: "YT" },
    { name: "Reddit", short: "RD" },
    { name: "Google News", short: "GN" },
    { name: "Google Trends", short: "GT" },
  ];

  return (
    <header className="border-b border-data-border bg-background">
      <div className="container mx-auto px-6 sm:px-64 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Explore Our Pages</h1>

        <div className="flex flex-col gap-4">
          {sources.map((source) => (
            <Link
              key={source.name}
              to={`/d/${source.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-3 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-instagram-pink via-instagram-purple to-instagram-blue">
                <span className="text-white font-bold">{source.short}</span>
              </div>
              <span className="text-black font-semibold text-lg">What is trending on {source.name} today?</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default TrendingHeader;
