import React, { useState } from 'react';
import useFetchBars from '../hooks/useFetchBars';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BarCard from '../components/BarCard';
import FilterForm from '../components/FilterForm';
import '../styles/components/card.css';

const Bars = () => {
    const { bars, loading, error } = useFetchBars();
    const [filters, setFilters] = useState({ name: '', city: '' });

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    const getCityFromAddress = (address) => {
        if (!address) return ''; // Gère le cas où l'adresse est undefined
        const parts = address.split(' ');
        return parts[parts.length - 1]; // Récupérer la ville depuis l'adresse
    };

    const filteredBars = bars.filter(bar => {
        const barName = bar?.name || ''; // Si le nom est undefined, retourne une string vide
        const barCity = getCityFromAddress(bar?.address); // Si l'adresse est undefined, retourne ''

        const nameMatch = filters.name 
            ? barName.toLowerCase().includes(filters.name.toLowerCase())
            : true;

        const cityMatch = filters.city 
            ? barCity.toLowerCase().includes(filters.city.toLowerCase())
            : true;

        return nameMatch && cityMatch;
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <Header />
            <Navigation />
            <div className="bars-container">
                <div className="filters">
                    <FilterForm 
                        filters={[
                            { name: 'name', placeholder: 'Rechercher par nom...' },
                            { name: 'city', placeholder: 'Rechercher par ville...' }
                        ]}
                        onFilter={handleFilter}
                    />
                </div>
                <div className="container">
                    {filteredBars.map(bar => (
                        <BarCard key={bar.id} bar={bar} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bars;
