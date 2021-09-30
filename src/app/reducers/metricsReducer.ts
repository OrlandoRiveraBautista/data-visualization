import { createSlice } from '@reduxjs/toolkit';

import { updateMetricNamesThunk } from '../thunks/metricsThunk';

const initialState = {
  value: [''],
};

export const metricsSlice = createSlice({
  name: 'metricNames',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateMetricNamesThunk.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

// export const {} = metricsReducer.actions;

export const selectCount = (state: any) => state.metricNames.value;

export default metricsSlice.reducer;
