import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const email = storedUser?.email;

    if (!email) {
      setError("No email found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/user/profile/${email}`,
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg font-semibold">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
      </div>
    );

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen py-12 px-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-blue-600 flex items-center justify-center p-6">
              <div className="text-white text-5xl font-bold uppercase rounded-full bg-blue-800 w-20 h-20 flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
            </div>
            <div className="p-6">
              <h1 className="block mt-1 text-3xl leading-tight font-semibold text-gray-900">
                {user.name}
              </h1>
              <p className="mt-2 text-gray-600 flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                  <path d="M12 14v7" />
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                </svg>
                <span>{user.email}</span>
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Address:</strong> {user.address || "N/A"}
              </p>

              <button
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
