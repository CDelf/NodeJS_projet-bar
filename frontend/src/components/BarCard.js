import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import AddBeerModal from './AddBeerModal';
import AddOrderModal from './AddOrderModal';
import useFetchBeers from '../hooks/useFetchBeers';
import useFetchOrders from '../hooks/useFetchOrders';
import '../styles/components/card.css';

const BarCard = ({ bar, onBarDeleted }) => {
    const [visibleSection, setVisibleSection] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddBeerModal, setShowAddBeerModal] = useState(false);
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);

    const { beers, loading: loadingBeers, error: errorBeers } = useFetchBeers(bar.id);
    const { orders, loading: loadingOrders, error: errorOrders } = useFetchOrders(bar.id);

    const toggleSection = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    const handleBeerAdded = () => {
        setShowAddBeerModal(false);
        toggleSection('beers'); // Pour recharger la liste après ajout
    };

    const handleOrderAdded = () => {
        setShowAddOrderModal(false);
        toggleSection('orders'); // Pour recharger la liste après ajout
    };

    return (
        <div className="card">
            <span className="delete-icon" onClick={() => setShowDeleteModal(true)}>
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
                loadingBeers ? (
                    <p>Chargement des bières...</p>
                ) : errorBeers ? (
                    <p>Erreur: {errorBeers}</p>
                ) : (
                    <ul>
                        {beers.map(beer => (
                            <li key={beer.id}>
                                {beer.name} - {beer.degree}° - {beer.price}€
                            </li>
                        ))}
                    </ul>
                )
            )}

            {/* Icône "+" pour ajouter une bière */}
            <div className="add-icon" onClick={() => setShowAddBeerModal(true)}>
                <FaPlus /> Ajouter une bière
            </div>

            {visibleSection === 'orders' && (
                loadingOrders ? (
                    <p>Chargement des commandes...</p>
                ) : errorOrders ? (
                    <p>Erreur: {errorOrders}</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>
                                {order.name}, {new Date(order.date).toLocaleDateString()} - {order.price}€ - {order.status}
                            </li>
                        ))}
                    </ul>
                )
            )}

            {/* Icône "+" pour ajouter une commande */}
            <div className="add-icon" onClick={() => setShowAddOrderModal(true)}>
                <FaPlus /> Ajouter une commande
            </div>

            {showDeleteModal && (
                <DeleteModal 
                    barId={bar.id} 
                    onClose={() => setShowDeleteModal(false)} 
                    onBarDeleted={() => onBarDeleted(bar.id)} 
                />
            )}

            {showAddBeerModal && (
                <AddBeerModal 
                    barId={bar.id} 
                    onClose={() => setShowAddBeerModal(false)} 
                    onBeerAdded={handleBeerAdded} 
                />
            )}

            {showAddOrderModal && (
                <AddOrderModal 
                    barId={bar.id} 
                    onClose={() => setShowAddOrderModal(false)} 
                    onOrderAdded={handleOrderAdded} 
                />
            )}
        </div>
    );
};

export default BarCard;
