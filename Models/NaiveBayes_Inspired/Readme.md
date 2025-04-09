# Bayesian Movie Recommendation System

This for **movie recommendation system** is built using **Bayesian machine learning techniques**. It takes a user's favorite movie, genre list and movie language as input and recommends the **top 10 most similar movies**, using a **Naive Bayes inspired Multinomial  classifier** implemented from scratch, combined with **TF-IDF vectorization and One-hot encoding**. If genre list or movie language inputs are empty, then it normally recommends movies without applying any filters.

---

## Dataset

I have used **Full TMDB Movies Dataset 2024** (https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies) in this ML model.

---

## Steps To Use The Model

### Requirements
- Python libraries
    - Numpy, Pandas, Sci-kit learn, Matplotlib, Seaborn, Kagglehub, Pickle

### .IPYNB file
- We can run all cells normally.
- This will also create a pickle file in naive_bayes_pickle folder.

### Recommendation using Pickle file
- First create a pickle file by running .ipynb file which is just outside naive_bayes_pickle folder.
- model.py file already contains required imports and functions to use pickle model.
- predict.py file shows how to use model.py and pickle file to get recommeded movies.

---

##  How It Works

###  Step 1: Preprocessing
- TF-IDF vectorization and one-hot encding is applied to convert text into numeric features and Feature matrix is created <br>
Features are of these categories: [ genre_encoded,
    language_encoded,
    keyword_encoded,
    production_company_encoded,
    production_country_encoded,
    overview_encoded,
    tagline_encoded ]

###  Step 2: Model Training
- A **custom Multinomial classifier** inspired from Naive Bayes is used for calculating values which are proportional to required probablities (say, probabilty scores),
- Given a favorite movie name, the classifier ranks other movies based on those probability scores.
- A numpy array of 10 most probable recommendations are returned.

---

##  Analysis and Visualization

1. **Self-confidence score**: shows how confident the model is about the input movie itself for recommendation.

    - A **log-scaled grid of subplots**, where each plot shows:
    - Self probability
        - 1st highest probability
        - 2nd highest probability
        - 3rd highest probability
        - Getting input movie itself as 1st recommendation shows that understanding of the model about similar movies ( i.e. Self probability = 1st highest probability)
    - This is Useful for inspecting model confidence per movie, even when values are extremely small (e.g., `1e-14`, `1e-30`).
    <br>

2. **Bayesian-style similarity score**: Helps understand why a certain movie is recommended.
    - A **barplot sorted by similarity scores** which shows the probabilty scores of recommended movies.
    - We can match genres and keywords in dataset to see if those scores are reliable.

3. **2D-PCA of feature matrix**: shows if these movies are similar
    - A **scatter plot** of all movies with selected movie and recommended movies highlighted in it.
    - It shows - if the recommended movies are closer to each other then it shows movies are similar even in the dimensionally reduced feature matrix.

---
