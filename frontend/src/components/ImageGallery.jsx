function ImageGallery({ images, setImages }) {
  const deleteImage = async (id) => {
    await fetch(`http://localhost:5000/api/images/${id}`, {
      method: "DELETE",
    });
    setImages(images.filter((img) => img._id !== id));
  };
   console.log("Images received:", images);

  if (images.length === 0) {
    return <p style={{ textAlign: "center" }}>No images uploaded yet</p>;
  }

  return (
    <div className="gallery">
      {images.map((img) => (
        <div className="image-card" key={img._id}>
          <img
            src={`http://localhost:5000${img.url}`}
            alt={img.title}
          />
          <h3>{img.title}</h3>

          <button
            className="delete-btn"
            onClick={() => deleteImage(img._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
