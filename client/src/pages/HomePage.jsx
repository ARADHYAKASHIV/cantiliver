import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { fetchNews } from '../services/api';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 100; 

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await fetchNews(category, currentPage, pageSize);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [category, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {error}
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen top-16 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 flex-1">
        {/* Hero Section */}
        {articles.length > 0 && (
          <div className="mb-16 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row relative">
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <img src={articles[0].urlToImage} alt={articles[0].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs px-4 py-1 rounded-full shadow-lg font-semibold tracking-wide animate-bounce">Top Story</span>
            </div>
            <div className="p-10 flex flex-col justify-center bg-white/80 backdrop-blur-lg">
              <h2 className="text-4xl font-extrabold mb-4 text-gray-900 drop-shadow-lg">{articles[0].title}</h2>
              <p className="text-gray-700 mb-6 text-lg">{articles[0].description}</p>
              <a href={articles[0].url} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-4 mx-auto rounded-full font-semibold shadow hover:from-blue-600 hover:to-pink-600 transition-all duration-300">Read More</a>
            </div>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="flex-1">
            <h1 className="text-3xl font-extrabold mb-10 text-gray-900">Latest Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.slice(1).map((article, idx) => (
                <ArticleCard
                  key={idx}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  source={article.source?.name || 'Unknown'}
                  image={article.urlToImage}
                  date={article.publishedAt}
                />
              ))}
            </div>
          </main>
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            {/* Categories */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
              <h3 className="text-2xl font-bold mb-6 text-blue-700">Categories</h3>
              <ul className="space-y-3">
                {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-xl font-medium transition-all duration-200 ${category === cat ? 'bg-gradient-to-r from-blue-400 to-pink-400 text-white shadow' : 'hover:bg-blue-50 text-blue-700'}`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Editor's Pick */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
              <h3 className="text-2xl font-bold mb-6 text-pink-700">Editor's Pick</h3>
              {articles.slice(0, 3).map((article, idx) => (
                <div key={idx} className="mb-6">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-24 object-cover rounded-xl mb-2" />
                  <h4 className="text-base font-semibold text-gray-800 line-clamp-2">{article.title}</h4>
                </div>
              ))}
            </div>
            {/* Topics */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-purple-700">Popular Topics</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-gradient-to-r from-blue-200 to-pink-200 px-4 py-2 rounded-full text-sm font-semibold text-blue-700">Tech</span>
                <span className="bg-gradient-to-r from-pink-200 to-purple-200 px-4 py-2 rounded-full text-sm font-semibold text-pink-700">Health</span>
                <span className="bg-gradient-to-r from-purple-200 to-blue-200 px-4 py-2 rounded-full text-sm font-semibold text-purple-700">Sports</span>
                <span className="bg-gradient-to-r from-blue-200 to-pink-200 px-4 py-2 rounded-full text-sm font-semibold text-blue-700">Business</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white/80 py-6 mt-12 shadow-inner text-center text-gray-600 text-sm rounded-t-2xl">
        &copy; {new Date().getFullYear()} NewsBlog. All rights reserved. | <a href="/about" className="text-blue-600 hover:underline">About</a> | <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
      </footer>
    </div>
  );
};

export default HomePage;