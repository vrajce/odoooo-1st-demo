import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Building, Upload, Check, AlertCircle, FileText, MapPin, CreditCard, Shield } from "lucide-react";

interface OnboardingData {
  // Business Info
  businessName: string;
  businessType: string;
  gstNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  
  // Court Details
  courtName: string;
  courtType: string[];
  capacity: number;
  amenities: string[];
  pricePerHour: number;
  operatingHours: {
    start: string;
    end: string;
  };
  
  // Documents
  documents: {
    businessLicense: File | null;
    gstCertificate: File | null;
    addressProof: File | null;
    ownershipProof: File | null;
  };
  
  // Photos
  photos: File[];
}

const initialData: OnboardingData = {
  businessName: "",
  businessType: "",
  gstNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  contactPerson: "",
  phoneNumber: "",
  email: "",
  courtName: "",
  courtType: [],
  capacity: 0,
  amenities: [],
  pricePerHour: 0,
  operatingHours: { start: "06:00", end: "23:00" },
  documents: {
    businessLicense: null,
    gstCertificate: null,
    addressProof: null,
    ownershipProof: null
  },
  photos: []
};

const courtTypes = [
  "Basketball", "Football", "Tennis", "Badminton", "Volleyball", 
  "Table Tennis", "Squash", "Cricket", "Hockey"
];

const amenitiesList = [
  "Parking", "Lockers", "Showers", "Equipment Rental", "Cafeteria", 
  "First Aid", "WiFi", "Air Conditioning", "Seating Area", "Sound System"
];

