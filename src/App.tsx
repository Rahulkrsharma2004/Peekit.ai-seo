import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DefaultPage from "./pages/AllSourcesDirPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Redirect root to /d */}
      <Route path="/" element={<Navigate to="/d" replace />} />

      {/* Default page showing all sources */}
      <Route path="/d" element={<DefaultPage />} />

      {/* Source pages nested under /d */}
      <Route path="/d/instagram" element={<Index source="Instagram" />} />
      <Route path="/d/youtube" element={<Index source="YouTube" />} />
      <Route path="/d/reddit" element={<Index source="Reddit" />} />
      <Route path="/d/x" element={<Index source="X" />} />
      <Route path="/d/tiktok" element={<Index source="TikTok" />} />
      <Route
        path="/d/google-trends"
        element={<Index source="Google Trends" />}
      />
      <Route path="/d/google-news" element={<Index source="Google News" />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
