import React from 'react';
import '../styles/BalanceCard.scss'

const BalanceCard: React.FC = () => {
  // Ici, vous ferez un appel API pour obtenir le solde réel
  const balance = 5000; // Valeur factice pour l'instant

  return (
    <div className="balance-card">
      <h2>Solde actuel</h2>
      <p className="balance">{balance.toFixed(2)} €</p>
    </div>
  );
};

export default BalanceCard;