import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


// Récupérer tous les bars
export const fetchBars = async () => {
    const response = await axios.get(`${API_URL}/bars`);
    return response.data;
};

// Ajouter un bar
export const addBar = async (barData) => {
    return await axios.post(`${API_URL}/bars`, barData);
};

// Supprimer un bar
export const deleteBar = async (barId) => {
    await axios.delete(`${API_URL}/bars/${barId}`);
};
