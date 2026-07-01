import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viagens: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    adicionarViagem: (state, action) => {
      // Adiciona a nova viagem no topo da lista
      state.viagens = [action.payload, ...state.viagens];
    },
  },
});

export const { adicionarViagem } = historySlice.actions;

// Seletores para buscar os dados na tela
export const selectViagens = (state) => state.history.viagens;

export default historySlice.reducer;