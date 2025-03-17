import React from 'react';
import { deleteBar } from '../api/barApi';
import '../styles/components/deleteModal.css';


const DeleteModal = ({ barId, onClose, onBarDeleted }) => {
    const handleDelete = async () => {
        try {
            await deleteBar(barId);
            onBarDeleted(); // Rafraîchir la liste des bars après suppression
            onClose(); // Fermer la modale
        } catch (error) {
            console.error("Erreur lors de la suppression du bar:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Supprimer ce bar ?</h2>
                <p>Êtes-vous sûr(e) de vouloir supprimer ce bar ? Cette action est irréversible.</p>
                <button onClick={handleDelete} className="delete-btn">Supprimer</button>
                <button onClick={onClose} className="cancel-btn">Annuler</button>
            </div>
        </div>
    );
};

export default DeleteModal;
