import axios from 'axios';
import allmovies from '../../data.json';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const movieurl = import.meta.env.VITE_MOVIE_API_URL;
const movieapikey = import.meta.env.VITE_MOVIE_API_KEY;

const GetMovieDetails = async (movie) => {
    // console.log("Fetching details for:", movie);
    const movieId = allmovies.find(
        (m) => m.title.trim().toLocaleLowerCase() === movie.trim().toLocaleLowerCase()
    )?.imdb_id;
    if (!movieId) {
        console.warn(`IMDb ID not found for: ${movie}`);
        return null;
    }
    try {
        const response = await axios.get(`${movieurl}/?i=${movieId}&apikey=${movieapikey}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

const GetMoviesData = async (movies) => {
    console.log("Fetching movie data for:", movies);
    try {
        const result = await Promise.all(
            movies.map(async (movie) => {
                const response = await GetMovieDetails(movie);
                return response || null;
            })
        );
        return result.filter(Boolean);
    } catch (error) {
        console.error("Error fetching movies data:", error);
        return [];
    }
};

const RecommendKNN = async (movie) => {
    try {
        const response = await axios.get(`${backendUrl}/recommend/${movie}`);
        const result = await GetMoviesData(response.data?.recommendations || []);
        console.log("Recommendations:", result);
        return result;
    } catch (error) {
        console.error("Error in RecommendKNN:", error);
        return [];
    }
};

const HealthCheck = async () => {
    try {
        const response = await axios.get(`${backendUrl}/`);
        return response.data;
    } catch (error) {
        console.error("Error in HealthCheck:", error);
        return null;
    }
};
export {
    RecommendKNN,
    GetMoviesData,
    GetMovieDetails,
    HealthCheck
};
