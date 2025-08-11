import { Link } from "react-router-dom";
import { Trophy, ArrowLeft, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestedAction?: string;
}

export default function PlaceholderPage({
  title,
  description,
  suggestedAction = "Continue building this page with more prompts!",
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sahara-100 via-sahara-50 to-feijoa-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
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
                <Link
                  to="/courts"
                  className="text-gray-700 hover:text-atlantis-500 transition-colors"
                >
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
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-atlantis-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-atlantis text-white rounded-xl font-medium hover:shadow-atlantis-glow transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-atlantis rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
              <Construction className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{description}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Coming Soon!
            </h2>
            <p className="text-gray-600 mb-6">{suggestedAction}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <a
                href="#"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-all duration-300 transform hover:scale-105"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Continue chatting to build this page!");
                }}
              >
                <Construction className="w-4 h-4" />
                <span>Request This Page</span>
              </a>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            This is a placeholder page. The QuickCourt platform is being built
            progressively.
          </div>
        </div>
      </div>
    </div>
  );
}
