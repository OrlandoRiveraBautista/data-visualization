import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

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
}
