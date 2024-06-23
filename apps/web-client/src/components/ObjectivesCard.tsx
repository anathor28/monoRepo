// src/components/ObjectivesCard.tsx
import React from 'react';
import '../styles/ObjectivesCard.scss';

interface Objective {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

const ObjectivesCard: React.FC = () => {
  const objectives: Objective[] = [
    { id: 1, name: "Vacances d'été", targetAmount: 2000, currentAmount: 1200 },
    { id: 2, name: "Nouvel ordinateur", targetAmount: 1500, currentAmount: 500 },
    { id: 3, name: "Fonds d'urgence", targetAmount: 5000, currentAmount: 3000 },
  ];

  return (
    <div className="objectives-card">
      <h2>Objectifs d'épargne</h2>
      <ul>
        {objectives.map((objective) => {
          const percentage = (objective.currentAmount / objective.targetAmount) * 100;
          return (
            <li key={objective.id}>
              <div className="objective-info">
                <span>{objective.name}</span>
                <span>
                  {objective.currentAmount}€ / {objective.targetAmount}€
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ObjectivesCard;