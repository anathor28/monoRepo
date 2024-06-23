// src/store/slices/accountSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Account {
  id: string;
  type: 'checking' | 'savings' | 'investment' | 'insurance';
  name: string;
  balance: number;
}

interface AccountState {
  accounts: Account[];
  lastConnection: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [
    { id: '1', type: 'checking', name: 'Compte Courant', balance: 219.47 },
    { id: '2', type: 'savings', name: 'Livret A', balance: 60.01 },
    { id: '3', type: 'investment', name: 'PEA', balance: 1000.00 },
    { id: '4', type: 'insurance', name: 'Assurance Vie', balance: 5000.00 },
  ],
  lastConnection: "21/06/2024 09:19",
  isLoading: false,
  error: null,
};

// Async thunk for fetching accounts
export const fetchAccounts = createAsyncThunk(
  'account/fetchAccounts',
  async () => {
    // const response = await fetch('API_URL/accounts');
    // const data = await response.json();
    // return data;
    // Simulated API response
    return new Promise<Account[]>((resolve) => 
      setTimeout(() => resolve(initialState.accounts), 280)
    );
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateAccountBalance(state, action: PayloadAction<{ id: string, balance: number }>) {
      const account = state.accounts.find(acc => acc.id === action.payload.id);
      if (account) {
        account.balance = action.payload.balance;
      }
    },
    updateLastConnection(state, action: PayloadAction<string>) {
      state.lastConnection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch accounts';
      });
  },
});

export const { updateAccountBalance, updateLastConnection } = accountSlice.actions;
export default accountSlice.reducer;