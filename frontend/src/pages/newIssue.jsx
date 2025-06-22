import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const categories = [
            'Roads & Infrastructure',
            'Water Supply',
            'Electricity',
            'Waste Management',
            'Public Safety',
            'Pollution',
            'Other Issues'
];

const IssueReportForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLocationDetect = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagePreview) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);
    try {
     const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description1", description);
      formData.append("image", image); // the actual file
      formData.append("location", location); // optional if needed on backend

      await axios.post("http://localhost:8000/issue/create", formData, {
        withCredentials: true, // important for cookies if auth is used
      });



      setSuccess(true);
      setTimeout(() => navigate("/issues"), 2000);
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header></Header>
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Report a New Issue</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            className="w-full border rounded px-3 py-2 mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 mt-1"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <div className="flex space-x-2 mt-1">
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location or click detect"
              />
            <button
              type="button"
              onClick={handleLocationDetect}
              className="bg-blue-500 text-white px-3 py-2 rounded"
              >
              Detect
            </button>
          </div>
        </div>

        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1"
            onChange={handleImageChange}
            ref={fileInputRef}
            required
            />
          {imagePreview && (
            <img
            src={imagePreview}
            alt="Preview"
            className="mt-4 h-40 object-contain border rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
          >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>

      {success && (
        <div className="mt-4 text-green-600 font-semibold text-center">
          Issue reported successfully! Redirecting...
        </div>
      )}
    </div>
    <Footer/>
      </>
  );
};

export default IssueReportForm;
