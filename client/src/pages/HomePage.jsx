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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {articles.length > 0 && (
          <div className="mb-12 bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
            <img src={articles[0].urlToImage} alt={articles[0].title} className="w-full md:w-1/2 h-64 md:h-auto object-cover" />
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">{articles[0].title}</h2>
              <p className="text-gray-600 mb-4">{articles[0].description}</p>
              <a href={articles[0].url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Read More</a>
            </div>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Latest Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-2 py-1 rounded ${category === cat ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Editor's Pick */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-xl font-semibold mb-4">Editor's Pick</h3>
              {articles.slice(0, 3).map((article, idx) => (
                <div key={idx} className="mb-4">
                  <img src={article.urlToImage} alt={article.title} className="w-full h-24 object-cover rounded mb-2" />
                  <h4 className="text-sm font-medium">{article.title}</h4>
                </div>
              ))}
            </div>
            {/* Topics */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Tech</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Health</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Sports</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Business</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;