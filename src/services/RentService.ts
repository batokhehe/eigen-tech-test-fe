import http from "../http-common";
import IRentData from "../types/Rent";

const getAll = () => {
  return http.get<Array<IRentData>>("/rent");
};

const get = (id: any) => {
  return http.get<IRentData>(`/rent/${id}`);
};

const create = (data: IRentData) => {
  return http.post<IRentData>("/rent", data);
};

const update = (data: IRentData) => {
  return http.patch<any>(`/rent`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/rent/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/rent`);
};

const findByBookCode = (book_code: string) => {
  return http.get<Array<IRentData>>(`/rent?book_code=${book_code}`);
};

const RentService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByBookCode,
};

export default RentService;