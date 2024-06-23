// components/CardBalance.tsx
import React from 'react';
import './CardBalance.scss';

interface CardBalanceProps {
    title: string;
    balance: number;
    currency?: string;
}

const CardBalance: React.FC<CardBalanceProps> = ({ title, balance, currency = '€' }) => {
    return (
        <div className="card-balance">
            <h2>{title}</h2>
            <p className="balance">{balance.toFixed(2)} {currency}</p>
        </div>
    );
};

export default CardBalance;