import React from 'react';
import Header from '../components/Header';
import useFetchBeers from '../hooks/useFetchBeers';
import Navigation from '../components/Navigation';
import '../styles/components/card.css';

const Bieres = () => {
    const { beers, loading, error } = useFetchBeers();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur: {error}</p>;
    return (
        <div>
            <Header />
            <Navigation />
            <div className="container">
            {beers.map(beer => (
                <div key={beer.id} className="card">
                    <h2>{beer.name}</h2>  
                    {beer.description && <p className="description">{beer.description}</p>}
                    <div className="details">
                        <span className="degree">{beer.degree}°</span>
                        <span className="price">{beer.price}€</span>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Bieres;

