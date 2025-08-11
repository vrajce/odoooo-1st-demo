import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  MapPin,
  Users,
  Clock,
  Calendar,
  Plus,
  Minus,
  Circle,
  Hexagon,
  Target,
  Square,
  Octagon,
  Zap,
} from "lucide-react";

interface Court {
  id: number;
  name: string;
  location: string;
  sports: string[];
  price: string;
  rating: number;
  lat: number;
  lng: number;
}

const sports = [
  {
    id: "basketball",
    name: "Basketball",
    icon: Circle,
    color: "bg-orange-500",
  },
  { id: "football", name: "Football", icon: Hexagon, color: "bg-green-500" },
  { id: "tennis", name: "Tennis", icon: Target, color: "bg-yellow-500" },
  { id: "volleyball", name: "Volleyball", icon: Square, color: "bg-blue-500" },
  {
    id: "tabletennis",
    name: "Table Tennis",
    icon: Octagon,
    color: "bg-red-500",
  },
  { id: "badminton", name: "Badminton", icon: Zap, color: "bg-purple-500" },
];

const courts: Court[] = [
  {
    id: 1,
    name: "Sports Complex Arena",
    location: "Downtown District",
    sports: ["Basketball", "Tennis"],
    price: "₹500/hour",
    rating: 4.8,
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: 2,
    name: "Elite Sports Center",
    location: "Business Park",
    sports: ["Football", "Volleyball"],
    price: "₹750/hour",
    rating: 4.9,
    lat: 28.6169,
    lng: 77.212,
  },
  {
    id: 3,
    name: "Community Sports Hub",
    location: "Residential Area",
    sports: ["Table Tennis", "Badminton"],
    price: "₹350/hour",
    rating: 4.6,
    lat: 28.62,
    lng: 77.215,
  },
];

export default function CreateMatch() {
  const [formData, setFormData] = useState({
    title: "",
    sport: "",
    date: "",
    time: "",
    duration: 1,
    playersRequired: 4,
    skillLevel: "intermediate",
    courtId: "",
    description: "",
    isPrivate: false,
  });

  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSportSelect = (sportId: string) => {
    setFormData({ ...formData, sport: sportId });
  };

  const handleCourtSelect = (court: Court) => {
    setSelectedCourt(court);
    setFormData({ ...formData, courtId: court.id.toString() });
  };

  const incrementPlayers = () => {
    if (formData.playersRequired < 20) {
      setFormData({
        ...formData,
        playersRequired: formData.playersRequired + 1,
      });
    }
  };

  const decrementPlayers = () => {
    if (formData.playersRequired > 2) {
      setFormData({
        ...formData,
        playersRequired: formData.playersRequired - 1,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Match created successfully! Players will be notified.");
      // Redirect to matches page
    }, 2000);
  };

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
              <Link
                to="/profile"
                className="text-gray-700 hover:text-atlantis-500 transition-colors"
              >
                Profile
              </Link>
              <button className="px-6 py-2 bg-gradient-atlantis text-white rounded-xl font-medium hover:shadow-atlantis-glow transition-all duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-feijoa rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create a Match
              </h1>
              <p className="text-gray-600">
                Organize a sports match and invite players to join
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Match Details Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Match Details
                </h2>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Match Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., Friday Night Basketball"
                    />
                  </div>

                  {/* Sport Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Sport
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {sports.map((sport) => {
                        const IconComponent = sport.icon;
                        return (
                          <button
                            key={sport.id}
                            type="button"
                            onClick={() => handleSportSelect(sport.id)}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 hover:shadow-feijoa-glow ${
                              formData.sport === sport.id
                                ? "border-feijoa-500 bg-feijoa-50 shadow-feijoa-glow/30"
                                : "border-gray-200 bg-white hover:border-feijoa-300"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 ${sport.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                            >
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-xs font-medium text-gray-900">
                              {sport.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (hours)
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value={0.5}>30 minutes</option>
                      <option value={1}>1 hour</option>
                      <option value={1.5}>1.5 hours</option>
                      <option value={2}>2 hours</option>
                      <option value={3}>3 hours</option>
                    </select>
                  </div>

                  {/* Players Required */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Players Required
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={decrementPlayers}
                        disabled={formData.playersRequired <= 2}
                        className="w-10 h-10 bg-feijoa-500 text-white rounded-lg flex items-center justify-center hover:bg-feijoa-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                          {formData.playersRequired}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={incrementPlayers}
                        disabled={formData.playersRequired >= 20}
                        className="w-10 h-10 bg-feijoa-500 text-white rounded-lg flex items-center justify-center hover:bg-feijoa-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Skill Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skill Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["beginner", "intermediate", "advanced"].map((level) => (
                        <label
                          key={level}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.skillLevel === level
                              ? "border-atlantis-500 bg-atlantis-50"
                              : "border-gray-200 bg-white hover:border-atlantis-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="skillLevel"
                            value={level}
                            checked={formData.skillLevel === level}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="font-medium text-gray-900 capitalize">
                              {level}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                      placeholder="Add any additional details about the match..."
                    />
                  </div>

                  {/* Privacy Toggle */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="isPrivate"
                      checked={formData.isPrivate}
                      onChange={handleChange}
                      className="w-5 h-5 text-atlantis-600 border-gray-300 rounded focus:ring-atlantis-500"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Private Match (only invited players can join)
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.courtId}
                className="w-full py-4 bg-gradient-atlantis text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-atlantis-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Match...</span>
                  </div>
                ) : (
                  "Create Match"
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Court Selection & Map */}
          <div className="space-y-6">
            {/* Court Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Select Court</span>
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {courts.map((court) => (
                  <div
                    key={court.id}
                    onClick={() => handleCourtSelect(court)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedCourt?.id === court.id
                        ? "border-atlantis-500 bg-atlantis-50"
                        : "border-gray-200 bg-white hover:border-atlantis-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {court.name}
                      </h3>
                      <span className="text-sm font-medium text-energy-600">
                        {court.price}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{court.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {court.sports.map((sport) => (
                        <span
                          key={sport}
                          className="px-2 py-1 bg-feijoa-100 text-feijoa-700 text-xs font-medium rounded-full"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Court Locations
              </h3>
              <div className="w-full h-64 bg-gradient-to-br from-sahara-100 to-feijoa-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    Interactive map with court pins
                  </p>
                  <p className="text-sm text-gray-400">
                    Click pins to select courts
                  </p>
                </div>
              </div>
              {selectedCourt && (
                <div className="mt-4 p-3 bg-atlantis-50 rounded-xl">
                  <p className="text-sm font-medium text-atlantis-700">
                    Selected: {selectedCourt.name}
                  </p>
                  <p className="text-xs text-atlantis-600">
                    {selectedCourt.location}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
