export type Measurement = {
  metric: string;
  at: Date;
  value: number;
  unit: string;
};

export type MeasurementQuery = {
  metricName: string;
  after?: number;
  before?: number;
};

export type MultipleMeasurements = {
  metric: string;
  measurements: Measurement;
};

export interface GetLastKnownMeasurementParams {
  input: string; // metricName
}

export interface GetMeasurementsParams {
  input: MeasurementQuery;
}

export interface GetMultipleMeasurements {
  input: MeasurementQuery;
}
