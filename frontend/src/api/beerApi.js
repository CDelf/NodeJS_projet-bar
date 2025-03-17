import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Récupérer toutes les bières d'un bar
export const fetchBeers = async (barId) => {
    const response = await axios.get(`${API_URL}/beers`);
    return response.data;
};

// Ajouter une bière
export const addBeer = async (barId, beerData) => {
    return await axios.post(`${API_URL}/bars/${barId}/beer`, beerData);
};

// Supprimer une bière
export const deleteBeer = async (barId, beerId) => {
    await axios.delete(`${API_URL}/bars/${barId}/beer/${beerId}`);
};
