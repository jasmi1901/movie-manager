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

function ItemCard({
  movie,
  deleteMovie,
  startEdit,
  layout,
  addFromApi,
}) {
  // Detect if movie is from API (no id yet)
  const isApiMovie = !movie.id;

  // Normalize data (API vs local)
  const title = movie.title || movie.Title;
  const year = movie.year || movie.Year;
  const genre = movie.genre || movie.Type || "Unknown";
  const image =
    movie.image ||
    movie.Poster ||
    "https://via.placeholder.com/220x300?text=No+Image";

  const badgeColor = genreColors[genre] || "#333";

  return (
    <div className={`card ${layout === "list" ? "list-card" : ""}`}>
      
      {/* LIST VIEW */}
      {layout === "list" ? (
        <div className="list-card-inner">
          <img
            src={image}
            alt={title}
            style={{
              width: "120px",
              height: "160px",
              borderRadius: "10px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          <div className="list-card-info">
            <h3>{title}</h3>

            <p>
              <span
                className="genre-badge"
                style={{ backgroundColor: badgeColor }}
              >
                {genre}
              </span>
            </p>

            <p>Year: {year}</p>

            <div className="buttons">
              {isApiMovie ? (
                <button onClick={() => addFromApi(movie)}>
                  ➕ Add
                </button>
              ) : (
                <>
                  <button onClick={() => startEdit(movie)}>
                    Edit
                  </button>
                  <button onClick={(e) => deleteMovie(movie.id, e)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* GRID VIEW */}
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "10px",
              objectFit: "cover",
            }}
          />

          <h3>{title}</h3>

          <p>
            <span
              className="genre-badge"
              style={{ backgroundColor: badgeColor }}
            >
              {genre}
            </span>
          </p>

          <p>Year: {year}</p>

          <div className="buttons">
            {isApiMovie ? (
              <button onClick={() => addFromApi(movie)}>
                ➕ Add
              </button>
            ) : (
              <>
                <button onClick={() => startEdit(movie)}>
                  Edit
                </button>
                <button onClick={(e) => deleteMovie(movie.id, e)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ItemCard;