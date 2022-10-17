import { createSlice } from '@reduxjs/toolkit';

const filter = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    filterContacts(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { filterContacts } = filter.actions;
export default filter.reducer;
