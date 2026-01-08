import axios from "axios";

// Dynamically set base URL
const API_BASE = import.meta.env.VITE_API_URL || "http://node-api:5000";

const API = axios.create({
  baseURL: BASE_URL,
});

// GET all images
export const getImages = () => API.get("/api/images");

// POST an image
export const uploadImage = (formData) =>
  API.post("/api/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// DELETE an image
export const deleteImage = (id) => API.delete(`/api/images/${id}`);

export default API_BASE;
