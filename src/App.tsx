import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/instagram" replace />} />
          <Route path="/instagram" element={<Index source="Instagram" />} />
          <Route path="/youtube" element={<Index source="YouTube" />} />
          <Route path="/x" element={<Index source="X" />} />
          <Route path="/reddit" element={<Index source="Reddit" />} />
          <Route path="/tiktok" element={<Index source="TikTok" />} />
          <Route path="/google-news" element={<Index source="Google News" />} />
          <Route
            path="/google-trends"
            element={<Index source="Google Trends" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
