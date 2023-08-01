import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import {
  Drawer,
  Form,
  Input,
  Message,
  Upload,
  Progress,
  Tree,
  Checkbox,
  TreeNodeProps,
} from '@arco-design/web-react';
import { OpResult } from '@/api/types';
import {
  initial,
} from '@/api/role';
export type Role = typeof initial;
import { IRoute, routes } from '@/routes'
import {
  updateRole, addRole
} from '@/api/role';
import useLocale from '@/utils/useLocale';
import { TreeDataType } from '@arco-design/web-react/es/Tree/interface';
type FormProps = {
  visible: boolean;
  setVisible: (b: boolean) => void;
  editedItem: Role;
  callback: (editedItem?: Partial<Role>, isResetCurrent?: boolean) => void;
  width?: number | string;
};
const name = '角色信息';

let authSelectResult: { [key: string]: string[] } = {};

function DrawerForm({
  visible,
  setVisible,
  editedItem,
  callback,
  width,
}: FormProps) {
  const [form] = Form.useForm();
  const title = useMemo(
    () => (editedItem._id ? '更新' : '新增'),
    [editedItem._id]
  );

  const onSubmit = async () => {
    const item = form.getFieldsValue();
    console.log('item :>> ', item);
    if (!editedItem._id) {
      const res: any = await addRole(item);
      if (res._id) {
        Message.success(title + '用户成功');
        callback && callback(item, true);
        setVisible(false);
      } else {
        Message.success(title + '用户失败');
      }
    } else {
      const res: any = await updateRole({
        ...editedItem,
        ...item,
      });
      if (res.data.affected == 1) {
        Message.success(title + '用户成功');
        callback && callback({ ...editedItem, ...item });
        setVisible(false);
      } else {
        Message.success(title + '用户失败');
      }
    }
  };

  const t = useLocale();
  const menus = generateMenus(routes, t);
  function generateMenus(routes: IRoute[], t: Record<string, string>) {
    return routes.map(route => {
      const item: TreeDataType = {
        title: t[route.name] || route.name,
        key: route.key,
      }
      if (route.children) {
        item.children = generateMenus(route.children, t);
      }
      return item
    })
  }

  // 权限选择结果
  const RenderAuthTree = (node: TreeNodeProps) => {
    const options = ['read', 'write'];
    const { selected, setSelected } = Checkbox.useCheckbox(options);
    useEffect(() => {
      if (editedItem.permissions) {
        setSelected(editedItem.permissions[node.dataRef.key]);
        if (editedItem.permissions[node.dataRef.key]) {
          authSelectResult[node.dataRef.key] =
            editedItem.permissions[node.dataRef.key];
        }
      }
    }, [editedItem.permissions]);
    return (
      <Checkbox.Group
        value={selected}
        options={options}
        onChange={(value) => {
          if (value.length) {
            authSelectResult[node._key] = value;
          } else {
            delete authSelectResult[node._key];
          }
          setSelected(value);
        }}
      />
    );
  };
  return (
    <>
      <Drawer
        width={width ?? 380}
        title={<span>{title + name} </span>}
        okText={<span>{title} </span>}
        cancelText={<span>取消 </span>}
        visible={visible}
        onOk={onSubmit}
        onCancel={() => {
          setVisible(false);

        }}
        afterOpen={() => {
          form.setFieldsValue(editedItem);

        }}
        afterClose={() => {
          form.resetFields();
        }}
      >
        <Form form={form}>
          <Form.Item
            label="用户名称"
            field="name"
            rules={[{ required: true, message: '用户名是必填项' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="权限设置"
          >
            <Tree
              treeData={menus}
              blockNode
              renderExtra={RenderAuthTree}
            ></Tree>
          </Form.Item>

        </Form>
      </Drawer>
    </>
  );
}

export default DrawerForm;
