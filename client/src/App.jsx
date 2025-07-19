// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AnimatedCursor from "react-animated-cursor";
import React, { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={30}
        color='52, 144, 220'
        outerAlpha={0.2}
        innerScale={1}
        outerScale={2}
        outerStyle={{ background: 'transparent', border: '3px solid rgba(52, 144, 220, 0.5)' }}
      />
      <Router>
        <Navbar onToggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
