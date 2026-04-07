import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import ReviewPage from "./pages/ReviewPage";
import ComparisonPage from "./pages/ComparisonPage";
import BestOfPage from "./pages/BestOfPage";
import HowToPage from "./pages/HowToPage";
import EducationalPage from "./pages/EducationalPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/review/:slug" element={<ReviewPage />} />
          <Route path="/compare/:slug" element={<ComparisonPage />} />
          <Route path="/best/:slug" element={<BestOfPage />} />
          <Route path="/how-to/:slug" element={<HowToPage />} />
          <Route path="/learn/:slug" element={<EducationalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
