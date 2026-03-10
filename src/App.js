import React, { useState } from "react";
import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

function App() {

  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  const addMovie = (movie) => {
    const newMovie = { ...movie, id: Date.now() };
    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const startEdit = (movie) => {
    setEditingMovie(movie);
  };

  const updateMovie = (updatedMovie) => {
    setMovies(
      movies.map(movie =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
    setEditingMovie(null);
  };

  return (
    <div className="container">
    <div className="container">

      <Header />

      <ItemForm
        addMovie={addMovie}
        editingMovie={editingMovie}
        updateMovie={updateMovie}
      />

      <ItemList
        movies={movies}
        deleteMovie={deleteMovie}
        startEdit={startEdit}
      />

    </div>

    <Footer /> 
    </div>
  );
}

export default App;