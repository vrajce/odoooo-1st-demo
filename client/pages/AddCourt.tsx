import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  ArrowLeft,
  Plus,
  Upload,
  MapPin,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";

const courtTypes = [
  "Basketball",
  "Football",
  "Tennis",
  "Badminton",
  "Volleyball",
  "Table Tennis",
  "Squash",
  "Cricket",
  "Hockey",
];

const amenitiesList = [
  "Parking",
  "Lockers",
  "Showers",
  "Equipment Rental",
  "Cafeteria",
  "First Aid",
  "WiFi",
  "Air Conditioning",
  "Seating Area",
  "Sound System",
];

export default function AddCourt() {
  const [formData, setFormData] = useState({
    courtName: "",
    courtType: [] as string[],
    capacity: "",
    pricePerHour: "",
    description: "",
    amenities: [] as string[],
    operatingHours: {
      start: "06:00",
      end: "23:00",
    },
    photos: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof formData], [field]: value },
    }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof formData].includes(value)
        ? (prev[field as keyof typeof formData] as string[]).filter(
            (item) => item !== value,
          )
        : [...(prev[field as keyof typeof formData] as string[]), value],
    }));
  };

  const handlePhotosUpload = (files: FileList) => {
    const newPhotos = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos].slice(0, 10), // Max 10 photos
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Court added successfully! It will be reviewed and activated within 24 hours.",
      );
      // Redirect to owner dashboard
      window.location.href = "/owner-dashboard";
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
              <span className="text-sm font-medium text-gray-500">
                Owner Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/owner-dashboard"
                className="text-gray-700 hover:text-atlantis-500 transition-colors"
              >
                Dashboard
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
            <Link
              to="/owner-dashboard"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="w-12 h-12 bg-gradient-feijoa rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add New Court
              </h1>
              <p className="text-gray-600">
                Add a new sports facility to your listing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Court Name *
                </label>
                <input
                  type="text"
                  value={formData.courtName}
                  onChange={(e) => handleChange("courtName", e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Basketball Court A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sports Available *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {courtTypes.map((sport) => (
                    <label
                      key={sport}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.courtType.includes(sport)
                          ? "border-atlantis-500 bg-atlantis-50"
                          : "border-gray-200 bg-white hover:border-atlantis-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.courtType.includes(sport)}
                        onChange={() => handleArrayToggle("courtType", sport)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{sport}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Capacity (max players) *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="20"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Price per Hour (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.pricePerHour}
                    onChange={(e) =>
                      handleChange("pricePerHour", e.target.value)
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="Same as business address"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  placeholder="Describe your court facilities, features, and any special instructions..."
                />
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              <Clock className="w-5 h-5 inline mr-2" />
              Operating Hours
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Time
                </label>
                <input
                  type="time"
                  value={formData.operatingHours.start}
                  onChange={(e) =>
                    handleNestedChange(
                      "operatingHours",
                      "start",
                      e.target.value,
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Closing Time
                </label>
                <input
                  type="time"
                  value={formData.operatingHours.end}
                  onChange={(e) =>
                    handleNestedChange("operatingHours", "end", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.amenities.includes(amenity)
                      ? "border-feijoa-500 bg-feijoa-50"
                      : "border-gray-200 bg-white hover:border-feijoa-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleArrayToggle("amenities", amenity)}
                    className="sr-only"
                  />
                  <div className="text-sm font-medium text-gray-900">
                    {amenity}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Court Photos *
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-atlantis-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-gray-900 mb-2">
                Upload court photos
              </p>
              <p className="text-xs text-gray-500 mb-4">
                JPG, PNG (Max 2MB each, up to 10 photos)
              </p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={(e) =>
                  e.target.files && handlePhotosUpload(e.target.files)
                }
                className="hidden"
                id="photos"
              />
              <label
                htmlFor="photos"
                className="inline-flex items-center px-6 py-3 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Photos
              </label>
              {formData.photos.length > 0 && (
                <div className="mt-4 flex items-center justify-center space-x-2 text-feijoa-600">
                  <span className="text-sm">
                    {formData.photos.length} photos uploaded
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex space-x-4">
            <Link
              to="/owner-dashboard"
              className="flex-1 py-4 text-center border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-gradient-atlantis text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-atlantis-glow disabled:opacity-75 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding Court...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Court</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
