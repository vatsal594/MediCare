import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Using icons from lucide-react

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (state === "Sign Up" && (name.length < 3 || !/^[A-Za-z]+$/.test(name))) {
      toast.error(
        "Name must be at least 3 characters and contain only letters."
      );
      setLoading(false);
      return;
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/.test(email)
    ) {
      toast.error("Enter a valid email (Gmail, Hotmail, Outlook only).");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("Weak password! Enter 8 or more characters.");
      setLoading(false);
      return;
    }

    if (state === "Sign Up" && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        state === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const { data } = await axios.post(backendUrl + endpoint, {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-lg rounded-2xl w-[350px] sm:w-[400px]"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-gray-500 text-center mb-4">
          {state === "Sign Up"
            ? "Sign up to book an appointment"
            : "Log in to continue"}
        </p>

        {state === "Sign Up" && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              type="text"
              autoFocus
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            type="email"
            required
          />
        </div>

        <div className="mb-3 relative">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
            type={showPassword ? "text" : "password"}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {state === "Sign Up" && (
          <div className="mb-3 relative">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
              type={showConfirmPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-9 text-gray-500 dark:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-3 rounded-lg bg-blue-600 text-white text-lg font-medium transition hover:bg-blue-700"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : state === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Create a new account?"}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-blue-600 cursor-pointer underline ml-1"
          >
            {state === "Sign Up" ? "Login here" : "Sign up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
