import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerConfig } from './logger.config';

@Module({
  components: [
    LoggerService,
    LoggerConfig,
  ],
  exports: [
    LoggerService,
  ],
})
export class LoggerModule {}