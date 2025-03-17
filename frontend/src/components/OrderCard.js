import React from 'react';
import '../styles/components/card.css';

const OrderCard = ({ order }) => {
    return (
        <div className="card">
            <h2>Commande n°{order.id}</h2>
            <p className="description">Passée le {order.date}</p>
            <p className="price">Total: {order.price} €</p>
            <p className="status">Status: {order.status}</p>
        </div>
    );
};

export default OrderCard;
