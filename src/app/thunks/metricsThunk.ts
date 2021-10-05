import { createAsyncThunk } from '@reduxjs/toolkit';
import { MetricsService } from '../../api/services/metricsService';
import { MeasurementQuery } from '../../interfaces/measurements';

const metricsService = new MetricsService();

export const updateMetricNamesThunk = createAsyncThunk('metrics/getMetrics', async () => {
  const names = await metricsService.getMetricNames();
  return names;
});

export const getLatestMeasurementThunk = createAsyncThunk('metrics/getLatestMeasurement', async (input: string) => {
  const dto = await metricsService.getLatestMeasurement(input);
  return dto;
});

export const getMeasurementsThunk = createAsyncThunk('metrics/getMeasurements', async (input: MeasurementQuery) => {
  const dto = await metricsService.getMeasurements(input);
  return dto;
});

export const getMultipleMeasurementsThunk = createAsyncThunk(
  'metrics/getMultipleMeasurements',
  async (input: MeasurementQuery[]) => {
    const dto = await metricsService.getMultipleMeasurements(input);
    return dto;
  },
);
