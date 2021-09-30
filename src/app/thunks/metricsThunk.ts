import { createAsyncThunk } from '@reduxjs/toolkit';
import { MetricsService } from '../../api/services/metricsService';

const metricsService = new MetricsService();

export const updateMetricNamesThunk = createAsyncThunk('metrics/getMetrics', async () => {
  const names = await metricsService.getMetricNames();
  return names;
});
