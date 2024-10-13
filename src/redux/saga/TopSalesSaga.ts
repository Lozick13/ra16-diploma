import { put, retry, takeLatest } from 'redux-saga/effects';
import { fetchTopSales } from '../../api';
import { Item } from '../../api/types';
import {
	fetchTopSalesItemsFailure,
	fetchTopSalesItemsRequest,
	fetchTopSalesItemsSuccess,
	setTopSalesItems,
} from '../slices/topSalesSlice';

function* workerFetchTopSalesItemsRequest() {
	try {
		const retryCount = 2;
		const retryDelay = 500;
		const data: Item[] = yield retry(retryCount, retryDelay, fetchTopSales);

		yield put(setTopSalesItems(data));
		yield put(fetchTopSalesItemsSuccess());
	} catch (error: unknown) {
		let errorMessage: string;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Unknown error';
		}

		yield put(setTopSalesItems([]));
		yield put(fetchTopSalesItemsFailure(errorMessage));
	}
}

export function* watchTopSalesItemsSaga() {
	yield takeLatest(fetchTopSalesItemsRequest, workerFetchTopSalesItemsRequest);
}
