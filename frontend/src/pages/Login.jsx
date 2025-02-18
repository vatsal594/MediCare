import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Name validation
    if (state === 'Sign Up' && (name.length < 3 || !/^[A-Za-z]+$/.test(name))) {
      toast.error('Name must be at least 3 characters long and contain only letters.');
      return;
    }

    // Email validation
    if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/.test(email)) {
      toast.error('Enter a valid email (Gmail, Hotmail, Outlook only).');
      return;
    }

    // Password validation
    if (password.length < 8) {
      toast.error('Weak password! Enter 8 or more characters.');
      return;
    }

    // Confirm Password validation
    if (state === 'Sign Up' && password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const { data } = await axios.post(backendUrl + endpoint, { name, email, password });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Try again.');
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full relative">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1 pr-10"
            type={showPassword ? 'text' : 'password'}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? '👁️' : '🔒'}
          </button>
        </div>

        {state === 'Sign Up' && (
          <div className="w-full relative">
            <p>Confirm Password</p>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="border border-[#DADADA] rounded w-full p-2 mt-1 pr-10"
              type={showConfirmPassword ? 'text' : 'password'}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? '👁️' : '🔒'}
            </button>
          </div>
        )}

        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className="text-primary underline cursor-pointer">
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span onClick={() => setState('Sign Up')} className="text-primary underline cursor-pointer">
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
