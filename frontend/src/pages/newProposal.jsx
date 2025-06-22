import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { isLoggedIn, getLoggedInUser } from "../utils/auth";

export default function NewProposal() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState("");
  const [estimated_time, setEstimatedTime] = useState("");
  const [estimated_budget, setEstimatedBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Correct placement of useEffect
  useEffect(() => {
    if (!isLoggedIn()) {
      alert("Please login first.");
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (
      title.length < 5 ||
      description.length < 30 ||
      impact.length < 15 ||
      !estimated_time ||
      !estimated_budget ||
      !phone
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/improvement/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Cookie-based auth
        body: JSON.stringify({
          title,
          description,
          impact,
          estimated_time,
          estimated_budget,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit proposal.");
      }

      alert("Proposal submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Proposal submission error:", err);
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-6 text-center">Submit Improvement Proposal</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Title (min 5 characters)"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={30}
                rows={4}
                placeholder="Detailed description (min 30 characters)"
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium">Impact</label>
              <textarea
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                required
                minLength={15}
                rows={3}
                placeholder="How will this help the community?"
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Estimated Time (in days)</label>
                <input
                  type="number"
                  value={estimated_time}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Estimated Budget (₹)</label>
                <input
                  type="number"
                  value={estimated_budget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setImpact("");
                  setEstimatedTime("");
                  setEstimatedBudget("");
                  setPhone("");
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
