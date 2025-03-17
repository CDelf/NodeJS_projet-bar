import React from 'react';
import useFetchBars from '../hooks/useFetchBars';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BarCard from '../components/BarCard';
import '../styles/components/card.css';

const Bars = () => {
    const { bars, loading, error } = useFetchBars();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <Header />
            <Navigation />
            <div className="container">
                {bars.map(bar => (
                    <BarCard key={bar.id} bar={bar} />
                ))}
            </div>
        </div>
    );
};

export default Bars;