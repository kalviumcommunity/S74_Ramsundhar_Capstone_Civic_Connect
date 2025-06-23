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

  // Address Fields
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setpincode] = useState("");
  const [country, setCountry] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword || !role) {
    setMessage("❗ Please fill in all required fields.");
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


  
  // ... the rest stays the same
  if (!street || !city || !state || !pincode || !country) {
  setMessage("❗ Please fill in all address fields.");
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
          role,
          address: [
            {
              street,
              city,
              state,
              pincode: parseInt(pincode) || undefined,
              country
            }
          ]
        }),
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setMessage(`✅ ${data.message}`);
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
      <Header />
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
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded px-3 py-2" />

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2" />

            <select value={role} onChange={(e) => setRole(e.target.value)} required className="w-full border rounded px-3 py-2">
              <option value="citizen">Citizen</option>
              <option value="Admin">Admin</option>
            </select>

            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded px-3 py-2" />

            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full border rounded px-3 py-2" />

            {/* Optional Address */}
            <hr />
            <p className="text-sm text-gray-500 mb-2">Address Details</p>
            <div className="grid grid-cols-2 gap-4">
  <input
    type="text"
    placeholder="Country"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    className="border rounded px-3 py-2 w-full"
    required
  />
  <input
    type="text"
    placeholder="City"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="border rounded px-3 py-2 w-full"
    required
  />
  <input
    type="text"
    placeholder="State"
    value={state}
    onChange={(e) => setState(e.target.value)}
    className="border rounded px-3 py-2 w-full"
    required
  />
    <input
    type="text"
    placeholder="Street"
    value={street}
    onChange={(e) => setStreet(e.target.value)}
    className="border rounded px-3 py-2 w-full"
    required
  />
  <input
    type="number"
    placeholder="Pincode"
    value={pincode}
    onChange={(e) => setpincode(e.target.value)}
    className="border rounded px-3 py-2 w-full"
    required
  />
</div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">Login here</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
