import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  User,
  Building,
  Shield,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  avatar: File | null;
  otp: string;
}

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "player",
    avatar: null,
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const steps = [
    { id: 1, title: "Basic Info", description: "Tell us about yourself" },
    { id: 2, title: "Role Selection", description: "Choose your role" },
    { id: 3, title: "Verification", description: "Verify your account" },
  ];

  const roles = [
    {
      id: "player",
      label: "Player",
      icon: User,
      description: "Book courts and join matches",
      features: [
        "Book courts",
        "Join matches",
        "Create matches",
        "Player community",
      ],
    },
    {
      id: "owner",
      label: "Court Owner",
      icon: Building,
      description: "Manage your sports facilities",
      features: [
        "List your courts",
        "Manage bookings",
        "Analytics dashboard",
        "Revenue tracking",
      ],
    },
    {
      id: "admin",
      label: "Administrator",
      icon: Shield,
      description: "Platform administration",
      features: [
        "User management",
        "Court approval",
        "System analytics",
        "Support tools",
      ],
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - show OTP modal
      setShowOtpModal(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpModal(false);
      // Redirect to appropriate dashboard
      const redirectMap = {
        player: "/",
        owner: "/owner-onboarding",
        admin: "/admin-dashboard",
      };
      window.location.href =
        redirectMap[formData.role as keyof typeof redirectMap];
    }, 2000);
  };

  const sendOtp = () => {
    // Simulate sending OTP
    alert(`OTP sent to ${formData.email}. Use 123456 for demo.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sahara-100 via-sahara-50 to-feijoa-50 flex items-center justify-center px-4 py-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544944194-b447c5c04315?w=1200&h=800&fit=crop&crop=center')",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-atlantis rounded-xl flex items-center justify-center shadow-atlantis-glow">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">QuickCourt</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join QuickCourt
          </h1>
          <p className="text-gray-600">
            Create your account and start your sports journey
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step.id <= currentStep
                      ? "bg-energy-400 text-gray-900"
                      : "bg-white border-2 border-gray-300 text-gray-500"
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                      step.id < currentStep ? "bg-energy-400" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-atlantis-glow/20 p-8 border border-white/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-slide-up">
                {/* Avatar Upload */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-gradient-atlantis flex items-center justify-center overflow-hidden">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-feijoa-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-feijoa-600 transition-colors">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Upload your profile photo
                  </p>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Role Selection */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Choose Your Role
                  </h3>
                  <p className="text-gray-600">
                    Select how you'll be using QuickCourt
                  </p>
                </div>

                <div className="space-y-4">
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <label
                        key={role.id}
                        className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:border-atlantis-300 hover:shadow-md ${
                          formData.role === role.id
                            ? "border-atlantis-500 bg-atlantis-50 shadow-md"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role.id}
                          checked={formData.role === role.id}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="sr-only"
                        />
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              formData.role === role.id
                                ? "bg-atlantis-500"
                                : "bg-gray-100"
                            }`}
                          >
                            <IconComponent
                              className={`w-6 h-6 ${
                                formData.role === role.id
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">
                              {role.label}
                            </div>
                            <div className="text-gray-600 mb-3">
                              {role.description}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {role.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <Check className="w-4 h-4 text-feijoa-500" />
                                  <span className="text-sm text-gray-600">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-slide-up text-center">
                <div className="w-20 h-20 bg-gradient-feijoa rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Almost Done!
                </h3>
                <p className="text-gray-600">
                  We'll send a verification code to{" "}
                  <strong>{formData.email}</strong> to confirm your account.
                </p>

                <div className="bg-sahara-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Account Summary:
                  </h4>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-medium capitalize">
                        {formData.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  <span>Sign In Instead</span>
                </Link>
              )}

              <button
                type="button"
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-atlantis text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300 transform hover:scale-105"
              >
                <span>{currentStep === 3 ? "Create Account" : "Continue"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-feijoa-200 shadow-feijoa-glow/30">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-feijoa rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verify Your Email
              </h3>
              <p className="text-gray-600">
                Enter the 6-digit code sent to {formData.email}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-feijoa-500 focus:border-transparent transition-all duration-300"
                  placeholder="123456"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-feijoa text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-feijoa-glow disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify & Create Account"
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-sm text-feijoa-600 hover:text-feijoa-700 transition-colors"
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
