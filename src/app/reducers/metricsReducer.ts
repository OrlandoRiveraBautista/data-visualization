import { createSlice } from '@reduxjs/toolkit';
import { Measurement, MultipleMeasurements } from '../../interfaces/measurements';

import { getLatestMeasurementThunk, updateMetricNamesThunk } from '../thunks/metricsThunk';

interface AppState {
  metricNames: string[],
  latestMeasurement: Measurement,
  measurements: Measurement[],
  multipleMeasurements: MultipleMeasurements[]
}

const initialState: AppState = {
  metricNames: [''],
  latestMeasurement: {
    metric: '',
    value: 0,
    unit: '',
    at: new Date(0),
  },
  measurements: [{
    metric: '',
    value: 0,
    unit: '',
    at: new Date(0),
  }],
  multipleMeasurements: [{
    metric: '',
    measurements: [{
      metric: '',
      value: 0,
      unit: '',
      at: new Date(0),
    }],
  }],
};

export const metricsSlice = createSlice({
  name: 'metricAttr',
  initialState,
  reducers: {
    updateNames: (state, action) => {
      state.metricNames = action.payload;
    },
    updateLastMeasurement: (state, action) => {
      state.latestMeasurement = action.payload;
    },
    updateMeasurements: (state, action) => {
      state.measurements = action.payload;
    },
    updateMultipleMeasurements: (state, action) => {
      state.multipleMeasurements = action.payload;
    },
    resetMetrics: (state) => {
      state.measurements = initialState.measurements;
      state.multipleMeasurements = initialState.multipleMeasurements;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMetricNamesThunk.fulfilled, (state, action) => {
      state.metricNames = action.payload;
    });

    builder.addCase(getLatestMeasurementThunk.fulfilled, (state, action) => {
      state.latestMeasurement = action.payload;
    });
  },
});

export const {
  updateNames,
  updateLastMeasurement,
  updateMeasurements,
  updateMultipleMeasurements,
  resetMetrics,
} = metricsSlice.actions;

export const selectCount = (state: any) => state.metricNames.metricNames;

export default metricsSlice.reducer;
