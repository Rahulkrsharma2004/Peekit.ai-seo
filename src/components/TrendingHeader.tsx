const TrendingHeader = () => {
  return (
    <header className="border-b border-data-border bg-gradient-to-r from-background to-data-header">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-instagram-pink via-instagram-purple to-instagram-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">IG</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-blue bg-clip-text text-transparent">
            What is trending on Instagram today?
          </h1>
        </div>
        <p className="text-muted-foreground text-sm border-l-4 border-instagram-purple pl-4">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </header>
  );
};

export default TrendingHeader;
