import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen"); // Default to lowercase for consistency
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      

    // ✅ Log the user data to console
    console.log("Login successful! User data:", data);

    // ✅ Save user in localStorage
    localStorage.setItem("user", JSON.stringify({
  userId: data.user.userId,
  name: data.user.name,
  email: data.user.email,
  role: data.user.role
}));


    alert("Login successful");
    navigate("/");


      // ✅ Redirect based on role
      if (role === "official") {
        navigate("/official/dashboard");
      } else if (role === "moderator") {
        navigate("/moderator");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-1">Welcome Back</h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                {role === "citizen" && "Report issues and vote on proposals"}
                {role === "official" && "Resolve issues as a government official"}
                {role === "moderator" && "Manage content and maintain quality"}
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up now
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
