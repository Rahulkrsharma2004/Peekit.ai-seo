const IntroSection = () => {
  
  // const isLoggedIn = !!localStorage.getItem("token");

  // const moreLink = isLoggedIn
  //   ? "https://peekit.ai"
  //   : "https://peekit.ai/login";

  return (
    <section className="container mx-auto px-6 pt-8 pb-2">
      <div className="space-y-4">
        <p className="text-foreground text-base leading-relaxed mb-6">
          Peekit shows you the top products trending by category across{" "}
          <strong>Instagram</strong>, <strong>Youtube</strong>,{" "}
          <strong>TikTok</strong>, <strong>Reddit</strong>, and{" "}
          <a
            href="https://peekit.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            3 more
          </a>
          . There are more than 100 topics trending across Instagram today.
          These cover more than 10 themes ranging from "Health and Wellness",
          "Technology", "Fashion" and{" "}
          <a
            href="https://peekit.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            7 more
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
