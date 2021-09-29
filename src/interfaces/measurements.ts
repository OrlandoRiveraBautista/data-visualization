export type Measurement = {
  metric: string;
  at: Date;
  value: number;
  unit: string;
};

export type MeasurementQuery = {
  metricName: string;
  after: Date;
  before: Date;
};

export type MultipleMeasurements = {
  metric: string;
  measurements: Measurement;
};

export interface GetLastKnownMeasurementParams {
  metricName: string;
}

export interface GetMeasurementsParams {
  input: MeasurementQuery;
}

export interface GetMultipleMeasurements {
  input: MeasurementQuery;
}
