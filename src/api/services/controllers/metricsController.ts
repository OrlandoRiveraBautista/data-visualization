import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import {
  GetMeasurementsParams,
  Measurement,
  MeasurementQuery,
  MultipleMeasurements,
} from '../../../interfaces/measurements';

export class MetricsController {
  private readonly client;

  constructor() {
    this.client = new ApolloClient({
      uri: 'https://react.eogresources.com/graphql',
      cache: new InMemoryCache(),
    });
  }

  async getMetrics(): Promise<string[]> {
    const metrics = this.client.query({
      query: gql`
        query {
          getMetrics
        }
      `,
    });

    const names = await metrics
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
    return names.getMetrics;
  }

  async getLastKnownMeasurement(name: string): Promise<Measurement> {
    const dto = this.client.query({
      query: gql`
        query {
          getLastKnownMeasurement(metricName: ${name}) {
            metric
            at
            value
            unit
          }
        }
      `,
    });
    const latestMeasurement: Measurement = await dto
      .then((res) => res.data.getLastKnownMeasurement)
      .catch((err) => {
        throw err;
      });

    return latestMeasurement;
  }

  async getMeasurements(input: MeasurementQuery): Promise<Measurement[]> {
    const dto = this.client.query({
      query: gql`query{
        getMeasurements(input: ${input}) {
          metric
          at
          value
          unit
        }
      }`,
    });

    const givenMeasurements: Measurement[] = await dto
      .then((res) => res.data.getMeasurements)
      .catch((err) => {
        throw err;
      });

    return givenMeasurements;
  }

  async getMultipleMeasurements(input: MeasurementQuery): Promise<MultipleMeasurements[]> {
    const dto = this.client.query({
      query: gql`query {
        getMultipleMeasurements(input: ${input}) {
          metric
          measurements {
            metric
            at
            value
            unit
          }
        }
      }`,
    });

    const multipleMeasurements: MultipleMeasurements[] = await dto
      .then((res) => res.data.getMultipleMeasurements)
      .catch((err) => {
        throw err;
      });

    return multipleMeasurements;
  }

  /**
   *  * Todo: subsciptions to server
   */
}
