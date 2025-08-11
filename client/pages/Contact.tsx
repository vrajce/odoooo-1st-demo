import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, MapPin, Phone, Mail, Clock, Send, MessageCircle, HelpCircle, Building } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", subject: "", category: "general", message: "" });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@quickcourt.com",
      description: "Send us an email and we'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 98765 43210",
      description: "Available Monday to Friday, 9 AM to 6 PM IST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Sports District, Mumbai 400001",
      description: "Our headquarters - open for meetings by appointment"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9 AM - 6 PM IST",
      description: "Weekend support available for urgent issues"
    }
  ];

  const faqs = [
    {
      question: "How do I book a court?",
      answer: "Simply browse available courts, select your preferred date and time, and complete the booking process. You'll receive instant confirmation."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel bookings up to 2 hours before the scheduled time for a full refund. Cancellations within 2 hours are subject to a cancellation fee."
    },
    {
      question: "How do I list my court on QuickCourt?",
      answer: "Click 'List Your Court' and complete our owner onboarding process. We'll verify your facility and help you get started within 48 hours."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. We use industry-standard encryption and work with trusted payment partners to ensure your financial information is completely secure."
    }
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
                <span className="text-xl font-bold text-gray-900">QuickCourt</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/courts" className="text-gray-700 hover:text-atlantis-500 transition-colors">Courts</Link>
                <Link to="/matches" className="text-gray-700 hover:text-atlantis-500 transition-colors">Matches</Link>
                <Link to="/community" className="text-gray-700 hover:text-atlantis-500 transition-colors">Community</Link>
                <Link to="/contact" className="text-atlantis-500 font-medium">Contact</Link>
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions, suggestions, or need support? We're here to help and would love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="court-owner">Court Owner Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-atlantis-500 focus:border-transparent transition-all duration-300"
                  placeholder="Please provide as much detail as possible..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-atlantis text-white font-semibold rounded-xl hover:shadow-atlantis-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-75 disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-atlantis rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                        <p className="text-atlantis-600 font-medium mb-1">{info.details}</p>
                        <p className="text-gray-600 text-sm">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h3>
              <div className="w-full h-64 bg-gradient-to-br from-sahara-100 to-feijoa-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Google Map</p>
                  <p className="text-sm text-gray-400">123 Sports District, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Other Ways to Reach Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-feijoa rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
              <p className="text-gray-600 text-sm mb-4">Chat with our support team in real-time</p>
              <button className="px-6 py-2 bg-feijoa-500 text-white rounded-xl font-medium hover:bg-feijoa-600 transition-all duration-300">
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-energy rounded-xl flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Help Center</h4>
              <p className="text-gray-600 text-sm mb-4">Find answers in our comprehensive FAQ</p>
              <Link 
                to="/help"
                className="inline-block px-6 py-2 bg-energy-500 text-white rounded-xl font-medium hover:bg-energy-600 transition-all duration-300"
              >
                Visit Help Center
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-atlantis rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Business Inquiries</h4>
              <p className="text-gray-600 text-sm mb-4">Partnership and enterprise solutions</p>
              <a 
                href="mailto:business@quickcourt.com"
                className="inline-block px-6 py-2 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/help"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-atlantis-500 text-white rounded-xl font-medium hover:bg-apple-500 transition-all duration-300"
            >
              <HelpCircle className="w-4 h-4" />
              <span>View All FAQs</span>
            </Link>
          </div>
        </div>
      </div>

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
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-atlantis-400 transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-atlantis-400 transition-colors">Contact Us</Link></li>
                <li><Link to="/about" className="hover:text-atlantis-400 transition-colors">About</Link></li>
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
