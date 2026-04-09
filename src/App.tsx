import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import ReviewPage from "./pages/ReviewPage";
import ReviewsHub from "./pages/ReviewsHub";
import ComparisonPage from "./pages/ComparisonPage";
import ComparisonsHub from "./pages/ComparisonsHub";
import BestOfPage from "./pages/BestOfPage";
import BestPicksHub from "./pages/BestPicksHub";
import HowToPage from "./pages/HowToPage";
import EducationalPage from "./pages/EducationalPage";
import GuidesHub from "./pages/GuidesHub";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
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
          <Route path="/" element={<Index />} />
          <Route path="/reviews" element={<ReviewsHub />} />
          <Route path="/review/:slug" element={<ReviewPage />} />
          <Route path="/comparisons" element={<ComparisonsHub />} />
          <Route path="/compare/:slug" element={<ComparisonPage />} />
          <Route path="/best" element={<BestPicksHub />} />
          <Route path="/best/:slug" element={<BestOfPage />} />
          <Route path="/guides" element={<GuidesHub />} />
          <Route path="/how-to/:slug" element={<HowToPage />} />
          <Route path="/learn/:slug" element={<EducationalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
