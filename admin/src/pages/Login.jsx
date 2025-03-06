import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { FaUserMd, FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";



const Login = () => {
  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("❌ Please fill in all fields.", { autoClose: 3000 });
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        role === "Admin" ? "/api/admin/login" : "/api/doctor/login";
      const { data } = await axios.post(`${backendUrl}${endpoint}`, {
        email,
        password,
      });

      if (data.success) {
        const tokenKey = role === "Admin" ? "aToken" : "dToken";
        const setToken = role === "Admin" ? setAToken : setDToken;

        setToken(data.token);
        localStorage.setItem(tokenKey, data.token);
        toast.success(`✅ ${role} logged in successfully!`, {
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate(role === "Admin" ? "/admin/dashboard" : "/doctor/dashboard");
        }, 1500);
      } else {
        toast.error(`❌ ${data.message}`, { autoClose: 3000 });
      }
    } catch (error) {
      toast.error(
        `❌ ${
          error.response?.data?.message || "Login failed. Please try again."
        }`,
        { autoClose: 3000 }
      );
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
          {role === "Admin" ? (
            <FaUserShield className="text-primary text-4xl mx-auto" />
          ) : (
            <FaUserMd className="text-primary text-4xl mx-auto" />
          )}
          <h2 className="text-3xl font-semibold mt-2 text-gray-700 dark:text-gray-100">
            {role} Login
          </h2>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input with Eye Toggle */}
        <div className="mb-4 relative">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:text-white pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute top-10 right-4 cursor-pointer text-gray-500 dark:text-gray-300"
            onClick={() => {
              setShowPassword(!showPassword);
              toast.info(
                showPassword ? "🔒 Password hidden" : "👁️ Password visible",
                { autoClose: 1500 }
              );
            }}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg text-lg font-medium transition hover:bg-opacity-90 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Toggle Between Admin & Doctor Login */}
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          {role === "Admin" ? "Doctor Login?" : "Admin Login?"}
          <span
            onClick={() => {
              setRole(role === "Admin" ? "Doctor" : "Admin");
              toast.info(
                `🔄 Switched to ${role === "Admin" ? "Doctor" : "Admin"} login`,
                { autoClose: 1500 }
              );
            }}
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
