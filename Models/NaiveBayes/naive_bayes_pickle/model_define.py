import pickle
import os
import numpy as np
import pandas as pd

## Ensure that you are under "naive_bayes_pickle" directory if you are running the code in terminal

# We can change below path for .pkl file according to our circumstances
with open("movie_recommender_model.pkl", "rb") as f:
    model_data = pickle.load(f)

df = model_data["df"]
feature_matrix = model_data["feature_matrix"]

############### Defining Naive Bayes Model AND recommend_movies function #########################

class MultinomialNaiveBayes:
    def fit(self, X, y, alpha=0.00000000000000000001):
        self.classes = np.unique(y)
        self.alpha = alpha
        self.class_log_prior = {}
        self.feature_log_prob = {}

        for c in self.classes:
            X_c = X[y == c]
            total_count = X_c.sum()
            feature_count = X_c.sum(axis=0)
            
            # Apply Laplace smoothing
            smoothed_fc = feature_count + alpha
            smoothed_total = total_count + alpha * X.shape[1]

            self.feature_log_prob[c] = np.log(smoothed_fc / smoothed_total)
            self.class_log_prior[c] = np.log(X_c.shape[0] / X.shape[0])

    def predict_log_proba(self, X):
        log_probs = []
        for x in X:
            class_log_prob = {}
            for c in self.classes:
                logp = self.class_log_prior[c] + np.sum(x * self.feature_log_prob[c])
                class_log_prob[c] = logp
            log_probs.append(class_log_prob)
        return log_probs

def recommend_movies(favorite_movie, df, X, expected_language:None, genre_filter:None, top_n = 10):

    if(isinstance(X, pd.DataFrame)):
        X = X.to_numpy()

    index = df[df["title"].str.lower() == favorite_movie.lower()].index[0]

    # Binary classification: 1 if it's the favorite movie, 0 otherwise
    y = np.zeros(len(df))
    y[index] = 1

    model = MultinomialNaiveBayes()
    model.fit(X, y)

    log_probs = model.predict_log_proba(X)

    probs = [np.exp(lp[1.0]) for lp in log_probs]

    df['probability'] = probs
    
    recommended_movies = df[df.index != index].sort_values(by="probability", ascending=False)

    ######## Filtering start#########

    if expected_language:
        recommended_movies = recommended_movies[recommended_movies['original_language'] == expected_language]

    if genre_filter:
        recommended_movies['matching_genres'] = recommended_movies['genres'].apply(
            lambda genres: sum(1 for genre in genre_filter if genre in genres)
        )
        
        recommended_movies = recommended_movies[recommended_movies['matching_genres'] > 0]
        # print(recommended_movies[["genres", "title", "matching_genres"]])
        
        n_genre = len(genre_filter)
        rec = pd.DataFrame([],columns=recommended_movies.columns)

        for i in range(n_genre):
            rec = pd.concat([rec,recommended_movies[recommended_movies["matching_genres"]==n_genre-i]])
        # print(rec[["matching_genres", "title", "genres"]])

        return rec['title'].head(top_n).to_numpy()
    
    ######## Filtering End ######################

    
    return recommended_movies["title"].head(top_n).to_numpy()

