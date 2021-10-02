import { createSlice } from '@reduxjs/toolkit';

import { getLatestMeasurementThunk, updateMetricNamesThunk } from '../thunks/metricsThunk';

const initialState = {
  metricNames: [''],
  latestMeasurement: {},
  measurements: [{}],
  multipleMeasurements: {},
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
  // space
} = metricsSlice.actions;

export const selectCount = (state: any) => state.metricNames.metricNames;

export default metricsSlice.reducer;
