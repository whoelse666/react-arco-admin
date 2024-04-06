import { OpResult, Result } from '@/types';
import { PaginationProps } from '@arco-design/web-react';
import http from '@/utils/http';
const url = '/api/menus';
export interface Role {
  _id: string;
  name: string;
  permissions?: Record<string, string[]>;
}
// 编辑项初始值
export const initial = {
  _id: '',
  name: '',
  permissions: {},
};

export async function getAllMenus() {
  const { data } = await http.get(url);
  return data;
}

// export async function getMenuList({ current, pageSize }: PaginationProps) {
//   const { data, meta } = await http.get<Result<Role>>(url, {
//     params: {
//       page: current,
//       pageSize,
//     },
//   });
//   return { list: data, total: meta.total };
// }

// export function deleteMenu(id: string) {
//   return http.delete(`${url}/${id}`);
// }

// export function updateMenu(role: Role) {
//   return http.patch(`/api/Menu/${role._id}`, role);
// }

// export function addMenu(role: Role) {
//   delete role._id;
//   return http.post<OpResult<Role>>(url, role);
// }
