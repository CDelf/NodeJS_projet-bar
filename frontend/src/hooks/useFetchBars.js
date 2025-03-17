import { useState, useEffect } from 'react';
import { fetchBars } from '../api/barApi'; 

const useFetchBars = () => {
    const [bars, setBars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getBars = async () => {
        setLoading(true);
        try {
            const data = await fetchBars(); 
            setBars(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Appel automatique au chargement de la page
    useEffect(() => {
        getBars();
    }, []);

    return { bars, loading, error, refetch: getBars };
};

export default useFetchBars;
