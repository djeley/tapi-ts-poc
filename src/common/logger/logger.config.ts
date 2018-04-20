import { Component } from '@nestjs/common';
import * as bunyan from 'bunyan';
import * as safeJsonStringify from 'safe-json-stringify';

@Component()
export class LoggerConfig {
  public getConfiguration(): bunyan.LoggerOptions {
    return {
      name: process.env.SERVICE_NAME,
      level: bunyan.levelFromName[process.env.LOG_LEVEL],
      env: process.env.SERVICE_ENV,
      streams: [{
        type: 'raw',
        stream: this.stderrWithLevelAsString(),
      }],
    };
  }

  private stderrWithLevelAsString(): any {
    return {
      write: (entry) => {
        const log = entry;

        // delete log.pid;
        delete log.hostname;

        process.stderr.write(`${safeJsonStringify(Object.assign(log, {
          level: bunyan.nameFromLevel[log.level],
        }))}\n`);
      },
    };
  }
}
