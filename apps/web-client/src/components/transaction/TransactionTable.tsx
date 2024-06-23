// src/components/TransactionTable.tsx
import React, { useState } from 'react';
import '../../styles/TransactionTable.scss';
import { Transaction } from '../../types/Transaction';
import DateSeparator from '../table/DateSeparator';
import TransactionItem from '../table/TransactionItem';
import TransactionDetails from './TransactionDetailsProps';

interface TransactionTableProps {
    transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    const [markedTransactions, setMarkedTransactions] = useState<Set<string>>(new Set());
    const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const toggleMarkTransaction = (id: string) => {
        setMarkedTransactions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const toggleDateExpansion = (date: string) => {
        setExpandedDates(prev => {
            const newSet = new Set(prev);
            if (newSet.has(date)) {
                newSet.delete(date);
            } else {
                newSet.add(date);
            }
            return newSet;
        });
    };

    const selectTransaction = (transaction: Transaction) => {
        setSelectedTransaction(prev => prev?.id === transaction.id ? null : transaction);
    };

    const groupTransactionsByDate = (transactions: Transaction[]) => {
        const grouped: { [key: string]: Transaction[] } = {};
        transactions.forEach(transaction => {
            if (!grouped[transaction.date]) {
                grouped[transaction.date] = [];
            }
            grouped[transaction.date].push(transaction);
        });
        return grouped;
    };

    const groupedTransactions = groupTransactionsByDate(transactions);

    return (
        <div className="transaction-table">
            {Object.entries(groupedTransactions).map(([date, transactions]) => (
                <React.Fragment key={date}>
                    <DateSeparator
                        date={date}
                        isExpanded={expandedDates.has(date)}
                        onToggle={() => toggleDateExpansion(date)}
                    />
                    {expandedDates.has(date) && transactions.map(transaction => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            isMarked={markedTransactions.has(transaction.id)}
                            isSelected={selectedTransaction?.id === transaction.id}
                            onToggleMark={() => toggleMarkTransaction(transaction.id)}
                            onSelect={() => selectTransaction(transaction)}
                        />
                    ))}
                </React.Fragment>
            ))}
            {selectedTransaction && (
                <TransactionDetails
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}
        </div>
    );
};

export default TransactionTable;