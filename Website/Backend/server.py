from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import pickle
from typing import List,Optional
from fastapi.middleware.cors import CORSMiddleware


# Load model and dataset once
MODEL_PATH = 'movie_recommender_model.pkl'
DATASET_PATH = 'movies_data.csv'

# Load model
with open(MODEL_PATH, 'rb') as f:
    model_data = pickle.load(f)

# Load dataset
final_df = pd.read_csv(DATASET_PATH)


class RecommendationRequest(BaseModel):
    movie_name: str
    k: int = 10
    model: Optional[str] = "knn"


class AnnRecommendationRequest(BaseModel):
    user_history: List[str]
    negative_history: List[str]

# Create FastAPI app
app = FastAPI(title="Movie Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.get("/")
def home():
    return {"message": "Welcome to the Movie Recommendation API!"}



# --- POST endpoint ---
@app.post("/recommend")
def recommend_movies(request: RecommendationRequest):
    try:
        if request.model == "knn":
            from knn_recommender import  evaluate_recommendations
            recommendations, _ = evaluate_recommendations(
                request.movie_name, final_df, model_data, k=request.k
            )
        elif request.model == "gmm":
            from guassian.gmm_model_utils import recommend_movies
            recommendations = recommend_movies(request.movie_name)
        elif request.model == "svm":
            from svm import recommend_svm_optimized
            recommendations = recommend_svm_optimized(request.movie_name)
        elif request.model == "cbf":
            from cbf.movie_recommender_utils import recommend_movies
            recommendations = recommend_movies(request.movie_name)
        elif request.model == "clustering":
            from clustering.recommend_movies import recommend_movies
            recommendations = recommend_movies(request.movie_name)
        # elif request.model == "bay":
        #     from cbf.model_define import recommend_movies, df, feature_matrix
        #     recommendations = recommend_movies(request.movie_name, df, feature_matrix)
        #     recommendations =recommendations.tolist()
        else:
            raise HTTPException(status_code=400, detail=f"Model '{request.model}' not supported.")
        
        if isinstance(recommendations, str):  # if error message is returned
            raise HTTPException(status_code=404, detail=recommendations)
        
        return recommendations
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend-ann")
def recommend_ann(request: AnnRecommendationRequest):
    if not request.user_history and not request.negative_history:
        final_df = pd.read_csv(DATASET_PATH)
        return final_df['title'].sample(10).tolist()
    from ann import ann
    recommendations = ann(request.user_history, request.negative_history)
    return recommendations