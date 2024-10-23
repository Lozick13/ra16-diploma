import { spawn } from 'redux-saga/effects';
import { watchCategoriesSaga } from './CategoriesSaga';
import { watchItemSaga } from './ItemSaga';
import { watchItemsSaga } from './ItemsSaga';
import { watchTopSalesItemsSaga } from './TopSalesSaga';

export function* saga() {
  yield spawn(watchTopSalesItemsSaga);
  yield spawn(watchCategoriesSaga);
  yield spawn(watchItemsSaga);
  yield spawn(watchItemSaga);
}
