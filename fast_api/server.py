from fastapi import FastAPI
import joblib
import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
from fastapi.middleware.cors import CORSMiddleware

# Load the trained model, scaler, and data
knn_model = joblib.load("knn_model.pkl")
scaler = joblib.load("scaler.pkl")
final_df = pd.read_csv("movies_data.csv")

# Select feature columns
feature_columns = final_df.columns[1:-1]  # Exclude 'title' and 'imdb_id'
final_feature_matrix = final_df[feature_columns].values
final_feature_matrix_scaled = scaler.transform(final_feature_matrix)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_recommendations(movie_name, k=10):
    """Fetch top K movie recommendations."""
    if movie_name not in final_df['title'].values:
        return {"error": f"'{movie_name}' not found in the dataset."}

    movie_index = final_df[final_df['title'] == movie_name].index[0]
    distances, indices = knn_model.kneighbors([final_feature_matrix_scaled[movie_index]])

    recommended_movies = [final_df.iloc[idx]['title'] for idx in indices[0][1:k+1]]  # Skip first one (itself)
    
    return {"movie": movie_name, "recommendations": recommended_movies}

@app.get("/")
def home():
    return {"message": "Welcome to the Movie Recommendation API!"}

@app.get("/recommend/{movie_name}")
def recommend(movie_name: str):
    return get_recommendations(movie_name)
