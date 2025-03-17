import { useState, useEffect } from 'react';
import { fetchBeers } from '../api/beerApi';

const useFetchBeers = () => {
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBeers = async () => {
            try {
                const data = await fetchBeers();
                setBeers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getBeers();
    }, []);

    return { beers, loading, error };
};

export default useFetchBeers;