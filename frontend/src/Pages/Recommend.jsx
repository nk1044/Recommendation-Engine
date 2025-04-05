import React, { useState, useEffect, useRef } from "react";
import { RecommendKNN } from "../Server/server.js";
import allMovies from '../../data.json';

const Recommend = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const blurTimeout = useRef(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const filteredMovies = allMovies.filter((data) =>
        data?.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredMovies);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setSearchQuery(movie.title);
    setSuggestions([]);
    setMovies([]);
  };

  const handleSubmit = async () => {
    const matchedMovie = allMovies.find(
      (movie) => movie.title.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (!matchedMovie) {
      setErrorMsg("Please select a valid movie from the suggestions.");
      return;
    }

    setSelectedMovie(matchedMovie);
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await RecommendKNN(matchedMovie.title);
      setMovies(response);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setErrorMsg("Something went wrong while fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto mb-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Movie Recommender</h1>
          <p className="text-gray-600">Discover your next favorite film based on your preferences</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search and select a movie..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setErrorMsg("");
                }}
                onBlur={() => {
                  blurTimeout.current = setTimeout(() => setSuggestions([]), 150);
                }}
                onFocus={() => clearTimeout(blurTimeout.current)}
              />

              {suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border rounded-xl shadow-lg mt-1 z-20 max-h-56 overflow-y-auto">
                  {suggestions.map((movie, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                      onClick={() => handleSelectMovie(movie)}
                    >
                      {movie.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!selectedMovie || loading}
              className={`whitespace-nowrap px-6 py-3 rounded-xl text-white font-medium transition-colors duration-150 flex items-center justify-center min-w-36 ${
                !selectedMovie || loading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding Movies...
                </>
              ) : (
                "Get Recommendations"
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              <p>{errorMsg}</p>
            </div>
          )}

          {selectedMovie && !errorMsg && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
              <div className="flex-shrink-0 mr-3">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <p className="text-blue-700 font-medium">
                Selected: <span className="font-bold">{selectedMovie.title}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Results section with improved styling */}
      <div className="max-w-6xl mx-auto">
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-200 rounded-full mb-3"></div>
              <div className="h-4 bg-blue-200 rounded w-32"></div>
            </div>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Recommended Movies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie, index) => (
                <a
                  key={index}
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-102 border border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                      alt={`${movie.Title} poster`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-bold">
                      {movie.imdbRating} 
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {movie.Title} ({movie.Year})
                    </h3>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">{movie.Plot}</p>
                    <div className="text-sm text-gray-600 space-y-2 mt-4">
                      <p className="flex items-start">
                        <span className="font-semibold mr-1 text-gray-700 min-w-16"> Genre:</span> 
                        <span>{movie.Genre}</span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold mr-1 text-gray-700 min-w-16"> Director:</span> 
                        <span>{movie.Director}</span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold mr-1 text-gray-700 min-w-16"> Actors:</span> 
                        <span>{movie.Actors}</span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold mr-1 text-gray-700 min-w-16"> Runtime:</span> 
                        <span>{movie.Runtime}</span>
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-center">
                        <span className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                          View on IMDb →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {!loading && movies.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-xl text-gray-500 mb-2">No recommendations found</p>
            <p className="text-gray-400">Try selecting a different movie</p>
          </div>
        )}
      </div>


    </div>
  );
};

export default Recommend;