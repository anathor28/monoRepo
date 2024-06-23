// components/DateSeparator.tsx
import React from 'react';
import '../../styles/DateSeparator.scss'

interface DateSeparatorProps {
    date: string;
    isExpanded: boolean;
    onToggle: () => void;
}

const DateSeparator: React.FC<DateSeparatorProps> = ({ date, isExpanded, onToggle }) => (
    <div className="date-separator" onClick={onToggle}>
        <span>{date}</span>
        <span className='toggle-icon'>{isExpanded ? '▼' : '▶'}</span>
    </div>
);

export default DateSeparator;