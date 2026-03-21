import React, { useState, useEffect } from "react";

const API_KEY = "b92fa8bc"; 

function ItemForm({ addMovie, editingMovie, updateMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title);
      setGenre(editingMovie.genre);
      setYear(editingMovie.year);
      setImage(editingMovie.image || "");
    }
  }, [editingMovie]);

  
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

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !genre || !year) {
      alert("Please fill all fields");
      return;
    }

    if (year < 1888 || year > new Date().getFullYear()) {
      alert("Enter a valid movie year");
      return;
    }

    const movieData = { title, genre, year, image };

    if (editingMovie) {
      updateMovie({ ...movieData, id: editingMovie.id });
    } else {
      addMovie(movieData);
    }

    // Reset form
    setTitle("");
    setGenre("");
    setYear("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
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

      
      {loading ? (
        <p>Loading poster...</p>
      ) : image ? (
        <img
          src={image}
          alt="Movie Poster"
          
        />
      ) : null}

      <button type="submit">
        {editingMovie ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
}

export default ItemForm;