import React, { useState, useEffect } from 'react';
import { BsSun, BsMoon, BsList } from 'react-icons/bs'; 
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`p-4 flex justify-between items-center relative transition-all duration-300 ${theme === 'dark' ? 'nav-dark text-white' : 'nav-light text-black'}`} 
    style={{ zIndex: 1000 }}>
      <div className="text-xl">
        <img className='h-12' src="https://res.cloudinary.com/pitz/image/upload/v1727001297/WhatsApp_Image_2024-09-22_at_13.07.54_z6oksz.jpg" alt="Logo" />
      </div>

      <div className="hidden md:flex space-x-8">
        <Link onClick={()=>{
          setIsMenuOpen(false);
        }} to="/" className="hover:underline">
          Home
        </Link>
        <Link onClick={toggleMenu} to="/about" className="hover:underline">
          About Us
        </Link>
        <Link onClick={toggleMenu} to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link onClick={toggleMenu} to="/gallery" className="hover:underline">
          Gallery
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={toggleMenu} className='p-1 rounded-lg w-28 bg-green-900 text-white'>
          <Link to="/donate" className="hover:underline">
            Donate
          </Link>
        </button>

        <button onClick={toggleTheme} className="text-2xl">
          {theme === 'dark' ? <BsSun /> : <BsMoon />}
        </button>

        <button onClick={toggleMenu} className="md:hidden  text-2xl">
          <BsList size={34}/>
        </button>
      </div>

      {isMenuOpen && (
  <motion.div
    className={`absolute top-16 left-0 right-0 p-6 flex flex-col space-y-4 z-10 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Link onClick={() => setIsMenuOpen(false)} to="/" className="hover:underline">
      Home
    </Link>
    <Link onClick={() => setIsMenuOpen(false)} to="/about" className="hover:underline">
      About Us
    </Link>
    <Link onClick={() => setIsMenuOpen(false)} to="/contact" className="hover:underline">
      Contact
    </Link>
    <Link onClick={() => setIsMenuOpen(false)} to="/gallery" className="hover:underline">
      Gallery
    </Link>
    <button className='p-2 rounded-lg bg-green-900 text-white' onClick={() => setIsMenuOpen(false)}>
      <Link to="/donate" className="hover:underline">
        Donate
      </Link>
    </button>
  </motion.div>
)}

    </nav>
  );
};

export default Navbar;
