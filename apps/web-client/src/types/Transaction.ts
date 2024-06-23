// src/types/Transaction.ts
export interface Transaction {
  id: string;
  date: string;
  label: string;
  type: string;
  amount: number;
  balance: number;
}
