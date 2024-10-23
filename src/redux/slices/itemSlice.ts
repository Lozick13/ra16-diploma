import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../api/types';

const initialState: {
  item: Item | null;
  itemLoading: boolean;
  itemError: string | null;
} = {
  item: null,
  itemLoading: false,
  itemError: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<Item>) => {
      state.item = action.payload;
    },
    fetchItemRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{ id: number }>,
    ) => {
      state.itemLoading = true;
      state.itemError = null;
    },
    fetchItemFailure: (state, action: PayloadAction<string>) => {
      state.itemLoading = false;
      state.itemError = action.payload;
    },
    fetchItemSuccess: state => {
      state.itemLoading = false;
      state.itemError = null;
    },
  },
});

export const { setItem, fetchItemRequest, fetchItemFailure, fetchItemSuccess } =
  itemSlice.actions;

const itemReducer = itemSlice.reducer;
export default itemReducer;
