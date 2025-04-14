import axios from 'axios';
import allmovies from '../../data.json';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const movieurl = import.meta.env.VITE_MOVIE_API_URL;
const movieapikey = import.meta.env.VITE_MOVIE_API_KEY;

const GetMovieDetails = async (movie) => {
    // console.log("Fetching details for:", movie);
    const movieId = allmovies.find(
        (m) => m.title.trim().toLocaleLowerCase() === movie?.trim().toLocaleLowerCase()
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
    // console.log("Fetching movie data for:", movies);
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


const RecommendANN = async ({ title, user_history, negative_history }) => {
  try {
    // Limit negative_history to a maximum of 20 random elements
    let negativeSample = negative_history || [];
    if (negativeSample.length > 20) {
      negativeSample = negativeSample
        .sort(() => 0.5 - Math.random()) // shuffle
        .slice(0, 20); // take first 20
    }

    const response = await axios.post(`${backendUrl}/recommend-ann`, {
      movie_name: title,
      user_history: user_history || [],
      negative_history: negativeSample || [],
    });

    const result = await GetMoviesData(response.data || []);
    return result;
  } catch (error) {
    console.error("Error in RecommendANN:", error);
    return [];
  }
};



const RecommendKNN = async ({title, model="knn"}) => {
    if (!title) {
        console.warn("Title is required for recommendation");
        return [];
    }
    if(model=='ann') {
        return await RecommendANN({title, user_history: [], negative_history: []});
    }
    try {
      const response = await axios.post(`${backendUrl}/recommend`, {
        "movie_name": title,
        "model": model
      });
      const result = await GetMoviesData(response.data || []);
    //   console.log("Recommendations:", response.data);
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
    RecommendANN,
    GetMoviesData,
    GetMovieDetails,
    HealthCheck
};
