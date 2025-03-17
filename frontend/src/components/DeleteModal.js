import React from 'react';
import '../styles/components/deleteModal.css';

const DeleteModal = ({ itemId, onClose, onDeleted, deleteFunction }) => {
    console.log("ID reçu :", itemId);
    const handleDelete = async () => {
        try {
            await deleteFunction(itemId);
            onDeleted(); // Rafraîchir la liste
            onClose();  // Fermer la modale
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Supprimer cet élément ?</h2>
                <p>Cette action est irréversible.</p>
                <button onClick={handleDelete} className="delete-btn">Supprimer</button>
                <button onClick={onClose} className="cancel-btn">Annuler</button>
            </div>
        </div>
    );
};

export default DeleteModal;
