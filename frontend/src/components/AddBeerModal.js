import { useState } from 'react';
import { addBeer } from '../api/beerApi';

const AddBeerModal = ({ barId, onClose, onBeerAdded }) => {
    const [name, setName] = useState('');
    const [degree, setDegree] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBeer = {
            name,
            degree: parseFloat(degree),
            price: parseFloat(price),
            description
        };

        try {
            await addBeer(barId, newBeer);
            onBeerAdded(); // Pour rafraîchir la liste des bières
            onClose(); // Ferme la modale
        } catch (error) {
            console.error("Erreur lors de l'ajout de la bière :", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Ajouter une bière</h2>
                <input
                    type="text"
                    placeholder="Nom de la bière"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Degré d'alcool"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Prix (€)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <textarea
                    placeholder="Description (facultatif)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={handleSubmit} className="btn-add">Ajouter</button>
                <button onClick={onClose} className="btn-cancel">Annuler</button>
            </div>
        </div>
    );
};

export default AddBeerModal;
