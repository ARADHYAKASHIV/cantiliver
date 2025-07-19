import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import { fetchNews } from '../services/api';
import axios from 'axios';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 50;
  const [dailyFacts, setDailyFacts] = useState([
    {
      title: 'Fact of the Day 1',
      value: 'Loading...',
      description: ''
    },
    {
      title: 'Fact of the Day 2',
      value: 'Loading...',
      description: ''
    }
  ]); 

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

  useEffect(() => {
    const fetchDailyFact = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/facts/daily-fact');
        setDailyFacts(response.data);
      } catch (err) {
        console.error('Error fetching daily fact:', err);
        setDailyFacts([
          {
            title: 'Fact of the Day 1',
            value: 'N/A',
            description: 'Failed to load fact.'
          },
          {
            title: 'Fact of the Day 2',
            value: 'N/A',
            description: 'Failed to load fact.'
          }
        ]);
      }
    };
    fetchDailyFact();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className=" flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="bg-[rgb(40,40,40)] min-h-screen flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1" style={{ paddingTop: '100px' }}>
        {/* Modern News Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Sidebar: Categories & Small Articles */}
          <aside className="md:col-span-1 flex flex-col gap-8">
            {/* Categories */}
            <div className="bg-black/60 rounded-2xl p-6 mb-4">
              <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {['Politics','Business','Tech','Arts','Science','Health','Sports'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat.toLowerCase()); setCurrentPage(1); }}
                    className={`px-4 py-1 rounded-full border border-white/30 text-sm font-medium transition-all duration-200 ${category === cat.toLowerCase() ? 'bg-[#E05B4A] text-white border-[#E05B4A]' : 'text-white hover:bg-white/10'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {/* Small Articles */}
            {articles.slice(1,3).map((article, idx) => (
              <div key={idx} className="bg-[#282828] rounded-2xl p-4 flex flex-col mb-4">
                <img src={article.urlToImage || '/placeholder.jpg'} alt={article.title} className="w-full h-28 object-cover rounded-xl mb-2" />
                <h4 className="text-white font-semibold text-base mb-1 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>{article.title}</h4>
                <p className="text-gray-400 text-xs mb-2 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>{article.description}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{article.source?.name || 'Unknown'}</span>
                  <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{new Date(article.publishedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
            ))}
          </aside>
          {/* Center: Featured Article */}
          <main className="md:col-span-2 flex flex-col gap-8">
            {articles.length > 0 && (
              <div className="relative bg-[#282828] rounded-3xl overflow-hidden flex flex-col">
                <img src={articles[0].urlToImage || '/placeholder.jpg'} alt={articles[0].title} className="w-full h-72 object-cover" />
                <div className="absolute top-6 left-6 bg-[#E05B4A] text-white text-xs px-4 py-1 rounded-full font-semibold tracking-wide">Top Story</div>
                <div className="p-8">
                  <h2 className="text-3xl font-extrabold mb-4 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{articles[0].title}</h2>
                  <p className="text-gray-400 mb-6 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>{articles[0].description}</p>
                  <a href={articles[0].url} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#E05B4A] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">Read More</a>
                </div>
              </div>
            )}
            {/* Latest Articles */}
            <div>
              <h1 className="text-2xl font-extrabold mb-6 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Latest News</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.slice(3, 9).map((article, idx) => (
                  <ArticleCard
                    key={idx}
                    title={article.title}
                    description={article.description}
                    url={article.url}
                    source={article.source?.name || 'Unknown'}
                    image={article.urlToImage || '/placeholder.jpg'}
                    date={article.publishedAt}
                  />
                ))}
              </div>
            </div>
          </main>
          {/* Right Sidebar: Highlight/Widget */}
          <aside className="md:col-span-1 flex flex-col gap-8">
            {/* Number of the Day */}
            <div className="bg-[#E05B4A] rounded-2xl p-6 text-white mb-4">
              {dailyFacts.map((fact, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="text-xs uppercase mb-2 tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>{fact.title}</div>
                <div className="text-3xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{fact.value}</div>
                <div className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{fact.description}</div>
              </div>
            ))}
            </div>
            {/* Widget Article */}
            {articles[9] && (
              <div className="bg-[#282828] rounded-2xl p-4 flex flex-col">
                <img src={articles[9].urlToImage || '/placeholder.jpg'} alt={articles[9].title} className="w-full h-28 object-cover rounded-xl mb-2" />
                <h4 className="text-white font-semibold text-base mb-1 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>{articles[9].title}</h4>
                <p className="text-gray-400 text-xs mb-2 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>{articles[9].description}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{articles[9].source?.name || 'Unknown'}</span>
                  <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{new Date(articles[9].publishedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      <footer className="bg-[#282828] py-8 mt-12 text-center text-white/80 text-sm rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <span className="text-white/40">|</span>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <span className="text-white/40">|</span>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <span className="text-white/40">|</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          </div>
          <div className="flex flex-col gap-2">
            <p>&copy; {new Date().getFullYear()} NewsBlog. All rights reserved.</p>
            <p className="text-xs text-white/60">
              Powered by NewsAPI and built with React
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
export default HomePage;