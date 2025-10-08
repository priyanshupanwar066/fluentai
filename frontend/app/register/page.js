"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { Lock, Shield, AlertCircle, Loader, LogIn } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const router = useRouter();
  const recaptchaRef = useRef();

  useEffect(() => {
    if (failedAttempts >= 3) {
      const timer = setTimeout(() => setFailedAttempts(0), 300000);
      return () => clearTimeout(timer);
    }
  }, [failedAttempts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    
    if (!captchaToken) {
      setError("Complete security check");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (failedAttempts >= 3) {
      setError("Too many attempts. Try again later.");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          captcha: captchaToken
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setFailedAttempts(prev => prev + 1);
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      recaptchaRef.current.reset();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-lg mb-4">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm text-blue-600">Secure Connection</span>
        </div>
        <h2 className="text-2xl font-bold">Create Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="user@example.com"
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            minLength="8"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={(token) => setCaptchaToken(token)}
          className="flex justify-center"
        />

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            <AlertCircle className="inline w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || failedAttempts >= 3}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 
                     disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin w-5 h-5 mr-2" />
              Registering...
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <button 
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:text-blue-700 flex items-center justify-center"
          >
            <LogIn className="w-4 h-4 mr-1" />
            Already have an account? Login here
          </button>
        </div>
      </form>
    </div>
  );
}