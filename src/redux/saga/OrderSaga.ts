import { call, put, select, takeLatest } from 'redux-saga/effects';
import { sendOrder } from '../../api/order';
import { Order } from '../../api/types';
import {
  sendOrderFailure,
  sendOrderRequest,
  sendOrderSuccess,
} from '../slices/orderSlice';
import { RootState } from '../store';

function* workerSendOrderRequest() {
  try {
    const data: {
      order: Order;
      orderLoading: boolean;
      orderError: string | null;
      orderSuccess: boolean;
    } = yield select((state: RootState) => state.order);

    yield call(sendOrder, data.order);

    yield put(sendOrderSuccess());
  } catch (error: unknown) {
    let errorMessage: string;
    console.log(error)
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Unknown error';
    }

    yield put(sendOrderFailure(errorMessage));
  }
}

export function* watchOrderSaga() {
  yield takeLatest(sendOrderRequest, workerSendOrderRequest);
}
