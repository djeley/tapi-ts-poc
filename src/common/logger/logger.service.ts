import { Component } from '@nestjs/common';
import * as Logger from 'bunyan';
import { LoggerConfig } from './logger.config';
import { LoggerInterface } from './logger.interface';

/**
 * Logger service that wraps the logger implementation.
 */
@Component()
export class LoggerService implements LoggerInterface {
  private logger: Logger;

  constructor(private readonly loggerConfig: LoggerConfig) {}

  private getInternalLogger(): Logger {
    if (!this.logger) {
      this.logger = Logger.createLogger(this.loggerConfig.getConfiguration());
    }
    return this.logger;
  }

  public trace(obj: any, ...params: any[]): void {
    if (params && params.length) {
      this.getInternalLogger().trace(obj, params);
    } else {
      this.getInternalLogger().trace(obj);
    }
  }

  public debug(obj: any, ...params: any[]): void {
    if (params && params.length) {
      this.getInternalLogger().debug(obj, params);
    } else {
      this.getInternalLogger().debug(obj);
    }
  }

  public info(obj: any, ...params: any[]): void {
    if (params && params.length) {
      this.getInternalLogger().info(obj, params);
    } else {
      this.getInternalLogger().info(obj);
    }
  }

  public warn(obj: any, ...params: any[]): void {
    if (params && params.length) {
      this.getInternalLogger().warn(obj, params);
    } else {
      this.getInternalLogger().warn(obj);
    }
  }

  public error(obj: any, ...params: any[]): void {
    if (params && params.length) {
      this.getInternalLogger().error(obj, params);
    } else {
      this.getInternalLogger().error(obj);
    }
  }

  public fatal(obj: any, ...params: any[]): void {
    if (params && params.length) {
      this.getInternalLogger().fatal(obj, params);
    } else {
      this.getInternalLogger().fatal(obj);
    }
  }
}
