import React from "react";
import { healthEducationData } from "../data/healthData";

const HealthEducation = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Health Education</h1>
      <p className="text-center text-gray-600 mb-8">
        Explore articles and videos on health, wellness, and fitness.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthEducationData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.content}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-3 inline-block"
            >
              {item.type === "article" ? "Read More" : "Watch Video"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthEducation;
