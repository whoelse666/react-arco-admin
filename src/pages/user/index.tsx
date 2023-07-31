import React, { useState } from 'react';
import {
  Space,
  Card,
  Button,
  Message,
  Typography,
  Popconfirm,
} from '@arco-design/web-react';

import { findAllUser, deleteUser } from '@/api/user';
const { Title } = Typography;
import { Table, TableColumnProps } from '@arco-design/web-react';
import { usePagination } from 'ahooks';
import DrawerForm from './components/drawerForm';

const getTableData = async () => {
  // const users: any = await http.get<{ name: string }>('/api/user');
  const users: any = await findAllUser();
  return { list: users.data, total: users.meta.total };
};

export const initial = {
  _id: '',
  phoneNumber: '',
  password: '',
  name: '',
  avatar: '',
  email: '',
  job: '',
  jobName: '',
  organization: '',
  location: '',
  personalWebsite: '',
};
export type User = typeof initial;

export default function User() {
  // 控制页码重置到第一页
  const [gender, setGender] = useState<number>(0);

  const [editedItem, setEditedItem] = useState(initial);
  const [visible, setVisible] = useState(false);
  const { data, pagination, loading, refresh } = usePagination(getTableData, {
    defaultCurrent: 1,
    defaultPageSize: 2,
    refreshDeps: [gender], //refreshDeps 是一个语法糖，当它变化时，会重置分页到第一页，并重新请求数据，一般你可以把依赖的条件放这里。
  });

  const delTableItem = async (id) => {
    if (!id) return;
    // const res: any = await http.delete('/api/user/' + id);
    const res: any = await deleteUser(id);
    if (res.affected === 1) {
      Message.success('删除成功');
      refresh();
    } else {
      Message.error('删除失败');
    }
  };

  const tableCallback = async (record, operation: string) => {
    if (operation == 'edit') {
      setEditedItem(record);
      setVisible(true);
    } else {
      await delTableItem(record._id);
    }
  };

  const columns: TableColumnProps[] = [
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
    },
    {
      title: '用户头像',
      dataIndex: 'avatar',
      render(value: { url: string; static: string }) {
        console.log('value :>> ', value);
        return <img src={value?.url || value?.static} width="60" />;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      placeholder: '-',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (_: unknown, record) => (
        <>
          <Button
            type="text"
            size="small"
            onClick={() => tableCallback(record, 'edit')}
          >
            编辑
          </Button>
          <Popconfirm
            focusLock
            title="确认删除吗?"
            okText="确认"
            cancelText="取消"
            onOk={() => tableCallback(record, 'delete')}
          >
            <Button type="text" size="small">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const onAdd = () => {
    setEditedItem(initial);
    setVisible(true);
  };
  return (
    <Card>
      <Title heading={6}>用户管理</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button onClick={onAdd} type="primary" style={{ marginBottom: 10 }}>
          新增
        </Button>
        <Table
          loading={loading}
          pagination={pagination}
          columns={columns}
          data={data?.list}
          rowKey="_id"
          style={{ width: '100%' }}
        />
      </Space>
      <DrawerForm
        {...{
          visible,
          setVisible,
          editedItem,
          width: 500,
          callback: (item, isResetCurrent) => {
            if (isResetCurrent) {
              setGender(1);
            }
            refresh();
          },
        }}
      ></DrawerForm>
    </Card>
  );
}
