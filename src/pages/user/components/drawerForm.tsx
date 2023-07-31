import React, { useMemo } from 'react';
import { useState } from 'react';
import { Drawer, Form, Input, Message, Button } from '@arco-design/web-react';
import { User } from '../index';
import useFormContext from '@arco-design/web-react/es/Form/hooks/useContext';
import { updateUser, addUser } from '@/requests/user';
type FormProps = {
  visible: boolean;
  setVisible: (b: boolean) => void;
  editedItem: User;
  callback: (editedItem?: Partial<User>, isResetCurrent?: boolean) => void;
  width?: number | string;
};
const name = '用户信息';
function DrawerForm({
  visible,
  setVisible,
  editedItem,
  callback,
  width,
}: FormProps) {
  const [form] = Form.useForm();

  form.getFields;
  const title = useMemo(
    () => (editedItem._id ? '更新' : '新增'),
    [editedItem._id]
  );

  const onSubmit = async () => {
    console.log('提交表单 :>> ');
    const item = form.getFieldsValue();
    if (!editedItem._id) {
      const res: any = await addUser(item);
      if (res._id) {
        Message.success(title + '用户成功');
        callback && callback(item, true);
        setVisible(false);
      } else {
        Message.success(title + '用户失败');
      }
    } else {
      const res: any = await updateUser(editedItem._id, {
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
  return (
    <>
      <Drawer
        width={width ?? 380}
        title={<span>{title + name} </span>}
        okText={<span>{title} </span>}
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
            label="手机号"
            field="phoneNumber"
            rules={[
              { required: true, message: '手机号是必填项' },
              { match: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            label="用户名称"
            field="name"
            rules={[{ required: true, message: '用户名是必填项' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="邮箱" field="email">
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item label="组织" field="organization">
            <Input placeholder="请输入组织名称" />
          </Form.Item>
          <Form.Item label="职位" field="job">
            <Input placeholder="请输入职位" />
          </Form.Item>
          <Form.Item label="个人站点" field="personalWebsite">
            <Input placeholder="请输入个人站点URL" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default DrawerForm;
