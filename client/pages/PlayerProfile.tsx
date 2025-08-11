import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, User, Calendar, Clock, MapPin, Edit, MoreHorizontal, X, CheckCircle, AlertCircle, Star, Settings } from "lucide-react";

interface Booking {
  id: string;
  courtName: string;
  sport: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  location: string;
  image: string;
}

const mockBookings: { [key: string]: Booking[] } = {
  active: [
    {
      id: '1',
      courtName: 'Sports Complex Arena',
      sport: 'Basketball',
      date: '2024-01-15',
      time: '18:00',
      duration: 2,
      price: 500,
      status: 'confirmed',
      location: 'Downtown District',
      image: 'https://images.unsplash.com/photo-1544944194-b447c5c04315?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: '2',
      courtName: 'Elite Sports Center',
      sport: 'Tennis',
      date: '2024-01-18',
      time: '16:00',
      duration: 1,
      price: 350,
      status: 'confirmed',
      location: 'Business Park',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center'
    }
  ],
  past: [
    {
      id: '3',
      courtName: 'Community Sports Hub',
      sport: 'Table Tennis',
      date: '2024-01-10',
      time: '14:00',
      duration: 1,
      price: 200,
      status: 'completed',
      location: 'Residential Area',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: '4',
      courtName: 'Sports Complex Arena',
      sport: 'Basketball',
      date: '2024-01-08',
      time: '19:00',
      duration: 2,
      price: 500,
      status: 'completed',
      location: 'Downtown District',
      image: 'https://images.unsplash.com/photo-1544944194-b447c5c04315?w=400&h=300&fit=crop&crop=center'
    }
  ],
  cancelled: [
    {
      id: '5',
      courtName: 'Elite Sports Center',
      sport: 'Football',
      date: '2024-01-12',
      time: '10:00',
      duration: 2,
      price: 600,
      status: 'cancelled',
      location: 'Business Park',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center'
    }
  ]
};

export default function PlayerProfile() {
  const [activeTab, setActiveTab] = useState('active');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Downtown District',
    bio: 'Passionate basketball player and sports enthusiast. Love meeting new people through sports!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    memberSince: '2023',
    totalBookings: 24,
    favoriteeSports: ['Basketball', 'Tennis', 'Football']
  });

  const tabs = [
    { id: 'active', label: 'Active Bookings', count: mockBookings.active.length },
    { id: 'past', label: 'Past Bookings', count: mockBookings.past.length },
    { id: 'cancelled', label: 'Cancelled', count: mockBookings.cancelled.length }
  ];

  const handleAction = (action: string, bookingId: string) => {
    switch (action) {
      case 'reschedule':
        alert(`Reschedule booking ${bookingId}`);
        break;
      case 'cancel':
        if (confirm('Are you sure you want to cancel this booking?')) {
          alert(`Booking ${bookingId} cancelled`);
        }
        break;
      case 'review':
        alert(`Leave a review for booking ${bookingId}`);
        break;
      case 'rebook':
        alert(`Rebook court for booking ${bookingId}`);
        break;
    }
    setShowActionMenu(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-feijoa-100 text-feijoa-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
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
                <Link to="/community" className="text-gray-700 hover:text-atlantis-500 transition-colors">Community</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-atlantis-500 font-medium">Profile</Link>
              <button className="px-6 py-2 bg-gradient-atlantis text-white rounded-xl font-medium hover:shadow-atlantis-glow transition-all duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative group">
              <img 
                src={profileData.avatar} 
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button 
                onClick={() => setShowEditProfile(true)}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-atlantis-500 text-white rounded-full flex items-center justify-center hover:bg-apple-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h1>
                <button 
                  onClick={() => setShowEditProfile(true)}
                  className="p-1 text-gray-400 hover:text-atlantis-500 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 mb-3">{profileData.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                <span>📍 {profileData.location}</span>
                <span>📧 {profileData.email}</span>
                <span>📞 {profileData.phone}</span>
                <span>📅 Member since {profileData.memberSince}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.favoriteeSports.map((sport) => (
                  <span
                    key={sport}
                    className="px-3 py-1 bg-feijoa-100 text-feijoa-700 text-sm font-medium rounded-full"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex space-x-6 md:flex-col md:space-x-0 md:space-y-4 text-center">
              <div>
                <div className="text-2xl font-bold text-atlantis-500">{profileData.totalBookings}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-feijoa-500">4.8</div>
                <div className="text-sm text-gray-600 flex items-center">
                  <Star className="w-3 h-3 text-energy-400 fill-current mr-1" />
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
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
                  {tab.count > 0 && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-energy-100 text-energy-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {mockBookings[activeTab].length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No {activeTab} bookings</h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'active' && "You don't have any active bookings. Book a court to get started!"}
                  {activeTab === 'past' && "You haven't completed any bookings yet."}
                  {activeTab === 'cancelled' && "No cancelled bookings found."}
                </p>
                {activeTab === 'active' && (
                  <Link 
                    to="/book-court"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book a Court</span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {mockBookings[activeTab].map((booking) => (
                  <div 
                    key={booking.id}
                    className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={booking.image} 
                          alt={booking.courtName}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{booking.courtName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(booking.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.time} ({booking.duration}h)
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {booking.location}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-900">{booking.sport}</span>
                            <span className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="capitalize">{booking.status}</span>
                            </span>
                            <span className="text-sm font-semibold text-energy-600">₹{booking.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Menu */}
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === booking.id ? null : booking.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        
                        {showActionMenu === booking.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                            {booking.status === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => handleAction('reschedule', booking.id)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  Reschedule
                                </button>
                                <button
                                  onClick={() => handleAction('cancel', booking.id)}
                                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  Cancel Booking
                                </button>
                              </>
                            )}
                            {booking.status === 'completed' && (
                              <>
                                <button
                                  onClick={() => handleAction('review', booking.id)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  Leave Review
                                </button>
                                <button
                                  onClick={() => handleAction('rebook', booking.id)}
                                  className="w-full px-4 py-2 text-left text-sm text-atlantis-600 hover:bg-atlantis-50 transition-colors"
                                >
                                  Book Again
                                </button>
                              </>
                            )}
                            {booking.status === 'cancelled' && (
                              <button
                                onClick={() => handleAction('rebook', booking.id)}
                                className="w-full px-4 py-2 text-left text-sm text-atlantis-600 hover:bg-atlantis-50 transition-colors"
                              >
                                Book Again
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-atlantis-200 shadow-atlantis-glow/30 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Edit Profile</h3>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-6">
              {/* Avatar Upload */}
              <div className="text-center">
                <div className="relative inline-block">
                  <img 
                    src={profileData.avatar} 
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button 
                    type="button"
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-atlantis-500 text-white rounded-full flex items-center justify-center hover:bg-apple-500 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Click to change profile photo</p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-atlantis text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-atlantis-glow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
