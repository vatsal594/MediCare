import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import clsx from 'clsx'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const handleNavigation = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
        <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
        <p className="sm:w-1/3 text-center text-sm">No doctors available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(`/appointment/${item._id}`)}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            aria-label={`Book appointment with Dr. ${item.name}`}
          >
            <img className="bg-[#EAEFFF]" src={item.image} alt={`Dr. ${item.name}`} />
            <div className="p-4">
              <div
                className={clsx(
                  'flex items-center gap-2 text-sm text-center',
                  item.available ? 'text-green-500' : 'text-gray-500'
                )}
              >
                <p
                  className={clsx(
                    'w-2 h-2 rounded-full',
                    item.available ? 'bg-green-500' : 'bg-gray-500'
                  )}
                ></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleNavigation('/doctors')}
        className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10"
        aria-label="View all doctors"
      >
        More
      </button>
    </div>
  )
}

export default TopDoctors
