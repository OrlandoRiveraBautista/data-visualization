import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from './reducers/metricsReducer';

const store = configureStore({
  reducer: {
    metricNames: metricsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
