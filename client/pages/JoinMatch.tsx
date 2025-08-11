import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, MapPin, Clock, Users, Star, Filter, Search, Basketball, Football, Tennis, CheckCircle, AlertCircle } from "lucide-react";

interface Match {
  id: number;
  title: string;
  sport: string;
  sportIcon: any;
  date: string;
  time: string;
  duration: number;
  location: string;
  courtName: string;
  currentPlayers: number;
  maxPlayers: number;
  skillLevel: string;
  organizer: {
    name: string;
    avatar: string;
    rating: number;
  };
  price: string;
  status: 'open' | 'almost-full' | 'full';
  distance: string;
  description: string;
}

const matches: Match[] = [
  {
    id: 1,
    title: "Friday Night Basketball",
    sport: "Basketball",
    sportIcon: Basketball,
    date: "Today",
    time: "6:00 PM",
    duration: 2,
    location: "Downtown District",
    courtName: "Sports Complex Arena",
    currentPlayers: 3,
    maxPlayers: 5,
    skillLevel: "Intermediate",
    organizer: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      rating: 4.8
    },
    price: "₹100 per player",
    status: 'open',
    distance: "2.3 km",
    description: "Competitive basketball game with experienced players. We play full court and focus on team play. Bring your A-game!"
  },
  {
    id: 2,
    title: "Weekend Football Match",
    sport: "Football", 
    sportIcon: Football,
    date: "Tomorrow",
    time: "8:00 AM",
    duration: 1.5,
    location: "Business Park",
    courtName: "Elite Sports Center",
    currentPlayers: 8,
    maxPlayers: 11,
    skillLevel: "Advanced",
    organizer: {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c47d?w=40&h=40&fit=crop&crop=face",
      rating: 4.9
    },
    price: "₹150 per player",
    status: 'almost-full',
    distance: "1.8 km",
    description: "11-a-side football match on professional field. Looking for skilled players who can commit to the full match duration."
  },
  {
    id: 3,
    title: "Tennis Doubles Tournament",
    sport: "Tennis",
    sportIcon: Tennis,
    date: "Sunday",
    time: "4:00 PM", 
    duration: 3,
    location: "Residential Area",
    courtName: "Community Sports Hub",
    currentPlayers: 6,
    maxPlayers: 8,
    skillLevel: "Beginner",
    organizer: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 4.6
    },
    price: "₹80 per player",
    status: 'open',
    distance: "3.1 km", 
    description: "Friendly doubles tournament with round-robin format. Perfect for beginners looking to improve their game."
  },
  {
    id: 4,
    title: "Basketball Practice Session",
    sport: "Basketball",
    sportIcon: Basketball,
    date: "Monday",
    time: "7:00 PM",
    duration: 1,
    location: "Downtown District", 
    courtName: "Sports Complex Arena",
    currentPlayers: 4,
    maxPlayers: 4,
    skillLevel: "Intermediate",
    organizer: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      rating: 4.7
    },
    price: "₹75 per player",
    status: 'full',
    distance: "2.3 km",
    description: "Focused practice session working on fundamentals and team plays. Great for improving skills."
  }
];

export default function JoinMatch() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !sportFilter || match.sport === sportFilter;
    const matchesSkill = !skillFilter || match.skillLevel === skillFilter;
    
    return matchesSearch && matchesSport && matchesSkill;
  });

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    if (match.status !== 'full') {
      setShowRequestModal(true);
    }
  };

  const handleJoinRequest = async () => {
    setIsRequesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false);
      setShowRequestModal(false);
      alert(`Join request sent to ${selectedMatch?.organizer.name}! You'll be notified when they respond.`);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-feijoa-100 text-feijoa-700';
      case 'almost-full': return 'bg-energy-100 text-energy-700';
      case 'full': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Open';
      case 'almost-full': return 'Almost Full';
      case 'full': return 'Full';
      default: return 'Unknown';
    }
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
                <span className="text-xl font-bold text-gray-900">QuickCourt</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/courts" className="text-gray-700 hover:text-atlantis-500 transition-colors">Courts</Link>
                <Link to="/matches" className="text-atlantis-500 font-medium">Matches</Link>
                <Link to="/community" className="text-gray-700 hover:text-atlantis-500 transition-colors">Community</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-gray-700 hover:text-atlantis-500 transition-colors">Profile</Link>
              <Link to="/create-match" className="px-4 py-2 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-all duration-300">
                Create Match
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-feijoa rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Join a Match</h1>
                <p className="text-gray-600">Find and join exciting sports matches happening near you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search matches or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Sport Filter */}
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">All Sports</option>
              <option value="Basketball">Basketball</option>
              <option value="Football">Football</option>
              <option value="Tennis">Tennis</option>
              <option value="Volleyball">Volleyball</option>
            </select>

            {/* Skill Filter */}
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match, index) => {
            const SportIcon = match.sportIcon;
            return (
              <div 
                key={match.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover-lift cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleMatchSelect(match)}
              >
                {/* Front of card */}
                <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-atlantis rounded-xl flex items-center justify-center">
                        <SportIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{match.title}</h3>
                        <p className="text-sm text-gray-600">{match.sport}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(match.status)}`}>
                      {getStatusText(match.status)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{match.date} at {match.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{match.courtName} • {match.distance}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{match.currentPlayers}/{match.maxPlayers} players • {match.skillLevel}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={match.organizer.avatar} 
                        alt={match.organizer.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{match.organizer.name}</span>
                    </div>
                    <span className="text-sm font-medium text-energy-600">{match.price}</span>
                  </div>
                </div>

                {/* Back of card - detailed info */}
                <div className="absolute inset-0 p-6 bg-gradient-to-br from-atlantis-500 to-apple-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{match.title}</h3>
                    <p className="text-white/90 text-sm mb-4">{match.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{match.duration}h duration</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        <span className="text-sm">Organizer rating: {match.organizer.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-3 bg-white text-atlantis-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                    disabled={match.status === 'full'}
                  >
                    {match.status === 'full' ? 'Match Full' : 'Request to Join'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <Link 
              to="/create-match"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300"
            >
              <span>Create Your Own Match</span>
            </Link>
          </div>
        )}
      </div>

      {/* Join Request Modal */}
      {showRequestModal && selectedMatch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-feijoa-200 shadow-feijoa-glow/30">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-feijoa rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join Match Request</h3>
              <p className="text-gray-600">Send a request to join "{selectedMatch.title}"</p>
            </div>

            <div className="bg-sahara-50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={selectedMatch.organizer.avatar} 
                  alt={selectedMatch.organizer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{selectedMatch.organizer.name}</div>
                  <div className="text-sm text-gray-600">Match Organizer</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Date:</strong> {selectedMatch.date} at {selectedMatch.time}</p>
                <p><strong>Location:</strong> {selectedMatch.courtName}</p>
                <p><strong>Cost:</strong> {selectedMatch.price}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinRequest}
                disabled={isRequesting}
                className="flex-1 py-3 bg-gradient-feijoa text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-feijoa-glow disabled:opacity-75"
              >
                {isRequesting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Request'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
