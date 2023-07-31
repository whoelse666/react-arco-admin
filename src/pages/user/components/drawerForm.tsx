import React, { useMemo } from 'react';
import { useState } from 'react';
import {
  Drawer,
  Form,
  Input,
  Message,
  Upload,
  Progress,
} from '@arco-design/web-react';
import { OpResult } from '@/api/types';
import { User } from '../index';
import { IconPlus, IconEdit } from '@arco-design/web-react/icon';
// import useFormContext from '@arco-design/web-react/es/Form/hooks/useContext';
import { updateUser, addUser } from '@/api/user';
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
  const [file, setFile] = useState('');
  const cs = `arco-upload-list-item${
    file && file.status === 'error' ? ' is-error' : ''
  }`;
  form.getFields;
  const title = useMemo(
    () => (editedItem._id ? '更新' : '新增'),
    [editedItem._id]
  );

  const onSubmit = async () => {
    const item = form.getFieldsValue();
    console.log('item :>> ', item);
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
        cancelText={<span>取消 </span>}
        visible={visible}
        onOk={onSubmit}
        onCancel={() => {
          setVisible(false);
          setFile('');
        }}
        afterOpen={() => {
          form.setFieldsValue(editedItem);
          setFile(editedItem.avatar);
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
          <Form.Item label="头像" field="avatar">
            <Upload
              headers={{
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              }}
              action="/api/user/upload"
              fileList={file ? [file] : []}
              showUploadList={false}
              onChange={(_, currentFile) => {
                setFile({
                  ...currentFile,
                  url: URL.createObjectURL(currentFile.originFile),
                });
                // 上传成功，获取文件名
                if (currentFile.status === 'done') {
                  const { data } = currentFile.response as OpResult<string>;
                  form.setFieldValue('avatar', {
                    static: data,
                    url: URL.createObjectURL(currentFile.originFile),
                  });
                }
              }}
              onProgress={(currentFile) => {
                setFile(currentFile);
              }}
            >
              <div className={cs}>
                {file && file.url ? (
                  <div className="arco-upload-list-item-picture custom-upload-avatar">
                    <img src={file.url} />
                    <div className="arco-upload-list-item-picture-mask">
                      <IconEdit />
                    </div>
                    {file.status === 'uploading' && file.percent < 100 && (
                      <Progress
                        percent={file.percent}
                        type="circle"
                        size="mini"
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translateX(-50%) translateY(-50%)',
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="arco-upload-trigger-picture">
                    <div className="arco-upload-trigger-picture-text">
                      <IconPlus />
                      <div style={{ marginTop: 10, fontWeight: 600 }}>
                        Upload
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Upload>
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
