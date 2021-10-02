import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import metricsReducer from './reducers/metricsReducer';

import rootSaga from './sagas/metricsSaga';

const sagaMW = createSagaMiddleware();

const store = configureStore({
  reducer: {
    metricAttr: metricsReducer,
  },
  middleware: [sagaMW],
});
sagaMW.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
