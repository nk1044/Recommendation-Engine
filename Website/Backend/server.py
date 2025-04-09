from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import pickle
from typing import List,Optional

# Load model and dataset once
MODEL_PATH = 'movie_recommender_model.pkl'
DATASET_PATH = 'movies_data.csv'

# Load model
with open(MODEL_PATH, 'rb') as f:
    model_data = pickle.load(f)

# Load dataset
final_df = pd.read_csv(DATASET_PATH)

# Define input schema
class RecommendationRequest(BaseModel):
    movie_name: str
    k: int = 5
    model: Optional[str] = "knn"

# Define output schema
class RecommendationResponse(BaseModel):
    title: str
    imdb_id: Optional[str] = None

# Create FastAPI app
app = FastAPI(title="Movie Recommendation API")



@app.get("/")
def home():
    return {"message": "Welcome to the Movie Recommendation API!"}



# --- POST endpoint ---
@app.post("/recommend", response_model=List[RecommendationResponse])
def recommend_movies(request: RecommendationRequest):
    try:
        if request.model == "knn":
            from knn_recommender import  evaluate_recommendations
            recommendations, _ = evaluate_recommendations(
                request.movie_name, final_df, model_data, k=request.k
            )
        else:
            raise HTTPException(status_code=400, detail=f"Model '{request.model}' not supported.")
        
        if isinstance(recommendations, str):  # if error message is returned
            raise HTTPException(status_code=404, detail=recommendations)
        
        return recommendations
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))