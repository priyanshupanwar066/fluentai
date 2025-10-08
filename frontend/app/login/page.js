"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { Lock, Shield, AlertCircle, Loader } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    
    if (!captchaToken) {
      setError("Complete security check");
      return false;
    }
    
    return true;
  };

  // In your login page's handleSubmit function
// Update the handleSubmit function:
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
      credentials: "include"
    });

    if (res.ok) {
      router.push("/dashboard"); // Remove cookie check
    } else {
      throw new Error('Login failed');
    }
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-lg mb-4">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm text-blue-600">Secure Connection</span>
        </div>
        <h2 className="text-2xl font-bold">Account Login</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
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
            autoComplete="current-password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            minLength="8"
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
              Authenticating...
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Lock className="inline w-4 h-4 mr-1" />
          Encrypted end-to-end connection
        </div>
      </form>
    </div>
  );
}