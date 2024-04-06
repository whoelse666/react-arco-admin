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
import { useRequest } from 'ahooks';
import {
  getAllMenus

} from '@/api/content';

import useLocale from '@/utils/useLocale';
import { TreeDataType } from '@arco-design/web-react/es/Tree/interface';
import PermissionWrapper from '@/components/PermissionWrapper';
const Text = Typography.Text;
const Title = Typography.Title;
const FormItem = Form.Item;
const TreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        selectable: false,
        children: [
          {
            title: 'Leaf',
            key: '0-0-2-1',
            children: [
              {
                title: 'Leafsss 0-0-2',
                key: '0-0-2-1-0',
                children: [
                  {
                    title: 'Leaf',
                    key: '0-0-2-1-0-0',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf',
            key: '0-1-1-0',
          },
        ],
      },
    ],
  },
];
// 用户页面组件
function ContentPage() {
  // 获取列表数据
  const { data, loading, refresh } = useRequest(getAllMenus, {
    loadingDelay: 300,
  });

  console.log('data :>> ', data);
  const [treeData, setTreeData] = useState(TreeData);
 
  const onAdd = () => {
    // setEditedItem(initial) 
  }


  return (
    <>
      <Card>
        <Title heading={6}>内容管理</Title>
        {/* <PermissionWrapper requiredPermissions={[{ resource: 'role', actions: ['read', 'write'] }]}> */}
        <Button onClick={onAdd} type="primary" style={{ marginBottom: 10 }}>
          新增
        </Button>
        {/* </PermissionWrapper> */}
        <Tree defaultSelectedKeys={['0-0-1']} treeData={treeData}></Tree>

      </Card>

    </>
  );
}

export default ContentPage;
