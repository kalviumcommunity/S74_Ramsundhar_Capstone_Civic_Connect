import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function NewDiscussion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 5 || description.length < 20) {
      alert("Please enter a valid title (min 5 chars) and description (min 20 chars).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/discussion/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ important to send JWT cookie
        body: JSON.stringify({
          title,
          description,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean), // Send as array
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create discussion");
      }

      alert("Discussion created successfully!");
      navigate("/community");
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Start a New Discussion</h1>
          <p className="text-gray-600 mb-8 text-center">
            Share your thoughts, questions, or ideas with the community.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g., How can we improve waste management?"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="Your detailed thoughts..."
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., roads, safety, electricity"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setTags("");
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
                {isSubmitting ? "Posting..." : "Start Discussion"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
