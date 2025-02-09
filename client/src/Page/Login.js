import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../utils/firebase";
import { API_BASE_URL } from "../const/Constant";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Spinner Icon

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    setError(null);
    setLoading(true); // Show loading

    const token = await signInWithGoogle();

    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/firebase-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("authToken", data.token);
          navigate("/");
        } else {
          throw new Error(data.error || "Login failed");
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Google Sign-In Failed");
    }

    setLoading(false); // Hide loading after API call
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Welcome Back</h2>
        <p className="text-gray-500 mt-2">Sign in to continue</p>

        <button
          onClick={handleLogin}
          className="mt-6 flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-gray-500" size={24} />
          ) : (
            <FcGoogle size={24} />
          )}
          <span className="font-medium">{loading ? "Signing in..." : "Sign in with Google"}</span>
        </button>

        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
