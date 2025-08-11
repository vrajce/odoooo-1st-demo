import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateMatch from "./pages/CreateMatch";
import JoinMatch from "./pages/JoinMatch";
import CourtBooking from "./pages/CourtBooking";
import PlayerProfile from "./pages/PlayerProfile";
import Community from "./pages/Community";
import OwnerOnboarding from "./pages/OwnerOnboarding";
import OwnerDashboard from "./pages/OwnerDashboard";
import CourtDetails from "./pages/CourtDetails";
import MatchDetails from "./pages/MatchDetails";
import AddCourt from "./pages/AddCourt";
import OwnerProfile from "./pages/OwnerProfile";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Player Routes */}
          <Route path="/book-court" element={<CourtBooking />} />
          <Route path="/join-match" element={<JoinMatch />} />
          <Route path="/create-match" element={<CreateMatch />} />
          <Route path="/profile" element={<PlayerProfile />} />
          <Route path="/courts" element={<CourtBooking />} />
          <Route path="/matches" element={<JoinMatch />} />
          <Route path="/community" element={<Community />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Owner Routes */}
          <Route path="/owner-signup" element={<OwnerOnboarding />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/owner-profile" element={<OwnerProfile />} />
          <Route path="/add-court" element={<AddCourt />} />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ErrorBoundary>
                <AdminDashboard />
              </ErrorBoundary>
            }
          />

          {/* Info Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/help"
            element={
              <PlaceholderPage
                title="Help Center"
                description="Find answers to common questions and get support."
                suggestedAction="Ask me to build the help center with FAQ and search functionality!"
              />
            }
          />
          <Route
            path="/pricing"
            element={
              <PlaceholderPage
                title="Pricing Plans"
                description="Choose the perfect plan for your court management needs."
                suggestedAction="Ask me to build the pricing page with plan comparison and features!"
              />
            }
          />

          {/* Dynamic Routes */}
          <Route path="/court/:id" element={<CourtDetails />} />
          <Route path="/match/:id" element={<MatchDetails />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Prevent multiple root creation during HMR
const container = document.getElementById("root")!;
let root: ReturnType<typeof createRoot>;

if (import.meta.hot) {
  // In development with HMR, check if root already exists
  if (!(container as any)._reactRoot) {
    root = createRoot(container);
    (container as any)._reactRoot = root;
  } else {
    root = (container as any)._reactRoot;
  }
} else {
  // In production, create root normally
  root = createRoot(container);
}

root.render(<App />);
