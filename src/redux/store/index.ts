import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { saga } from '../saga';
import cartReducer from '../slices/cartSlice';
import categoriesReducer from '../slices/categoriesSlice';
import itemReducer from '../slices/itemSlice';
import itemsReducer from '../slices/itemsSlice';
import orderReducer from '../slices/orderSlice';
import topSalesReducer from '../slices/topSalesSlice';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  devTools: true,
  reducer: {
    topSales: topSalesReducer,
    categories: categoriesReducer,
    items: itemsReducer,
    item: itemReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
