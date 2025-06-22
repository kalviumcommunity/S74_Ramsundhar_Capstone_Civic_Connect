import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PlusCircle, Search, MapPin } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("http://localhost:8000/issue/all", {
          withCredentials: true, // If your backend uses cookies/auth
        });
        setIssues(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching issues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    const filteredData = issues.filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description1.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredData);
  }, [searchTerm, issues]);

  return (
    <>
     <Header></Header>
    

    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Community Issues</h1>
            <p className="text-gray-600 mt-1">
              Browse and track issues reported by citizens
            </p>
          </div>
          <Link
            to="/report"
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Report New Issue
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search issues..."
            className="w-full pl-10 pr-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Issue List */}
        {loading ? (
          <p>Loading issues...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium mb-1">No issues found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try a different search term."
                : "Be the first to report an issue."}
            </p>
            <Link
              to="/report"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Report an Issue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((issue) => (
              <div
                key={issue._id}
                className="bg-white rounded-lg shadow p-4 border"
              >
            <img
              src={issue.image ? `http://localhost:8000${issue.image}` : "/placeholder.jpg"}
              alt={issue.title}
              className="w-full h-40 object-cover rounded mb-3"
              onError={(e) => (e.target.src = "/placeholder.jpg")}
            />

                <h2 className="text-xl font-semibold">{issue.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {issue.description1}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {issue.category}
                </p>
                <p className="text-sm text-gray-500">
                  Reported by: {issue?.user?.name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
        <Footer/>
    </>
   
  );
}
