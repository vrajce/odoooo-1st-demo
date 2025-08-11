import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Building,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Star,
  MapPin,
  Clock,
  Plus,
  Settings,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Check,
} from "lucide-react";

interface BookingData {
  id: string;
  playerName: string;
  sport: string;
  date: string;
  time: string;
  duration: number;
  amount: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  playerAvatar: string;
}

interface CourtData {
  id: string;
  name: string;
  sport: string;
  image: string;
  totalBookings: number;
  revenue: number;
  rating: number;
  isActive: boolean;
  nextBooking?: string;
}

const mockBookings: BookingData[] = [
  {
    id: "1",
    playerName: "John Doe",
    sport: "Basketball",
    date: "2024-01-15",
    time: "18:00",
    duration: 2,
    amount: 1000,
    status: "confirmed",
    playerAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "2",
    playerName: "Sarah Wilson",
    sport: "Tennis",
    date: "2024-01-16",
    time: "16:00",
    duration: 1,
    amount: 500,
    status: "pending",
    playerAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612c47d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "3",
    playerName: "Mike Johnson",
    sport: "Football",
    date: "2024-01-14",
    time: "10:00",
    duration: 2,
    amount: 1500,
    status: "completed",
    playerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
  },
];

const mockCourts: CourtData[] = [
  {
    id: "1",
    name: "Basketball Court A",
    sport: "Basketball",
    image:
      "https://images.unsplash.com/photo-1544944194-b447c5c04315?w=200&h=150&fit=crop&crop=center",
    totalBookings: 47,
    revenue: 23500,
    rating: 4.8,
    isActive: true,
    nextBooking: "Today 6:00 PM",
  },
  {
    id: "2",
    name: "Tennis Court Premium",
    sport: "Tennis",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop&crop=center",
    totalBookings: 32,
    revenue: 16000,
    rating: 4.9,
    isActive: true,
    nextBooking: "Tomorrow 4:00 PM",
  },
  {
    id: "3",
    name: "Football Ground",
    sport: "Football",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=150&fit=crop&crop=center",
    totalBookings: 28,
    revenue: 42000,
    rating: 4.6,
    isActive: false,
    nextBooking: undefined,
  },
];

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("7d");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "bookings", label: "Bookings" },
    { id: "courts", label: "My Courts" },
    { id: "analytics", label: "Analytics" },
  ];

  // Calculate metrics
  const totalRevenue = mockBookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.amount, 0);

  const totalBookings = mockBookings.length;
  const activeBookings = mockBookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const activeCourts = mockCourts.filter((c) => c.isActive).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-feijoa-100 text-feijoa-700";
      case "pending":
        return "bg-energy-100 text-energy-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
              <span className="text-sm font-medium text-gray-500">
                Owner Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/owner-profile"
                className="text-gray-700 hover:text-atlantis-500 transition-colors"
              >
                Profile
              </Link>
              <button className="p-2 text-gray-700 hover:text-atlantis-500 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, Elite Sports Arena!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your courts today
              </p>
            </div>
            <div className="flex space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <Link
                to="/add-court"
                className="flex items-center space-x-2 px-6 py-2 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>Add Court</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-t-2xl shadow-lg border border-gray-100 mt-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 py-4 px-6 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-atlantis-500 border-b-2 border-energy-400"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-atlantis-500 to-apple-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-atlantis-100">Total Revenue</p>
                        <p className="text-2xl font-bold">
                          ₹{totalRevenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-atlantis-200">
                          +12% from last week
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-atlantis-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-feijoa-500 to-feijoa-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-feijoa-100">Total Bookings</p>
                        <p className="text-2xl font-bold">{totalBookings}</p>
                        <p className="text-sm text-feijoa-200">
                          +8% from last week
                        </p>
                      </div>
                      <Calendar className="w-8 h-8 text-feijoa-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-energy-400 to-energy-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-energy-100">Active Bookings</p>
                        <p className="text-2xl font-bold">{activeBookings}</p>
                        <p className="text-sm text-energy-200">
                          Today's confirmed
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-energy-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Active Courts</p>
                        <p className="text-2xl font-bold">{activeCourts}</p>
                        <p className="text-sm text-purple-200">
                          Out of {mockCourts.length} total
                        </p>
                      </div>
                      <Building className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recent Bookings
                    </h3>
                    <div className="space-y-4">
                      {mockBookings.slice(0, 3).map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 bg-white rounded-xl"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={booking.playerAvatar}
                              alt={booking.playerName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {booking.playerName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {booking.sport} • {formatDate(booking.date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ₹{booking.amount}
                            </p>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Court Performance
                    </h3>
                    <div className="space-y-4">
                      {mockCourts.map((court) => (
                        <div
                          key={court.id}
                          className="flex items-center justify-between p-4 bg-white rounded-xl"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={court.image}
                              alt={court.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {court.name}
                              </p>
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-energy-400 fill-current" />
                                <span className="text-sm text-gray-600">
                                  {court.rating}
                                </span>
                                <span className="text-sm text-gray-500">
                                  • {court.totalBookings} bookings
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ₹{court.revenue.toLocaleString()}
                            </p>
                            <div
                              className={`w-2 h-2 rounded-full ${court.isActive ? "bg-feijoa-500" : "bg-gray-400"} ml-auto mt-1`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    All Bookings
                  </h3>
                  <div className="flex space-x-3">
                    <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent">
                      <option>All Status</option>
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent">
                      <option>All Sports</option>
                      <option>Basketball</option>
                      <option>Tennis</option>
                      <option>Football</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Player
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sport
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={booking.playerAvatar}
                                  alt={booking.playerName}
                                  className="w-8 h-8 rounded-full mr-3"
                                />
                                <span className="text-sm font-medium text-gray-900">
                                  {booking.playerName}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.sport}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(booking.date)} at {booking.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.duration}h
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ₹{booking.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button className="text-atlantis-600 hover:text-atlantis-800">
                                  <Eye className="w-4 h-4" />
                                </button>
                                {booking.status === "pending" && (
                                  <button className="text-feijoa-600 hover:text-feijoa-800">
                                    <Check className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Courts Tab */}
            {activeTab === "courts" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    My Courts
                  </h3>
                  <Link
                    to="/add-court"
                    className="flex items-center space-x-2 px-4 py-2 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Court</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockCourts.map((court) => (
                    <div
                      key={court.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover-lift"
                    >
                      <div className="relative">
                        <img
                          src={court.image}
                          alt={court.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${court.isActive ? "bg-feijoa-500" : "bg-red-500"}`}
                          ></div>
                          <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                            {court.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {court.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {court.sport}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-energy-400 fill-current" />
                            <span className="text-sm font-medium">
                              {court.rating}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Total Bookings:
                            </span>
                            <span className="font-medium">
                              {court.totalBookings}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Revenue:</span>
                            <span className="font-medium">
                              ₹{court.revenue.toLocaleString()}
                            </span>
                          </div>
                          {court.nextBooking && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                Next Booking:
                              </span>
                              <span className="font-medium text-feijoa-600">
                                {court.nextBooking}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-atlantis-500 text-white rounded-lg text-sm font-medium hover:bg-apple-500 transition-all duration-300">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          <button className="flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Analytics & Reports
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue Chart Placeholder */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Revenue Trend
                    </h4>
                    <div className="w-full h-64 bg-gradient-to-br from-sahara-100 to-feijoa-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">
                          Revenue chart visualization
                        </p>
                        <p className="text-sm text-gray-400">
                          Shows daily/weekly/monthly revenue
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Statistics */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Booking Statistics
                    </h4>
                    <div className="w-full h-64 bg-gradient-to-br from-atlantis-100 to-feijoa-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">
                          Booking trends and patterns
                        </p>
                        <p className="text-sm text-gray-400">
                          Peak hours and popular sports
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Quick Statistics
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <p className="text-2xl font-bold text-atlantis-500">
                        84%
                      </p>
                      <p className="text-sm text-gray-600">Court Utilization</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <p className="text-2xl font-bold text-feijoa-500">4.7</p>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <p className="text-2xl font-bold text-energy-500">18h</p>
                      <p className="text-sm text-gray-600">Peak Hours</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <p className="text-2xl font-bold text-purple-500">92%</p>
                      <p className="text-sm text-gray-600">
                        Customer Retention
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pb-8"></div>
    </div>
  );
}
