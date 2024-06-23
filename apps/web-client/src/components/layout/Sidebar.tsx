// Sidebar.tsx
import React, { useState } from 'react';
import { Home, AccountBalance, Assessment, Flag, TrendingDown } from '@mui/icons-material';
import '../../styles/SideBar.scss'
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate()
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { name: 'Accueil', icon: <Home />, path: '/' },
        { name: 'Transactions', icon: <AccountBalance />, path: '/transactions' },
        { name: 'Budget', icon: <Assessment />, path: '/budget' },
        { name: 'Dépenses Courantes', icon: <TrendingDown />, path: '/depenses' },
        { name: 'Objectifs', icon: <Flag />, path: '/objectifs' },
    ];

    const handleNavigation = (path: string) => {
        console.log(`Navigating to: ${path}`);
        navigate(path);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button onClick={toggleSidebar} className="toggle-btn">
                {isOpen ? '<<' : '>>'}
            </button>
            <nav>
                {menuItems.map((item, index) => (
                    <NavLink
                        to={item.path} key={index} className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleNavigation(item.path)}>

                        {item.icon}
                        {isOpen && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;