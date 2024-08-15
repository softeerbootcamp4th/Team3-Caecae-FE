export default interface Response<T> {
  responseCode: number;
  message: string;
  data: T;
}
