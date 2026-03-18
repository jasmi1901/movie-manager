import React, { useState } from "react";
import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [message, setMessage] = useState("");       
  const [messageType, setMessageType] = useState("");
  const [layout, setLayout] = useState("grid");
  
  const addMovie = (movie) => {
    const newMovie = { ...movie, id: Date.now() };
    setMovies([...movies, newMovie]);
    showMessage(`✅ "${movie.title}" added successfully!`, "add");
  };

  
  const deleteMovie = (id) => {
    const movie = movies.find((m) => m.id === id); 
    if (!movie) return;
    setMovies(movies.filter((m) => m.id !== id));
    showMessage(`❌ "${movie.title}" deleted.`, "delete");
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
    showMessage(`✏️ "${updatedMovie.title}" updated successfully!`, "update");
  };

  
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
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

      
      {message && <p className={`message ${messageType}`}>{message}</p>}

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