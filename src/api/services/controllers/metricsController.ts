import {
  gql,
  // dasdasd
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  // useSubscription,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import {
  // GetMeasurementsParams,
  Measurement,
  MeasurementQuery,
  MultipleMeasurements,
} from '../../../interfaces/measurements';

const httpLink = new HttpLink({
  uri: 'https://react.eogresources.com/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://react.eogresources.com/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export class MetricsController {
  client;

  constructor() {
    this.client = new ApolloClient({
      link: splitLink,
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
          getLastKnownMeasurement(metricName: "${name}") {
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
      query: gql`
        query {
          getMeasurements(input: { 
            metricName: "${input.metricName}"
            after: ${input.after}
            before: ${input.before}
             }) {
            metric
            at
            value
            unit
          }
        }
      `,
    });

    const givenMeasurements: Measurement[] = await dto
      .then((res) => res.data.getMeasurements)
      .catch((err) => {
        throw err;
      });

    return givenMeasurements;
  }

  async getMultipleMeasurements(input: MeasurementQuery[]): Promise<MultipleMeasurements[]> {
    const stringInput = JSON.stringify(input);
    const graphQLInput = stringInput.replace(/"([^(")"]+)":/g, '$1:');
    const dto = this.client.query({
      query: gql`query {
        getMultipleMeasurements(input: ${graphQLInput}) {
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

  subNewMeasurement = gql`
    subscription {
      newMeasurement {
        metric
        at
        value
        unit
      }
    }
  `;
}
