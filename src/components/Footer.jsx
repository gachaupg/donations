import React from 'react';
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from 'react-icons/bs'; 

const Footer = () => {

    
  return (
    <footer className="primary text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
            <img className='h-16' src="https://res.cloudinary.com/pitz/image/upload/v1727001297/WhatsApp_Image_2024-09-22_at_13.07.54_z6oksz.jpg" alt="" />
          <p className="text-white">
            Bringing you the best services with dedication and excellence. Stay connected with us.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/services" className="hover:underline">Gallery</a></li>
            <li><a href="/privacy" className="hover:underline">Donate</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-2xl text-blue-600 hover:text-white">
              <BsFacebook />
            </a>
            <a href="https://twitter.com" className="text-2xl text-blue-400 hover:text-white">
              <BsTwitter />
            </a>
            <a href="https://instagram.com" className="text-2xl text-pink-600 hover:text-white">
              <BsInstagram />
            </a>
            <a href="https://youtube.com" className="text-2xl text-red-600 hover:text-white">
              <BsYoutube />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              className="p-2 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className=" text-center py-4 mt-8">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} rubenwairicufoundation. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
