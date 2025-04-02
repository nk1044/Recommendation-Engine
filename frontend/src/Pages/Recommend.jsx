import React, { useState, useEffect } from "react";
import { GetMovieTitle } from "../../public/titles.js";

const Recommend = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const allMovies = GetMovieTitle();

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const filteredMovies = allMovies.filter((title) =>
        title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredMovies);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, allMovies]);

  // Select a movie and fetch recommendations
  const handleSelectMovie = async (movie) => {
    setSelectedMovie(movie);
    setSuggestions([]);
    setSearchQuery(movie);

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie }),
      });
      const data = await response.json();
      setMovies(data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="relative w-2/3 mx-auto">
        <input
          type="text"
          placeholder="Search and select a movie..."
          className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-lg shadow-md mt-1 z-10 max-h-48 overflow-y-auto">
            {suggestions.map((movie, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelectMovie(movie)}
              >
                {movie}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Movie */}
      {selectedMovie && (
        <div className="mt-4 text-center">
          <span className="text-lg font-semibold text-blue-600">
            Selected Movie: {selectedMovie}
          </span>
        </div>
      )}

      {/* Recommended Movies */}
      <div className="grid grid-cols-3 gap-6 mt-6 mx-auto max-w-5xl">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div
              key={index}
              className="border rounded-lg p-5 bg-white shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="h-40 bg-gray-300 rounded-md mb-3"></div>
              <h3 className="font-bold text-lg text-gray-800">{movie.title}</h3>
              <p className="text-sm text-gray-600">{movie.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No recommendations found
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>MovieRecommend</p>
        <p>Discover top movie picks tailored for you!</p>
      </footer>
    </div>
  );
};

export default Recommend;
