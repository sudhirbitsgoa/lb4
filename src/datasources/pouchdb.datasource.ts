import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'pouchdb',
  connector: 'couchdb2',
  url: 'http://wayship:wayship@127.0.0.1:5000',
  database: 'wayship',
  username: 'wayship',
  password: 'wayship',
  modelIndex: 'logs'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PouchdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'pouchdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pouchdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
