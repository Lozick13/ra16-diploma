import { spawn } from 'redux-saga/effects';
import { watchSearchSkillsSaga } from './TopSalesSaga';

export function* saga() {
	yield spawn(watchSearchSkillsSaga);
}
