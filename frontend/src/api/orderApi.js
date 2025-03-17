import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Récupérer les commandes d'un bar
export const fetchOrders = async (barId) => {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
};

// Ajouter une commande
export const addOrder = async (barId, orderData) => {
    return await axios.post(`${API_URL}/bars/${barId}/order`, orderData);
};

// Supprimer une commande
export const deleteOrder = async (barId, orderId) => {
    await axios.delete(`${API_URL}/bars/${barId}/order/${orderId}`);
};
