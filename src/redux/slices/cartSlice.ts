import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../api/types';

const initialState: {
  cart: Cart[];
} = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<Cart>) => {
      const index = state.cart.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size,
      );

      if (index !== -1) {
        state.cart[index].count += action.payload.count;
        state.cart[index].totalPrice = state.cart[index].count * state.cart[index].price;
        return;
      }

      state.cart.push({
        ...action.payload,
        totalPrice: action.payload.count * action.payload.price,
      });
    },
    removeCartItem: (state, action: PayloadAction<{ id: number; size: string }>) => {
      state.cart = state.cart.filter(
        item => item.id !== action.payload.id && item.size !== action.payload.size,
      );
    },
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
