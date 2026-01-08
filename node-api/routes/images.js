import express from "express";
import multer from "multer";
import Image from "../models/Image.js";
import path from "path";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST — Upload image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("➡️ Upload request received");

    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save to MongoDB
    const image = await Image.create({
  title: req.body.name || req.file.originalname,
  url: `/uploads/${req.file.filename}`
});

   console.log("✅ Image saved to DB");

    res.status(201).json(image);
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// GET — All images
router.get("/", async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json(images);
});

// DELETE — Remove image
router.delete("/:id", async (req, res) => {
  await Image.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
