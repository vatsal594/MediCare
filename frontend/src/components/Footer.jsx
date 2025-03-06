import React from "react";
import { assets } from "../assets/assets";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"; // For social media icons
import { Link } from "react-router-dom"; // Import Link for routing

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 md:mx-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
          {/* Logo and Description Section */}
          <div className="flex flex-col sm:items-start items-center">
            <img className="mb-5 w-40" src={assets.logo} alt="MediCare Logo" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6 text-justify">
              At MediCare, we connect you with trusted doctors to make
              healthcare easier and more accessible. With features like
              AI-powered symptom checkers and health risk predictions, we aim to
              provide you with the best care right at your fingertips.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl font-semibold mb-5">COMPANY</p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-indigo-600 cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                <Link to="/about">About Us</Link>
              </li>
              {/* Updated the Doctors link to be a Link component */}
              <li className="hover:text-indigo-600 cursor-pointer">
                <Link to="/doctors">Doctors</Link>
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl font-semibold mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-indigo-600 cursor-pointer">
                +91 8329351893
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                +91 9699601893
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                vatsalsavani594@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 my-6">
          <a
            href="https://facebook.com"
            className="text-gray-600 hover:text-indigo-600"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://www.instagram.com/vatssal.savani_/"
            className="text-gray-600 hover:text-indigo-600"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-600 hover:text-indigo-600"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/vatsal-savani-b296ab318/?originalSubdomain=in"
            className="text-gray-600 hover:text-indigo-600"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10">
        <hr className="border-t-1 border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-600">
          Copyright 2025 @ vatsrag - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
