import React from 'react';

const ArticleCard = ({ title, description, url, source, image, date }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown';

  return (
    <div className="bg-[#282828] rounded-2xl overflow-hidden flex flex-col border-2 border-[#E05B4A]/20 hover:border-[#E05B4A]/40 transition-all duration-300 shadow-lg hover:shadow-[#E05B4A]/20">
      {image && (
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <span className="absolute top-2 left-2 bg-[#E05B4A] text-white text-xs px-3 py-1 rounded-full">{source}</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-1 border-t border-[#E05B4A]/10">
        <h2 className="text-xl font-bold mb-2 text-white line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</h2>
        <p className="text-gray-400 flex-1 mb-4 line-clamp-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span>{formattedDate}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#E05B4A] text-white py-2 rounded-lg font-semibold hover:bg-[#E05B4A]/90 transition-colors duration-300"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;