import pickle
import os
from movie_recommender_utils import recommend_movies


## Ensure that you are under "pickle_model" directory if you are running the code in terminal


with open("movie_recommender_model.pkl", "rb") as f:
    model_data = pickle.load(f)

df = model_data["df"]
feature_matrix = model_data["feature_matrix"]

print(df)

print(feature_matrix)

# Example input
favorite_movie = "Inception"
expected_language = "en"
genre_filter = ["action", "science fiction"]

# Predict recommendations
recommendations = recommend_movies(
    favorite_movie, df, feature_matrix.to_numpy(), expected_language, genre_filter
)

print("Recommended movies:", recommendations)
