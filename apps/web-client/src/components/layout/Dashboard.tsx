import React from 'react';
import BalanceCard from '../BalanceCard';
import UpcomingPaymentsCard from '../UpcomingPaymentsCard';
import BudgetOverviewCard from '../BudgetOverviewCard';
import ObjectivesCard from '../ObjectivesCard';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Tableau de bord</h1>
      <div className="dashboard-grid">
        <BalanceCard />
        <UpcomingPaymentsCard />
        <BudgetOverviewCard />
        <ObjectivesCard />
      </div>
    </div>
  );
};

export default Dashboard;