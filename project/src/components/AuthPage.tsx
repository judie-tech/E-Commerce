import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Mail, ArrowRight, AlertCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Custom Alert Component
const Alert = ({ children, onClose }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 relative">
    <div className="flex items-center gap-2 text-red-700">{children}</div>
    {onClose && (
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-red-400 hover:text-red-600"
      >
        <X size={16} />
      </button>
    )}
  </div>
);

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!isLogin && (!name || name.trim().length === 0)) {
      errors.name = "Name is required";
    }

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Valid email is required";
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateForm()) {
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const url = `http://localhost:5000${endpoint}`;
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/shop");
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    }
  };

  const InputField = ({
    label,
    icon: Icon,
    type,
    value,
    onChange,
    error,
    placeholder,
    required = true,
  }) => (
    <div>
      <label className="block text-sm font-medium text-[#7c6c5d] mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a69585]"
          size={20}
        />
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#a69585] focus:border-[#a69585] bg-[#fdfcfb] 
            ${error ? "border-red-500" : "border-[#e8e0d8]"}`}
          placeholder={placeholder}
          required={required}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} />
            {error}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#7c6c5d]">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-[#a69585] mt-2">
            {isLogin
              ? "Sign in to continue shopping"
              : "Join us to start your fitness journey"}
          </p>
        </div>

        {error && (
          <Alert onClose={() => setError("")}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <InputField
              label="Full Name"
              icon={User}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={fieldErrors.name}
              placeholder="John Doe"
            />
          )}

          <InputField
            label="Email Address"
            icon={Mail}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            icon={Lock}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            placeholder="••••••••"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#7c6c5d] text-white py-3 px-4 rounded-lg hover:bg-[#6a5c4f] transition-colors flex items-center justify-center gap-2"
          >
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight size={20} />
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setFieldErrors({});
            }}
            className="text-[#a69585] hover:text-[#7c6c5d] transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
