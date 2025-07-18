import React from 'react';

const ArticleCard = ({ title, description, url, source, image, date }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">{title}</h2>
        <p className="text-gray-600 flex-1 mb-4 line-clamp-3 text-sm">{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{source}</span>
          <span>{formattedDate}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition font-medium"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;