"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Activity, Clock, AlertTriangle, LogOut, Loader } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSessions, setActiveSessions] = useState([]);
  const [sessionTimer, setSessionTimer] = useState(1800);
  const router = useRouter();

  // Session timeout handling
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/protected/profile", {
        method: "GET",
        credentials: "include" // Rely on httpOnly cookies
      });
      
      if (!res.ok) throw new Error("Session expired");
      
      const data = await res.json();
      setUser(data.user);
      setActiveSessions(data.sessions || []);
    } catch (err) {
      setError(err.message);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (sessionTimer <= 0) {
      fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      router.push("/login");
    }
  }, [sessionTimer, router]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchProfile();
      } catch {
        router.push("/login");
      }
    };
    
    checkAuth();
  }, [fetchProfile, router]);

  const handleLogout = async (all = false) => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ all })
      });
      router.push("/login");
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin w-8 h-8 text-blue-500" />
    </div>
  );

  if (!user) return (
    <div className="text-center mt-10">
      <AlertTriangle className="mx-auto w-12 h-12 text-red-500" />
      <p className="mt-4 text-xl">Session expired. Please login again.</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="w-8 h-8" /> Welcome, {user.name}
          </h1>
          <p className="text-gray-600 mt-2">{user.email}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Session expires in: {Math.floor(sessionTimer / 60)}m {sessionTimer % 60}s
          </p>
        </div>
      </div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="w-8 h-8" /> Welcome, {user.name}
          </h1>
          <p className="text-gray-600 mt-2">{user.email}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Session expires in: {Math.floor(sessionTimer / 60)}m {sessionTimer % 60}s
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <Activity className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-gray-600">Practice Sessions</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-gray-600">Average Score</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <Lock className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold">{activeSessions.length}</p>
              <p className="text-gray-600">Active Sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6" /> Security
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Active Sessions</p>
              <p className="text-sm text-gray-600">
                {activeSessions.length} devices logged in
              </p>
            </div>
            <button 
              onClick={() => handleLogout(true)}
              className="text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              Logout All Devices
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6" /> Recent Practice
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Daily Conversation Practice</p>
              <p className="text-sm text-gray-600">Score: 8.5/10</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          {/* Add more activity items */}
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );
}