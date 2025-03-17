import React from 'react';

const BeerCard = ({ beer }) => {
    return (
        <div className="beer-item">
            {beer.name} - {beer.degree}° - {beer.price}€
        </div>
    );
};

export default BeerCard;
