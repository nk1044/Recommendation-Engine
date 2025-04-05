import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const movieurl = import.meta.env.VITE_MOVIE_API_URL;
const movieapikey = import.meta.env.VITE_MOVIE_API_KEY;

const GetMovieDetailsFromId = (movieId) => {
    try {
        axios.get(`${movieurl}/i=${movieId}&apikey=${movieapikey}`).then((response) => {
            const movieDetails = response.data;
            return movieDetails;
        });
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}

const GetMovieDetails = async (movie) => {
    try {
        const response = GetMovieDetailsFromId(movie);
        const movieDetails = response.data;
        return movieDetails;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}

const RecommendKNN = async (movie) => {
    try {
        const response = await axios.get(`${backendUrl}/recommend/${movie}`);
        console.log(response.data);
        return response.data?.recommendations || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export {
    RecommendKNN,
}