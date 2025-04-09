########### Recommendation of Movie : Example #################

from model_define import recommend_movies, df, feature_matrix

# Random Movie name from the dataset
favorite_movie = "Inception"

# Predicting recommendations
recommendations = recommend_movies(
    favorite_movie, df, feature_matrix
)

print("Recommended movies:\n", recommendations)