import React, { useState, useEffect } from 'react';
import { BsSun, BsMoon, BsList } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // UseEffect to handle theme loading from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light if nothing is saved
    setTheme(savedTheme);
    document.documentElement.className = savedTheme; // Ensures theme is applied
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.className = newTheme; // Properly switch theme class
    localStorage.setItem('theme', newTheme); // Save to localStorage
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`p-2 flex justify-between items-center fixed w-full top-0 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`} style={{ zIndex: 1000, height: '60px' }}>
      <div className="text-xl">
        <img className='h-10' src="https://res.cloudinary.com/pitz/image/upload/v1727001297/WhatsApp_Image_2024-09-22_at_13.07.54_z6oksz.jpg" alt="Logo" />
      </div>

      <div className="hidden md:flex space-x-6">
        <Link to="/" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Home
        </Link>
        <Link to="/about" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          About Us
        </Link>
        <Link to="/contact" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Contact
        </Link>
        <Link to="/gallery" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Gallery
        </Link>
        <Link to="/programs" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Programs
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/donate" className="hover:underline">
          <button className='p-1 donate rounded-lg w-24 bg-white text-red-600 uppercase shadow-lg hover:shadow-xl transition-shadow'>
            Donate
          </button>
        </Link>

        <button className="text-2xl" onClick={toggleTheme}>
          {theme === 'dark' ? <BsSun /> : <BsMoon />}
        </button>

        <button onClick={toggleMenu} className="md:hidden text-2xl">
          <BsList size={28} />
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          className={`absolute top-14 left-0 right-0 p-4 flex flex-col space-y-4 z-10 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link onClick={() => setIsMenuOpen(false)} to="/" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Home
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/about" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            About Us
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/contact" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Contact
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/gallery" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Gallery
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/programs" className={`font-bold hover:underline text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Programs
          </Link>
          <Link to="/donate" className="hover:underline">
            <button className='p-1 donate rounded-lg w-24 bg-white text-red-600 uppercase shadow-lg hover:shadow-xl transition-shadow'>
              Donate
            </button>
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
