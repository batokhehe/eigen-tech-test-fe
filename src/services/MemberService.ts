import http from "../http-common";
import IMemberData from "../types/Member";

const getAll = () => {
  return http.get<Array<IMemberData>>("/member");
};

const get = (id: any) => {
  return http.get<IMemberData>(`/member/${id}`);
};

const create = (data: IMemberData) => {
  return http.post<IMemberData>("/member", data);
};

const update = (id: any, data: IMemberData) => {
  return http.patch<any>(`/member`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/member/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/member`);
};

const findByBookCode = (book_code: string) => {
  return http.get<Array<IMemberData>>(`/member?book_code=${book_code}`);
};

const MemberService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByBookCode,
};

export default MemberService;