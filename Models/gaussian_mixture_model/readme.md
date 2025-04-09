# GMM Movie Recommender

This repository provides a movie recommender system that uses a Gaussian Mixture Model (GMM) to cluster movies and generate recommendations. All necessary model artifacts—including the GMM, StandardScaler, TruncatedSVD, and the movie dataset with cluster labels—are saved as pickle files. Utility functions to load these artifacts and run predictions are provided in `gmm_model_utils.py`.

## Repository Structure

      gaussian_mixture_model/
        ├── GMM_Movie_Recommender.ipynb     # Jupyter notebook with training & clustering
        ├── test_app.py                     # Streamlit test app 
        ├── gmm_model_utils.py              # Utility file to load models & recommend
        ├── gmm_model.pkl                   # Trained GMM model
        ├── scaler.pkl                      # StandardScaler
        ├── svd.pkl                         # TruncatedSVD
        └── clustered_movies.pkl            # DataFrame with clustered movies
-> only need to know gmm_models_utlis.py , you can use example code snippet 
import sys
sys.path.append('../ml_models/gaussian_mixture_model')

from gmm_model_utils import load_all_models, recommend_movies  # or whatever function you wannt 

#accesing any pkl files
import pickle

with open('../ml_models/gaussian_mixture_model/gmm_model.pkl', 'rb') as f:
    gmm = pickle.load(f)





