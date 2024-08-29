import axios from 'axios';

const API_URL = 'https://calendar-api.free.beeceptor.com';

export const fetchEvents = async (retryCount = 0) => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchEvents(retryCount + 1);
    } else {
      console.error('Failed to fetch events:', error);
      throw error;
    }
  }
};

// Ensure other functions are also exported if needed
export const addEvent = async (event) => {
  const response = await axios.post(`${API_URL}/events`, event);
  return response.data;
};

export const editEvent = async (id, event) => {
  const response = await axios.put(`${API_URL}/events/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id) => {
  await axios.delete(`${API_URL}/events/${id}`);
};