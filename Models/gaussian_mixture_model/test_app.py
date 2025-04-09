# test_app.py
import streamlit as st  # type: ignore
import pandas as pd  # type: ignore
from gmm_model_utils import load_movies_data, recommend_movies

# THIS MUST BE FIRST!
st.set_page_config(page_title="GMM Movie Recommender", layout="centered")

# Load movies data from pickle rather than CSV.
@st.cache_data
def load_data():
    return load_movies_data("movies_with_clusters.pkl")

df = load_data()

# Title and Description
st.title("GMM-based Movie Recommender")
st.write("Find movies similar to your favorite, using Gaussian Mixture Models!")

# Movie dropdown
movie_titles = sorted(df["title"].dropna().unique())
selected_movie = st.selectbox("Choose a movie you like:", movie_titles)

# Recommendation logic
if selected_movie:
    st.subheader(f"Because you liked *{selected_movie}*")
    st.markdown("You might also enjoy:")
    
    recs = recommend_movies(selected_movie, df, top_n=10)
    st.table(recs)

# Footer
st.markdown("---")
st.markdown("Made with GMM")
