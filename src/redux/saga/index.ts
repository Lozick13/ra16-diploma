import { spawn } from 'redux-saga/effects';
import { watchTopSalesItemsSaga } from './TopSalesSaga';

export function* saga() {
	yield spawn(watchTopSalesItemsSaga);
}
