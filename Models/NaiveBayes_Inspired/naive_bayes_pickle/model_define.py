import pickle
import os
import numpy as np
import pandas as pd

# We can change below path for .pkl file according to our circumstances
with open("movie_recommender_model.pkl", "rb") as f:
    model_data = pickle.load(f)

df = model_data["df"]
feature_matrix = model_data["feature_matrix"]

############### Defining Naive Bayes Model AND recommend_movies function #########################

class MultinomialNaiveBayes:

    def predict_log_proba(self,y, X):
        similarities = []
        for doc_vector in X:
            prob = 1
            for i in range(len(doc_vector)):
                prob *= (y[i] +1) ** doc_vector[i]  # Add-1 smoothing

            similarities.append(prob)
        return similarities



def recommend_movies(favorite_movie, df, X, top_n = 10):

    if(isinstance(X, pd.DataFrame)):
        X = X.to_numpy()

    index = df[df["title"].str.lower() == favorite_movie.lower()].index[0]

    y = X[index]

    model = MultinomialNaiveBayes()

    probs = model.predict_log_proba(y,X)

    df['probability'] = probs
    
    recommended_movies = df[df.index!=index].sort_values(by="probability", ascending=False)
    
    return recommended_movies["title"].head(top_n).to_numpy()

