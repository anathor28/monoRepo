// components/TransactionFilters.tsx
import React from 'react';
import '../../styles/TransactionFilters.scss';

interface TransactionFiltersProps {
    onFilterChange: (filters: any) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ onFilterChange }) => {
    // Implement your filter logic here
    return (
        <div className="transaction-filters">
            {/* Add your filter inputs here */}
            <input type="date" placeholder="Start Date" />
            <input type="date" placeholder="End Date" />
            <input type="text" placeholder="Search transactions" />
            {/* Add more filters as needed */}
        </div>
    );
};

export default TransactionFilters;