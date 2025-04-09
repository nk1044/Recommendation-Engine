## Functions Overview

### 1. `read_data(file_path)`
- Reads data from a CSV file
- Returns a pandas DataFrame containing the dataset

### 2. `preprocess_data(df)`
- Performs data preprocessing
- Handles missing values and encoding categorical variables
- Returns preprocessed DataFrame

### 3. `kmeans_clustering(data, n_clusters)`
- Implements K-means clustering algorithm
- Parameters:
    - data: preprocessed dataset
    - n_clusters: number of clusters
- Returns cluster labels and centroids

### 4. `evaluate_clustering(data, labels)`
- Calculates clustering evaluation metrics
- Computes silhouette score and inertia
- Returns evaluation scores

### 5. `plot_clusters(data, labels)`
- Visualizes clustering results
- Creates scatter plots of data points colored by cluster
- Shows cluster centroids

### 6. `find_optimal_clusters(data, max_clusters)`
- Determines optimal number of clusters using elbow method
- Parameters:
    - data: preprocessed dataset
    - max_clusters: maximum number of clusters to test
- Returns optimal cluster count

