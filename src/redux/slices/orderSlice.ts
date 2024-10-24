import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../api/types';

const initialState: {
  order: Order;
  orderLoading: boolean;
  orderError: string | null;
  orderSuccess: boolean;
} = {
  order: {
    owner: { phone: '', address: '' },
    items: [],
  },
  orderError: null,
  orderLoading: false,
  orderSuccess: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },

    sendOrderRequest: state => {
      state.orderLoading = true;
      state.orderError = null;
    },
    sendOrderFailure: (state, action: PayloadAction<string>) => {
      state.orderLoading = false;
      state.orderError = action.payload;
    },
    sendOrderSuccess: state => {
      state.orderLoading = false;
      state.orderError = null;
      state.orderSuccess = true;
    },
  },
});

export const { setOrder, sendOrderRequest, sendOrderFailure, sendOrderSuccess } =
  orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
