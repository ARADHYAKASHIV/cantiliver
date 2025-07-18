import axios from 'axios';

export const fetchNews = async (category = 'general', page = 1) => {
  try {
    const response = await axios.get('http://localhost:5000/api/news', {
      params: { category, page }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};