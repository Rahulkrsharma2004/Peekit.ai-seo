// pages/index.tsx
import { TrendingProvider } from '../components/contexts/TrendingContext';
import FAQSection from "@/components/FAQSection";
import IntroSection from "@/components/IntroSection";
import SectorExploration from "@/components/SectorExploration";
import TrendingHeader from "@/components/TrendingHeader";
import TrendingTopicsSection from "@/components/TrendingTopicsSection";

interface IndexProps {
  source: string;
}

const Index = ({ source }: IndexProps) => {
  return (
    <TrendingProvider source={source}>
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-12">
        <div className="max-w-7xl mx-auto border border-data-border/30 rounded-lg bg-card shadow-sm">
          <TrendingHeader />
          <main>
            <IntroSection />
            <TrendingTopicsSection source={source} />
            <FAQSection />
            <SectorExploration />
          </main>

          <footer className="border-t border-data-border bg-muted/20 mt-8">
            <div className="container mx-auto px-6 py-8 text-center">
              <p className="text-muted-foreground text-sm">
                {source} Trending Topics Analysis • Updated Daily
              </p>
            </div>
          </footer>
        </div>
      </div>
    </TrendingProvider>
  );
};

export default Index;