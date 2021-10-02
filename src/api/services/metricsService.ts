import { Measurement, MeasurementQuery, MultipleMeasurements } from '../../interfaces/measurements';
import { MetricsController } from './controllers/metricsController';

export class MetricsService {
  private readonly metricsController;

  constructor() {
    this.metricsController = new MetricsController();
  }

  async getMetricNames(): Promise<string[]> {
    const metricNames = await this.metricsController.getMetrics();
    return metricNames;
  }

  async getLatestMeasurement(input: string): Promise<Measurement> {
    const dto: Measurement = await this.metricsController.getLastKnownMeasurement(input);
    return dto;
  }

  async getMeasurements(input: MeasurementQuery): Promise<Measurement[]> {
    const dto: Measurement[] = await this.metricsController.getMeasurements(input);
    return dto;
  }

  async getMultipleMeasurements(input: MeasurementQuery): Promise<MultipleMeasurements[]> {
    const dto: MultipleMeasurements[] = await this.metricsController.getMultipleMeasurements(input);
    return dto;
  }

  // subToMeasurements(update: Function) {
  //   this.metricsController.subNewMeasurement(update);
  // }
}
