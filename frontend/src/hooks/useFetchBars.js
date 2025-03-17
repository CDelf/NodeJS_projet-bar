import { useState, useEffect } from 'react';
import { fetchBars } from '../api/barApi';

const useFetchBars = () => {
    const [bars, setBars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBars = async () => {
            try {
                const data = await fetchBars();
                setBars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getBars();
    }, []);

    return { bars, loading, error };
};

export default useFetchBars;