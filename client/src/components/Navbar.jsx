import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ onToggleTheme, theme }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-white/30 backdrop-blur-lg rounded-full shadow-lg ring-1 ring-black/5 justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mr-8">NewsBlog</h1>
          </a>
          <div className="flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">Login</a>
          <a href="/register" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">Register</a>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className={`
                px-4 py-2 border border-gray-300 rounded-full text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-300 ease-in-out
                ${isSearchExpanded ? 'w-72 opacity-100 scale-100' : 'w-0 opacity-0 scale-95'}
              `}
            />
            <div className="flex items-center">
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 mr-4"
              >
                <FaSearch className="h-5 w-5" />
              </button>
              <button
                onClick={onToggleTheme}
                className="px-3 py-2 rounded-full bg-gray-200  text-gray-800 dark:text-gray-200 transition"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
