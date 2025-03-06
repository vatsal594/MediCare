import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16">

      {/* Hero Section */}
      <section className="text-center text-2xl sm:text-3xl pt-10 text-[#707070]">
        <p>CONTACT <span className="text-primary font-semibold">US</span></p>
      </section>

      {/* Contact Info Section */}
      <section className="my-8 flex flex-col md:flex-row gap-8 items-center md:items-start">

        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:max-w-[300px] rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105">
          <img className="w-full rounded-lg" src={assets.contact_image} alt="MediCare - Contact Us" />
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            123 Main Street, <br />
            Mumbai, India
          </p>
          <p className="text-gray-500">
            {/* Phone Number with Link */}
            Tel: <a href="tel:+14155550132" className="text-blue-600 hover:underline">+1 (415) 555-0132</a> <br />
            {/* Email Link */}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Medicare@gmail.com" target="_blank" className="text-blue-600 hover:underline">Email: Medicare@gmail.com</a>
          </p>

          <p className="font-semibold text-lg text-gray-600">CAREERS AT MEDICARE</p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <div className="text-center mt-12 text-gray-600">
        <p className="text-sm">MediCare is here to provide a seamless healthcare experience. Reach out to us for more info.</p>
      </div>
    </div>
  );
}

export default Contact;
