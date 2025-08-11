import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Users, Search, Filter, Star, MapPin, Plus, MessageCircle, UserPlus, Calendar, Target, Circle, Hexagon } from "lucide-react";

interface Player {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  totalMatches: number;
  favoritesSports: string[];
  skillLevel: string;
  isOnline: boolean;
  bio: string;
  joinedDate: string;
  achievements: string[];
  recentActivity: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  sport: string;
  image: string;
  isPrivate: boolean;
  recentActivity: string;
}

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    location: 'Downtown District',
    rating: 4.8,
    totalMatches: 47,
    favoritesSports: ['Basketball', 'Tennis'],
    skillLevel: 'Advanced',
    isOnline: true,
    bio: 'Professional basketball coach and passionate player. Always looking for competitive games!',
    joinedDate: '2023',
    achievements: ['Tournament Winner', 'Most Active Player'],
    recentActivity: 'Played basketball 2 hours ago'
  },
  {
    id: '2', 
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c47d?w=150&h=150&fit=crop&crop=face',
    location: 'Business Park',
    rating: 4.9,
    totalMatches: 63,
    favoritesSports: ['Tennis', 'Football'],
    skillLevel: 'Expert',
    isOnline: false,
    bio: 'Former university tennis champion. Love teaching and playing with people of all skill levels.',
    joinedDate: '2022',
    achievements: ['Tennis Champion', 'Community Leader', 'Top Rated'],
    recentActivity: 'Organized tennis tournament yesterday'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'Residential Area',
    rating: 4.6,
    totalMatches: 32,
    favoritesSports: ['Football', 'Volleyball'],
    skillLevel: 'Intermediate',
    isOnline: true,
    bio: 'Weekend warrior who loves team sports. Great at organizing group matches and events.',
    joinedDate: '2023',
    achievements: ['Team Captain', 'Social Butterfly'],
    recentActivity: 'Created football match for this weekend'
  },
  {
    id: '4',
    name: 'Emily Watson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: 'City Center',
    rating: 4.7,
    totalMatches: 28,
    favoritesSports: ['Badminton', 'Table Tennis'],
    skillLevel: 'Intermediate',
    isOnline: true,
    bio: 'Badminton enthusiast and fitness lover. Always up for a quick game after work!',
    joinedDate: '2023',
    achievements: ['Quick Learner', 'Consistent Player'],
    recentActivity: 'Joined badminton practice session'
  }
];

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Downtown Basketball League',
    description: 'Competitive basketball league for advanced players in the downtown area.',
    memberCount: 24,
    sport: 'Basketball',
    image: 'https://images.unsplash.com/photo-1544944194-b447c5c04315?w=300&h=200&fit=crop&crop=center',
    isPrivate: false,
    recentActivity: 'Match scheduled for tomorrow at 6 PM'
  },
  {
    id: '2',
    name: 'Tennis Enthusiasts Club',
    description: 'A friendly community for tennis players of all skill levels to meet and play.',
    memberCount: 18,
    sport: 'Tennis',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center',
    isPrivate: false,
    recentActivity: 'New tournament announced - registration open'
  },
  {
    id: '3',
    name: 'Weekend Warriors FC',
    description: 'Football group for weekend matches and friendly competitions.',
    memberCount: 31,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop&crop=center',
    isPrivate: false,
    recentActivity: '11v11 match this Saturday - 4 spots available'
  },
  {
    id: '4',
    name: 'Elite Players Only',
    description: 'Exclusive group for expert-level players across all sports.',
    memberCount: 12,
    sport: 'Mixed',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=300&h=200&fit=crop&crop=center',
    isPrivate: true,
    recentActivity: 'Private tournament this weekend'
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('players');
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const tabs = [
    { id: 'players', label: 'Players', count: mockPlayers.length },
    { id: 'groups', label: 'Groups', count: mockGroups.length }
  ];

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !sportFilter || player.favoritesSports.includes(sportFilter);
    const matchesSkill = !skillFilter || player.skillLevel === skillFilter;
    
    return matchesSearch && matchesSport && matchesSkill;
  });

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !sportFilter || group.sport === sportFilter || group.sport === 'Mixed';
    
    return matchesSearch && matchesSport;
  });

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'Basketball': return Circle;
      case 'Football': return Hexagon;
      case 'Tennis': return Target;
      default: return Circle;
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
                <Link to="/matches" className="text-gray-700 hover:text-atlantis-500 transition-colors">Matches</Link>
                <Link to="/community" className="text-atlantis-500 font-medium">Community</Link>
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

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-feijoa rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Sports Community</h1>
                <p className="text-gray-600">Connect with players, join groups, and build your sports network</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCreateGroup(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Create Group</span>
            </button>
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
                placeholder="Search players or groups..."
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
              <option value="Badminton">Badminton</option>
            </select>

            {/* Skill Filter - only for players */}
            {activeTab === 'players' && (
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            )}

            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-t-2xl shadow-lg border border-gray-100 mt-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 py-4 px-6 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-atlantis-500 border-b-2 border-energy-400'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-energy-100 text-energy-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Players Tab */}
            {activeTab === 'players' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlayers.map((player, index) => (
                  <div 
                    key={player.id}
                    className="bg-gray-50 rounded-2xl p-6 hover-lift animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Player Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <img 
                          src={player.avatar} 
                          alt={player.name}
                          className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                        />
                        {player.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-feijoa-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{player.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{player.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="w-4 h-4 text-energy-400 fill-current" />
                          <span className="text-sm font-medium">{player.rating}</span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSkillColor(player.skillLevel)}`}>
                            {player.skillLevel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{player.bio}</p>

                    {/* Sports */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {player.favoritesSports.map((sport) => (
                        <span 
                          key={sport}
                          className="px-3 py-1 bg-atlantis-100 text-atlantis-700 text-xs font-medium rounded-full"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{player.totalMatches} matches</span>
                      <span>Since {player.joinedDate}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-atlantis-500 text-white rounded-xl text-sm font-medium hover:bg-apple-500 transition-all duration-300">
                        <UserPlus className="w-4 h-4" />
                        <span>Connect</span>
                      </button>
                      <button className="flex items-center justify-center px-3 py-2 bg-feijoa-100 text-feijoa-700 rounded-xl hover:bg-feijoa-200 transition-all duration-300">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Groups Tab */}
            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group, index) => (
                  <div 
                    key={group.id}
                    className="bg-gray-50 rounded-2xl overflow-hidden hover-lift animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Group Image */}
                    <div className="relative h-32">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        {group.isPrivate && (
                          <span className="px-2 py-1 bg-black/50 text-white text-xs font-medium rounded-full">
                            Private
                          </span>
                        )}
                        <span className="px-2 py-1 bg-atlantis-500 text-white text-xs font-medium rounded-full">
                          {group.sport}
                        </span>
                      </div>
                    </div>

                    {/* Group Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2">{group.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{group.memberCount} members</span>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        {group.recentActivity}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button className="flex-1 px-4 py-2 bg-feijoa-500 text-white rounded-xl text-sm font-medium hover:bg-feijoa-600 transition-all duration-300">
                          {group.isPrivate ? 'Request to Join' : 'Join Group'}
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-300 transition-all duration-300">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {((activeTab === 'players' && filteredPlayers.length === 0) || 
              (activeTab === 'groups' && filteredGroups.length === 0)) && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No {activeTab} found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSportFilter('');
                    setSkillFilter('');
                  }}
                  className="px-6 py-3 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-feijoa-200 shadow-feijoa-glow/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Group</h3>
              <button 
                onClick={() => setShowCreateGroup(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-feijoa-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Downtown Basketball League"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-feijoa-500 focus:border-transparent transition-all duration-300"
                  placeholder="Describe your group's purpose and activities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Sport</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-feijoa-500 focus:border-transparent transition-all duration-300">
                  <option value="">Select a sport</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Football">Football</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Mixed">Mixed Sports</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="private"
                  className="w-5 h-5 text-feijoa-600 border-gray-300 rounded focus:ring-feijoa-500"
                />
                <label htmlFor="private" className="text-sm font-medium text-gray-700">
                  Private Group (require approval to join)
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateGroup(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-feijoa text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-feijoa-glow"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="pb-8"></div>
    </div>
  );
}
