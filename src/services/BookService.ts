import http from "../http-common";
import IBookData from "../types/Book";

const getAll = () => {
  return http.get<Array<IBookData>>("/book");
};

const get = (id: any) => {
  return http.get<IBookData>(`/book/${id}`);
};

const create = (data: IBookData) => {
  return http.post<IBookData>("/book", data);
};

const update = (id: any, data: IBookData) => {
  return http.patch<any>(`/book`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/book/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/book`);
};

const findByBookCode = (book_code: string) => {
  return http.get<Array<IBookData>>(`/book?book_code=${book_code}`);
};

const BookService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByBookCode,
};

export default BookService;