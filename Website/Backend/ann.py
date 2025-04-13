import pandas as pd
import numpy as np

df = pd.read_csv('movies_data.csv')
df.head()


class MoviePreferenceDataset:
    def __init__(self, positive_titles, negative_titles, movie_to_features):
        self.features = []
        self.labels = []

        for title in positive_titles:
            if title in movie_to_features:
                self.features.append(movie_to_features[title])
                self.labels.append(1.0)

        for title in negative_titles:
            if title in movie_to_features:
                self.features.append(movie_to_features[title])        
                self.labels.append(0.0)

        self.features = np.stack(self.features)
        self.labels = np.array(self.labels).reshape(-1, 1)

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        return self.features[idx], self.labels[idx]

class MovieRecNN:
    def __init__(self, input_dim=800):
        self.w1 = np.random.randn(input_dim, 256) * np.sqrt(1. / input_dim)
        self.b1 = np.zeros((1, 256))

        self.w2 = np.random.randn(256, 64) * np.sqrt(1. / 256)
        self.b2 = np.zeros((1, 64))

        self.w3 = np.random.randn(64, 1) * np.sqrt(1. / 64)
        self.b3 = np.zeros((1, 1))

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def sigmoid_deriv(self, x):
        return x * (1 - x)

    def relu(self, x):
        return np.maximum(0, x)

    def relu_deriv(self, x):
        return (x > 0).astype(float)

    def forward(self, x):
        self.x = x
        self.z1 = x @ self.w1 + self.b1
        self.a1 = self.relu(self.z1)

        self.z2 = self.a1 @ self.w2 + self.b2
        self.a2 = self.relu(self.z2)

        self.z3 = self.a2 @ self.w3 + self.b3
        self.a3 = self.sigmoid(self.z3)

        return self.a3

    def backward(self, y_true, y_pred, lr):
        m = y_true.shape[0]
        dz3 = (y_pred - y_true) * self.sigmoid_deriv(y_pred)
        dw3 = self.a2.T @ dz3 / m
        db3 = np.sum(dz3, axis=0, keepdims=True) / m

        dz2 = dz3 @ self.w3.T * self.relu_deriv(self.a2)
        dw2 = self.a1.T @ dz2 / m
        db2 = np.sum(dz2, axis=0, keepdims=True) / m

        dz1 = dz2 @ self.w2.T * self.relu_deriv(self.a1)
        dw1 = self.x.T @ dz1 / m
        db1 = np.sum(dz1, axis=0, keepdims=True) / m

        self.w3 -= lr * dw3
        self.b3 -= lr * db3
        self.w2 -= lr * dw2
        self.b2 -= lr * db2
        self.w1 -= lr * dw1
        self.b1 -= lr * db1

def binary_cross_entropy(y_pred, y_true):
    epsilon = 1e-8
    return -np.mean(y_true * np.log(y_pred + epsilon) + (1 - y_true) * np.log(1 - y_pred + epsilon))

def train(model, dataset, batch_size=32, epochs=10, lr=0.001):
    for epoch in range(epochs):
        indices = np.random.permutation(len(dataset))
        total_loss = 0
        for i in range(0, len(dataset), batch_size):
            batch_idx = indices[i:i + batch_size]
            x_batch = np.array([dataset[j][0] for j in batch_idx])
            y_batch = np.array([dataset[j][1] for j in batch_idx])

            y_pred = model.forward(x_batch)
            loss = binary_cross_entropy(y_pred, y_batch)
            model.backward(y_batch, y_pred, lr)
            total_loss += loss

        avg_loss = total_loss / (len(dataset) // batch_size)
        # print(f"Epoch {epoch + 1}, Loss: {avg_loss:.4f}")

def recommend(model, movie_titles, known_titles, movie_to_features, top_k=10):
    candidates = list(set(movie_titles) - set(known_titles))
    candidate_feats = np.stack([movie_to_features[title] for title in candidates])
    scores = model.forward(candidate_feats).reshape(-1)
    top_indices = scores.argsort()[::-1][:top_k]
    top_titles = [(candidates[i]) for i in top_indices]
    return top_titles


movie_titles = df['title'].reset_index(drop=True).tolist()
movie_features = df.iloc[:, 1:-1].reset_index(drop=True)
movie_to_features = {
    title: movie_features.iloc[i].values.astype(np.float32)
    for i, title in enumerate(movie_titles)
}

def  ann(user_history,negative_history):
    # user_history = ["The Avengers"]
    # negative_history = ["Blade Runner", "Inception", "Interstellar","Spider-Man"]

    dataset = MoviePreferenceDataset(user_history, negative_history, movie_to_features)

    model = MovieRecNN()
    train(model, dataset, batch_size=4, epochs=512, lr=0.01)

    recommendations = recommend(model, movie_titles, known_titles=user_history + negative_history, movie_to_features=movie_to_features, top_k=10)
    return recommendations