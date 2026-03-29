import React, { useState, useRef, useEffect  } from "react";

import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState(() => {
  const saved = localStorage.getItem("movies");
  return saved ? JSON.parse(saved) : [];
});
 
  
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMovie, setEditingMovie] = useState(null);
  const [topMessage, setTopMessage] = useState(null);
  const [floatingMessage, setFloatingMessage] = useState(null);
  const [layout, setLayout] = useState("grid");
  
  const formRef = useRef(null);
  
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

 const filteredMovies = movies.filter((movie) =>
  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const addMovie = (movie) => {
    const newMovie = { ...movie, id: Date.now() };
    setMovies([...movies, newMovie]);
    showTopMessage(`✅ "${movie.title}" added successfully!`, "add");
  };

  const deleteMovie = (id, e) => {
  const movie = movies.find((m) => m.id === id);
  if (!movie) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + window.scrollY; 

  setMovies(movies.filter((m) => m.id !== id));

  showFloatingMessage(
    `❌ "${movie.title}" deleted`,
    "delete",
    x,
    y
  );
};
  
  
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

   showTopMessage(
      `✏️ "${updatedMovie.title}" updated`,
      "update");
  
};
  
const showTopMessage = (text, type = "add") => {
  setTopMessage({ text, type });
  setTimeout(() => {
    setTopMessage(null);
  }, 2000);
};

const showFloatingMessage = (text, type, x, y) => {
  setFloatingMessage({ text, type, x, y });

  setTimeout(() => {
    setFloatingMessage(null);
  }, 2000);
};
  
  
  return (
    <div className="container">
      <Header />
    
    <div className="top-controls">
    <input
      type="text"
       placeholder="Search movies..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
/>
    
    <div className="layout-toggle">
    <button onClick={() => setLayout("grid")}
      className={layout === "grid" ? "active" : ""}
    >
     📊 
    </button>
    <button onClick={() => setLayout("list")}
      className={layout === "list" ? "active" : ""}
    >
      📋 
    </button>
    </div>
    </div>

    
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
      />

      <ItemList
        movies={filteredMovies}
        deleteMovie={deleteMovie}
        startEdit={startEdit}
        layout={layout}
      />

      <Footer />
    </div>
  );
}

export default App;