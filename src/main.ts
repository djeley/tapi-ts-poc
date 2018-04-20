import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Server } from 'http';
import { jsonReplacer } from './common/json-replacer';
import * as serverless from 'aws-serverless-express';
import * as express from 'express';

const expressApp = express();

async function bootstrap(): Promise<Server> {
  expressApp.set('json replacer', jsonReplacer);
  const app = await NestFactory.create(ApplicationModule, expressApp, {});
  await app.init();
  return serverless.createServer(expressApp);
}

let httpServer: Server;

export const handler: Handler = (event: any, context: Context) => {
  if (!httpServer) {
    bootstrap().then(server => {
      httpServer = server;
      return serverless.proxy(httpServer, event, context);
    });
  } else {
    return serverless.proxy(httpServer, event, context);
  }
};
