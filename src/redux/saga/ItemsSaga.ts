import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { fetchItems, fetchItemsWithOffset } from '../../api';
import { Item } from '../../models/Item';
import {
	addItems,
	fetchItemsFailure,
	fetchItemsRequest,
	fetchItemsSuccess,
	fetchOffsetItemsFailure,
	fetchOffsetItemsRequest,
	fetchOffsetItemsSuccess,
	setItems,
} from '../slices/itemsSlice';

const retryCount = 2;
const retryDelay = 500;

function* workerFetchItemsRequest() {
	try {
		const data: Item[] = yield retry(retryCount, retryDelay, fetchItems);

		yield put(setItems(data));
		yield put(fetchItemsSuccess());
	} catch (error: unknown) {
		let errorMessage: string;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Unknown error';
		}

		yield put(setItems([]));
		yield put(fetchItemsFailure(errorMessage));
	}
}

function* workerFetchOffsetItemsRequest(action: PayloadAction<number>) {
	try {
		const data: Item[] = yield retry(
			retryCount,
			retryDelay,
			fetchItemsWithOffset,
			action.payload
		);

		yield put(addItems(data));
		yield put(fetchOffsetItemsSuccess(data.length));
	} catch (error: unknown) {
		let errorMessage: string;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Unknown error';
		}

		yield put(fetchOffsetItemsFailure(errorMessage));
	}
}

export function* watchItemsSaga() {
	yield takeLatest(fetchItemsRequest, workerFetchItemsRequest);
	yield takeLatest(fetchOffsetItemsRequest, workerFetchOffsetItemsRequest);
}
