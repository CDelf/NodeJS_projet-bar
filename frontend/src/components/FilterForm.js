import React, { useState } from 'react';
import '../styles/components/filterForm.css';

const FilterForm = ({ filters, onFilter }) => {
    const [filtersState, setFiltersState] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltersState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filtersState);
    };

    return (
        <form className="filter-form" onSubmit={handleSubmit}>
            {filters.map(filter => (
                <input
                    key={filter.name}
                    type={filter.type || 'text'}
                    name={filter.name}
                    placeholder={filter.placeholder}
                    value={filtersState[filter.name] || ''}
                    onChange={handleChange}
                />
            ))}
            <button type="submit">Filtrer</button>
        </form>
    );
};

export default FilterForm;
