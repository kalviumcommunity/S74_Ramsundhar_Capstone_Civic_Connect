import React, { useEffect, useState } from "react";
import axios from "axios";
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
    <Header></Header>
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Discussions</h2>
      {discussions.length === 0 ? (
        <p>No discussions found.</p>
      ) : (
        <ul className="space-y-4">
          {discussions.map((discussion) => (
            <li key={discussion._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{discussion.title}</h3>
              <p>{discussion.content}</p>
              <small className="text-gray-500">Posted by: {discussion.user?.name || "Anonymous"}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
    <Footer/>
    </>

  );
};

export default AllDiscussions;
