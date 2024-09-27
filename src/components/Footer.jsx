import React from 'react';
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from 'react-icons/bs'; 

const Footer = () => {
  return (
    <footer className="bg-white text-black py-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        <div>
          <img className='h-16' src="https://res.cloudinary.com/pitz/image/upload/v1727001297/WhatsApp_Image_2024-09-22_at_13.07.54_z6oksz.jpg" alt="" />
          <p className="text-gray-600">
            Bringing you the best services with dedication and excellence. Stay connected with us.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/about" className="hover:underline text-black">About Us</a></li>
            <li><a href="/contact" className="hover:underline text-black">Contact Us</a></li>
            <li><a href="/gallery" className="hover:underline text-black">Gallery</a></li>
            <li><a href="/donate" className="hover:underline text-black">Donate</a></li>
            <li><a href="/programs" className="hover:underline text-black">Programs</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-2xl text-blue-600 hover:text-gray-600">
              <BsFacebook />
            </a>
            <a href="https://twitter.com" className="text-2xl text-blue-400 hover:text-gray-600">
              <BsTwitter />
            </a>
            <a href="https://instagram.com" className="text-2xl text-pink-600 hover:text-gray-600">
              <BsInstagram />
            </a>
            <a href="https://youtube.com" className="text-2xl text-red-600 hover:text-gray-600">
              <BsYoutube />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Subscribe to our Newsletter</h3>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              className="p-2 bg-gray-200 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 py-1 px-2 rounded text-white font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center py-2 mt-4">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Reuben Wairicu Foundation. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
