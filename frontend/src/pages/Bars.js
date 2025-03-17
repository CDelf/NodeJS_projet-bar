import React, { useState } from 'react';
import useFetchBars from '../hooks/useFetchBars';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BarCard from '../components/BarCard';
import FilterForm from '../components/FilterForm';
import AddBarForm from '../components/AddBarForm';
import '../styles/components/card.css';

const Bars = () => {
    const { bars, loading, error, refetch } = useFetchBars();
    const [filters, setFilters] = useState({ name: '', city: '' });
    const [showForm, setShowForm] = useState(false);

    // Gestion de la recherche par nom/ville
    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    const getCityFromAddress = (address) => {
        if (!address) return ''; 
        const parts = address.split(' ');
        return parts[parts.length - 1]; 
    };

    const filteredBars = bars.filter(bar => {
        const barName = bar?.name || ''; 
        const barCity = getCityFromAddress(bar?.address); 

        const nameMatch = filters.name 
            ? barName.toLowerCase().includes(filters.name.toLowerCase())
            : true;

        const cityMatch = filters.city 
            ? barCity.toLowerCase().includes(filters.city.toLowerCase())
            : true;

        return nameMatch && cityMatch;
    });

    // Gestion de l'ajout de bar
    const handleBarAdded = async () => {
        await refetch(); // Recharge les bars après ajout
        setShowForm(false); // Ferme la modale après rechargement
    };

    // Fonction pour gérer la suppression d'un bar
    const handleBarDeleted = (barId) => {
        refetch(); // Recharge les bars après suppression
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <Header />
            <Navigation />
            <div className="bars-page">
                <div className="filters">
                    <FilterForm 
                        filters={[
                            { name: 'name', placeholder: 'Rechercher par nom...' },
                            { name: 'city', placeholder: 'Rechercher par ville...' }
                        ]}
                        onFilter={handleFilter}
                    />
                </div>
                <div className="bars-content">
                    <p className="add-bar-text" onClick={() => setShowForm(true)}>
                        Propriétaire? Ajouter votre bar!
                    </p>

                    {showForm && (
                        <AddBarForm 
                            onClose={() => setShowForm(false)} 
                            onBarAdded={handleBarAdded}
                        />
                    )}

                    <div className="container">
                        {filteredBars.map(bar => (
                            <BarCard 
                                key={bar.id} 
                                bar={bar} 
                                onBarDeleted={handleBarDeleted} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bars;
