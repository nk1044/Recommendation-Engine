#this app is just for testing purposes
import streamlit as st # type: ignore
# ⬅️ THIS MUST BE FIRST!
st.set_page_config(page_title=" GMM Movie Recommender", layout="centered")

import pandas as pd # type: ignore

#  Load clustered movie data
@st.cache_data
def load_data():
    return pd.read_csv("movies_with_clusters.csv")

df = load_data()

# 🎯 Title
st.title(" GMM-based Movie Recommender")
st.write("Find movies similar to your favorite, using Gaussian Mixture Models!")

# 🎞️ Movie dropdown
movie_titles = sorted(df["title"].dropna().unique())
selected_movie = st.selectbox("Choose a movie you like:", movie_titles)

#  Recommendation logic
def recommend_movies(movie_title, df, top_n=10):
    cluster_id = df[df["title"] == movie_title]["GMM_Cluster"].values[0]
    similar_movies = df[df["GMM_Cluster"] == cluster_id]
    similar_movies = similar_movies[similar_movies["title"] != movie_title]
    return similar_movies[["title"]].head(top_n)

#  Show recommendations
if selected_movie:
    st.subheader(f"🎥 Because you liked *{selected_movie}*")
    st.markdown("You might also enjoy:")
    
    recommendations = recommend_movies(selected_movie, df, top_n=10)
    st.table(recommendations)

# 📦 Footer
st.markdown("---")
st.markdown("made with GMM")
