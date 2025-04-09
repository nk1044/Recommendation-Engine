from scipy.spatial.distance import euclidean
import numpy as np
import pandas as pd

def recommend_movies(movie_name, df, feature_matrix, expected_language=None, genre_filter=None, top_n=5):
    
    
    if movie_name not in df['title'].values:
        return "Movie not found in dataset. Try another one."
    
    # Find index of the given movie
    movie_idx = df[df['title'] == movie_name].index[0]
    # Compute Euclidean distances between the given movie and all others
    distances = [euclidean(feature_matrix[movie_idx], feature_matrix[i]) for i in range(len(df))]
    
    sorted_indices = np.argsort(distances)[1:]
    recommended_movies = df.iloc[sorted_indices]

    # print(recommended_movies)
    # Filter by expected language if provided
    if expected_language:
        recommended_movies = recommended_movies[recommended_movies['original_language'] == expected_language]

    if genre_filter:
        recommended_movies['matching_genres'] = recommended_movies['genres'].apply(
            lambda genres: sum(1 for genre in genre_filter if genre in genres)
        )
        
        recommended_movies = recommended_movies[recommended_movies['matching_genres'] > 0]
        # print(recommended_movies[["genres", "title", "matching_genres"]])
        
        n_genre = len(genre_filter)
        rec = pd.DataFrame([],columns=recommended_movies.columns)

        for i in range(n_genre):
            rec = pd.concat([rec,recommended_movies[recommended_movies["matching_genres"]==n_genre-i]])
        # print(rec[["matching_genres", "title", "genres"]])

        return rec['title'].head(top_n).to_list()
    
    return recommended_movies['title'].head(top_n).to_list()
