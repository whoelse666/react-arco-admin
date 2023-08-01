/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Typography,
  Card,
  Table,
  PaginationProps,
  Button,
  Drawer,
  Form,
  Input,
  Message,
  Popconfirm,
  Tree,
  TreeNodeProps,
  Checkbox,
} from '@arco-design/web-react';
import { usePagination } from 'ahooks';
import DrawerForm from './components/drawerForm'
import {
  addRole,
  deleteRole,
  getRoleList,
  updateRole,
  Role,
  initial,
} from '@/api/role';
import { IRoute, routes } from '@/routes';
import useLocale from '@/utils/useLocale';
import { TreeDataType } from '@arco-design/web-react/es/Tree/interface';
import PermissionWrapper from '@/components/PermissionWrapper';
const Text = Typography.Text;
const Title = Typography.Title;
const FormItem = Form.Item;





// 用户页面组件
function RolePage() {
  // 获取列表数据
  const { data, loading, pagination, refresh } = usePagination(getRoleList, {
    defaultPageSize: 10,
    defaultCurrent: 1,
    loadingDelay: 300,
  });
  // 分页
  const pager = useMemo<PaginationProps>(
    () => ({
      ...pagination,
      sizeCanChange: true,
      showTotal: true,
      pageSizeChangeResetCurrent: true,
    }),
    [pagination]
  );



  const [visible, setVisible] = useState(false)
  const [editedItem, setEditedItem] = useState(initial);

  const tableCallback = (record, type) => {
    console.log('record, type :>> ', record, type);

    if (type == 'edit') { } else {

    }
  }
  const onAdd = () => {
    setVisible(true)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      render: (value: string) => <Text copyable>{value}</Text>,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (_: unknown, record: Role) => (
        <>
          {/* <PermissionWrapper requiredPermissions={[{ resource: 'role', actions: ['read', 'write'] }]}> */}
          <Button
            type="text"
            size="small"
            onClick={() => tableCallback(record, 'edit')}
          >
            编辑权限
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
          {/* </PermissionWrapper> */}
        </>
      ),
    },
  ];



  return (
    <>
      <Card>
        <Title heading={6}>用户管理</Title>
        {/* <PermissionWrapper requiredPermissions={[{ resource: 'role', actions: ['read', 'write'] }]}> */}
        <Button onClick={onAdd} type="primary" style={{ marginBottom: 10 }}>
          新增
        </Button>
        {/* </PermissionWrapper> */}
        <Table
          rowKey="_id"
          loading={loading}
          // onChange={({ current, pageSize }) =>
          //   pager.onChange(current, pageSize)
          // }
          pagination={pagination}
          columns={columns}
          data={data?.list}
        />
      </Card>


      <DrawerForm
        {...{
          visible,
          setVisible,
          editedItem,
          width: 500,
          callback: (item, isResetCurrent) => {
            // if (isResetCurrent) {
            //   setGender(1);
            // }
            refresh();
          },
        }}
      />
    </>
  );
}

export default RolePage;
