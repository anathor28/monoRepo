// src/components/CardSimple.tsx
import React from 'react';
import '../../styles/CardSimple.scss';

interface CardSimpleProps {
    title: string;
    value: string;
    subtitle?: string;
    children?: React.ReactNode;
}

const CardSimple: React.FC<CardSimpleProps> = ({ title, value, subtitle, children }) => {
    return (
        <div className="card-simple">
            <div className="card-header">
                <h3>{title}</h3>
                <p className="value">{value}</p>
                {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default CardSimple;