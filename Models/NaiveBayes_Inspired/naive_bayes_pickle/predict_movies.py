########### Recommendation of Movie : Example #################

## Ensure that you are under "naive_bayes_pickle" directory if you are running the code in terminal

from model_define import recommend_movies, df, feature_matrix

# Random Movie name from the dataset
favorite_movie = "The Avengers"

# Predicting recommendations
recommendations = recommend_movies(
    favorite_movie, df, feature_matrix
)

print("Recommended movies:\n", recommendations)