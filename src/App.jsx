import React, { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery";
import { getImages, uploadImage } from "./api";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch images
  const fetchImages = async () => {
    try {
      const res = await getImages();
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", title || file.name);

    setLoading(true);
    try {
      await uploadImage(formData);
      setFile(null);
      setTitle("");
      fetchImages();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Could not upload image");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/images/${id}`, {
        method: "DELETE",
      });
      fetchImages();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Advanced Image Viewer</h1>

      {/* Upload Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Image title"
          value={title}
          onChange={handleTitleChange}
          style={{ marginRight: "10px" }}
        />

        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginRight: "10px" }}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={images} setImages={setImages} />

<h3>{image.name}</h3>

            <button onClick={() => handleDelete(image._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
