import axios from 'axios';

export const fetchNews = async (category = 'general', page = 1, pageSize = 100) => {
  try {
    const response = await axios.get('http://localhost:5000/api/news', {
      params: { category, page, pageSize }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};