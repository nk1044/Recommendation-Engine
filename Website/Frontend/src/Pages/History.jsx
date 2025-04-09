import React, { useState, useEffect, useRef } from "react";
import { RecommendKNN, RecommendANN } from "../Server/server.js";
import allMovies from "../../data.json";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  // Added missing selectedModel state
  const [selectedModel, setSelectedModel] = useState("ANN");
  const blurTimeout = useRef(null);
  const suggestionRef = useRef(null);
  
  // Initialize states from localStorage
  const [UserHistory, setUserHistory] = useState(() => {
    const storedHistory = localStorage.getItem('userHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  
  const [NegativeHistory, setNegativeHistory] = useState(() => {
    const storedNegative = localStorage.getItem('negativeHistory');
    return storedNegative ? JSON.parse(storedNegative) : [];
  });

  // Fixed list of genres
  const genres = [
    "drama",
    "comedy",
    "thriller",
    "action",
    "adventure",
    "romance",
    "crime",
    "science fiction",
    "horror"
  ];

  // Filter recommendations based on selected genres
  const filterByGenres = (movies, genreList) => {
    if (!genreList.length) return movies;
    
    return movies.filter(movie => {
      if (!movie.Genre) return false;
      
      const movieGenres = movie.Genre.toLowerCase();
      return genreList.some(genre => movieGenres.includes(genre.toLowerCase()));
    });
  };

  const HandleHistory = (movie) => {
    console.log("Movie clicked:", movie);
    
    // Update state with functional update to ensure we use the latest state
    setUserHistory(prev => {
      const updatedHistory = [...prev, movie];
      localStorage.setItem('userHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
    
    setNegativeHistory(prev => {
      const updatedNegative = prev.filter(m => m !== movie);
      localStorage.setItem('negativeHistory', JSON.stringify(updatedNegative));
      return updatedNegative;
    });
  };

  // Update filtered recommendations whenever recommendations or selected genres change
  useEffect(() => {
    setFilteredRecommendations(filterByGenres(recommendations, selectedGenres));
  }, [recommendations, selectedGenres]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      let filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSuggestions(filtered.slice(0, 10)); // limit suggestions
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSelect = (movie) => {
    setSelectedMovie(movie);
    setSearchQuery(movie.title);
    setSuggestions([]);
    setRecommendations([]);
    setFilteredRecommendations([]);
    setErrorMsg("");
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prevGenres => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter(g => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    // Clear previous recommendations when changing models
    if (selectedMovie) {
      setRecommendations([]);
      setFilteredRecommendations([]);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await RecommendANN({
        user_history: UserHistory, // Use state directly instead of accessing localStorage
        negative_history: NegativeHistory
      });
      
      // Extract movie titles and update NegativeHistory
      const movieTitles = res.map(movie => movie.Title);
      setNegativeHistory(movieTitles);
      localStorage.setItem('negativeHistory', JSON.stringify(movieTitles));
      
      setRecommendations(res);
      // Filtered results will be updated by the useEffect
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#fee7f0]">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-futura font-extrabold text-[#c56443] text-center mb-8">
          History Based Recommendation
        </h1>
       
        <div className="bg-white p-6 rounded-2xl shadow-lg">

          {/* Genre selection section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Filter by Genres (Optional)
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedGenres.includes(genre)
                      ? "bg-[#f77d81] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleSubmit}
              className={`w-full px-6 py-3 rounded-xl text-white font-medium transition-colors duration-150
                bg-[#f79a9a] hover:bg-[#e48e8e] cursor-pointer
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="inline animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Refresh Recommendations"
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {errorMsg}
            </div>
          )}

          {selectedMovie && !errorMsg && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">
              <div className="flex flex-wrap gap-2 items-center">
                <span><strong>Selected Movie:</strong> {selectedMovie.title}</span>
                <span className="border-l border-blue-300 pl-2">
                  <strong>Model:</strong> {selectedModel === "content Based filtering" ? "Content Based" : selectedModel.toUpperCase()}
                </span>
                {selectedGenres.length > 0 && (
                  <span className="border-l border-blue-300 pl-2">
                    <strong>Genres:</strong> {selectedGenres.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(", ")}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="max-w-6xl mx-auto">
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-pulse text-blue-600 font-semibold text-lg">
              Finding movies for you using your search history
            </div>
          </div>
        )}

        {!loading && recommendations.length > 0 && (
          <div className="mb-10">
            
            {filteredRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecommendations.map((movie, idx) => (
                  <a
                    key={idx}
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:scale-105 border border-gray-100"
                    onClick={() => HandleHistory(movie.Title)}
                 >
                    <div className="relative">
                      <img
                        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                        alt={`${movie.Title} Poster`}
                        className="w-full h-64 object-cover rounded-t-xl"
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
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Genre:</strong> {movie.Genre}</p>
                        <p><strong>Director:</strong> {movie.Director}</p>
                        <p><strong>Actors:</strong> {movie.Actors}</p>
                        <p><strong>Runtime:</strong> {movie.Runtime}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t text-center text-blue-600 font-medium hover:text-blue-800 transition">
                        View on IMDb →
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
                <p>No movies match your selected genres. Try selecting different genres.</p>
              </div>
            )}
          </div>
        )}

        {!loading && recommendations.length === 0 && selectedMovie && (
          <div className="text-center py-16 text-gray-400">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12a9 9 0 100-18 9 9 0 000 18z"
              />
            </svg>
            <p>No recommendations available with the current settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;