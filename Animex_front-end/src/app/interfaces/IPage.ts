export interface IPage<T> {

  content: T[],
  pageNumber: number,
  pageSize: number,
  firstPage: boolean,
  lastPage: boolean,
  totPages: number,
  hasNext: boolean,
}
