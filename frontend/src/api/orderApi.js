import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

console.log("API_URL:", API_URL);

// Récupérer les commandes
export const fetchOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
};




