import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { fetchItem } from '../../api';
import { Item } from '../../api/types';
import {
  fetchItemFailure,
  fetchItemRequest,
  fetchItemSuccess,
  setItem,
} from '../slices/itemSlice';

const retryCount = 2;
const retryDelay = 500;

function* workerFetchItemRequest(action: PayloadAction<{ id: number }>) {
  try {
    const data: Item = yield retry(retryCount, retryDelay, fetchItem, action.payload.id);

    yield put(setItem(data));
    yield put(fetchItemSuccess());
  } catch (error: unknown) {
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Unknown error';
    }

    yield put(fetchItemFailure(errorMessage));
  }
}

export function* watchItemSaga() {
  yield takeLatest(fetchItemRequest, workerFetchItemRequest);
}
