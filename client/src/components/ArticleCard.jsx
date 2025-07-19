import React from 'react';

const ArticleCard = ({ title, description, url, source, image, date }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col border border-blue-100">
      {image && (
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">{source}</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{title}</h2>
        <p className="text-gray-600 flex-1 mb-4 line-clamp-3 text-sm">{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>{formattedDate}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition font-semibold shadow"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;