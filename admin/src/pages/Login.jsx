import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { FaUserMd, FaUserShield } from 'react-icons/fa';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) return toast.error('Please fill in all fields.');

    setLoading(true);
    try {
      const endpoint = role === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
      const { data } = await axios.post(`${backendUrl}${endpoint}`, { email, password });

      if (data.success) {
        const tokenKey = role === 'Admin' ? 'aToken' : 'dToken';
        const setToken = role === 'Admin' ? setAToken : setDToken;

        setToken(data.token);
        localStorage.setItem(tokenKey, data.token);
        toast.success(`${role} logged in successfully!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          {role === 'Admin' ? (
            <FaUserShield className="text-primary text-4xl mx-auto" />
          ) : (
            <FaUserMd className="text-primary text-4xl mx-auto" />
          )}
          <h2 className="text-3xl font-semibold mt-2 text-gray-700 dark:text-gray-100">
            {role} Login
          </h2>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg text-lg font-medium transition hover:bg-opacity-90 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          {role === 'Admin' ? 'Doctor Login?' : 'Admin Login?'}
          <span
            onClick={() => setRole(role === 'Admin' ? 'Doctor' : 'Admin')}
            className="text-primary cursor-pointer underline ml-1"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
