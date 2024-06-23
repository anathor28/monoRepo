import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InsightsIcon from '@mui/icons-material/Insights';

interface SideBarProps {
    open: boolean;
    onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
    const menuItems = [
        { text: 'Home', icon: <HomeIcon /> },
        { text: 'Accounts', icon: <AccountBalanceIcon /> },
        { text: 'Analytics', icon: <InsightsIcon /> },
    ];

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideBar;