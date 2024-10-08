import { spawn } from 'redux-saga/effects';
import { watchItemsSaga } from './ItemsSaga';
import { watchTopSalesItemsSaga } from './TopSalesSaga';

export function* saga() {
	yield spawn(watchTopSalesItemsSaga);
	yield spawn(watchItemsSaga);
}
