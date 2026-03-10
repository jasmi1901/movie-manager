import React, { useState, useEffect } from "react";

function ItemForm({ addMovie, editingMovie, updateMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title);
      setGenre(editingMovie.genre);
      setYear(editingMovie.year);
    }
  }, [editingMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !genre || !year) {
      alert("Please fill all fields");
      return;
    }

    const movieData = { title, genre, year };

    if (editingMovie) {
      updateMovie({ ...movieData, id: editingMovie.id });
    } else {
      addMovie(movieData);
    }

    setTitle("");
    setGenre("");
    setYear("");
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
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Historical">Historical</option>
        <option value="Musical">Musical</option>
        <option value="Tamil Action">Tamil Action</option>
        <option value="Tamil Drama">Tamil Drama</option>
        <option value="Tamil Romance">Tamil Romance</option>
      </select>

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button type="submit">{editingMovie ? "Update Movie" : "Add Movie"}</button>
    </form>
  );
}

export default ItemForm;