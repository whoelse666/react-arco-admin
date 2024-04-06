import React, { useEffect, useMemo, useState } from 'react';

import {
  Drawer,
  Form,
  Input,
  Message,
  Upload,
  Progress,
  Tree,
  Checkbox,
  TreeNodeProps, Typography
} from '@arco-design/web-react';
const Text = Typography.Text;
const Title = Typography.Title;
const FormItem = Form.Item;
import { OpResult } from '@/api/types';
import {
  addRole,
  updateRole,
  Role,
  initial,

} from '@/api/role';
import { IRoute, routes } from '@/routes'
import useLocale from '@/utils/useLocale';
import { TreeDataType } from '@arco-design/web-react/es/Tree/interface';
type FormProps = {
  visible: boolean;
  setVisible: (b: boolean) => void;
  editedItem: Role;
  setEditedItem: (editedItem) => void;
  callback: (editedItem?: Partial<Role>, isResetCurrent?: boolean) => void;
  width?: number | string;
};
const name = '角色信息';


let authSelectResult: { [key: string]: string[] } = {};

function DrawerForm({
  visible,
  setVisible,
  editedItem,
  setEditedItem,
  callback,
  width,
}: FormProps) {
  const [roleName, setRoleName] = useState('')
  const title = useMemo(
    () => (editedItem._id ? '更新' : '新增'),
    [editedItem._id]
  );

  const onSubmit = async () => {
    // id存在说明是编辑
    const isEdit = editedItem._id ? true : false;
    let message: string = isEdit ? '编辑' : '新增';
    console.log('editedItem :>> ', editedItem);
    try {
      // 设置权限选择结果
      editedItem.permissions = authSelectResult;
      // 根据标识符决定新增或更新
      if (isEdit) {
        await updateRole({ ...editedItem, name: roleName });
      } else {
        await addRole({ ...editedItem, name: roleName });
      }
      // 操作成功
      message += '角色成功!';
      Message.success(message);
      setVisible(false);
      callback && callback(editedItem)
    } catch (error) {
      message += '角色失败，请重试!';
      Message.error(message);
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

  // 用户修改编辑项
  const onEditedItemChange = (key: string, value: unknown) => {
    setEditedItem({ ...editedItem, [key]: value });
  };
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
          console.log('editedItem :>> ', editedItem);
          if (editedItem._id) {
            setRoleName(editedItem.name)
          }
        }}
        afterClose={() => {
          setRoleName('')
          authSelectResult = {};
        }}
      >
        <Form autoComplete="off">
          <Form.Item label="ID">
            <Text>{editedItem._id}</Text>
          </Form.Item>
          <Form.Item
            label="角色名称"
            field="name"
            rules={[{ required: true, message: '角色名是必填项' }]}
          >
            {/* <Input onChange={(value: string) => onEditedItemChange('name', value)} value={editedItem.name} placeholder="请输入角色名" /> */}
            <Input onChange={(value: string) => setRoleName(value)} value={roleName} placeholder="请输入角色名" />
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
