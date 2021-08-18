import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'elv4',
  connector: 'es',
  index: 'catalog',
  apiVersion: '7',
  defaultSize: '',
  configuration: {
    node: process.env.ELASTIC_SEARCH_HOST || 'http://elasticsearch:9200'
  }
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Elv4DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'elv4';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.elv4', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
