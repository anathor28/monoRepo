import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface TabNavigationProps {
    tabs: string[];
    activeTab: number;
    onTabChange: (newValue: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        onTabChange(newValue);
    };

    return (
        <Tabs value={activeTab} onChange={handleChange} aria-label="navigation tabs">
            {tabs.map((tab, index) => (
                <Tab key={index} label={tab} />
            ))}
        </Tabs>
    );
};

export default TabNavigation;