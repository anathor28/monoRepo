// src/pages/Transactions.tsx
import React, { useEffect, useState } from 'react';
import TransactionFilters from '../components/transaction/TransactionFilters';
import TransactionTable from '../components/transaction/TransactionTable';
import { Transaction } from '../types/Transaction';
import { RootState, AppDispatch } from '../store';
import { fetchTransactions } from '../store/slices/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';

const Transactions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, status, error } = useSelector((state: RootState) => state.transactions)
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (status === 'idle') { dispatch(fetchTransactions()) }
  }, [status, dispatch])

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would fetch filtered data here
  };

  if (status === 'loading') {
    return <div>Loading transactions...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>
      <TransactionFilters onFilterChange={handleFilterChange} />
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Transactions;