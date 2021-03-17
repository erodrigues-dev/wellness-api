export interface List<T = any> {
  hasNextPage: boolean;
  rows: T[];
}
