import { put, takeEvery } from 'redux-saga/effects';
import {
  updateNames,
  updateLastMeasurement,
  updateMeasurements,
  updateMultipleMeasurements,
} from '../reducers/metricsReducer';
import { MetricsService } from '../../api/services/metricsService';
import { Measurement, MultipleMeasurements } from '../../interfaces/measurements';
// const delay = (ms: any) => new Promise((response) => setTimeout(response, ms));

const metricsService = new MetricsService();

/** Action types */
export const GET_METRIC_NAMES = 'GET_METRIC_NAMES';
export const GET_LATEST_MEASUREMENT = 'GET_LATEST_MEASUREMENT';
export const GET_MEASUREMENTS = 'GET_MEASUREMENTS';
export const GET_MULTIPLE_MEASUREMENTS = 'GET_MULTIPLE_MEASUREMENTS';

function* getMetricNamesSaga() {
  try {
    const name: string[] = yield metricsService.getMetricNames();
    yield put(updateNames(name));
  } catch (err) {
    console.error(err);
    yield put({ type: 'METRIC_NAMES_FAILED', message: err });
  }
}

function* getLatestMeasurementSaga(action: any) {
  try {
    const dto: Measurement = yield metricsService.getLatestMeasurement(action.payload);
    yield put(updateLastMeasurement(dto));
  } catch (err) {
    yield put({ type: 'LATEST_MEASUREMENT_FAILED', message: err });
  }
}

function* getMeasurementsSaga(action: any) {
  try {
    const dto: Measurement[] = yield metricsService.getMeasurements(action.payload);
    yield put(updateMeasurements(dto));
  } catch (err) {
    yield put({ type: 'GET_MEASUREMENTS_FAILED', message: err });
  }
}

function* getMultipleMeasurementsSage(action: any) {
  try {
    const dto: MultipleMeasurements[] = yield metricsService.getMultipleMeasurements(
      action.payload,
      // space dfgsdfgsdf
    );
    yield put(updateMultipleMeasurements(dto));
  } catch (err) {
    yield put({ type: 'GET_MILTIPLE_MEASUREMENTS_FAILED', message: err });
  }
}

function* rootSaga() {
  yield takeEvery(GET_METRIC_NAMES, getMetricNamesSaga);
  yield takeEvery(GET_LATEST_MEASUREMENT, getLatestMeasurementSaga);
  yield takeEvery(GET_MEASUREMENTS, getMeasurementsSaga);
  yield takeEvery(GET_MULTIPLE_MEASUREMENTS, getMultipleMeasurementsSage);
}

export default rootSaga;
