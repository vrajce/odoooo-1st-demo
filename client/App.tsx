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
          <Route path="/book-court" element={
            <PlaceholderPage
              title="Book a Court"
              description="Reserve your preferred sports facility with real-time availability and flexible scheduling."
              suggestedAction="Ask me to build the court booking page with calendar, real-time slots, and payment integration!"
            />
          } />
          <Route path="/join-match" element={
            <PlaceholderPage
              title="Join a Match"
              description="Find and join exciting sports matches happening in your area."
              suggestedAction="Ask me to build the match joining page with filters, match details, and request system!"
            />
          } />
          <Route path="/create-match" element={
            <PlaceholderPage
              title="Create a Match"
              description="Organize your own sports match and invite players from the community."
              suggestedAction="Ask me to build the match creation page with form validation and player invitation system!"
            />
          } />
          <Route path="/courts" element={
            <PlaceholderPage
              title="Browse Courts"
              description="Explore all available sports courts with detailed information and booking options."
              suggestedAction="Ask me to build the courts listing page with filters, map view, and detailed court profiles!"
            />
          } />
          <Route path="/matches" element={
            <PlaceholderPage
              title="Active Matches"
              description="View all ongoing and upcoming matches you can join."
              suggestedAction="Ask me to build the matches page with live updates and filtering options!"
            />
          } />
          <Route path="/community" element={
            <PlaceholderPage
              title="Sports Community"
              description="Connect with fellow sports enthusiasts and build your network."
              suggestedAction="Ask me to build the community page with player profiles and social features!"
            />
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Owner Routes */}
          <Route path="/owner-signup" element={
            <PlaceholderPage
              title="List Your Court"
              description="Join as a court owner and start earning from your sports facilities."
              suggestedAction="Ask me to build the owner onboarding with business verification!"
            />
          } />
          <Route path="/owner-dashboard" element={
            <PlaceholderPage
              title="Owner Dashboard"
              description="Manage your courts, bookings, and earnings from a comprehensive dashboard."
              suggestedAction="Ask me to build the owner dashboard with analytics and management tools!"
            />
          } />

          {/* Info Pages */}
          <Route path="/about" element={
            <PlaceholderPage
              title="About QuickCourt"
              description="Learn more about our mission to connect sports enthusiasts worldwide."
              suggestedAction="Ask me to build the about page with team info and company story!"
            />
          } />
          <Route path="/contact" element={
            <PlaceholderPage
              title="Contact Us"
              description="Get in touch with our team for support or business inquiries."
              suggestedAction="Ask me to build the contact page with form and map integration!"
            />
          } />
          <Route path="/help" element={
            <PlaceholderPage
              title="Help Center"
              description="Find answers to common questions and get support."
              suggestedAction="Ask me to build the help center with FAQ and search functionality!"
            />
          } />
          <Route path="/pricing" element={
            <PlaceholderPage
              title="Pricing Plans"
              description="Choose the perfect plan for your court management needs."
              suggestedAction="Ask me to build the pricing page with plan comparison and features!"
            />
          } />

          {/* Dynamic Routes */}
          <Route path="/court/:id" element={
            <PlaceholderPage
              title="Court Details"
              description="View detailed information about this sports facility."
              suggestedAction="Ask me to build the court detail page with gallery, amenities, and booking!"
            />
          } />
          <Route path="/match/:id" element={
            <PlaceholderPage
              title="Match Details"
              description="View match information and send join requests."
              suggestedAction="Ask me to build the match detail page with player info and join functionality!"
            />
          } />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
