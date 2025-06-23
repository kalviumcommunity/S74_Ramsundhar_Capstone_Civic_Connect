import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, PlusCircle, Search, TrendingUp, ArrowUp } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";


export default function CommunityHubStandalone() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/discussion/all")
      .then(res => res.json())
      .then(data => setDiscussions(data));

    fetch("http://localhost:8000/improvement/improvements")
      .then(res => res.json())
      .then(data => setTrending(data));
  }, []);

  const handleVote = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/improvement/${id}/vote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ This sends the JWT cookie
    });

    if (!res.ok) throw new Error("Voting failed");

    // ✅ Refresh trending proposals
    const updatedRes = await fetch("http://localhost:8000/improvement/improvements");
    const updatedData = await updatedRes.json();
    setTrending(updatedData);
  } catch (error) {
    console.error("Vote error:", error);
    alert("Voting failed. Try again later.");
  }
};


  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Community Hub</h1>
              <p className="text-gray-500 mt-1">
                Connect with your community and collaborate on improvement projects
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => navigate("/newdiscussion")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Start Discussion
              </button>
              <button
                onClick={() => navigate("/newproposal")}
                className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> New Proposal
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute top-2.5 left-3 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
              placeholder="Search discussions and proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-4">
            <button onClick={() => navigate("/discussion")} className="bg-white border rounded-md px-4 py-2 text-sm font-medium">Discussions</button>
            <button onClick={() => navigate("/improvements")} className="bg-gray-100 border rounded-md px-4 py-2 text-sm font-medium">Improvement Proposals</button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Discussions List */}
            <div className="md:col-span-2 space-y-4">
              {discussions
                .filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((d) => (
                      <Link
                        key={d._id}
                        to={`/discussion/${d._id}`}
                        className="block bg-white border rounded-md p-4 hover:bg-gray-50 transition"
                      >
                        <h2 className="font-medium text-lg mb-1">{d.title}</h2>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <span className="font-semibold text-gray-700">
                            {d.user?.name || "Anonymous"}
                          </span>
                          <span>•</span>
                          <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                        </div>
                      </Link>

                ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Proposals */}
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                <h3 className="flex items-center text-sm font-semibold text-orange-800 mb-4">
                  <TrendingUp className="w-4 h-4 mr-2" /> Trending Proposals
                </h3>
                {trending.map((t) => (
                  <div key={t._id} className="border-b border-orange-200 pb-2 mb-2 last:border-none last:mb-0">
                    <p className="font-medium text-sm text-gray-900">{t.title}</p>
                    <p className="text-xs text-orange-700 flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" /> {t.votes?.length || 0} votes
                    </p>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


