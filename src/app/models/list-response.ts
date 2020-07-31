export class ListResponse<T> {
  data: T[];
  total: number;

  constructor(total, data: T[]) {
    this.data = data;
    this.total = total;
  }
}
