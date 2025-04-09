########### Recommendation of Movie : Example #################

from model_define import recommend_movies, df, feature_matrix

favorite_movie = "Inception"
expected_language = "en"
genre_filter = ["action", "science fiction"]

# Predicting recommendations
recommendations = recommend_movies(
    favorite_movie, df, feature_matrix, expected_language, genre_filter
)

print("Recommended movies:\n", recommendations)