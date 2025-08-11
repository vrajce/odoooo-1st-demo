import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Trophy, Clock, MapPin, Users, Star, MessageCircle, UserPlus, Share, Calendar, Target, CheckCircle, AlertCircle, Shield } from "lucide-react";

interface Player {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  skillLevel: string;
  joinedDate: string;
}

interface MatchDetail {
  id: string;
  title: string;
  sport: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  courtName: string;
  courtImage: string;
  currentPlayers: number;
  maxPlayers: number;
  skillLevel: string;
  price: string;
  description: string;
  status: 'open' | 'almost-full' | 'full' | 'completed' | 'cancelled';
  organizer: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    totalMatches: number;
    joinedDate: string;
  };
  players: Player[];
  rules: string[];
  equipment: string[];
  isPrivate: boolean;
}

const mockMatch: MatchDetail = {
  id: '1',
  title: 'Friday Night Basketball Championship',
  sport: 'Basketball',
  date: '2024-01-19',
  time: '18:00',
  duration: 2,
  location: 'Downtown District',
  courtName: 'Elite Sports Arena - Court A',
  courtImage: 'https://images.unsplash.com/photo-1544944194-b447c5c04315?w=400&h=300&fit=crop&crop=center',
  currentPlayers: 7,
  maxPlayers: 10,
  skillLevel: 'Intermediate',
  price: '₹150 per player',
  description: 'Competitive basketball match for intermediate level players. We focus on team play and sportsmanship. Looking for skilled players who can commit to the full match duration. This will be a great opportunity to showcase your skills and meet fellow basketball enthusiasts.',
  status: 'open',
  organizer: {
    id: 'org1',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
    rating: 4.8,
    totalMatches: 23,
    joinedDate: '2023'
  },
  players: [
    {
      id: '1',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      rating: 4.6,
      skillLevel: 'Intermediate',
      joinedDate: '2023'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c47d?w=50&h=50&fit=crop&crop=face',
      rating: 4.9,
      skillLevel: 'Advanced',
      joinedDate: '2022'
    },
    {
      id: '3',
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      rating: 4.7,
      skillLevel: 'Intermediate',
      joinedDate: '2023'
    },
    {
      id: '4',
      name: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      rating: 4.5,
      skillLevel: 'Beginner',
      joinedDate: '2023'
    },
    {
      id: '5',
      name: 'James Smith',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face',
      rating: 4.8,
      skillLevel: 'Intermediate',
      joinedDate: '2022'
    },
    {
      id: '6',
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
      rating: 4.4,
      skillLevel: 'Intermediate',
      joinedDate: '2023'
    }
  ],
  rules: [
    'Arrive 15 minutes before match time',
    'Proper basketball attire required',
    'No aggressive behavior tolerated',
    'Respect all players and equipment',
    'Follow organizer instructions',
    'Clean up after match'
  ],
  equipment: [
    'Basketball (provided)',
    'Team jerseys (bring your own)',
    'Water bottles',
    'Towels',
    'Proper basketball shoes'
  ],
  isPrivate: false
};

