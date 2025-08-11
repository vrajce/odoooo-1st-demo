import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Star,
  ChevronRight,
  Calendar,
  Trophy,
  Play,
} from "lucide-react";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const popularCourts = [
    {
      id: 1,
      name: "Sports Complex Arena",
      location: "Downtown District",
      rating: 4.8,
      price: "₹500/hour",
      image:
        "https://images.unsplash.com/photo-1544944194-b447c5c04315?w=400&h=300&fit=crop&crop=center",
      sports: ["Basketball", "Tennis", "Badminton"],
      distance: "2.3 km",
    },
    {
      id: 2,
      name: "Elite Sports Center",
      location: "Business Park",
      rating: 4.9,
      price: "₹750/hour",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      sports: ["Football", "Cricket", "Volleyball"],
      distance: "1.8 km",
    },
    {
      id: 3,
      name: "Community Sports Hub",
      location: "Residential Area",
      rating: 4.6,
      price: "₹350/hour",
      image:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop&crop=center",
      sports: ["Table Tennis", "Squash", "Gym"],
      distance: "3.1 km",
    },
  ];

  const featuredMatches = [
    {
      id: 1,
      sport: "Basketball",
      time: "6:00 PM Today",
      location: "Sports Complex Arena",
      players: "3/5",
      skillLevel: "Intermediate",
      organizer: "Mike Johnson",
    },
    {
      id: 2,
      sport: "Football",
      time: "8:00 AM Tomorrow",
      location: "Elite Sports Center",
      players: "8/11",
      skillLevel: "Advanced",
      organizer: "Sarah Wilson",
    },
    {
      id: 3,
      sport: "Tennis",
      time: "4:00 PM Tomorrow",
      location: "Community Sports Hub",
      players: "2/4",
      skillLevel: "Beginner",
      organizer: "David Chen",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sahara-100 via-sahara-50 to-feijoa-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-atlantis rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  QuickCourt
                </span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/courts"
                  className="text-gray-700 hover:text-atlantis-500 transition-colors"
                >
                  Courts
                </Link>
                <Link
                  to="/matches"
                  className="text-gray-700 hover:text-atlantis-500 transition-colors"
                >
                  Matches
                </Link>
                <Link
                  to="/community"
                  className="text-gray-700 hover:text-atlantis-500 transition-colors"
                >
                  Community
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-atlantis-500 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-atlantis-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-atlantis text-white rounded-xl font-medium hover:shadow-atlantis-glow transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&crop=center')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-atlantis-900/70 via-apple-800/60 to-transparent"></div>
        </div>

        <div
          className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-energy-300 to-feijoa-300">
              Sports Match
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Connect with players, book courts, and join the ultimate sports
            community experience
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/book-court"
              className="px-8 py-4 bg-atlantis-500 text-white rounded-xl font-semibold text-lg hover:bg-apple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-atlantis-glow animate-breathe flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Court</span>
            </Link>
            <Link
              to="/join-match"
              className="px-8 py-4 bg-feijoa-500 text-white rounded-xl font-semibold text-lg hover:bg-feijoa-600 transition-all duration-300 transform hover:scale-105 hover:shadow-feijoa-glow flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Join a Match</span>
            </Link>
          </div>
        </div>

        {/* Floating search bar */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
          <div className="glass rounded-2xl p-6 border border-white/30">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search for courts, sports, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-atlantis-400 focus:border-transparent transition-all"
                />
              </div>
              <button className="px-6 py-3 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300 transform hover:scale-105">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Courts Near You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover top-rated sports facilities with premium amenities and
            flexible booking options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourts.map((court, index) => (
            <div
              key={court.id}
              className={`bg-white rounded-2xl shadow-lg hover-lift overflow-hidden animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-energy-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {court.price}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-energy-400 fill-current" />
                  <span className="text-white text-sm font-medium">
                    {court.rating}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {court.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {court.location} • {court.distance}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {court.sports.map((sport) => (
                    <span
                      key={sport}
                      className="px-3 py-1 bg-feijoa-100 text-feijoa-700 text-xs font-medium rounded-full"
                    >
                      {sport}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/court/${court.id}`}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300 transform hover:scale-105"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Matches Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Active Matches
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find players looking for teammates and jump into exciting games
            happening near you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMatches.map((match, index) => (
            <div
              key={match.id}
              className={`bg-white rounded-2xl shadow-lg hover-lift p-6 border border-gray-100 animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-feijoa rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{match.sport}</h3>
                    <p className="text-sm text-gray-600">{match.skillLevel}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-energy-100 text-energy-700 text-xs font-medium rounded-full">
                  {match.players} Players
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{match.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{match.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Organized by {match.organizer}
                  </span>
                </div>
              </div>

              <Link
                to={`/match/${match.id}`}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-all duration-300 transform hover:scale-105"
              >
                <span>Request to Join</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/matches"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-atlantis-500 text-atlantis-500 rounded-xl font-medium hover:bg-atlantis-500 hover:text-white transition-all duration-300"
          >
            <span>View All Matches</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-atlantis rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">QuickCourt</span>
              </div>
              <p className="text-gray-400">
                Connecting sports enthusiasts and providing premium court
                booking experiences.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Players</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/book-court"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    Book Courts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/join-match"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    Join Matches
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-match"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    Create Match
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Court Owners</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/owner-signup"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    List Your Court
                  </Link>
                </li>
                <li>
                  <Link
                    to="/owner-dashboard"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    Owner Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-atlantis-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QuickCourt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
