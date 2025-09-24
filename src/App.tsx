import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./contexts/NotificationContext";
import Index from "./pages/Index";
import ReportCatalogue from "./pages/ReportCatalogue";
import RequestAccessGuided from "./pages/RequestAccessGuided";
import RequestAccessAdvanced from "./pages/RequestAccessAdvanced";
import RequestEscalated from "./pages/RequestEscalated";
import MyRequests from "./pages/MyRequests";
import MyAccess from "./pages/MyAccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalogue" element={<ReportCatalogue />} />
          <Route path="/request-access-guided" element={<RequestAccessGuided />} />
          <Route path="/request-access-advanced" element={<RequestAccessAdvanced />} />
          <Route path="/request-escalated" element={<RequestEscalated />} />
          <Route path="/requests" element={<MyRequests />} />
          <Route path="/access" element={<MyAccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </NotificationProvider>
  </QueryClientProvider>
);

export default App;
