import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  User,
  Building,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "player",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const roles = [
    {
      id: "player",
      label: "Player",
      icon: User,
      description: "Book courts and join matches",
    },
    {
      id: "owner",
      label: "Court Owner",
      icon: Building,
      description: "Manage your sports facilities",
    },
    {
      id: "admin",
      label: "Administrator",
      icon: Shield,
      description: "Platform administration",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (formData.email === "wrong@email.com") {
        setError("Invalid email or password");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      } else {
        // Successful login - redirect based on role
        const redirectMap = {
          player: "/",
          owner: "/owner-dashboard",
          admin: "/admin-dashboard",
        };
        window.location.href =
          redirectMap[formData.role as keyof typeof redirectMap];
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sahara-100 via-sahara-50 to-feijoa-50 flex items-center justify-center px-4">
      {/* Background sports image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&crop=center')",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-atlantis rounded-xl flex items-center justify-center shadow-atlantis-glow">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">QuickCourt</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue your sports journey
          </p>
        </div>

        {/* Login Form */}
        <div
          className={`bg-white rounded-2xl shadow-2xl shadow-atlantis-glow/20 p-8 border border-white/50 backdrop-blur-sm ${shake ? "animate-bounce" : ""}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <div className="grid grid-cols-1 gap-2">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <label
                      key={role.id}
                      className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:border-atlantis-300 ${
                        formData.role === role.id
                          ? "border-atlantis-500 bg-atlantis-50 shadow-sm"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={formData.role === role.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                          formData.role === role.id
                            ? "bg-atlantis-500"
                            : "bg-gray-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 ${
                            formData.role === role.id
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {role.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          {role.description}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300 bg-white/80"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300 bg-white/80"
                  placeholder="Enter your password"
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

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-atlantis text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-atlantis-glow ${
                isLoading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:bg-apple-500"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-atlantis-600 hover:text-apple-600 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-atlantis-600 hover:text-apple-600 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center text-sm text-gray-600">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p>Use any email (try wrong@email.com for error demo)</p>
          <p>Password: any password</p>
        </div>
      </div>
    </div>
  );
}
