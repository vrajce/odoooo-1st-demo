import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CreditCard,
  CheckCircle,
  X,
} from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
  duration: number;
}

interface Court {
  id: number;
  name: string;
  location: string;
  rating: number;
  sports: string[];
  amenities: string[];
  image: string;
  pricePerHour: number;
  description: string;
}

const courts: Court[] = [
  {
    id: 1,
    name: "Sports Complex Arena",
    location: "Downtown District",
    rating: 4.8,
    sports: ["Basketball", "Tennis", "Badminton"],
    amenities: ["Parking", "Lockers", "Showers", "Equipment Rental"],
    image:
      "https://images.unsplash.com/photo-1544944194-b447c5c04315?w=400&h=300&fit=crop&crop=center",
    pricePerHour: 500,
    description:
      "Premium indoor sports facility with professional-grade courts and modern amenities.",
  },
  {
    id: 2,
    name: "Elite Sports Center",
    location: "Business Park",
    rating: 4.9,
    sports: ["Football", "Cricket", "Volleyball"],
    amenities: ["Parking", "Cafeteria", "Lockers", "First Aid"],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    pricePerHour: 750,
    description:
      "State-of-the-art outdoor facility perfect for team sports and tournaments.",
  },
  {
    id: 3,
    name: "Community Sports Hub",
    location: "Residential Area",
    rating: 4.6,
    sports: ["Table Tennis", "Squash", "Gym"],
    amenities: ["Parking", "Lockers", "Equipment"],
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop&crop=center",
    pricePerHour: 350,
    description:
      "Affordable community center with well-maintained facilities for all skill levels.",
  },
];

const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 6; // 6 AM
  const endHour = 23; // 11 PM

  for (let hour = startHour; hour <= endHour; hour++) {
    const timeString = `${hour.toString().padStart(2, "0")}:00`;
    const isAvailable = Math.random() > 0.3; // Random availability for demo

    slots.push({
      id: `${date.toDateString()}-${timeString}`,
      time: timeString,
      available: isAvailable,
      price: Math.floor(Math.random() * 200) + 400, // Random price between 400-600
      duration: 1,
    });
  }

  return slots;
};

export default function CourtBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState(courts[0]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // Generate time slots for selected date
    setTimeSlots(generateTimeSlots(selectedDate));
  }, [selectedDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setShowBookingModal(true);
    }
  };

  const handleBooking = async () => {
    setIsBooking(true);

    // Simulate booking API call
    setTimeout(() => {
      setIsBooking(false);
      setShowBookingModal(false);
      alert("Booking confirmed! Check your email for details.");
      // Update slot availability
      setTimeSlots((prev) =>
        prev.map((slot) =>
          slot.id === selectedSlot?.id ? { ...slot, available: false } : slot,
        ),
      );
      setSelectedSlot(null);
    }, 2000);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-atlantis rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book a Court</h1>
              <p className="text-gray-600">
                Reserve your preferred sports facility with flexible scheduling
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Court Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Select Court
              </h2>

              <div className="space-y-4">
                {courts.map((court) => (
                  <div
                    key={court.id}
                    onClick={() => setSelectedCourt(court)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedCourt.id === court.id
                        ? "border-atlantis-500 bg-atlantis-50 shadow-atlantis-glow/20"
                        : "border-gray-200 bg-white hover:border-atlantis-300"
                    }`}
                  >
                    <div className="flex space-x-3">
                      <img
                        src={court.image}
                        alt={court.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {court.name}
                          </h3>
                          <span className="text-sm font-medium text-energy-600">
                            ₹{court.pricePerHour}/hr
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="text-xs">{court.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-3 h-3 text-energy-400 fill-current" />
                          <span className="text-xs text-gray-600">
                            {court.rating}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {court.sports.slice(0, 2).map((sport) => (
                              <span
                                key={sport}
                                className="px-2 py-0.5 bg-feijoa-100 text-feijoa-700 text-xs rounded-full"
                              >
                                {sport}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Court Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedCourt.name}
              </h3>
              <img
                src={selectedCourt.image}
                alt={selectedCourt.name}
                className="w-full h-32 rounded-xl object-cover mb-4"
              />
              <p className="text-gray-600 text-sm mb-4">
                {selectedCourt.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourt.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-sahara-100 text-sahara-700 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar & Time Slots */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Date
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-medium">
                    {monthNames[currentMonth.getMonth()]}{" "}
                    {currentMonth.getFullYear()}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-sm font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day && (
                      <button
                        onClick={() => setSelectedDate(day)}
                        disabled={isPastDate(day)}
                        className={`w-full h-full rounded-lg text-sm font-medium transition-all duration-200 ${
                          isPastDate(day)
                            ? "text-gray-300 cursor-not-allowed"
                            : isSameDay(day, selectedDate)
                              ? "bg-atlantis-500 text-white shadow-atlantis-glow/30"
                              : isToday(day)
                                ? "bg-energy-100 text-energy-700 border border-energy-300"
                                : "text-gray-700 hover:bg-sahara-100"
                        }`}
                      >
                        {day.getDate()}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                Selected: {formatDate(selectedDate)}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Available Time Slots
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={!slot.available}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      slot.available
                        ? "bg-feijoa-100 text-feijoa-700 border border-feijoa-300 hover:bg-feijoa-200 hover:shadow-feijoa-glow/30"
                        : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                    }`}
                  >
                    <div>{slot.time}</div>
                    <div className="text-xs">₹{slot.price}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-feijoa-100 border border-feijoa-300 rounded"></div>
                  <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
                  <span className="text-gray-600">Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedSlot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-atlantis-200 shadow-atlantis-glow/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Confirm Booking
              </h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-sahara-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {selectedCourt.name}
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>Date:</strong> {formatDate(selectedDate)}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedSlot.time} (
                    {selectedSlot.duration}h)
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedCourt.location}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="text-gray-600">Court rental</span>
                <span className="font-semibold">₹{selectedSlot.price}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="text-gray-600">Service fee</span>
                <span className="font-semibold">
                  ₹{Math.floor(selectedSlot.price * 0.1)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 font-semibold text-lg">
                <span>Total</span>
                <span>
                  ₹{selectedSlot.price + Math.floor(selectedSlot.price * 0.1)}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={isBooking}
                className="flex-1 py-3 bg-gradient-atlantis text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-atlantis-glow disabled:opacity-75 flex items-center justify-center space-x-2"
              >
                {isBooking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Book Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-feijoa text-white rounded-full shadow-lg hover:shadow-feijoa-glow transition-all duration-300 animate-breathe flex items-center justify-center z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Bot Modal */}
      {showChatBot && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 bg-gradient-feijoa text-white rounded-t-2xl">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Court Booking Assistant</h4>
              <button
                onClick={() => setShowChatBot(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3 text-sm">
                Hi! I'm here to help you with court bookings. You can ask me
                about:
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Court availability</li>
                  <li>• Pricing information</li>
                  <li>• Amenities and facilities</li>
                  <li>• Booking policies</li>
                </ul>
              </div>
              <div className="bg-feijoa-100 rounded-lg p-3 text-sm ml-8">
                What are the available time slots for tomorrow?
              </div>
              <div className="bg-gray-100 rounded-lg p-3 text-sm">
                Tomorrow has several available slots! Most courts have
                availability from 6 AM to 11 PM. Would you like me to check
                specific courts or times?
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-feijoa-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-feijoa-500 text-white rounded-lg text-sm hover:bg-feijoa-600 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
