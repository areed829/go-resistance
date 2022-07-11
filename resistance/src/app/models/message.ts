export interface Message<T> {
  event: string;
  payload: T;
}
