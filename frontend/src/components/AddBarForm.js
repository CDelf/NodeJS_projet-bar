import React, { useState } from 'react';
import { addBar } from '../api/barApi'; 
import '../styles/components/addBar.css';

const AddBarForm = ({ onClose, onBarAdded }) => {
    const [barData, setBarData] = useState({
        name: '',
        address: '',
        tel: '',
        email: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBarData({ ...barData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addBar(barData);
            onBarAdded(); // Rafraîchir la liste des bars
            onClose();   // Fermer la modale
            resetForm(); // Reset du formulaire
        } catch (error) {
            console.error("Erreur lors de l'ajout du bar:", error);
        }
    };

    const resetForm = () => {
        setBarData({
            name: '',
            address: '',
            tel: '',
            email: '',
            description: ''
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Ajouter un Bar</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        value={barData.name}
                        placeholder="Nom du bar" 
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        name="address" 
                        value={barData.address}
                        placeholder="Adresse" 
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        name="tel" 
                        value={barData.tel}
                        placeholder="Téléphone" 
                        onChange={handleChange}
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={barData.email}
                        placeholder="Email" 
                        onChange={handleChange}
                    />
                    <textarea 
                        name="description" 
                        value={barData.description}
                        placeholder="Description" 
                        onChange={handleChange}
                    />
                    <button type="submit">Ajouter</button>
                    <button className="close-btn" type="button" onClick={onClose}>Annuler</button>
                </form>
            </div>
        </div>
    );
};

export default AddBarForm;
