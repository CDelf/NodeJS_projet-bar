import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

console.log("API_URL:", API_URL);

// Récupérer tous les bars
export const fetchBars = async () => {
    const response = await axios.get(`${API_URL}/bars`);
    return response.data;
};