import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Users, Building, Calendar, AlertTriangle, CheckCircle, XCircle, BarChart3, TrendingUp, Clock, MapPin, Eye, User, Mail, Phone, Flag, Ban, UserCheck } from "lucide-react";

interface MetricData {
  label: string;
  value: number;
  icon: any;
  color: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface PendingVerification {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  gstNumber: string;
  submittedDate: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  documents: {
    businessLicense: boolean;
    gstCertificate: boolean;
    addressProof: boolean;
  };
}

interface Complaint {
  id: string;
  playerName: string;
  subject: string;
  description: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  submittedDate: string;
  assignedTo?: string;
}

interface PendingCourt {
  id: string;
  courtName: string;
  ownerName: string;
  location: string;
  sports: string[];
  pricePerHour: number;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  lat: number;
  lng: number;
}

const mockMetrics: MetricData[] = [
  {
    label: "Total Players",
    value: 12547,
    icon: Users,
    color: "bg-atlantis-500",
    change: "+12%",
    changeType: 'positive'
  },
  {
    label: "Total Owners",
    value: 287,
    icon: Building,
    color: "bg-feijoa-500",
    change: "+8%",
    changeType: 'positive'
  },
  {
    label: "Active Matches",
    value: 156,
    icon: Calendar,
    color: "bg-energy-500",
    change: "+15%",
    changeType: 'positive'
  },
  {
    label: "Pending Verifications",
    value: 23,
    icon: AlertTriangle,
    color: "bg-red-500",
    change: "-5%",
    changeType: 'positive'
  }
];

const mockVerifications: PendingVerification[] = [
  {
    id: '1',
    businessName: 'Sports Hub Elite',
    ownerName: 'Raj Patel',
    email: 'raj@sportshub.com',
    phone: '+91 99999 88888',
    gstNumber: '22BBBBB1111B1Z5',
    submittedDate: '2024-01-15',
    status: 'pending',
    documents: {
      businessLicense: true,
      gstCertificate: true,
      addressProof: false
    }
  },
  {
    id: '2',
    businessName: 'Metro Sports Complex',
    ownerName: 'Priya Sharma',
    email: 'priya@metrosports.com',
    phone: '+91 98888 77777',
    gstNumber: '22CCCCC2222C2Z5',
    submittedDate: '2024-01-14',
    status: 'reviewing',
    documents: {
      businessLicense: true,
      gstCertificate: true,
      addressProof: true
    }
  }
];

const mockComplaints: Complaint[] = [
  {
    id: '1',
    playerName: 'John Doe',
    subject: 'Court was not clean',
    description: 'The basketball court at Elite Sports Arena was not properly cleaned before our match. There was debris on the floor.',
    category: 'facility',
    status: 'open',
    priority: 'medium',
    submittedDate: '2024-01-16'
  },
  {
    id: '2',
    playerName: 'Sarah Wilson',
    subject: 'Payment issue',
    description: 'I was charged twice for the same booking. Need immediate refund.',
    category: 'billing',
    status: 'in-progress',
    priority: 'high',
    submittedDate: '2024-01-15',
    assignedTo: 'Support Team'
  }
];

const mockPendingCourts: PendingCourt[] = [
  {
    id: '1',
    courtName: 'Premium Basketball Arena',
    ownerName: 'Sports Hub Elite',
    location: 'Andheri West, Mumbai',
    sports: ['Basketball', 'Volleyball'],
    pricePerHour: 800,
    submittedDate: '2024-01-15',
    status: 'pending',
    lat: 28.6139,
    lng: 77.2090
  },
  {
    id: '2',
    courtName: 'Community Tennis Court',
    ownerName: 'Metro Sports Complex',
    location: 'Bandra East, Mumbai',
    sports: ['Tennis'],
    pricePerHour: 600,
    submittedDate: '2024-01-14',
    status: 'pending',
    lat: 28.6169,
    lng: 77.2120
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState<string | null>(null);
  const [viewingDetails, setViewingDetails] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'verifications', label: 'Verifications' },
    { id: 'courts', label: 'Court Approval' },
    { id: 'complaints', label: 'Complaints' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const handleVerificationAction = async (id: string, action: 'approve' | 'reject') => {
    setProcessingAction(id);
    
    // Simulate API call
    setTimeout(() => {
      setProcessingAction(null);
      alert(`Verification ${action}d successfully!`);
    }, 1500);
  };

  const handleCourtAction = async (id: string, action: 'approve' | 'reject') => {
    setProcessingAction(id);
    
    // Simulate API call
    setTimeout(() => {
      setProcessingAction(null);
      alert(`Court ${action}d successfully!`);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-energy-100 text-energy-700';
      case 'reviewing': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-feijoa-100 text-feijoa-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'open': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-feijoa-100 text-feijoa-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-energy-100 text-energy-700';
      case 'low': return 'bg-feijoa-100 text-feijoa-700';
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
              <span className="text-sm font-medium text-gray-500">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Admin Panel</span>
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin!</h1>
            <p className="text-gray-600 mt-1">Manage the QuickCourt platform and monitor key metrics</p>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {metric.value.toLocaleString()}
                    </p>
                    <p className={`text-sm mt-1 ${
                      metric.changeType === 'positive' ? 'text-feijoa-600' : 'text-red-600'
                    }`}>
                      {metric.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${metric.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
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
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Platform Overview</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <CheckCircle className="w-5 h-5 text-feijoa-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">New court approved</p>
                          <p className="text-xs text-gray-600">Premium Basketball Arena - 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <User className="w-5 h-5 text-atlantis-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Owner verification completed</p>
                          <p className="text-xs text-gray-600">Metro Sports Complex - 4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <Flag className="w-5 h-5 text-energy-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">New complaint received</p>
                          <p className="text-xs text-gray-600">Court cleanliness issue - 6 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setActiveTab('verifications')}
                        className="p-4 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300 text-center"
                      >
                        <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm">Review Verifications</span>
                        <span className="block text-xs opacity-80">{mockVerifications.length} pending</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('courts')}
                        className="p-4 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-all duration-300 text-center"
                      >
                        <Building className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm">Approve Courts</span>
                        <span className="block text-xs opacity-80">{mockPendingCourts.length} pending</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('complaints')}
                        className="p-4 bg-energy-500 text-white rounded-xl font-medium hover:bg-energy-600 transition-all duration-300 text-center"
                      >
                        <Flag className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm">Handle Complaints</span>
                        <span className="block text-xs opacity-80">{mockComplaints.length} active</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('analytics')}
                        className="p-4 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-all duration-300 text-center"
                      >
                        <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm">View Analytics</span>
                        <span className="block text-xs opacity-80">Platform insights</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verifications Tab */}
            {activeTab === 'verifications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Owner Verifications</h3>
                  <span className="text-sm text-gray-600">{mockVerifications.length} pending reviews</span>
                </div>

                <div className="space-y-4">
                  {mockVerifications.map((verification) => (
                    <div key={verification.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{verification.businessName}</h4>
                          <p className="text-gray-600">{verification.ownerName}</p>
                          <p className="text-sm text-gray-500">Submitted: {new Date(verification.submittedDate).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(verification.status)}`}>
                          {verification.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Contact Information</p>
                          <div className="space-y-1">
                            <p className="flex items-center text-sm">
                              <Mail className="w-4 h-4 mr-2" />
                              {verification.email}
                            </p>
                            <p className="flex items-center text-sm">
                              <Phone className="w-4 h-4 mr-2" />
                              {verification.phone}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">GST Number</p>
                          <p className="font-mono text-sm">{verification.gstNumber}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Documents Submitted</p>
                        <div className="flex space-x-4">
                          {Object.entries(verification.documents).map(([doc, submitted]) => (
                            <span 
                              key={doc}
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                submitted ? 'bg-feijoa-100 text-feijoa-700' : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {doc.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => handleVerificationAction(verification.id, 'approve')}
                          disabled={processingAction === verification.id}
                          className="flex items-center space-x-2 px-4 py-2 bg-feijoa-500 text-white rounded-xl hover:bg-feijoa-600 transition-all duration-300 disabled:opacity-75"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleVerificationAction(verification.id, 'reject')}
                          disabled={processingAction === verification.id}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 disabled:opacity-75"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Court Approval Tab */}
            {activeTab === 'courts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Court Location Approval</h3>
                  <span className="text-sm text-gray-600">{mockPendingCourts.length} pending approvals</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Courts List */}
                  <div className="space-y-4">
                    {mockPendingCourts.map((court) => (
                      <div key={court.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{court.courtName}</h4>
                            <p className="text-gray-600">{court.ownerName}</p>
                          </div>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(court.status)}`}>
                            {court.status}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          <p className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {court.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            Sports: {court.sports.join(', ')}
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: ₹{court.pricePerHour}/hour
                          </p>
                        </div>

                        <div className="flex space-x-3">
                          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors text-sm">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleCourtAction(court.id, 'approve')}
                            disabled={processingAction === court.id}
                            className="flex items-center space-x-2 px-3 py-2 bg-feijoa-500 text-white rounded-xl hover:bg-feijoa-600 transition-all duration-300 disabled:opacity-75 text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleCourtAction(court.id, 'reject')}
                            disabled={processingAction === court.id}
                            className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 disabled:opacity-75 text-sm"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Map */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Court Locations</h4>
                    <div className="w-full h-96 bg-gradient-to-br from-sahara-100 to-feijoa-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Interactive map with court pins</p>
                        <p className="text-sm text-gray-400">Click pins to approve/reject courts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Complaints Tab */}
            {activeTab === 'complaints' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Complaints Management</h3>
                  <span className="text-sm text-gray-600">{mockComplaints.length} active complaints</span>
                </div>

                <div className="space-y-4">
                  {mockComplaints.map((complaint) => (
                    <div key={complaint.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{complaint.subject}</h4>
                          <p className="text-gray-600">From: {complaint.playerName}</p>
                          <p className="text-sm text-gray-500">Submitted: {new Date(complaint.submittedDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority} priority
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Category: {complaint.category}</p>
                        {selectedComplaint === complaint.id ? (
                          <div className="space-y-3">
                            <p className="text-gray-700">{complaint.description}</p>
                            {complaint.assignedTo && (
                              <p className="text-sm text-gray-600">Assigned to: {complaint.assignedTo}</p>
                            )}
                            <button
                              onClick={() => setSelectedComplaint(null)}
                              className="text-sm text-atlantis-500 hover:text-apple-500 transition-colors"
                            >
                              Hide Details
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedComplaint(complaint.id)}
                            className="text-sm text-atlantis-500 hover:text-apple-500 transition-colors"
                          >
                            Show Details
                          </button>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-atlantis-500 text-white rounded-xl hover:bg-apple-500 transition-all duration-300">
                          <UserCheck className="w-4 h-4" />
                          <span>Assign</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-feijoa-500 text-white rounded-xl hover:bg-feijoa-600 transition-all duration-300">
                          <CheckCircle className="w-4 h-4" />
                          <span>Resolve</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300">
                          <Ban className="w-4 h-4" />
                          <span>Ban User</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Platform Analytics</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Charts Placeholders */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Bookings Over Time</h4>
                    <div className="w-full h-64 bg-gradient-to-br from-atlantis-100 to-feijoa-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Line chart - Bookings trend</p>
                        <p className="text-sm text-gray-400">Animated line chart with ease-out</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Sport Popularity</h4>
                    <div className="w-full h-64 bg-gradient-to-br from-energy-100 to-sahara-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Donut chart - Sports distribution</p>
                        <p className="text-sm text-gray-400">Animated donut with percentages</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Peak Hours</h4>
                    <div className="w-full h-64 bg-gradient-to-br from-feijoa-100 to-energy-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Bar chart - Peak usage hours</p>
                        <p className="text-sm text-gray-400">Animated bars showing hourly usage</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Quick Stats</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-gray-600">Average Booking Duration</span>
                        <span className="font-semibold">1.8 hours</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-gray-600">Most Popular Sport</span>
                        <span className="font-semibold">Basketball</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-gray-600">Peak Hour</span>
                        <span className="font-semibold">6-7 PM</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-gray-600">Average Revenue/Booking</span>
                        <span className="font-semibold">₹750</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
