import { useTrending } from "./contexts/TrendingContext";

const FAQSection = () => {
  const { trendingData, source } = useTrending();

  const faqs = [
    {
      question: `What is the top trending topic on ${source} today?`,
      answer:
        trendingData.length > 0
          ? `The top trending topic on ${source} today is "${trendingData[0]?.title}".`
          : `We're currently gathering the top trending topics on ${source}.`,
    },
    {
      question: `Which sectors are trending the most on ${source} today?`,
      answer:
        trendingData.length > 0
          ? `The top 3 most trending sectors on ${source} today are ${[
              ...new Set(trendingData.map((item) => item.theme)),
            ]
              .slice(0, 3)
              .map((theme) => `"${theme}"`)
              .join(", ")}.`
          : `Trending sector data will be available shortly.`,
    },
  ];

  return (
    <section className="container mx-auto px-6 py-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-data-border pb-4">
          FAQs about trending topics on {source}
        </h2>

        <div className="space-y-0 divide-y divide-data-border">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {faq.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
