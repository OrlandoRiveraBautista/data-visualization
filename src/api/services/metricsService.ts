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
}
