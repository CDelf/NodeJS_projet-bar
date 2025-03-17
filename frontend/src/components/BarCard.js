import React, { useState } from 'react';
import axios from 'axios';
import '../styles/components/card.css';

const BarCard = ({ bar }) => {
    const [beers, setBeers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [visibleSection, setVisibleSection] = useState(null); // Pour savoir quelle section est ouverte

    const fetchBeers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/bars/${bar.id}/beers`);
            console.log("Beers data:", res.data);
            setBeers(res.data.beers); 
            setVisibleSection(visibleSection === 'beers' ? null : 'beers'); // Ouvre ou ferme la section
        } catch (error) {
            console.error("Erreur lors de la récupération des bières:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/bars/${bar.id}/orders`);
            console.log("Orders data:", res.data);
            setOrders(res.data.orders); 
            setVisibleSection(visibleSection === 'orders' ? null : 'orders'); // Ouvre ou ferme la section
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes:", error);
        }
    };

    return (
        <div className="card">
            <h2>{bar.name}</h2>
            {bar.description && <p className="description">{bar.description}</p>}
            <p className="details">{bar.address}</p>
            <p className="details">Contact: {bar.tel} ou {bar.email}</p>

            <div className="buttons">
                <button onClick={fetchBeers}>Voir les bières</button>
                <button onClick={fetchOrders}>Voir les commandes</button>
            </div>

            {visibleSection === 'beers' && beers.length > 0 && (
                <div className="beers-list">
                    <h3>Bières disponibles:</h3>
                    <ul>
                        {beers.map(beer => (
                            <li key={beer.id}>
                                {beer.name} - {beer.degree}° - {beer.price}€
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {visibleSection === 'orders' && orders.length > 0 && (
                <div className="orders-list">
                    <h3>Commandes passées:</h3>
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>
                                {order.name}, {new Date(order.date).toLocaleDateString()} - {order.price}€ - {order.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BarCard;