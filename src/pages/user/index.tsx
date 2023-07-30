import React, { useEffect, useState } from 'react';
import {
  Space,
  Card,
  Button,
  Typography,
  Popconfirm,
} from '@arco-design/web-react';
import service from '@/utils/request';
import http from '@/utils/http';

const { Title, Text } = Typography;
import { Table, TableColumnProps } from '@arco-design/web-react';
import { useRequest, usePagination } from 'ahooks';

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
    render(value: string) {
      return <img src={value} width="60" />;
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

const tableCallback = (record: object, type: string) => {
  console.log('tableCallback :>> ', tableCallback);
};

// type pageParamsType = {
//   pageSize: number;
//   current: number;
// };
const getTableData = async () => {
  const users = await http.get<{ name: string }>('/api/user');
  console.log('users :>> ', users);
  return { list: users.data, total: users.meta.total };
};
export default function User() {
  const [tableData, setTableData] = useState([]) as any;
  /*   const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
 useEffect(() => {
    const { list, total } = getTableData(pagination);
    console.log(list, total);
    setTableData(list);
    setPagination({ ...pagination, total });
  }, [pagination.current, pagination.pageSize]);

  const { data, error, loading } = useRequest(() => getTableData(pagination), {
    onSuccess: ({ total }) => setPagination({ ...pagination, total }),
    refreshDeps: [pagination.current, pagination.pageSize],
  }); */

  const { data, pagination, loading, refresh } = usePagination(getTableData, {
    defaultCurrent: 1,
    defaultPageSize: 2,
  });

  const onChange = (pagination) => {
    // setPagination(pagination);
  };

  return (
    <Card>
      <Title heading={6}>用户管理</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" style={{ marginBottom: 10 }}>
          新增
        </Button>
        <Table
          loading={loading}
          onChange={onChange}
          pagination={pagination}
          columns={columns}
          data={data?.list}
          rowKey="_id"
          style={{ width: '100%' }}
        />
      </Space>
    </Card>
  );
}
