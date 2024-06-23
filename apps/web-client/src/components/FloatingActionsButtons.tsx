import React from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

interface FloatingActionsButtonsProps {
    actions: ActionItem[];
}

// Définir notre propre interface pour une action
interface ActionItem {
    text: string;
    onClick: () => void;
    icon: React.ReactNode;
}

const FloatingActionsButtons: React.FC<FloatingActionsButtonsProps> = ({ actions }) => {
    return (
        <Fab
            mainButtonStyles={{ backgroundColor: '#1976d2' }}
            icon="+"
            alwaysShowTitle={true}
        >
            {actions.map((action, index) => (
                <Action
                    key={index}
                    text={action.text}
                    onClick={action.onClick}
                >
                    {action.icon}
                </Action>
            ))}
        </Fab>
    );
};

export default FloatingActionsButtons;