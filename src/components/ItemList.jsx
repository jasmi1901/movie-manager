import React from "react";
import ItemCard from "./ItemCard";

function ItemList({ movies, deleteMovie, startEdit, layout, addFromApi }) {
  if (movies.length === 0) {
    return <p className="empty">No movies added yet.</p>;
  }

  return (
    <div className={layout === "grid" ? "list grid-layout" : "list list-layout"}>
      {movies.map((movie) => (
        <ItemCard
          key={movie.id || movie.imdbID}
          movie={movie}
          deleteMovie={deleteMovie}
          startEdit={startEdit}
          layout={layout}
          addFromApi={addFromApi} 
        />
      ))}
    </div>
  );
}

export default ItemList;