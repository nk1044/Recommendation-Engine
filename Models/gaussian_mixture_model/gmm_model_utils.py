# gmm_model_utils.py

import pickle
import pandas as pd

def load_gmm_model(model_path="gaussian_model.pkl"):
    """Load the trained Gaussian Mixture Model."""
    with open(model_path, "rb") as f:
        gmm = pickle.load(f)
    return gmm

def load_scaler(scaler_path="scaler.pkl"):
    """Load the StandardScaler."""
    with open(scaler_path, "rb") as f:
        scaler = pickle.load(f)
    return scaler

def load_svd(svd_path="svd.pkl"):
    """Load the Truncated SVD reducer."""
    with open(svd_path, "rb") as f:
        svd = pickle.load(f)
    return svd

def load_movies_data(pickle_path="movies_with_clusters.pkl"):
    """Load the movies dataset (with clusters) from a pickle file."""
    return pd.read_pickle(pickle_path)

def recommend_movies(movie_title, df, top_n=10):
    """
    Recommend movies that are in the same GMM cluster as the input movie.
    
    Parameters:
      movie_title (str): The title of the movie.
      df (pd.DataFrame): The DataFrame containing movie info (including 'title' and 'GMM_Cluster').
      top_n (int): Number of recommendations.
      
    Returns:
      pd.DataFrame: A DataFrame of recommended movie titles.
    """
    if movie_title not in df['title'].values:
        print(f"'{movie_title}' not found in dataset.")
        return pd.DataFrame()
    
    cluster_id = df[df['title'] == movie_title]['GMM_Cluster'].values[0]
    similar_movies = df[df['GMM_Cluster'] == cluster_id]
    similar_movies = similar_movies[similar_movies['title'] != movie_title]
    return similar_movies[['title']].head(top_n)
