import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Transactions from '../../pages/Transactions';
import Budget from '../../pages/Budget';
import CurrentExpenses from '../../pages/CurrentExpenses';
import Objectives from '../../pages/Objectives';
import { Provider } from 'react-redux';
import { store } from '../../store';


const Layout: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="layout">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/depenses" element={<CurrentExpenses />} />
              <Route path="/objectifs" element={<Objectives />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default Layout;