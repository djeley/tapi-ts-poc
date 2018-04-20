import { Component } from '@nestjs/common';
import { createConnection, Connection, ConnectionConfig } from 'mysql';
import { DatabaseConfig } from './database.config';
import { Mapper } from './mapper.interface';

@Component()
export class DatabaseService {
  private connection: Connection;
  private connectionConfig: ConnectionConfig;
  private options: any;

  constructor(private readonly databaseConfig: DatabaseConfig) {
    this.connectionConfig = databaseConfig.getConnectionConfig();
    this.options = databaseConfig.getOptions();
  }

  public query<T>(sql: string, params: any, mapper?: Mapper<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.getConnection().query(sql, params, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(mapper ? mapper.map(results) : results);
      });
    });
  }

  public done() {
    const { keepConnection } = this.options;
    if (!keepConnection) {
      this.connection.end();
      this.connection = null;
    }
  }

  private getConnection(): Connection {
    if (this.connection) {
      return this.connection;
    }
    this.connection = createConnection(this.connectionConfig);
    return this.connection;
  }
}