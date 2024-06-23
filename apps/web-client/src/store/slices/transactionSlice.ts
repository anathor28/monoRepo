// src/store/slices/transactionSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "../../types/Transaction";

// Simulated API call
const fetchTransactionsAPI = async (): Promise<Transaction[]> => {
  // This would be a real API call in a production app
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          date: "2024-06-22",
          label: "Grocery Store",
          type: "Expense",
          amount: -50.25,
          balance: 1000.75,
        },
        {
          id: "2",
          date: "2024-06-20",
          label: "Salary",
          type: "Income",
          amount: 2000,
          balance: 3000.75,
        },
        // Add more mock transactions here
      ]);
    }, 500); // Simulate network delay
  });
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await fetchTransactionsAPI();
    return response;
  }
);

interface TransactionState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  status: "idle",
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default transactionSlice.reducer;
