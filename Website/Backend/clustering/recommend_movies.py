import pickle
import numpy as np
import pandas as pd
import os

def load_movie_recommendation_model(pickle_file_path): 
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, "movie_recommendation_system_clustering.pkl")

    with open(file_path, "rb") as f:
        model_data = pickle.load(f)
    
    print("Model loaded successfully!")
    return model_data

def recommend_movies(title, top_n=10):
    model_package = load_movie_recommendation_model('movie_recommendation_system_clustering.pkl')
    clusters = model_package['clusters']
    index_to_cluster = model_package['index_to_cluster']
    cluster_to_index = model_package['cluster_to_index']
    data = model_package['data']
    df = model_package['df']
    try:
        movie_idx = data[data['title'] == title].index[0]
    except (IndexError, KeyError):
        return ["Movie title not found in the dataset. Please check the spelling."]
    
    # Find which cluster this movie belongs to
    try:
        movie_cluster = index_to_cluster[movie_idx]
    except KeyError:
        min_distance = float('inf')
        movie_cluster = 0
        for cluster_idx in range(len(clusters)):
            distance = np.linalg.norm(df.iloc[movie_idx] - clusters[cluster_idx])
            if distance < min_distance:
                min_distance = distance
                movie_cluster = cluster_idx
    
    # Get all movies in the same cluster
    cluster_movies = cluster_to_index[movie_cluster]
    
    # Calculate distances from the input movie to all movies in the same cluster
    distances = []
    for idx in cluster_movies:
        if idx == movie_idx:  # Skip the input movie itself
            continue
        distance = np.linalg.norm(df.iloc[movie_idx] - df.iloc[idx])
        distances.append((idx, distance))
    
    # Sort by distance (ascending)
    distances.sort(key=lambda x: x[1])
    
    # Get the top_n closest movies
    top_n = min(top_n, len(distances))  # Ensure we don't ask for more than we have
    recommended_indices = [idx for idx, _ in distances[:top_n]]
    
    # Get the titles of the recommended movies
    recommended_titles = data.iloc[recommended_indices]['title'].tolist()
    
    return recommended_titles
