import { useState } from "react";
import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("citizen");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    setMessage("❗ Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    setMessage("❗ Passwords do not match.");
    return;
  }

  if (password.length < 8) {
    setMessage("❗ Password must be at least 8 characters.");
    return;
  }

  setIsSubmitting(true);
  setMessage("");

  try {
  const res = await fetch("http://localhost:8000/user/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    email,
    password,
    confirmPassword,
    role
  }),
  credentials: "include" // if you're using cookies
});


    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    setMessage(`✅ ${data.message}`);
    // Optional: redirect to login
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  } catch (error) {
    console.error("Signup error:", error);
    setMessage(`❌ ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};

  return (

    <>
    <Header></Header>
    
    
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow p-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-2">
            👤
          </div>
          <h2 className="text-2xl font-bold text-blue-700">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your information to register
          </p>
        </div>

        {message && (
          <div className="text-sm text-center text-red-500 mb-4">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="citizen">Citizen</option>
              <option value="official">Government Official</option>
              <option value="moderator">Moderator</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {role === "citizen" && "Report issues and vote on improvements."}
              {role === "official" && "Manage and respond to reported issues."}
              {role === "moderator" && "Review and verify community content."}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>

    <Footer/>
    </>

  );
}
