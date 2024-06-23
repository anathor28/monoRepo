// src/components/table/TransactionItem.tsx
import React from 'react';
import '../../styles/TransactionItem.scss';
import { Transaction } from '../../types/Transaction';

interface TransactionItemProps {
    transaction: Transaction;
    isMarked: boolean;
    isSelected: boolean;
    onToggleMark: () => void;
    onSelect: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
    transaction,
    isMarked,
    isSelected,
    onToggleMark,
    onSelect
}) => (
    <div
        className={`transaction-item ${isMarked ? 'marked' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={onSelect}
    >
        <div className="transaction-info">
            <span className="label">{transaction.label}</span>
            <span className="type">{transaction.type}</span>
        </div>
        <div className="transaction-amounts">
            <span className={`amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                {transaction.amount.toFixed(2)} €
            </span>
            <span className="balance">{transaction.balance.toFixed(2)} €</span>
        </div>
        <button
            onClick={(e) => { e.stopPropagation(); onToggleMark(); }}
        >
            {isMarked ? '★' : '☆'}
        </button>
    </div>
);

export default TransactionItem;