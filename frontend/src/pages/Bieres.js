import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BeerCard from '../components/BeerCard';
import useFetchBeers from '../hooks/useFetchBeers';
import '../styles/components/card.css';

const Bieres = () => {
    const { beers, loading, error } = useFetchBeers();

    const handleBeerDeleted = (deletedBeerId) => {
        // Filtrer les bières pour mettre à jour l'affichage
        console.log("Bière supprimée avec succès :", deletedBeerId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <Header />
            <Navigation />
            <div className="container">
                {beers.map(beer => (
                    <BeerCard 
                        key={beer.id}
                        beer={beer}
                        onBeerDeleted={handleBeerDeleted}
                    />
                ))}
            </div>
        </div>
    );
};

export default Bieres;