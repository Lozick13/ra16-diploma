import { put, retry, takeLatest } from 'redux-saga/effects';
import { fetchCategories } from '../../api';
import { Category } from '../../api/types';
import {
	fetchCategoriesFailure,
	fetchCategoriesRequest,
	fetchCategoriesSuccess,
	setCategories,
} from '../slices/categoriesSlice';

const retryCount = 2;
const retryDelay = 500;

function* workerFetchCategoriesRequest() {
	try {
		const data: Category[] = yield retry(
			retryCount,
			retryDelay,
			fetchCategories
		);

		yield put(setCategories(data));
		yield put(fetchCategoriesSuccess());
	} catch (error: unknown) {
		let errorMessage: string;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Unknown error';
		}

		yield put(setCategories([]));
		yield put(fetchCategoriesFailure(errorMessage));
	}
}

export function* watchCategoriesSaga() {
	yield takeLatest(fetchCategoriesRequest, workerFetchCategoriesRequest);
}
