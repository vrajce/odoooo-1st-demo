import { Link } from "react-router-dom";
import { Trophy, Target, Users, Star, Award, Heart, Zap, Shield } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Rodriguez",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Former professional athlete with 15+ years in sports management"
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612c47d?w=300&h=300&fit=crop&crop=face",
    bio: "Tech innovator passionate about connecting communities through sports"
  },
  {
    name: "Michael Thompson",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Sports facility expert with deep understanding of court management"
  },
  {
    name: "Emily Watson",
    role: "Head of Community",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bio: "Community builder focused on creating inclusive sports experiences"
  }
];

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "Building strong connections between sports enthusiasts and creating lasting friendships through shared passion."
  },
  {
    icon: Star,
    title: "Excellence",
    description: "Maintaining the highest standards in court quality, service delivery, and user experience."
  },
  {
    icon: Heart,
    title: "Inclusivity", 
    description: "Creating welcoming spaces for players of all skill levels, backgrounds, and abilities."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Continuously improving our platform with cutting-edge technology and user-centered design."
  }
];

const stats = [
  { label: "Active Players", value: "50K+" },
  { label: "Partner Courts", value: "1,200+" },
  { label: "Matches Organized", value: "100K+" },
  { label: "Cities Covered", value: "25+" }
];

export default function About() {
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
                <Link to="/about" className="text-atlantis-500 font-medium">About</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-atlantis-500 transition-colors">Login</Link>
              <Link to="/signup" className="px-6 py-2 bg-gradient-atlantis text-white rounded-xl font-medium hover:shadow-atlantis-glow transition-all duration-300">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&crop=center')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-feijoa-500/30 to-atlantis-500/30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Sports
              <span className="block text-transparent bg-clip-text bg-gradient-atlantis">
                Communities Worldwide
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              We're building the world's largest platform for sports enthusiasts to discover courts, 
              organize matches, and build lasting connections through the power of play.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="px-8 py-4 bg-gradient-atlantis text-white rounded-xl font-semibold text-lg hover:shadow-atlantis-glow transition-all duration-300 transform hover:scale-105"
              >
                Join Our Community
              </Link>
              <Link 
                to="/contact"
                className="px-8 py-4 bg-white text-atlantis-600 border-2 border-atlantis-500 rounded-xl font-semibold text-lg hover:bg-atlantis-50 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-atlantis-500 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                QuickCourt was born from a simple belief: sports should bring people together, not divide them. 
                We noticed that finding quality courts and like-minded players was often a challenge, especially 
                in growing urban areas.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our platform removes these barriers by creating a seamless experience for players to discover 
                courts, connect with fellow athletes, and organize matches that fit their schedule and skill level.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-feijoa rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Goal</h3>
                  <p className="text-gray-600">Make sports accessible to everyone, everywhere</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=400&fit=crop&crop=center"
                alt="Sports community"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-atlantis rounded-2xl flex items-center justify-center shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the way we build our platform and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-feijoa-50 hover:to-atlantis-50 transition-all duration-300 hover-lift"
                >
                  <div className="w-16 h-16 bg-gradient-atlantis rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're a diverse group of sports enthusiasts, tech innovators, and community builders 
              working together to transform how people connect through sports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="text-center bg-white rounded-2xl p-6 shadow-lg hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-atlantis-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-feijoa-50 to-atlantis-50 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-atlantis-500 rounded-full mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2022 - The Beginning</h3>
                  <p className="text-gray-700">
                    QuickCourt started as a weekend project when our founder Alex couldn't find a decent 
                    basketball court for a pickup game. Frustrated by the lack of organized sports options 
                    in urban areas, he decided to build a solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-energy-50 to-sahara-50 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-energy-500 rounded-full mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2023 - Growing the Team</h3>
                  <p className="text-gray-700">
                    As the platform gained traction, we brought together a passionate team of developers, 
                    designers, and sports enthusiasts. We expanded from basketball to multiple sports and 
                    launched in 5 major cities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-atlantis-50 to-feijoa-50 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-feijoa-500 rounded-full mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2024 - National Expansion</h3>
                  <p className="text-gray-700">
                    Today, QuickCourt connects thousands of players across 25+ cities. We've facilitated 
                    over 100,000 matches and continue to grow our community of sports enthusiasts who 
                    believe in the power of play.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-atlantis-500 to-apple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-atlantis-100 mb-8">
            Whether you're a player looking for your next match or a court owner wanting to 
            reach more athletes, QuickCourt is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="px-8 py-4 bg-white text-atlantis-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Join as Player
            </Link>
            <Link 
              to="/owner-signup"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold text-lg hover:bg-white hover:text-atlantis-600 transition-all duration-300"
            >
              List Your Court
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-atlantis rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">QuickCourt</span>
              </div>
              <p className="text-gray-400">
                Connecting sports enthusiasts and providing premium court booking experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Players</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/book-court" className="hover:text-atlantis-400 transition-colors">Book Courts</Link></li>
                <li><Link to="/join-match" className="hover:text-atlantis-400 transition-colors">Join Matches</Link></li>
                <li><Link to="/community" className="hover:text-atlantis-400 transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Court Owners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/owner-signup" className="hover:text-atlantis-400 transition-colors">List Your Court</Link></li>
                <li><Link to="/pricing" className="hover:text-atlantis-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-atlantis-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-atlantis-400 transition-colors">Contact</Link></li>
                <li><Link to="/help" className="hover:text-atlantis-400 transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QuickCourt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
