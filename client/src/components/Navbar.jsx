import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ onToggleTheme, theme }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[rgb(40,40,40)] backdrop-blur-lg  ring-white/5 justify-between">
      <div className="max-w-7xl mx-5 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <h1 className="text-3xl font-extrabold text-red-500 tracking-tight mr-10">NewsBlog</h1>
          </a>
          <div className="flex items-center space-x-6">
            <a href="/" className="text-white gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">Home</a>
            <a href="#" className="text-white gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">About</a>
            <a href="#" className="text-white gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-6 -mr-55">
          <a href="/login" className="text-white gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">Login</a>
          <a href="/register" className="text-white gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:scale-105">Register</a>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className={`
                px-4 py-2 border border-white-300 rounded-full text-sm text-white
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                transition-all duration-300 ease-in-out
                ${isSearchExpanded ? 'w-72 opacity-100 scale-100' : 'w-0 opacity-0 scale-95'}
              `}
            />
            <div className="flex items-center">
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="text-white hover:text-red-400 transition-colors duration-300 mr-3 ml-3"
              >
                <FaSearch className="h-5 w-5" />
              </button>
              {/* <button
                onClick={onToggleTheme}
                className="px-3 py-2 rounded-full   text-gray-800 dark:text-gray-200 transition"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
