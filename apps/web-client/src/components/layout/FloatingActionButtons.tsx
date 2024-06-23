// src/components/FloatingActionButtons.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/FloatingActionButtons.scss';

interface ActionButton {
    icon: React.ReactNode;
    label: string;
    action: () => void;
}

const FloatingActionButtons: React.FC = () => {
    const location = useLocation();

    const getActionButtons = (): ActionButton[] => {
        switch (location.pathname) {
            case '/':
                return [
                    { icon: '💰', label: 'Nouveau virement', action: () => console.log('Nouveau virement') },
                    { icon: '📊', label: 'Voir statistiques', action: () => console.log('Voir statistiques') },
                ];
            case '/transactions':
                return [
                    { icon: '➕', label: 'Nouvelle transaction', action: () => console.log('Nouvelle transaction') },
                    { icon: '🔍', label: 'Rechercher', action: () => console.log('Rechercher') },
                ];
            // Ajoutez d'autres cas pour les différentes pages
            default:
                return [];
        }
    };

    const buttons = getActionButtons();

    return (
        <div className="floating-action-buttons">
            {buttons.map((button, index) => (
                <button key={index} onClick={button.action} className="action-button">
                    <span className="icon">{button.icon}</span>
                    <span className="label">{button.label}</span>
                </button>
            ))}
        </div>
    );
};

export default FloatingActionButtons;