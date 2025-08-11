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
          <Route
            path="/community"
            element={
              <PlaceholderPage
                title="Sports Community"
                description="Connect with fellow sports enthusiasts and build your network."
                suggestedAction="Ask me to build the community page with player profiles and social features!"
              />
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Owner Routes */}
          <Route
            path="/owner-signup"
            element={
              <PlaceholderPage
                title="List Your Court"
                description="Join as a court owner and start earning from your sports facilities."
                suggestedAction="Ask me to build the owner onboarding with business verification!"
              />
            }
          />
          <Route
            path="/owner-dashboard"
            element={
              <PlaceholderPage
                title="Owner Dashboard"
                description="Manage your courts, bookings, and earnings from a comprehensive dashboard."
                suggestedAction="Ask me to build the owner dashboard with analytics and management tools!"
              />
            }
          />

          {/* Info Pages */}
          <Route
            path="/about"
            element={
              <PlaceholderPage
                title="About QuickCourt"
                description="Learn more about our mission to connect sports enthusiasts worldwide."
                suggestedAction="Ask me to build the about page with team info and company story!"
              />
            }
          />
          <Route
            path="/contact"
            element={
              <PlaceholderPage
                title="Contact Us"
                description="Get in touch with our team for support or business inquiries."
                suggestedAction="Ask me to build the contact page with form and map integration!"
              />
            }
          />
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
          <Route
            path="/court/:id"
            element={
              <PlaceholderPage
                title="Court Details"
                description="View detailed information about this sports facility."
                suggestedAction="Ask me to build the court detail page with gallery, amenities, and booking!"
              />
            }
          />
          <Route
            path="/match/:id"
            element={
              <PlaceholderPage
                title="Match Details"
                description="View match information and send join requests."
                suggestedAction="Ask me to build the match detail page with player info and join functionality!"
              />
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
