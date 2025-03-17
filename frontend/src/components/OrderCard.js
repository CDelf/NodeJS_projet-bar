import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import { deleteOrder } from '../api/orderApi';
import '../styles/components/card.css';

const OrderCard = ({ order, onOrderDeleted }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    return (
        <div className="card">
            <span className="delete-icon" onClick={handleDelete}>
                <FaTimes />
            </span>

            <h2>Commande n°{order.id}</h2>
            <p className="description">Passée le {new Date(order.date).toLocaleDateString('fr-CA')}</p>
            <p className="price">Total: {order.price} €</p>
            <p className="status">Status: {order.status}</p>

            {showDeleteModal && (
                <DeleteModal
                    itemId={order.id}
                    deleteFunction={deleteOrder}
                    onClose={() => setShowDeleteModal(false)}
                    onDeleted={() => onOrderDeleted(order.id)}
                />
            )}
        </div>
    );
};

export default OrderCard;