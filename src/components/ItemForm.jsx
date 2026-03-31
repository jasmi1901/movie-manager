import React, { useState, useEffect, forwardRef } from "react";

const API_KEY = "b92fa8bc";

const ItemForm = forwardRef(({ addMovie, editingMovie, updateMovie }, ref) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
      setTitle("");
      setGenre("");
      setYear("");
      setImage("");
      setError("");
    };


  // 🟡 Fill form when editing
  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title);
      setGenre(editingMovie.genre);
      setYear(editingMovie.year);
      setImage(editingMovie.image || "");
    }
  }, [editingMovie]);

  // 🟡 Auto fetch poster from OMDB
  useEffect(() => {
    if (!title) return;

    const delay = setTimeout(() => {
      const fetchMovieImage = async () => {
        try {
          setLoading(true);

          const res = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
          );
          const data = await res.json();

          if (data.Response === "True" && data.Poster && data.Poster !== "N/A") {
            setImage(data.Poster);
            if (!year) setYear(data.Year);
          } else {
            setImage("");
          }
        } catch (err) {
          console.error("Error fetching movie:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchMovieImage();
    }, 600);

    return () => clearTimeout(delay);
  }, [title, year]);

  // 🟢 Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !genre || !year.trim()) {
      setError("⚠️ All fields are required");
      return;
    }
    
    setError("");

    const movieData = { title, genre, year, image };

    if (editingMovie) {
      updateMovie({ ...movieData, id: editingMovie.id });
    } else {
      addMovie(movieData);
    }

    resetForm();
    
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="form">

     {error && <div className="error">{error}</div>}

      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Select Genre</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Romance">Romance</option>
        <option value="Thriller">Thriller</option>
        <option value="Horror">Horror</option>
        <option value="Adventure">Adventure</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Historical">Historical</option>
        <option value="Musical">Musical</option>
      </select>

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      {/* Poster Preview */}
      {loading ? (
        <p className="loading">Loading poster...</p>
      ) : image ? (
        <img
          src={image}
          alt="Movie Poster"
          className="preview-img"
        />
      ) : null}

      <button type="submit">
        {editingMovie ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
});

export default ItemForm;