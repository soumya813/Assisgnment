import React, { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between py-2 px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="https://newassets.apollo247.com/images/ic_logo.png" alt="Apollo 24/7" className="h-6 md:h-8 w-auto" />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Location & Search */}
        <div className="hidden md:flex flex-1 items-center gap-4 ml-6">
          <div className="flex items-center gap-1 text-gray-700 text-sm font-medium border rounded px-3 py-1 bg-gray-50 cursor-pointer hover:bg-gray-100">
            <svg className="text-blue-600 w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Select Address</span>
            <svg className="text-gray-400 w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Doctors, Specialities, Conditions etc."
            className="flex-1 border border-gray-300 rounded px-4 py-2 ml-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100"
            style={{maxWidth: 480}}
          />
        </div>

        {/* Desktop Login Button */}
        <button className="hidden md:flex border border-blue-600 text-blue-700 font-semibold rounded px-5 py-2 items-center gap-2 hover:bg-blue-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Login
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-t border-b border-gray-100 text-sm font-semibold text-gray-800">
        <div className="max-w-[1440px] mx-auto flex gap-8 px-6 py-2 overflow-x-auto">
          <a href="#" className="hover:text-blue-700 whitespace-nowrap">Buy Medicines</a>
          <a href="#" className="hover:text-blue-700 whitespace-nowrap">Find Doctors</a>
          <a href="#" className="hover:text-blue-700 whitespace-nowrap">Lab Tests</a>
          <a href="#" className="hover:text-blue-700 whitespace-nowrap">Circle Membership</a>
          <a href="#" className="hover:text-blue-700 whitespace-nowrap">Health Records</a>
          <a href="#" className="hover:text-blue-700 whitespace-nowrap">Diabetes Reversal</a>
          <a href="#" className="hover:text-blue-700 whitespace-nowrap">
            Buy Insurance <span className="ml-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">New</span>
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white border-t border-gray-200`}>
        <div className="px-4 py-3 space-y-3">
          {/* Mobile Search */}
          <input
            type="text"
            placeholder="Search Doctors, Specialities, Conditions etc."
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100"
          />
          
          {/* Mobile Location */}
          <div className="flex items-center gap-1 text-gray-700 text-sm font-medium border rounded px-3 py-2 bg-gray-50">
            <svg className="text-blue-600 w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Select Address</span>
          </div>

          {/* Mobile Login */}
          <button className="w-full border border-blue-600 text-blue-700 font-semibold rounded px-5 py-2 flex items-center justify-center gap-2 hover:bg-blue-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Login
          </button>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
            <a href="#" className="text-gray-800 hover:text-blue-700">Buy Medicines</a>
            <a href="#" className="text-gray-800 hover:text-blue-700">Find Doctors</a>
            <a href="#" className="text-gray-800 hover:text-blue-700">Lab Tests</a>
            <a href="#" className="text-gray-800 hover:text-blue-700">Circle Membership</a>
            <a href="#" className="text-gray-800 hover:text-blue-700">Health Records</a>
            <a href="#" className="text-gray-800 hover:text-blue-700">Diabetes Reversal</a>
            <a href="#" className="text-gray-800 hover:text-blue-700 flex items-center">
              Buy Insurance 
              <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">New</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
