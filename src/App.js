import React, { useState } from "react";

import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [topMessage, setTopMessage] = useState("");
  const [centerMessage, setCenterMessage] = useState("");
  const [centerType, setCenterType] = useState("");
  const [layout, setLayout] = useState("grid");
  
  const addMovie = (movie) => {
    const newMovie = { ...movie, id: Date.now() };
    setMovies([...movies, newMovie]);
    showTopMessage(`✅ "${movie.title}" added successfully!`, "add");
  };

  
  const deleteMovie = (id) => {
    const movie = movies.find((m) => m.id === id); 
    if (!movie) return;
    setMovies(movies.filter((m) => m.id !== id));
    showCenterMessage(`❌ "${movie.title}" deleted.`, "delete");
  };

  
  const startEdit = (movie) => {
    setEditingMovie(movie);
  };

  
  const updateMovie = (updatedMovie) => {
    setMovies(
      movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
    setEditingMovie(null);
    showCenterMessage(`✏️ "${updatedMovie.title}" updated successfully!`, "update");
  };
  
const showTopMessage = (text) => {
  setTopMessage(text);
  setTimeout(() => {
    setTopMessage("");
  }, 2000);
};

const showCenterMessage = (text, type) => {
  setCenterMessage(text);
  setCenterType(type);

  setTimeout(() => {
    setCenterMessage("");
    setCenterType("");
  }, 2500);
};
  
  
  return (
    <div className="container">
      <Header />
    
    
    <div className="top-bar">
    <div className="layout-toggle">
    <button
      onClick={() => setLayout("grid")}
      className={layout === "grid" ? "active" : ""}
    >
     📊 
    </button>
    <button
      onClick={() => setLayout("list")}
      className={layout === "list" ? "active" : ""}
    >
      📋 
    </button>
    </div>
    </div>

    
{topMessage && (
  <div className="top-message">
    {topMessage}
  </div>
)}


{centerMessage && (
  <div className={`message ${centerType}`}>
    {centerMessage}
  </div>
)}  
      

      <ItemForm
        addMovie={addMovie}
        editingMovie={editingMovie}
        updateMovie={updateMovie}
      />

      <ItemList
        movies={movies}
        deleteMovie={deleteMovie}
        startEdit={startEdit}
        layout={layout}
      />

      <Footer />
    </div>
  );
}

export default App;