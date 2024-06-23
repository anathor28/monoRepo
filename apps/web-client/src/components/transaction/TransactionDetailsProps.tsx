// src/components/transaction/TransactionDetails.tsx
import React from 'react';
import { Transaction } from '../../types/Transaction';
import '../../styles/TransactionDetails.scss';

interface TransactionDetailsProps {
    transaction: Transaction;
    onClose: () => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction, onClose }) => {
    return (
        <div className="transaction-details-overlay">
            <div className="transaction-details-panel">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h3>Transaction Details</h3>
                <p>Date: {transaction.date}</p>
                <p>Label: {transaction.label}</p>
                <p>Type: {transaction.type}</p>
                <p>Amount: {transaction.amount.toFixed(2)} €</p>
                <p>Balance: {transaction.balance.toFixed(2)} €</p>
                <div className="action-buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>Categorize</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;