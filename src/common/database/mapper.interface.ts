export interface Mapper<T> {
  map(rows: any[]): T;
}