import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { saga } from '../saga';
import topSalesReducer from '../slices/topSalesSlice';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
	devTools: true,
	reducer: {
		topSales: topSalesReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
