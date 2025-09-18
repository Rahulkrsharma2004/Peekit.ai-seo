import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TrendingContextType {
  trendingData: any[];
  setTrendingData: (data: any[]) => void;
  source: string;
}

const TrendingContext = createContext<TrendingContextType | undefined>(undefined);

export const useTrending = () => {
  const context = useContext(TrendingContext);
  if (context === undefined) {
    throw new Error('useTrending must be used within a TrendingProvider');
  }
  return context;
};

interface TrendingProviderProps {
  children: ReactNode;
  source: string;
}

export const TrendingProvider: React.FC<TrendingProviderProps> = ({ children, source }) => {
  const [trendingData, setTrendingData] = useState<any[]>([]);

  return (
    <TrendingContext.Provider value={{ trendingData, setTrendingData, source }}>
      {children}
    </TrendingContext.Provider>
  );
};