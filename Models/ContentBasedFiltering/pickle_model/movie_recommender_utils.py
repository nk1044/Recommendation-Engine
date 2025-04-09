from scipy.spatial.distance import euclidean
import numpy as np
import pandas as pd
import pickle

with open("movie_recommender_model.pkl", "rb") as f:
    model_data = pickle.load(f)

df = model_data["df"]
feature_matrix = model_data["feature_matrix"]


def recommend_movies(movie_name, df, feature_matrix, top_n=10):
    
    if movie_name not in df['title'].values:
        return "Movie not found in dataset. Try another one."
    
    # Find index of the given movie
    movie_idx = df[df['title'] == movie_name].index[0]
    # Compute Euclidean distances between the given movie and all others
    distances = [euclidean(feature_matrix[movie_idx], feature_matrix[i]) for i in range(len(df))]
    
    sorted_indices = np.argsort(distances)[1:]
    recommended_movies = df.iloc[sorted_indices]
    
    return recommended_movies['title'].head(top_n).to_list()
