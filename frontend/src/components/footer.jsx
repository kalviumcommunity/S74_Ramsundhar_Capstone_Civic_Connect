import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" className="text-xl font-medium text-blue-600 flex items-center gap-2">
              {/* MapPin icon */}
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-semibold">Better Place</span>
            </a>
            <p className="text-gray-600 text-sm">
              Empowering citizens to improve their communities through transparent reporting and accountable governance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="/" className="hover:text-blue-600">Home</a></li>
              <li><a href="/issues" className="hover:text-blue-600">Browse Issues</a></li>
              <li><a href="/report" className="hover:text-blue-600">Report an Issue</a></li>
              <li><a href="/community" className="hover:text-blue-600">Community</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
              <li><a href="/faq" className="hover:text-blue-600">FAQ</a></li>
              <li><a href="/terms" className="hover:text-blue-600">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social + Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Connect</h4>
            <div className="flex space-x-4">
              {/* Twitter */}
              <a href="#" className="text-gray-600 hover:text-blue-500" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 19c7.5 0 11.6-6.3 11.6-11.7v-.5A8.4 8.4 0 0022 4.5a8.2 8.2 0 01-2.4.7A4.1 4.1 0 0021.4 3a8.2 8.2 0 01-2.6 1A4.1 4.1 0 0016 3a4.1 4.1 0 00-4 5.1A11.7 11.7 0 014 4s-4 9 5 13a12 12 0 01-7 2c9 5 20 0 20-11.5a8.6 8.6 0 000-.9A6 6 0 0022 6a8.3 8.3 0 01-2.4.7z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-gray-600 hover:text-blue-700" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.3h-1.2c-1.2 0-1.6.8-1.6 1.6v2h2.8l-.4 3H13v7A10 10 0 0022 12z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-600 hover:text-pink-500" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1a6.5 6.5 0 014.7 4.7c.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8a6.5 6.5 0 01-4.7 4.7c-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1a6.5 6.5 0 01-4.7-4.7C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8A6.5 6.5 0 017 2.5C8.2 2.3 8.6 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1A9 9 0 001.1 7.1C1 8.3 1 8.7 1 12s0 3.7.1 4.9a9 9 0 006 6c1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1a9 9 0 006-6c.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9a9 9 0 00-6-6C15.7 0 15.3 0 12 0z"/>
                  <path d="M12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-10.9a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="text-gray-600 hover:text-black" aria-label="GitHub">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7 0-.7 0-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1.8-1 .8-1-.8-.1-1.6-.4-1.6-1.8s.4-1.4 1-1.7c-.2-.5-.4-1.3 0-2a4.2 4.2 0 011.4 0c.4-.1.9-.1 1.4-.1s1 .1 1.4.1a4.2 4.2 0 011.4 0c.4.7.2 1.5 0 2 .6.3 1 .8 1 1.7s-.8 1.7-1.6 1.8c.2.2.8 1.1.8 2.2v3.2c0 .3.2.6.7.5A10 10 0 0012 2z"/>
                </svg>
              </a>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 text-sm">
                Contact us at:{" "}
                <a href="mailto:contact@betterplace.org" className="hover:text-blue-600">
                  contact@betterplace.org
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <p className="text-center text-gray-600 text-sm">
            &copy; {currentYear} Better Place. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
