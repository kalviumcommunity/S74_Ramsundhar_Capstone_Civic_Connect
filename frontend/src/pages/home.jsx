import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import React from "react";
import {
  ArrowRight, CheckCircle, MapPin, BarChart2, ContactRound,
  MessageSquare, ShieldCheck, FileText, Users, Github, Twitter, Facebook, Instagram
} from "lucide-react";

import { isLoggedIn } from "../utils/auth"; // ✅ Import auth

const Index = () => {
  const featureRefs = useRef([]);
  const statsRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featureRefs.current.forEach(ref => ref && observer.observe(ref));
    statsRef.current && observer.observe(statsRef.current);

    return () => {
      featureRefs.current.forEach(ref => ref && observer.unobserve(ref));
      statsRef.current && observer.unobserve(statsRef.current);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center">
            <ContactRound className="mr-2" /> CivicConnect
          </Link>
          <nav className="space-x-4 text-gray-700">
            <Link to="/issues" className="hover:text-blue-600">Issues</Link>
            <Link to="/community" className="hover:text-blue-600">Community</Link>
            <Link to="/report" className="hover:text-blue-600">Report</Link>
            <Link to="/profile" className="hover:text-blue-600">Profile</Link>

            {!loggedIn && (
              <>
                <Link to="/login" className="hover:text-blue-600">Login</Link>
                <Link to="/signup" className="hover:bg-blue-600 bg-blue-500 text-white px-3 py-1 rounded">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-50 py-16 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
          Creating a <span className="text-blue-600">Better City</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Report issues, track resolutions, and collaborate with your community and local government.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Link to="/report" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 flex items-center">
            Report an Issue <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link to="/issues" className="border border-blue-600 text-blue-600 px-5 py-2 rounded hover:bg-blue-100">
            Browse Issues
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">How It Works</h2>
        <p className="text-gray-600 mb-10">Easily connect with your local authorities</p>
        <div className="grid md:grid-cols-3 gap-8 px-4">
          {[
            ["Report Issues", MapPin, "Submit issues with photos and location."],
            ["Track Progress", BarChart2, "Follow status updates from authorities."],
            ["Verify Resolution", CheckCircle, "Mark issues as resolved when fixed."]
          ].map(([title, Icon, desc], i) => (
            <div key={i} className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
              <p className="text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Who Can Use</h2>
        <p className="text-gray-600 mb-10">Different roles, different powers</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              role: "Citizens", Icon: Users, features: [
                "Report issues", "Vote on priorities", "Track resolution"
              ]
            },
            {
              role: "Officials", Icon: FileText, features: [
                "Manage reports", "Update status", "Verify resolutions"
              ]
            },
            {
              role: "Moderators", Icon: ShieldCheck, features: [
                "Review content", "Maintain quality", "Ensure platform integrity"
              ]
            }
          ].map(({ role, Icon, features }, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left">
              <div className="mb-4 flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <Icon className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-blue-700">{role}</h3>
              </div>
              <ul className="list-disc pl-8 text-gray-700 space-y-1">
                {features.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-800 text-white py-16 px-4" ref={statsRef}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["5,000+", "Issues Reported"],
            ["85%", "Resolution Rate"],
            ["25+", "Communities"],
            ["10,000+", "Users"]
          ].map(([count, label], i) => (
            <div key={i}>
              <div className="text-3xl font-bold">{count}</div>
              <div className="text-white/80">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center px-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Join Us Today</h2>
        <p className="text-gray-600 mb-6">Start making a difference in your community now!</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Create Account
          </Link>
          <Link to="/issues" className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-100">
            Browse Issues
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <MapPin className="w-5 h-5 mr-2" /> CivicConnect
            </h3>
            <p className="text-gray-400">
              Empowering citizens for a transparent and responsive community.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-gray-400 space-y-1">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/issues">Browse</Link></li>
              <li><Link to="/report">Report</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="text-gray-400 space-y-1">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4 text-gray-400">
              <a href="#"><Twitter className="w-5 h-5" /></a>
              <a href="#"><Facebook className="w-5 h-5" /></a>
              <a href="#"><Instagram className="w-5 h-5" /></a>
              <a href="#"><Github className="w-5 h-5" /></a>
            </div>
            <p className="mt-4 text-sm text-gray-400">contact@CivicConnect.org</p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} CivicConnect. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Index;
