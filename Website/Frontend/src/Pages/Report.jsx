import React from 'react';
import { Github, ExternalLink, BookOpen, Database, Film } from 'lucide-react';
import ImageSlider from '../Component/ImageSlider';

function Report() {
  const links = [
    { name: 'Github', icon: <Github size={16} />, link: 'https://github.com/Levi477/Recommendation-Engine' },
    { name: 'Website', icon: <ExternalLink size={16} />, link: 'https://recommendation-engine-eight.vercel.app/' },
    { name: 'Report', icon: <BookOpen size={16} />, link: '#' },
    { name: 'Dataset', icon: <Database size={16} />, link: '#' },
    { name: 'Demo', icon: <Film size={16} />, link: '#' },
  ];

  const authors = [
    {
      name: "Neeraj Kumar",
      role: "B23CS1044",
      imgsrc: "/neeraj_profile_image.png",
      github: "https://github.com/nk1044",
      linkedin: "https://www.linkedin.com/in/neerajkumar1044/",
    },
    {
      name: "Deep Sudhanvabhai Gajjar",
      role: "B23EE1014",
      imgsrc: "/deep_profile_image.png",
      github: "https://github.com/Levi477",
      linkedin: "https://www.linkedin.com/in/deep-gajjar-92596328b/",
    },
    {
      name: "Abhyudaya Tiwari",
      role: "B23CS1085",
      imgsrc: "/abhy_profile_image.jpeg",
      github: "https://github.com/ABHYUDAYATIWARI",
      linkedin: "https://www.linkedin.com/in/abhyudaya-tiwari-1a7213289/",
    },
    {
      name: "Uchat Bhavya ParasBhai",
      role: "B23CS1074",
      imgsrc: "https://img.icons8.com/?size=100&id=AZazdsitsrgg&format=png&color=000000",
      github: "https://github.com/bhavyacs1074",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Patil Sanskar Dhirendra",
      role: "B23CS1050",
      imgsrc: "/sanskar_profile_image.png",
      github: "https://github.com/sanskarppatil",
      linkedin: "https://www.linkedin.com/in/sanskar-patil-a5466628a/",
    },
    {
      name: "Pawar Yuvraj Pramod",
      role: "B23CS1051",
      imgsrc: "yuv_profile_image.jpeg",
      github: "https://github.com/tacticalYP",
      linkedin: "https://www.linkedin.com/in/yuvrajpawar26/",
    },
  ];

  const slider = [
    {name: "Home Page", imgsrc: "/home_page.png"},
    {name: "Recommendation Page", imgsrc: "/recommend_page.png"},
    {name: "History Page", imgsrc: "/ann_page.png"},
    {name: "Results", imgsrc: "/result_page.png"},
  ]

  return (
    <div className="bg-gray-100 pt-2 px-2 font-serif">
      <div className=" mx-auto bg-white shadow-lg rounded-lg px-6 overflow-hidden">
        {/* Header/Cover */}
        <div className="p-10">
          <h1 className="text-4xl font-bold mb-3">Movie Recommendation Engine</h1>
          <p className="text-lg opacity-90">Personalized suggestions using machine learning models</p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full text-sm transition-all"
              >
                {link.icon}
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-10">
          {/* Authors */}
          <section>
            <h2 className="text-2xl font-bold mb-5 text-gray-800 pb-2 border-b border-gray-200">Authors</h2>
            <div className='w-full flex justify-center items-center'>
            <div className="grid max-w-[70%] grid-cols-1 md:grid-cols-3 gap-7 p-3 ">
              {authors.map((author, index) => (
                <div key={index} className="flex flex-col rounded-lg items-center text-center">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 mb-3 overflow-hidden">
                    <img src={author.imgsrc} alt={author.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-lg">{author.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{author.role}</p>
                  <div className="flex gap-3 text-gray-600">
                    <a href={author.github} target="_blank" rel="noopener noreferrer">
                      <Github size={18} />
                    </a>
                    <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </section>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              This project is a <strong>Movie Recommendation Engine</strong> that provides personalized suggestions 
              using six different machine learning algorithms. Each model utilizes structured movie metadata to learn 
              user preferences and predict similar content, offering a comprehensive approach to personalized recommendations.
            </p>
            <a 
              href="https://recommendation-engine-eight.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              View Live Demo →
            </a>
          </section>


          {/* Workflow */}
          <section>
            <h2 className="text-2xl font-bold mb-5 text-gray-800 pb-2 border-b border-gray-200">Methodology</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">1. Data Preprocessing – Movie Vector Creation</h3>
                <p className="mb-2">We convert raw movie metadata into 800-dimensional vectors using:</p>
                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                  <li>TF-IDF on genres, cast, overview, keywords, director</li>
                  <li>PCA or Truncated SVD for dimensionality reduction</li>
                </ul>
                <p className="text-sm bg-white p-2 rounded mt-2 font-mono">TF-IDF(t, d) = TF(t, d) × log(N / DF(t))</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">2. K-Nearest Neighbors (KNN)</h3>
                <p className="mb-2">Recommends movies based on vector distances using:</p>
                <ul className="list-disc ml-5 text-gray-700">
                  <li>Cosine Similarity</li>
                  <li>Euclidean Distance</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">3. K-Means Clustering</h3>
                <p className="mb-2">Groups similar movies using unsupervised clustering.</p>
                <p className="text-sm bg-white p-2 rounded mt-2 font-mono">K-Means Objective: Minimize ∑ᵢ ∑ₓ ∈ Cᵢ ||x - μᵢ||²</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">4. Perceptron (Neural Network)</h3>
                <p className="mb-2">Binary classifier for like/dislike prediction.</p>
                <p className="text-sm bg-white p-2 rounded mt-2 font-mono">y = sigmoid(Wx + b)</p>
                <p className="text-sm bg-white p-2 rounded mt-1 font-mono">Loss: Binary Cross-Entropy</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">5. Bayesian Recommendation (Naïve Bayes)</h3>
                <p className="mb-2">Predicts preference using Bayes' Theorem assuming feature independence.</p>
                <p className="text-sm bg-white p-2 rounded mt-2 font-mono">P(A | B) = (P(B | A) × P(A)) / P(B)</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">6. Content-Based Filtering</h3>
                <p className="mb-2">Finds movies similar in metadata using cosine similarity.</p>
              </div>
            </div>
          </section>

          <div className='w-full flex justify-center items-center'>
          <ImageSlider data={slider} />

          </div>

          {/* Models Summary */}
          <section>
            <h2 className="text-2xl font-bold mb-5 text-gray-800 pb-2 border-b border-gray-200">Summary of Models</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 font-bold">Model</th>
                    <th className="p-3 font-bold">Type</th>
                    <th className="p-3 font-bold">Key Concept</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">TF-IDF + Vectors</td>
                    <td className="p-3">Preprocessing</td>
                    <td className="p-3 font-mono text-xs">TF-IDF(t, d) = TF × log(N / DF)</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">KNN</td>
                    <td className="p-3">Similarity-based</td>
                    <td className="p-3 font-mono text-xs">Cosine / Euclidean distance</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">K-Means Clustering</td>
                    <td className="p-3">Unsupervised</td>
                    <td className="p-3 font-mono text-xs">Minimize ∑ ||x - μ||²</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">Perceptron</td>
                    <td className="p-3">Neural Network</td>
                    <td className="p-3 font-mono text-xs">y = sigmoid(Wx + b)</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">Naïve Bayes</td>
                    <td className="p-3">Probabilistic</td>
                    <td className="p-3 font-mono text-xs">P(A|B) = (P(B|A) × P(A)) / P(B)</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">Content-Based</td>
                    <td className="p-3">Metadata Matching</td>
                    <td className="p-3 font-mono text-xs">Cosine similarity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Dataset */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Dataset</h2>
            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
              <p className="text-gray-700">
                <strong>Source:</strong> TMDB or a similar dataset was used.
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Features include:</strong> Title, Genres, Cast, Overview, Keywords, Ratings, Popularity.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 p-6 text-center border-t">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Movie Recommendation Engine Project
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Report;