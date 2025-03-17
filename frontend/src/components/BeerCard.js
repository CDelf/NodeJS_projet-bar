import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import { deleteBeer } from '../api/beerApi';
import '../styles/components/card.css';

const BeerCard = ({ beer, onBeerDeleted }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async () => {
        setShowDeleteModal(true);
    };
    console.log('Beer:', beer);
    
    return (
        <div className="card beer-card">
            <span className="delete-icon" onClick={handleDelete}>
                <FaTimes />
            </span>
            <h2>{beer.name}</h2>
            {beer.description && <p className="description">{beer.description}</p>}
            <div className="details">
                <span className="degree">{beer.degree}°</span>
                <span className="price">{beer.price}€</span>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    itemId={beer.id}
                    deleteFunction={deleteBeer} 
                    onDeleted={() => onBeerDeleted(beer.id)}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default BeerCard;
