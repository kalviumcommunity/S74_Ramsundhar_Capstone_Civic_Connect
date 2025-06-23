import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const AllDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await axios.get("http://localhost:8000/discussion/all");
        setDiscussions(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load discussions.");
        setLoading(false);
      }
    };
    fetchDiscussions();
  }, []);

  if (loading) return <p>Loading discussions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">All Discussions</h2>
        {discussions.length === 0 ? (
          <p>No discussions found.</p>
        ) : (
          <ul className="space-y-4">
            {discussions.map((d) => (
              <Link
                key={d._id}
                to={`/discussion/${d._id}`}
                className="block bg-white border rounded-md p-4 hover:bg-gray-50 transition"
              >
                <h2 className="font-medium text-lg mb-1">{d.title}</h2>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="font-semibold text-gray-700">{d.user?.name || "Anonymous"}</span>
                  <span>•</span>
                  <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{d.commentCount || 0} comments</span>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllDiscussions;
