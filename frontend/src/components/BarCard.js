import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import useFetchBeers from '../hooks/useFetchBeers';
import useFetchOrders from '../hooks/useFetchOrders';
import '../styles/components/card.css';

const BarCard = ({ bar, onBarDeleted }) => {
    const [visibleSection, setVisibleSection] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Utilisation des hooks personnalisés
    const { beers, loading: loadingBeers, error: errorBeers } = useFetchBeers(bar.id);
    const { orders, loading: loadingOrders, error: errorOrders } = useFetchOrders(bar.id);

    // Gestion de l'affichage des sections
    const toggleSection = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    const handleDeleteClick = () => setShowDeleteModal(true);
    const handleCloseModal = () => setShowDeleteModal(false);

    return (
        <div className="card">
            <span className="delete-icon" onClick={handleDeleteClick}>
                <FaTimes />
            </span>

            <h2>{bar.name}</h2>
            {bar.description && <p className="description">{bar.description}</p>}
            <p className="details">{bar.address}</p>
            <p className="details">Contact: {bar.tel} ou {bar.email}</p>

            <div className="buttons">
                <button onClick={() => toggleSection('beers')}>Voir les bières</button>
                <button onClick={() => toggleSection('orders')}>Voir les commandes</button>
            </div>

            {visibleSection === 'beers' && (
                loadingBeers ? <p>Chargement des bières...</p> :
                errorBeers ? <p>Erreur: {errorBeers}</p> :
                <ul>
                    {beers.map(beer => (
                        <li key={beer.id}>
                            {beer.name} - {beer.degree}° - {beer.price}€
                        </li>
                    ))}
                </ul>
            )}

            {visibleSection === 'orders' && (
                loadingOrders ? <p>Chargement des commandes...</p> :
                errorOrders ? <p>Erreur: {errorOrders}</p> :
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            {order.name}, {new Date(order.date).toLocaleDateString()} - {order.price}€ - {order.status}
                        </li>
                    ))}
                </ul>
            )}

            {showDeleteModal && (
                <DeleteModal 
                    barId={bar.id} 
                    onClose={handleCloseModal} 
                    onBarDeleted={() => onBarDeleted(bar.id)} 
                />
            )}
        </div>
    );
};

export default BarCard;
