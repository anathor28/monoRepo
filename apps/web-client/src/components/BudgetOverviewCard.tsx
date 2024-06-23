import React from 'react';
import "../styles/BudgetOverviewCard.scss";

interface BudgetCategory {
  id: number;
  name: string;
  allocated: number;
  spent: number;
}

const BudgetOverviewCard: React.FC = () => {
  // Ces données seront remplacées par des appels API dans le futur
  const budgetCategories: BudgetCategory[] = [
    { id: 1, name: "Alimentation", allocated: 400, spent: 250 },
    { id: 2, name: "Transport", allocated: 200, spent: 180 },
    { id: 3, name: "Loisirs", allocated: 150, spent: 100 },
  ];

  return (
    <div className="budget-overview-card">
      <h2>Aperçu du budget</h2>
      <ul>
        {budgetCategories.map((category) => {
          const percentage = (category.spent / category.allocated) * 100;
          return (
            <li key={category.id}>
              <div className="category-info">
                <span>{category.name}</span>
                <span>
                  {category.spent}€ / {category.allocated}€
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                  data-percentage={percentage}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BudgetOverviewCard;