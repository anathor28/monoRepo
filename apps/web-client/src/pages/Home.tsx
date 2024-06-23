import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import CardSimple from '../components/cards/cardSimple';
import FloatingActionButtons from '../components/layout/FloatingActionButtons';
import { fetchAccounts } from '../store/slices/accountSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, lastConnection, isLoading, error } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const renderAccountSection = (type: 'checking' | 'savings' | 'investment' | 'insurance') => {
    const filteredAccounts = accounts.filter(account => account.type === type);
    const sectionTitle = {
      'checking': 'Mes Comptes Bancaires',
      'savings': 'Mon Épargne',
      'investment': 'Mes Investissements',
      'insurance': 'Mes Assurances'
    }[type];

    if (filteredAccounts.length === 0) return null;

    return (
      <CardSimple
        title={sectionTitle}
        value={`${filteredAccounts.reduce((sum, account) => sum + account.balance, 0).toFixed(2)} €`}
      >
        {filteredAccounts.map(account => (
          <p key={account.id}>{account.name}: {account.balance.toFixed(2)} €</p>
        ))}
      </CardSimple>
    );
  };

  return (
    <div className="home">
      <CardSimple
        title="Total des avoirs"
        value={`${totalBalance.toFixed(2)} €`}
        subtitle={`Dernière connexion : ${lastConnection}`}
      />

      {renderAccountSection('checking')}
      {renderAccountSection('savings')}
      {renderAccountSection('investment')}
      {renderAccountSection('insurance')}

      <FloatingActionButtons />
    </div>
  );
};

export default Home;