export interface IResponse<S> {
  code: number;
  data: Array<S>;
}
