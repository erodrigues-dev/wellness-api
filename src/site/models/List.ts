export interface List<T> {
  hasNextPage: boolean;
  rows: T[];
}
