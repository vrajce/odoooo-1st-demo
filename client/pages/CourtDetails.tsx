import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Trophy,
  Star,
  MapPin,
  Clock,
  Users,
  Car,
  Wifi,
  Coffee,
  Dumbbell,
  Shield,
  Phone,
  Share,
  Heart,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CourtDetail {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  sports: string[];
  capacity: number;
  images: string[];
  amenities: Array<{
    icon: any;
    name: string;
    available: boolean;
  }>;
  operatingHours: {
    start: string;
    end: string;
  };
  ownerInfo: {
    name: string;
    avatar: string;
    joinedDate: string;
    totalCourts: number;
    responseRate: number;
  };
  rules: string[];
  reviews: Array<{
    id: string;
    playerName: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const mockCourt: CourtDetail = {
  id: "1",
  name: "Elite Sports Arena - Basketball Court A",
  description:
    "Premium indoor basketball court with professional-grade flooring and equipment. Perfect for competitive matches and training sessions. Features excellent lighting and ventilation for optimal playing conditions.",
  location: "Downtown District",
  address: "123 Sports Complex, Downtown District, Mumbai - 400001",
  rating: 4.8,
  reviewCount: 47,
  pricePerHour: 500,
  sports: ["Basketball", "Volleyball"],
  capacity: 10,
  images: [
    "https://images.unsplash.com/photo-1544944194-b447c5c04315?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop&crop=center",
  ],
  amenities: [
    { icon: Car, name: "Parking", available: true },
    { icon: Wifi, name: "WiFi", available: true },
    { icon: Coffee, name: "Cafeteria", available: true },
    { icon: Dumbbell, name: "Lockers", available: true },
    { icon: Shield, name: "Security", available: true },
    { icon: Phone, name: "First Aid", available: false },
  ],
  operatingHours: {
    start: "06:00",
    end: "23:00",
  },
  ownerInfo: {
    name: "Elite Sports Management",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    joinedDate: "2022",
    totalCourts: 5,
    responseRate: 95,
  },
  rules: [
    "No outside food or drinks allowed",
    "Proper sports attire required",
    "Maximum 2 hours per booking",
    "Clean up after use",
    "No smoking on premises",
    "Report any damage immediately",
  ],
  reviews: [
    {
      id: "1",
      playerName: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      comment:
        "Excellent court with great facilities. The floor is perfect and equipment is top-notch. Highly recommended!",
      date: "2024-01-10",
    },
    {
      id: "2",
      playerName: "Sarah Wilson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612c47d?w=40&h=40&fit=crop&crop=face",
      rating: 4,
      comment:
        "Good court overall. Parking can be a bit crowded during peak hours but the facilities are clean and well-maintained.",
      date: "2024-01-08",
    },
    {
      id: "3",
      playerName: "Mike Johnson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      comment:
        "Best basketball court in the area! Great atmosphere and the staff is very helpful.",
      date: "2024-01-05",
    },
  ],
};

export default function CourtDetails() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const court = mockCourt; // In real app, fetch based on id

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % court.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + court.images.length) % court.images.length,
    );
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-energy-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
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
                <Link to="/courts" className="text-atlantis-500 font-medium">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              to="/courts"
              className="hover:text-atlantis-500 transition-colors"
            >
              Courts
            </Link>
            <span>›</span>
            <Link
              to={`/court/${court.id}`}
              className="text-gray-900 font-medium"
            >
              {court.name}
            </Link>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img
                  src={court.images[currentImageIndex]}
                  alt={`${court.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {court.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {court.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-white/80 hover:bg-white text-gray-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                  <button className="w-10 h-10 bg-white/80 hover:bg-white text-gray-700 rounded-full flex items-center justify-center transition-all">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {court.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-atlantis-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Court Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {court.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      {renderStars(court.rating)}
                      <span className="font-medium ml-1">{court.rating}</span>
                      <span>({court.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{court.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-atlantis-500">
                    ₹{court.pricePerHour}
                  </div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{court.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Users className="w-6 h-6 text-atlantis-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">
                    Capacity
                  </div>
                  <div className="text-xs text-gray-600">
                    {court.capacity} players
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-6 h-6 text-feijoa-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">Hours</div>
                  <div className="text-xs text-gray-600">
                    {formatTime(court.operatingHours.start)} -{" "}
                    {formatTime(court.operatingHours.end)}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Trophy className="w-6 h-6 text-energy-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">
                    Sports
                  </div>
                  <div className="text-xs text-gray-600">
                    {court.sports.join(", ")}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Star className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">
                    Rating
                  </div>
                  <div className="text-xs text-gray-600">
                    {court.rating}/5.0
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">{court.address}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {court.amenities
                  .slice(0, showAllAmenities ? undefined : 6)
                  .map((amenity) => {
                    const IconComponent = amenity.icon;
                    return (
                      <div
                        key={amenity.name}
                        className={`flex items-center space-x-3 p-3 rounded-xl ${
                          amenity.available
                            ? "bg-feijoa-50 text-feijoa-700"
                            : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {amenity.name}
                        </span>
                      </div>
                    );
                  })}
              </div>
              {court.amenities.length > 6 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-4 text-atlantis-500 hover:text-apple-500 text-sm font-medium transition-colors"
                >
                  {showAllAmenities
                    ? "Show Less"
                    : `Show All ${court.amenities.length} Amenities`}
                </button>
              )}
            </div>

            {/* Rules */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Court Rules
              </h3>
              <ul className="space-y-2">
                {court.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-atlantis-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reviews ({court.reviewCount})
                </h3>
                <div className="flex items-center space-x-2">
                  {renderStars(court.rating)}
                  <span className="font-medium">{court.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                {court.reviews
                  .slice(0, showAllReviews ? undefined : 3)
                  .map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-4 last:border-0"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.avatar}
                          alt={review.playerName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">
                              {review.playerName}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-700 text-sm">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {court.reviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-4 text-atlantis-500 hover:text-apple-500 text-sm font-medium transition-colors"
                >
                  {showAllReviews
                    ? "Show Less"
                    : `Show All ${court.reviews.length} Reviews`}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-atlantis-500 mb-1">
                    ₹{court.pricePerHour}
                  </div>
                  <div className="text-gray-600">per hour</div>
                </div>

                <Link
                  to={`/book-court?court=${court.id}`}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-atlantis text-white font-semibold rounded-xl hover:shadow-atlantis-glow transition-all duration-300 transform hover:scale-105 mb-4"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book This Court</span>
                </Link>

                <div className="text-center text-sm text-gray-500">
                  Free cancellation up to 2 hours before booking
                </div>
              </div>

              {/* Owner Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Hosted by
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={court.ownerInfo.avatar}
                    alt={court.ownerInfo.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {court.ownerInfo.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Joined in {court.ownerInfo.joinedDate}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Courts:</span>
                    <span className="font-medium">
                      {court.ownerInfo.totalCourts}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate:</span>
                    <span className="font-medium">
                      {court.ownerInfo.responseRate}%
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Contact Host
                </button>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Location
                </h3>
                <div className="w-full h-48 bg-gradient-to-br from-sahara-100 to-feijoa-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive map</p>
                    <p className="text-sm text-gray-400">{court.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
