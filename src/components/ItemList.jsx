import React from "react";
import ItemCard from "./ItemCard";

function ItemList({ movies, deleteMovie, startEdit, layout }) {
  if (movies.length === 0) {
    return <p className="empty">No movies added yet.</p>;
  }

  return (
    <div className={layout === "grid" ? "list grid-layout" : "list list-layout"}>
      {movies.map((movie) => (
        <ItemCard
          key={movie.id}
          movie={movie}
          deleteMovie={deleteMovie}
          startEdit={startEdit}
          layout={layout}
        />
      ))}
    </div>
  );
}

export default ItemList;