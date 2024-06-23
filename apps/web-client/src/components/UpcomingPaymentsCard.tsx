import React from 'react';
import "../styles/UpcomingPaymentsCard.scss"

interface Payment {
    id: number;
    description: string;
    amount: number;
    dueDate: string;
}

const UpcomingPaymentsCard: React.FC = () => {
    // Ces données seront remplacées par des appels API dans le futur
    const upcomingPayments: Payment[] = [
        { id: 1, description: "Loyer", amount: 800, dueDate: "2024-03-31" },
        { id: 2, description: "Électricité", amount: 75, dueDate: "2024-04-05" },
        { id: 3, description: "Internet", amount: 45, dueDate: "2024-04-10" },
    ];

    return (
        <div className="upcoming-payments-card">
            <h2>Paiements à venir</h2>
            <ul>
                {upcomingPayments.map((payment) => (
                    <li key={payment.id}>
                        <span >{payment.description}</span>
                        <span className={`amount ${payment.amount > 100 ? 'high' : 'low'}`}>
                            {payment.amount.toFixed(2)} €
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingPaymentsCard;