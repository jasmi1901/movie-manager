import React from "react";

// Assign colors for different genres
const genreColors = {
  Action: "#f44336",
  Drama: "#2196f3",
  Comedy: "#ff9800",
  Romance: "#e91e63",
  Thriller: "#9c27b0",
  Horror: "#607d8b",
  "Sci-Fi": "#00bcd4",
  Historical: "#795548",
  Musical: "#ff5722",
  "Tamil Action": "#d32f2f",
  "Tamil Drama": "#1976d2",
  "Tamil Romance": "#c2185b",
};

function ItemCard({ movie, deleteMovie, startEdit }) {
  const badgeColor = genreColors[movie.genre] || "#333";

  return (
    <div className="card">
      <h3>{movie.title}</h3>
      <p>
        <span
          className="genre-badge"
          style={{ backgroundColor: badgeColor }}
        >
          {movie.genre}
        </span>
      </p>
      <p>Year: {movie.year}</p>
      <div className="buttons">
        <button onClick={() => startEdit(movie)}>Edit</button>
        <button onClick={() => deleteMovie(movie.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ItemCard;