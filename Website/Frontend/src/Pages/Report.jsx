import React from 'react';

function Report() {
  const Links = [
    { name: 'Github', link: 'https://github.com/Levi477/Recommendation-Engine' },
    { name: 'Website', link: 'https://recommendation-engine-eight.vercel.app/' },
    { name: 'Report', link: '#' },
    { name: 'Dataset', link: '#' },
    { name: 'Demo', link: '#' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-sm border rounded-md p-6 text-gray-800 space-y-8">

        <header className="text-center">
          <h1 className="text-3xl font-semibold mb-1">Movie Recommendation Engine</h1>
          <p className="text-sm text-gray-500">Personalized suggestions using machine learning models</p>
        </header>

        <section className="space-y-2">
          <h2 className="text-xl font-medium">Overview</h2>
          <p>
            This project is a <strong>Movie Recommendation Engine</strong> that provides personalized suggestions using six different machine learning algorithms.
            Each model uses structured movie metadata to learn user preferences and predict similar content.
          </p>
          <a href="https://recommendation-engine-eight.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
            Live Demo
          </a>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-medium">Workflow</h2>

          <div>
            <h3 className="font-semibold">1. Data Preprocessing – Movie Vector Creation</h3>
            <p>We convert raw movie metadata into 800-dimensional vectors using:</p>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>TF-IDF on genres, cast, overview, keywords, director</li>
              <li>PCA or Truncated SVD for dimensionality reduction</li>
            </ul>
            <p className="text-sm italic">TF-IDF(t, d) = TF(t, d) × log(N / DF(t))</p>
          </div>

          <div>
            <h3 className="font-semibold">2. K-Nearest Neighbors (KNN)</h3>
            <p>Recommends movies based on vector distances using:</p>
            <ul className="list-disc ml-5 text-sm">
              <li>Cosine Similarity</li>
              <li>Euclidean Distance</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">3. Clustering (K-Means / Hierarchical)</h3>
            <p>Groups similar movies using unsupervised clustering.</p>
            <p className="text-sm italic">K-Means Objective: Minimize ∑ᵢ ∑ₓ ∈ Cᵢ ||x - μᵢ||²</p>
          </div>

          <div>
            <h3 className="font-semibold">4. Perceptron (Neural Network)</h3>
            <p>Binary classifier for like/dislike prediction.</p>
            <p className="text-sm italic">y = sigmoid(Wx + b)</p>
            <p className="text-sm italic">Loss: Binary Cross-Entropy</p>
          </div>

          <div>
            <h3 className="font-semibold">5. Bayesian Recommendation (Naïve Bayes)</h3>
            <p>Predicts preference using Bayes’ Theorem assuming feature independence.</p>
            <p className="text-sm italic">P(A | B) = (P(B | A) × P(A)) / P(B)</p>
          </div>

          <div>
            <h3 className="font-semibold">6. Content-Based Filtering</h3>
            <p>Finds movies similar in metadata using cosine similarity.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">Summary of Models</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Model</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Key Concept</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">TF-IDF + Vectors</td>
                  <td className="p-2 border">Preprocessing</td>
                  <td className="p-2 border">TF-IDF(t, d) = TF × log(N / DF)</td>
                </tr>
                <tr>
                  <td className="p-2 border">KNN</td>
                  <td className="p-2 border">Similarity-based</td>
                  <td className="p-2 border">Cosine / Euclidean distance</td>
                </tr>
                <tr>
                  <td className="p-2 border">K-Means Clustering</td>
                  <td className="p-2 border">Unsupervised</td>
                  <td className="p-2 border">Minimize ∑ ||x - μ||²</td>
                </tr>
                <tr>
                  <td className="p-2 border">Perceptron</td>
                  <td className="p-2 border">Neural Network</td>
                  <td className="p-2 border">y = sigmoid(Wx + b)</td>
                </tr>
                <tr>
                  <td className="p-2 border">Naïve Bayes</td>
                  <td className="p-2 border">Probabilistic</td>
                  <td className="p-2 border">P(A|B) = (P(B|A) × P(A)) / P(B)</td>
                </tr>
                <tr>
                  <td className="p-2 border">Content-Based</td>
                  <td className="p-2 border">Metadata Matching</td>
                  <td className="p-2 border">Cosine similarity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">Dataset</h2>
          <p className="text-sm">
            TMDB or a similar dataset was used. Features include:
            Title, Genres, Cast, Overview, Keywords, Ratings, Popularity.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">Project Demo</h2>
          <div className="aspect-video w-full rounded overflow-hidden">
            <iframe
              src="#"
              title="Project Demo Video"
              className="w-full h-full border rounded"
              allowFullScreen
            />
          </div>
        </section>

        <section className="pt-4">
          <h2 className="text-xl font-medium mb-2">Quick Links</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {Links.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Report;
