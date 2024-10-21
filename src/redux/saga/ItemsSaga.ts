import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { fetchItems } from '../../api';
import { Item } from '../../api/types';
import {
  addItems,
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
  setItems,
} from '../slices/itemsSlice';

const retryCount = 2;
const retryDelay = 500;

function* workerFetchItemsRequest(
  action?: PayloadAction<{ categoryId?: number; offset?: number; quest?: string }>,
) {
  try {
    const data: Item[] = yield retry(retryCount, retryDelay, fetchItems, {
      categoryId: action?.payload.categoryId,
      offset: action?.payload.offset,
      quest: action?.payload.quest,
    });

    if (action?.payload.offset) {
      yield put(addItems(data));
      yield put(fetchItemsSuccess(data.length));
    } else {
      yield put(setItems(data));
      yield put(fetchItemsSuccess());
    }
  } catch (error: unknown) {
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Unknown error';
    }

    yield put(fetchItemsFailure(errorMessage));
  }
}

export function* watchItemsSaga() {
  yield takeLatest(fetchItemsRequest, workerFetchItemsRequest);
}
