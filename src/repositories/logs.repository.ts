import {DefaultCrudRepository} from '@loopback/repository';
import {Logs, LogsRelations} from '../models';
import {PouchdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LogsRepository extends DefaultCrudRepository<
  Logs,
  typeof Logs.prototype.id,
  LogsRelations
> {
  constructor(
    @inject('datasources.pouchdb') dataSource: PouchdbDataSource,
  ) {
    super(Logs, dataSource);
  }
}
