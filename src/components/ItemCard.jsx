import React from "react";

const genreColors = {
  Action: "#f44336",
  Drama: "#2196f3",
  Comedy: "#ff9800",
  Romance: "#e91e63",
  Thriller: "#9c27b0",
  Horror: "#607d8b",
  Adventure: "#4caf50",
  "Sci-Fi": "#00bcd4",
  Historical: "#795548",
  Musical: "#ff5722",
};

function ItemCard({ movie, deleteMovie, startEdit, layout }) {
  const badgeColor = genreColors[movie.genre] || "#333";

  return (
    <div className={`card ${layout === "list" ? "list-card" : ""}`}>
      <h3>{movie.title}</h3>
      <p>
        <span className="genre-badge" style={{ backgroundColor: badgeColor }}>
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