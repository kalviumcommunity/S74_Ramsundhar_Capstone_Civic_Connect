import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ImprovementsList() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProposals = async () => {
    try {
      const res = await fetch("http://localhost:8000/improvement/improvements");
      const data = await res.json();
      setProposals(data);
    } catch (err) {
      console.error("Failed to load improvements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("LocalStorage token:", localStorage.getItem("token"));
    console.log("LocalStorage userId:", localStorage.getItem("userId"));

    fetchProposals();
  }, []);

  const handleVote = async (id) => {
  const token = localStorage.getItem("token"); // You already store this at login

  if (!token) {
    alert("Please login to vote");
    return;
  }

  try {
    const res = await fetch(`http://localhost:8000/improvement/${id}/vote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Auth header required
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Vote failed");
      return;
    }

    fetchProposals(); // ✅ Refresh proposals after voting
  } catch (err) {
    console.error("Vote error:", err);
    alert("Voting failed. Try again later.");
  }
};


  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          All Improvement Proposals
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {proposals.map((item) => {
              const userId = localStorage.getItem("userId");

              const alreadyVoted = item.votes?.some((v) => {
                if (typeof v === "object" && v._id) return v._id === userId;
                return v === userId;
              });

              return (
                <div key={item._id} className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl font-semibold text-blue-800">{item.title}</h2>
                  <p className="text-gray-700 mt-2">{item.description}</p>
                  <p className="text-sm text-gray-500 mt-1">Impact: {item.impact}</p>
                  <p className="text-sm text-gray-500">Time: {item.estimated_time} days</p>
                  <p className="text-sm text-gray-500">Budget: ₹{item.estimated_budget}</p>
                  <p className="text-sm text-gray-500">Phone: {item.phone}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <button
                      onClick={() => handleVote(item._id)}
                      disabled={alreadyVoted}
                      className={`px-3 py-1 text-sm rounded text-white ${
                        alreadyVoted
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {alreadyVoted ? "Voted" : "Vote"}
                    </button>
                    <p className="text-sm text-gray-700">{item.votes?.length || 0} votes</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
