import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import useFetchOrders from '../hooks/useFetchOrders';
import OrderCard from '../components/OrderCard'; // 👈 Import du composant
import '../styles/components/card.css';

const Orders = () => {
    const { orders, loading, error } = useFetchOrders();

    const handleOrderDeleted = (orderId) => {
        console.log('Commande supprimée avec succès', orderId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <Header />
            <Navigation />
            <div className="container">
                {orders.map(order => (
                    <OrderCard 
                        key={order.id}
                        order={order}
                        onOrderDeleted={handleOrderDeleted} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;
