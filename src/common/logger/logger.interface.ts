export interface LoggerInterface {
  trace(obj: any, ...params: any[]): void;

  debug(obj: any, ...params: any[]): void;

  info(obj: any, ...params: any[]): void;

  warn(obj: any, ...params: any[]): void;

  error(obj: any, ...params: any[]): void;

  fatal(obj: any, ...params: any[]): void;
}
