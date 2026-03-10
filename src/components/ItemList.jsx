import React from "react";
import ItemCard from "./ItemCard";

function ItemList({ movies, deleteMovie, startEdit }) {

  if (movies.length === 0) {
    return <p className="empty">No movies added yet.</p>;
  }

  return (
    <div className="list">

      {movies.map(movie => (
        <ItemCard
          key={movie.id}
          movie={movie}
          deleteMovie={deleteMovie}
          startEdit={startEdit}
        />
      ))}

    </div>
  );
}

export default ItemList;