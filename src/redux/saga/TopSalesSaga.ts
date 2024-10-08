import { put, retry, takeLatest } from 'redux-saga/effects';
import { fetchTopSales } from '../../api';
import { Item } from '../../models/Item';
import {
	fetchTopSalesFailure,
	fetchTopSalesRequest,
	fetchTopSalesSuccess,
	setTopSalesItems,
} from '../slices/topSalesSlice';

function* workerFetchTopSalesRequest() {
	try {
		const retryCount = 2;
		const retryDelay = 500;
		const data: Item[] = yield retry(retryCount, retryDelay, fetchTopSales);

		yield put(setTopSalesItems(data));
		yield put(fetchTopSalesSuccess());
	} catch (error: unknown) {
		let errorMessage: string;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Unknown error';
		}

		yield put(setTopSalesItems([]));
		yield put(fetchTopSalesFailure(errorMessage));
	}
}

export function* watchSearchSkillsSaga() {
	yield takeLatest(fetchTopSalesRequest, workerFetchTopSalesRequest);
}
