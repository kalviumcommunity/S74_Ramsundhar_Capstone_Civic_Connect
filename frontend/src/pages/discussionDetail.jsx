import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function DiscussionDetail() {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const fetchDiscussion = async () => {
    try {
      const res = await fetch(`http://localhost:8000/discussion/${id}`);
      const data = await res.json();
      setDiscussion(data);
    } catch (err) {
      setError("Failed to fetch discussion");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:8000/comment/${id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Fetch Comments Error:", err);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8000/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // required for sending cookies (auth)
        body: JSON.stringify({ content: newComment }),
      });

      if (res.ok) {
        setNewComment("");
        fetchComments(); // refresh comments
      } else {
        alert("Login required to post a comment.");
      }
    } catch (err) {
      console.error("Submit Comment Error:", err);
    }
  };

  useEffect(() => {
    fetchDiscussion();
    fetchComments();
  }, [id]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!discussion) return <p className="p-4">Loading discussion...</p>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
        <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow">
          <Link to="/community" className="text-blue-500 text-sm underline mb-4 inline-block">
            ← Back to Community
          </Link>
          <h1 className="text-2xl font-bold mb-1">{discussion.title}</h1>
          <p className="text-sm text-gray-600 mb-6">
            {discussion.user?.name || "Anonymous"} •{" "}
            {new Date(discussion.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-800 mb-8">{discussion.description}</p>

          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500 mb-4">No comments yet.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {comments.map((c) => (
                <li key={c._id} className="border p-3 rounded-md bg-gray-50">
                  <p className="text-sm mb-1">
                    <span className="font-medium">{c.user?.name || "User"}</span>{" "}
                    <span className="text-gray-500 text-xs">
                      ({new Date(c.createdAt).toLocaleString()})
                    </span>
                  </p>
                  <p className="text-gray-800">{c.content}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border p-3 rounded-md min-h-[100px]"
            />
            <button
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
