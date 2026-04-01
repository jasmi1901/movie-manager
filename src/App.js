import React, { useState, useRef, useEffect } from "react";

import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

const API_KEY = "b92fa8bc";

function App() {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [apiMovies, setApiMovies] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [editingMovie, setEditingMovie] = useState(null);
  const [topMessage, setTopMessage] = useState(null);
  const [floatingMessage, setFloatingMessage] = useState(null);
  const [layout, setLayout] = useState("grid");

  const formRef = useRef(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  //  LIVE SEARCH 
  useEffect(() => {
    if (!searchTerm.trim()) {
      setApiMovies([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoadingSearch(true);

        const res = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(
            searchTerm
          )}&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setApiMovies(data.Search);
        } else {
          setApiMovies([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSearch(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  // Show API results OR local movies
  const filteredMovies =
    searchTerm.trim().length > 0
      ? apiMovies
      : movies.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );

  // Add movie
  const addMovie = (movie) => {
    const exists = movies.some(
    (m) => m.title.toLowerCase() === movie.title.toLowerCase()
  );

  if (exists) {
    showTopMessage(`⚠️ "${movie.title}" already exists!`, "error");
    return;
  }
    const newMovie = { ...movie, id: Date.now() };
    setMovies([...movies, newMovie]);
    showTopMessage(`✅ "${movie.title}" added successfully!`, "add");
  };

  // Add movie from API
  const addFromApi = (movie) => {
    addMovie({
      title: movie.Title,
      year: movie.Year,
      genre: movie.Type,
      image: movie.Poster,
    });
  };

  //  Delete movie
  const deleteMovie = (id, e) => {
    const movie = movies.find((m) => m.id === id);
    if (!movie) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + window.scrollY;

    setMovies(movies.filter((m) => m.id !== id));

    showFloatingMessage(`❌ "${movie.title}" deleted`, "delete", x, y);
  };

  // Edit
  const startEdit = (movie) => {
    setEditingMovie(movie);
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const updateMovie = (updatedMovie) => {
    setMovies(
      movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );

    setEditingMovie(null);
    showTopMessage(`✏️ "${updatedMovie.title}" updated`, "update");
  };

  const cancelEdit = () => {
    setEditingMovie(null);
  };

  //  Messages
  const showTopMessage = (text, type = "add") => {
    setTopMessage({ text, type });
    setTimeout(() => setTopMessage(null), 2000);
  };

  const showFloatingMessage = (text, type, x, y) => {
    setFloatingMessage({ text, type, x, y });
    setTimeout(() => setFloatingMessage(null), 2000);
  };

  return (
    <div className="container">
      <Header />

      {/*  SEARCH */}
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

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

      {/* Loading */}
      {loadingSearch && <p className="loading">Searching movies...</p>}

      {/* No results */}
      {searchTerm && !loadingSearch && filteredMovies.length === 0 && (
        <p className="empty">No movies found</p>
      )}

      {/* Messages */}
      {topMessage && (
        <div className={`top-message ${topMessage.type}`}>
          {topMessage.text}
        </div>
      )}

      {floatingMessage && (
        <div
          className={`floating-message ${floatingMessage.type}`}
          style={{
            top: floatingMessage.y,
            left: floatingMessage.x,
          }}
        >
          {floatingMessage.text}
        </div>
      )}

      
      <ItemForm
        ref={formRef}
        addMovie={addMovie}
        editingMovie={editingMovie}
        updateMovie={updateMovie}
        cancelEdit={cancelEdit}
      />

     
      <ItemList
        movies={filteredMovies}
        deleteMovie={deleteMovie}
        startEdit={startEdit}
        layout={layout}
        addFromApi={addFromApi} 
      />

      <Footer />
    </div>
  );
}

export default App;