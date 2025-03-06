import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16">

      {/* Hero Section */}
      <div className="text-center text-2xl sm:text-3xl pt-10 text-[#707070]">
        <p>ABOUT <span className="text-primary font-semibold">US</span></p>
        <p className="mt-2 text-lg sm:text-xl text-gray-500">Your trusted healthcare partner for a seamless experience.</p>
      </div>

      {/* About Section */}
      <div className="my-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img
          className="w-full md:max-w-[300px] rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
          src={assets.about_image}
          alt="MediCare - Healthcare Technology"
        />
        <div className="flex flex-col justify-center gap-4 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to MediCare! We help you manage healthcare needs efficiently by simplifying doctor appointments and health records.
          </p>
          <p>
            We’re committed to excellence in healthcare tech, constantly enhancing our platform for a superior user experience. Whether booking or managing care, we’re here for you.
          </p>
          <b className="text-gray-800 text-lg">Our Vision</b>
          <p>
            To bridge the gap between patients and healthcare providers, creating a seamless experience for timely access to care.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl my-4 text-center">
        <p>WHY <span className="text-primary font-semibold">CHOOSE US</span></p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="border-2 border-gray-300 rounded-lg px-8 py-6 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b className="text-lg">EFFICIENCY:</b>
          <p>Quick and easy appointment scheduling to fit your lifestyle.</p>
        </div>
        <div className="border-2 border-gray-300 rounded-lg px-8 py-6 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b className="text-lg">CONVENIENCE:</b>
          <p>Access a network of trusted healthcare professionals nearby.</p>
        </div>
        <div className="border-2 border-gray-300 rounded-lg px-8 py-6 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b className="text-lg">PERSONALIZATION:</b>
          <p>Tailored health reminders and recommendations to stay on track.</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-12 text-gray-600">
        <p className="text-sm">MediCare is here to provide a seamless healthcare experience. Reach out to us for more info.</p>
      </div>
    </div>
  )
}

export default About
