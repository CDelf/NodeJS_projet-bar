import { useState } from 'react';
import { addOrder } from '../api/orderApi';

const AddOrderModal = ({ barId, onClose, onOrderAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('en cours');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newOrder = {
            name,
            price: parseFloat(price),
            date: new Date(date).toISOString().slice(0, 10), 
            status
        };
    
        console.log("Données envoyées :", newOrder); 
    
        try {
            await addOrder(barId, newOrder);
            onOrderAdded(); // Pour rafraîchir la liste
            onClose(); // Ferme la modale
        } catch (error) {
            console.error("Erreur lors de l'ajout de la commande :", error.response?.data || error);
        }
    };
    
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Ajouter une commande</h2>
                <input
                    type="text"
                    placeholder="Nom de la commande"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Prix (€)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="en cours">En cours</option>
                    <option value="terminée">Terminée</option>
                </select>
                <button onClick={handleSubmit} className="btn-add">Ajouter</button>
                <button onClick={onClose} className="btn-cancel">Annuler</button>
            </div>
        </div>
    );
};

export default AddOrderModal;
