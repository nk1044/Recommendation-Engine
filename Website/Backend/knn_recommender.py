import pandas as pd
import numpy as np
import pickle
from fuzzywuzzy import process

def apply_feature_weights(df):
    # Placeholder — make sure to use your actual implementation
    return df

def find_movie_fuzzy(movie_name, df):
    titles = df['title'].tolist()
    best_match = process.extractOne(movie_name, titles)
    return best_match[0] if best_match else None


def get_recommendations(movie_name, final_df, model_data, k=None):
    """Get movie recommendations using the optimized system"""
    # Try to find the movie with fuzzy matching
    exact_match = final_df[final_df['title'].str.lower() == movie_name.lower()]
    
    if exact_match.empty:
        fuzzy_match = find_movie_fuzzy(movie_name, final_df)
        if fuzzy_match:
            print(f"Movie '{movie_name}' not found. Using closest match: '{fuzzy_match}'")
            movie_name = fuzzy_match
            matches = final_df[final_df['title'] == fuzzy_match]
        else:
            return f"'{movie_name}' not found in the dataset."
    else:
        matches = exact_match
    
    # Get the movie index
    movie_index = matches.index[0]
    
    # Get weighted features
    feature_row = final_df.drop(['title', 'imdb_id'], axis=1).iloc[movie_index]
    weighted_feature_row = apply_feature_weights(pd.DataFrame(feature_row).T).iloc[0]
    
    # Transform the movie features
    scaler = model_data['scaler']
    pca = model_data['pca']
    knn_model = model_data['knn_model']
    
    scaled_vector = scaler.transform([weighted_feature_row])
    reduced_vector = pca.transform(scaled_vector)
    
    # Use default k if not specified
    if k is None:
        k = model_data['best_n_neighbors']
    
    # Get nearest neighbors
    distances, indices = knn_model.kneighbors(reduced_vector, n_neighbors=k+1)
    
    # Remove the query movie itself
    mask = indices[0] != movie_index
    filtered_indices = indices[0][mask][:k]
    filtered_distances = distances[0][mask][:k]
    
    # Get recommended movies with similarity scores
    recommended_movies = []
    max_distance = filtered_distances.max() if len(filtered_distances) > 0 else 1
    for i, idx in enumerate(filtered_indices):
        # Convert distance to similarity score (1 = identical, 0 = completely different)
        similarity = 1 - (filtered_distances[i] / max_distance) if max_distance > 0 else 0
        
        recommended_movies.append({
            'title': final_df.iloc[idx]['title'],
            'imdb_id': final_df.iloc[idx]['imdb_id'],
            'similarity': similarity
        })
    
    return recommended_movies

def get_recommended_titles(recommendations):
    return [rec['title'] for rec in recommendations]

def evaluate_recommendations(movie_name, final_df, model_data, k=5):
    """Evaluate recommendations by comparing genre overlap"""
    recommendations = get_recommendations(movie_name, final_df, model_data, k)
    
    if isinstance(recommendations, str):
        return recommendations
    
    # Get query movie genres
    query_movie = final_df[final_df['title'].str.lower() == movie_name.lower()]
    if query_movie.empty:
        query_movie = final_df[final_df['title'] == find_movie_fuzzy(movie_name, final_df)]
    
    query_index = query_movie.index[0]
    
    # Define genre columns
    genre_columns = ['drama', 'comedy', 'thriller', 'action', 'adventure', 'romance', 
                    'crime', 'science fiction', 'horror']
    valid_genres = [g for g in genre_columns if g in final_df.columns]
    
    # Get query movie genres
    query_genres = final_df.loc[query_index, valid_genres]
    query_genres = [g for g, has_genre in zip(valid_genres, query_genres) if has_genre == 1]
    
    # Calculate genre overlap for each recommendation
    for rec in recommendations:
        rec_index = final_df[final_df['title'] == rec['title']].index[0]
        rec_genres = final_df.loc[rec_index, valid_genres]
        rec_genres = [g for g, has_genre in zip(valid_genres, rec_genres) if has_genre == 1]
        
        # Calculate overlap (Jaccard similarity)
        if len(query_genres) > 0 or len(rec_genres) > 0:
            overlap = len(set(query_genres) & set(rec_genres)) / len(set(query_genres) | set(rec_genres))
        else:
            overlap = 0
            
        rec['genre_overlap'] = overlap
        rec['genres'] = rec_genres
    
    # Calculate average genre overlap
    avg_overlap = np.mean([r['genre_overlap'] for r in recommendations])
    
    # Print evaluation results
    print(f"\n🎬 Recommendations for '{movie_name}':")
    print(f"Query movie genres: {', '.join(query_genres)}")
    print(f"Average genre overlap: {avg_overlap:.2f} (0-1 scale, higher is better)")
    
    # Print recommendations with metrics
    for i, rec in enumerate(recommendations, 1):
        genres_str = ', '.join(rec['genres'])
        print(f"{i}. {rec['title']} (IMDb: {rec['imdb_id']}) - Similarity: {rec['similarity']:.2f}, Genre overlap: {rec['genre_overlap']:.2f}")
        print(f"   Genres: {genres_str}")
    
    return get_recommended_titles(recommendations), avg_overlap