export default function MatchDetails() {
  const { id } = useParams();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [showAllPlayers, setShowAllPlayers] = useState(false);

  const match = mockMatch; // In real app, fetch based on id

  const handleJoinRequest = async () => {
    setIsRequesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false);
      setShowJoinModal(false);
      alert(`Join request sent to ${match.organizer.name}! You'll be notified when they respond.`);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-feijoa-100 text-feijoa-700';
      case 'almost-full': return 'bg-energy-100 text-energy-700';
      case 'full': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case 'Beginner': return 'bg-feijoa-100 text-feijoa-700';
      case 'Intermediate': return 'bg-energy-100 text-energy-700';
      case 'Advanced': return 'bg-atlantis-100 text-atlantis-700';
      case 'Expert': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating) 
            ? 'text-energy-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const spotsLeft = match.maxPlayers - match.currentPlayers;

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
              <button className="px-6 py-2 bg-gradient-atlantis text-white rounded-xl font-medium hover:shadow-atlantis-glow transition-all duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/matches" className="hover:text-atlantis-500 transition-colors">Matches</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{match.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Match Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{match.title}</h1>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(match.status)}`}>
                      {match.status === 'open' ? 'Open' : match.status === 'almost-full' ? 'Almost Full' : match.status}
                    </span>
                    {match.isPrivate && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                        Private
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      <span>{match.sport}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSkillColor(match.skillLevel)}`}>
                      {match.skillLevel}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-atlantis-500" />
                  <div>
                    <div className="font-medium text-gray-900">{formatDate(match.date)}</div>
                    <div className="text-sm text-gray-600">{formatTime(match.time)} ({match.duration}h)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-feijoa-500" />
                  <div>
                    <div className="font-medium text-gray-900">{match.courtName}</div>
                    <div className="text-sm text-gray-600">{match.location}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-energy-500" />
                  <div>
                    <div className="font-medium text-gray-900">{match.currentPlayers}/{match.maxPlayers} Players</div>
                    <div className="text-sm text-gray-600">{spotsLeft} spots left</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">{match.description}</p>
            </div>

            {/* Court Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Venue Details</h3>
              <div className="flex items-center space-x-4">
                <img 
                  src={match.courtImage} 
                  alt={match.courtName}
                  className="w-20 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{match.courtName}</h4>
                  <p className="text-gray-600">{match.location}</p>
                  <Link 
                    to={`/court/1`}
                    className="text-atlantis-500 hover:text-apple-500 text-sm font-medium transition-colors"
                  >
                    View Court Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Organized by</h3>
              <div className="flex items-center space-x-4">
                <img 
                  src={match.organizer.avatar} 
                  alt={match.organizer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{match.organizer.name}</h4>
                  <div className="flex items-center space-x-2 mb-1">
                    {renderStars(match.organizer.rating)}
                    <span className="text-sm text-gray-600">{match.organizer.rating}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {match.organizer.totalMatches} matches organized • Member since {match.organizer.joinedDate}
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </div>
            </div>

            {/* Players */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Players ({match.currentPlayers}/{match.maxPlayers})
                </h3>
                {spotsLeft > 0 && (
                  <span className="text-sm text-feijoa-600 font-medium">
                    {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} available
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {match.players.slice(0, showAllPlayers ? undefined : 6).map((player) => (
                  <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <img 
                      src={player.avatar} 
                      alt={player.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{player.name}</h4>
                      <div className="flex items-center space-x-2">
                        {renderStars(player.rating)}
                        <span className="text-xs text-gray-600">{player.rating}</span>
                      </div>
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getSkillColor(player.skillLevel)}`}>
                        {player.skillLevel}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Empty Spots */}
                {Array.from({ length: spotsLeft }, (_, index) => (
                  <div key={`empty-${index}`} className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-xl">
                    <div className="text-center">
                      <UserPlus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-sm text-gray-500">Open Spot</span>
                    </div>
                  </div>
                )).slice(0, showAllPlayers ? undefined : Math.max(0, 6 - match.currentPlayers))}
              </div>

              {match.players.length > 6 && (
                <button
                  onClick={() => setShowAllPlayers(!showAllPlayers)}
                  className="mt-4 text-atlantis-500 hover:text-apple-500 text-sm font-medium transition-colors"
                >
                  {showAllPlayers ? 'Show Less' : `Show All ${match.players.length} Players`}
                </button>
              )}
            </div>

            {/* Match Rules & Equipment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Rules</h3>
                <ul className="space-y-2">
                  {match.rules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-feijoa-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What to Bring</h3>
                <ul className="space-y-2">
                  {match.equipment.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-atlantis-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Join Match Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-atlantis-500 mb-1">{match.price}</div>
                  <div className="text-gray-600">per player</div>
                </div>

                {match.status === 'full' ? (
                  <div className="text-center py-4">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Match Full</h4>
                    <p className="text-sm text-gray-600">This match has reached capacity</p>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setShowJoinModal(true)}
                      className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-atlantis text-white font-semibold rounded-xl hover:shadow-atlantis-glow transition-all duration-300 transform hover:scale-105 mb-4"
                    >
                      <UserPlus className="w-5 h-5" />
                      <span>Request to Join</span>
                    </button>

                    {spotsLeft <= 3 && spotsLeft > 0 && (
                      <div className="flex items-center space-x-2 text-energy-600 text-sm mb-4">
                        <AlertCircle className="w-4 h-4" />
                        <span>Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left!</span>
                      </div>
                    )}
                  </>
                )}

                <div className="text-center text-sm text-gray-500">
                  Free cancellation up to 2 hours before match
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sport:</span>
                    <span className="font-medium">{match.sport}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Skill Level:</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSkillColor(match.skillLevel)}`}>
                      {match.skillLevel}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{match.duration} hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Players:</span>
                    <span className="font-medium">{match.currentPlayers}/{match.maxPlayers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Match Type:</span>
                    <span className="font-medium">{match.isPrivate ? 'Private' : 'Public'}</span>
                  </div>
                </div>
              </div>

              {/* Safety Notice */}
              <div className="bg-feijoa-50 rounded-2xl p-6 border border-feijoa-200">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-feijoa-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-feijoa-800 mb-2">Safety First</h4>
                    <p className="text-sm text-feijoa-700">
                      All matches are monitored for safety. Report any issues to our support team immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Request Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-feijoa-200 shadow-feijoa-glow/30">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-feijoa rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join Match Request</h3>
              <p className="text-gray-600">Send a request to join "{match.title}"</p>
            </div>

            <div className="bg-sahara-50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={match.organizer.avatar} 
                  alt={match.organizer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{match.organizer.name}</div>
                  <div className="text-sm text-gray-600">Match Organizer</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Match:</strong> {match.title}</p>
                <p><strong>Date:</strong> {formatDate(match.date)} at {formatTime(match.time)}</p>
                <p><strong>Cost:</strong> {match.price}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Organizer (Optional)
              </label>
              <textarea
                value={joinMessage}
                onChange={(e) => setJoinMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-feijoa-500 focus:border-transparent transition-all duration-300"
                placeholder="Introduce yourself and mention your experience..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowJoinModal(false)}
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
