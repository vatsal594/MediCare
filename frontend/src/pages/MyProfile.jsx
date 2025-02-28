import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(null)
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            if (image) formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong, please try again.")
        }
    }

    return userData ? (
        <div className="max-w-lg mx-auto flex flex-col gap-6 p-5 bg-white shadow-lg rounded-lg">
            <div className="text-center">
                {isEdit
                    ? <label htmlFor="image" className="cursor-pointer">
                        <div className="inline-block relative">
                            <img className="w-36 h-36 object-cover rounded-full opacity-75 border-2 border-primary" src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
                            <img className="w-8 absolute bottom-2 right-2" src={assets.upload_icon} alt="Upload Icon" />
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                    : <img className="w-36 h-36 object-cover rounded-full mx-auto border-2 border-primary" src={userData.image} alt="Profile" />
                }
            </div>

            <div className="text-center">
                {isEdit
                    ? <input className="w-full bg-gray-100 p-2 rounded text-xl font-semibold text-center" type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                    : <p className="text-3xl font-semibold">{userData.name}</p>
                }
            </div>

            <hr className="border-t-2 border-gray-300" />

            <div className="mt-6">
                <p className="text-lg font-medium text-gray-700 underline">Contact Information</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                        <p className="font-medium">Email:</p>
                        <p className="text-blue-600">{userData.email}</p>
                    </div>
                    <div>
                        <p className="font-medium">Phone:</p>
                        {isEdit
                            ? <input className="w-full bg-gray-100 p-2 rounded" type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                            : <p className="text-gray-600">{userData.phone}</p>
                        }
                    </div>
                    <div>
                        <p className="font-medium">Address:</p>
                        {isEdit
                            ? <div>
                                <input className="w-full bg-gray-100 p-2 rounded mb-2" type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                                <input className="w-full bg-gray-100 p-2 rounded" type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                            </div>
                            : <p className="text-gray-600">{userData.address.line1} <br /> {userData.address.line2}</p>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-lg font-medium text-gray-700 underline">Basic Information</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                        <p className="font-medium">Gender:</p>
                        {isEdit
                            ? <select className="w-full bg-gray-100 p-2 rounded" onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            : <p className="text-gray-600">{userData.gender}</p>
                        }
                    </div>
                    <div>
                        <p className="font-medium">Birthday:</p>
                        {isEdit
                            ? <input className="w-full bg-gray-100 p-2 rounded" type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                            : <p className="text-gray-600">{userData.dob}</p>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                {isEdit
                    ? <button onClick={updateUserProfileData} className="border border-primary px-8 py-2 rounded-full bg-primary text-white hover:bg-blue-600 transition-all">Save Changes</button>
                    : <button onClick={() => setIsEdit(true)} className="border border-primary px-8 py-2 rounded-full text-primary hover:bg-primary hover:text-white transition-all">Edit Profile</button>
                }
            </div>
        </div>
    ) : (
        <div className="text-center text-lg font-medium text-gray-600">Loading profile...</div>
    )
}

export default MyProfile
