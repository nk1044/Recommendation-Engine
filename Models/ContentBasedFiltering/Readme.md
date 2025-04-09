# 🎬 Content-Based Movie Recommendation System

This project implements a **Movie Recommendation System** using **Content-Based Filtering** and **Euclidean Distance** as the similarity metric. The system takes a user's favorite movie, a list of preferred genres, and an expected language to recommend the top 10 most similar movies.

---

## 🚀 Features

- Recommend top 10 movies similar to a user's favorite movie.
- Filter recommendations by:
  - Preferred genres (ranked by how many match).
  - Expected language.
- Uses:
  - TF-IDF and MultiLabelBinarizer for creating **Feature Matrix**.
  - Euclidean distance for similarity.
- Model training and reuse via `.pkl` file.
- Modular function support for easy integration in other apps.

---
 
## Dataset

The dataset used in this ML model is - **Full TMDB Movies Dataset 2024** (https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies) 

---

## Some Instructions
- First run all cells of the .ipynb file to see the working of ML model along with genre and language filter options and analysis. This will also create a pickle file of model in the "pickle_model" directory.
- In pickle_model folder
    - movie_recommender_utils.py contains the imports and functions required to use the pickle model
    - predict_movies.py shows how to use pickle file and movie_recommender_utils.py to see the recommendations
    - Before running the predict_movies.py make sure that you are in pickle_model directory (if you are running in the terminal)