import React from 'react';
import Header from '../components/Header';
import useFetchOrders from '../hooks/useFetchOrders';
import Navigation from '../components/Navigation';
import '../styles/components/card.css';

const Orders = () => {
    const { orders, loading, error } = useFetchOrders();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <Header />
            <Navigation />
            <div className="container">
                {orders.map(order => (
                    <div key={order.id} className="card">
                        <h2>{order.name}</h2>
                        <p className="date">Passée le {new Date(order.date).toLocaleDateString()}</p>
                        <p className="details">
                            <span className="price">{order.price}€</span>
                            <span className={`status ${order.status}`}>{order.status}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
