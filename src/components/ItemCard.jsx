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
      {layout === "list" ? (
        <div className="list-card-inner">
          {/* Image on the left */}
          <img
            src={movie.image || "https://via.placeholder.com/120x160?text=No+Image"}
            alt={movie.title}
            style={{
              width: "120px",
              height: "160px",
              borderRadius: "10px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          <div className="list-card-info">
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
        </div>
      ) : (
        <>
          
          <img
            src={movie.image || "https://via.placeholder.com/220x300?text=No+Image"}
            alt={movie.title}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "10px",
              objectFit: "cover",
            }}
          />
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
        </>
      )}
    </div>
  );
}

export default ItemCard;