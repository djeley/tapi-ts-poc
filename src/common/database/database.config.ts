import { Component } from '@nestjs/common';
import { ConnectionConfig } from 'mysql';

@Component()
export class DatabaseConfig {
  public getConnectionConfig(): ConnectionConfig {

    const connectionConfig: ConnectionConfig = {
      host: process.env.DATABASE_CONNECTION,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    };
    return connectionConfig;
  }

  public getOptions(): any {
    const options: any = {
      keepConnection: process.env.DATABASE_KEEP_CONNECTION,
    };
    return options;
  }
}