export default function OwnerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gstError, setGstError] = useState("");

  const steps = [
    { id: 1, title: "Business Info", description: "Company and contact details", icon: Building },
    { id: 2, title: "Court Details", description: "Facility information", icon: MapPin },
    { id: 3, title: "Verification", description: "Documents and photos", icon: FileText },
    { id: 4, title: "Review", description: "Confirm and submit", icon: Check }
  ];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [parent]: { ...prev[parent as keyof OnboardingData], [field]: value }
    }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof OnboardingData].includes(value)
        ? (prev[field as keyof OnboardingData] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof OnboardingData] as string[]), value]
    }));
  };

  const validateGST = (gst: string) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(gst)) {
      setGstError("Invalid GST format");
      return false;
    }
    setGstError("");
    return true;
  };

  const handleFileUpload = (documentType: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [documentType]: file }
    }));
  };

  const handlePhotosUpload = (files: FileList) => {
    const newPhotos = Array.from(files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos].slice(0, 10) // Max 10 photos
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application submitted successfully! You'll receive a confirmation email within 24 hours.");
      // Redirect to owner dashboard or confirmation page
    }, 3000);
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.businessName && formData.gstNumber && formData.address && formData.contactPerson;
      case 2:
        return formData.courtName && formData.courtType.length > 0 && formData.capacity > 0;
      case 3:
        return Object.values(formData.documents).some(doc => doc !== null) && formData.photos.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sahara-100 via-sahara-50 to-feijoa-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-atlantis rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">QuickCourt</span>
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-atlantis-500 transition-colors">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-atlantis rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join as Court Owner</h1>
          <p className="text-gray-600">List your sports facility and start earning with QuickCourt</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step.id <= currentStep 
                    ? 'bg-energy-400 text-gray-900' 
                    : 'bg-white border-2 border-gray-300 text-gray-500'
                }`}>
                  {step.id < currentStep ? <Check className="w-6 h-6" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                    step.id < currentStep ? 'bg-energy-400' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Step 1: Business Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your sports facility name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => handleChange('businessType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select type</option>
                    <option value="individual">Individual</option>
                    <option value="partnership">Partnership</option>
                    <option value="company">Private Limited Company</option>
                    <option value="llp">LLP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GST Number *</label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => {
                    handleChange('gstNumber', e.target.value.toUpperCase());
                    if (e.target.value.length === 15) {
                      validateGST(e.target.value.toUpperCase());
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300 ${
                    gstError ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="22AAAAA0000A1Z5"
                  maxLength={15}
                />
                {gstError && (
                  <div className="flex items-center space-x-2 text-red-600 mt-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{gstError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  placeholder="Complete business address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  placeholder="business@example.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Court Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Court Name *</label>
                <input
                  type="text"
                  value={formData.courtName}
                  onChange={(e) => handleChange('courtName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Elite Sports Arena"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Sports Available *</label>
                <div className="grid grid-cols-3 gap-3">
                  {courtTypes.map((sport) => (
                    <label
                      key={sport}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.courtType.includes(sport)
                          ? 'border-atlantis-500 bg-atlantis-50'
                          : 'border-gray-200 bg-white hover:border-atlantis-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.courtType.includes(sport)}
                        onChange={() => handleArrayToggle('courtType', sport)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{sport}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (max players) *</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleChange('capacity', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="20"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Hour (₹)</label>
                  <input
                    type="number"
                    value={formData.pricePerHour}
                    onChange={(e) => handleChange('pricePerHour', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="500"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Opening Time</label>
                    <input
                      type="time"
                      value={formData.operatingHours.start}
                      onChange={(e) => handleNestedChange('operatingHours', 'start', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Closing Time</label>
                    <input
                      type="time"
                      value={formData.operatingHours.end}
                      onChange={(e) => handleNestedChange('operatingHours', 'end', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesList.map((amenity) => (
                    <label
                      key={amenity}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.amenities.includes(amenity)
                          ? 'border-feijoa-500 bg-feijoa-50'
                          : 'border-gray-200 bg-white hover:border-feijoa-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleArrayToggle('amenities', amenity)}
                        className="sr-only"
                      />
                      <div className="text-sm font-medium text-gray-900">{amenity}</div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'businessLicense', label: 'Business License', required: true },
                    { key: 'gstCertificate', label: 'GST Certificate', required: true },
                    { key: 'addressProof', label: 'Address Proof', required: false },
                    { key: 'ownershipProof', label: 'Ownership Proof', required: false }
                  ].map((doc) => (
                    <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-atlantis-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {doc.label} {doc.required && '*'}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">PDF, JPG, PNG (Max 5MB)</p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(doc.key, e.target.files[0])}
                        className="hidden"
                        id={doc.key}
                      />
                      <label
                        htmlFor={doc.key}
                        className="inline-flex items-center px-4 py-2 bg-atlantis-500 text-white rounded-lg text-sm font-medium hover:bg-apple-500 transition-colors cursor-pointer"
                      >
                        Choose File
                      </label>
                      {formData.documents[doc.key as keyof typeof formData.documents] && (
                        <div className="mt-2 flex items-center justify-center space-x-2 text-feijoa-600">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Uploaded</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Court Photos *</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-atlantis-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm font-medium text-gray-900 mb-2">Upload facility photos</p>
                  <p className="text-xs text-gray-500 mb-4">JPG, PNG (Max 2MB each, up to 10 photos)</p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => e.target.files && handlePhotosUpload(e.target.files)}
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
                      <Check className="w-4 h-4" />
                      <span className="text-sm">{formData.photos.length} photos uploaded</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-sahara-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Review</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Business Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Name:</strong> {formData.businessName}</p>
                      <p><strong>GST:</strong> {formData.gstNumber}</p>
                      <p><strong>Contact:</strong> {formData.contactPerson}</p>
                      <p><strong>Location:</strong> {formData.city}, {formData.state}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Court Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Name:</strong> {formData.courtName}</p>
                      <p><strong>Sports:</strong> {formData.courtType.join(', ')}</p>
                      <p><strong>Capacity:</strong> {formData.capacity} players</p>
                      <p><strong>Price:</strong> ₹{formData.pricePerHour}/hour</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-energy-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-energy-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-energy-800">Verification Process</h4>
                      <p className="text-sm text-energy-700 mt-1">
                        Your application will be reviewed within 24-48 hours. You'll receive an email confirmation once approved.
                        Our team may contact you if additional information is required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-3">Terms and Conditions</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-atlantis-600 border-gray-300 rounded focus:ring-atlantis-500" required />
                    <span>I agree to QuickCourt's Terms of Service and Privacy Policy</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-atlantis-600 border-gray-300 rounded focus:ring-atlantis-500" required />
                    <span>I confirm that all information provided is accurate and complete</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-atlantis-600 border-gray-300 rounded focus:ring-atlantis-500" required />
                    <span>I agree to the commission structure and payment terms</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                <span>Previous</span>
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!isStepComplete(currentStep)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-atlantis text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span>Continue</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-atlantis text-white rounded-xl font-semibold hover:bg-apple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
