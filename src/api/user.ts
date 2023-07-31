import http from '@/utils/http';

//   查询用户列表
export const findAllUser = async () => {
  const res = await http.get('/api/user');
  return res;
};

// 查询用户
export const findUser = async (id) => {
  const res = await http.get('/api/user' + id);
  return res;
};

// 删除用户
export const deleteUser = async (id) => {
  const res = await http.delete('/api/user/' + id);
  return res;
};

// 更新用户
export const updateUser = async (id, params) => {
  const res = await http.patch('/api/user/' + id, params);
  return res;
};

// 新增用户
export const addUser = async (params) => {
  const res = await http.post('/api/user/', params, {
    // headers: {
    //   'Content-type': 'application/json; charset=UTF-8',
    // },
  });
  return res;
};
