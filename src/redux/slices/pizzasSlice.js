import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ category, search, sort }, thunkAPI) => {
    const { data } = await axios.get(
      `https://63c2a19ae3abfa59bdb03314.mockapi.io/pizzasapi/pizzas?sortBy=${sort.value}${category}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'PENDING',
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'LOADING';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'SUCCESS';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'ERROR';
      state.items = [];
    },
  },
});

// export const {  } = pizzasSlice.actions;
export default pizzasSlice.reducer;
