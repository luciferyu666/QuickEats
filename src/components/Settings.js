// src/components/Settings.js

import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Select,
  Tabs,
  Table,
  Tag,
  Modal,
  Switch,
  Popconfirm,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  roles as mockRoles,
  users as mockUsers,
  settings as mockSettings,
} from "../data/mockData";

const { Option } = Select;
const { TabPane } = Tabs;

const Settings = () => {
  // ==================== 基本資訊管理狀態 ====================
  const [basicForm] = Form.useForm();
  const [basicInfo, setBasicInfo] = useState(mockSettings);

  const handleBasicSave = (values) => {
    setBasicInfo(values);
    message.success("基本資訊已保存！");
    console.log("保存基本資訊：", values);
  };

  // ==================== 帳戶安全設置狀態 ====================
  const [passwordForm] = Form.useForm();
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handlePasswordChange = (values) => {
    console.log("修改密碼：", values);
    message.success("密碼已修改！");
    passwordForm.resetFields();
  };

  const handleTwoFactorChange = (checked) => {
    setTwoFactorAuth(checked);
    message.success(`雙重驗證已${checked ? "啟用" : "禁用"}！`);
  };

  // ==================== 權限管理狀態 ====================
  const [users, setUsers] = useState(mockUsers);
  const [roles, setRoles] = useState(mockRoles);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm] = Form.useForm();

  // 顯示新增用戶模態框
  const showAddUserModal = () => {
    setIsEditUser(false);
    userForm.resetFields();
    setIsUserModalVisible(true);
  };

  // 顯示編輯用戶模態框
  const showEditUserModal = (record) => {
    setIsEditUser(true);
    setEditingUser(record);
    userForm.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone,
      roleId: record.roleId,
      twoFactorAuth: record.twoFactorAuth,
    });
    setIsUserModalVisible(true);
  };

  // 處理用戶模態框提交
  const handleUserModalOk = () => {
    userForm
      .validateFields()
      .then((values) => {
        if (isEditUser) {
          // 編輯用戶
          setUsers((prev) =>
            prev.map((user) =>
              user.id === editingUser.id ? { ...user, ...values } : user
            )
          );
          message.success("用戶已更新！");
        } else {
          // 新增用戶
          const newUser = {
            id: `user${users.length + 1}`,
            ...values,
          };
          setUsers((prev) => [...prev, newUser]);
          message.success("用戶已新增！");
        }
        setIsUserModalVisible(false);
        userForm.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 處理用戶模態框取消
  const handleUserModalCancel = () => {
    setIsUserModalVisible(false);
    userForm.resetFields();
  };

  // 刪除用戶
  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    message.success("用戶已刪除！");
  };

  // 定義用戶表格列
  const userColumns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "電子郵件",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "電話",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "角色",
      dataIndex: "roleId",
      key: "roleId",
      render: (roleId) => {
        const role = roles.find((r) => r.id === roleId);
        return role ? role.name : "未分配";
      },
    },
    {
      title: "雙重驗證",
      dataIndex: "twoFactorAuth",
      key: "twoFactorAuth",
      render: (enabled) =>
        enabled ? <Tag color="green">啟用</Tag> : <Tag color="red">禁用</Tag>,
    },
    {
      title: "操作",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditUserModal(record)}
          >
            編輯
          </Button>
          <Popconfirm
            title="確定要刪除這個用戶嗎？"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              刪除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // ==================== 系統配置狀態 ====================
  // 這裡假設系統配置已在基本資訊中處理，如配送範圍等。
  // 如果需要更複雜的系統配置，可以額外添加模塊。

  return (
    <Card title="設定與權限管理">
      <Tabs defaultActiveKey="1">
        {/* 基本資訊管理 */}
        <TabPane tab="基本資訊" key="1">
          <Form
            form={basicForm}
            layout="vertical"
            onFinish={handleBasicSave}
            initialValues={basicInfo}
          >
            <Form.Item
              label="餐廳名稱"
              name="restaurantName"
              rules={[{ required: true, message: "請輸入餐廳名稱！" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="地址"
              name="address"
              rules={[{ required: true, message: "請輸入地址！" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="聯絡電話"
              name="phone"
              rules={[{ required: true, message: "請輸入聯絡電話！" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="電子郵件"
              name="email"
              rules={[
                { required: true, message: "請輸入電子郵件！" },
                { type: "email", message: "請輸入有效的電子郵件！" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存基本資訊
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* 帳戶安全設置 */}
        <TabPane tab="帳戶安全" key="2">
          <Card title="修改密碼" style={{ marginBottom: "20px" }}>
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordChange}
            >
              <Form.Item
                label="當前密碼"
                name="currentPassword"
                rules={[{ required: true, message: "請輸入當前密碼！" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="新密碼"
                name="newPassword"
                rules={[
                  { required: true, message: "請輸入新密碼！" },
                  { min: 6, message: "密碼至少6位！" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="確認新密碼"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "請確認新密碼！" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("兩次輸入的密碼不一致！")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  修改密碼
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title="雙重驗證" style={{ marginBottom: "20px" }}>
            <Form layout="vertical">
              <Form.Item label="啟用雙重驗證">
                <Switch
                  checked={twoFactorAuth}
                  onChange={handleTwoFactorChange}
                />
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        {/* 權限管理 */}
        <TabPane tab="權限管理" key="3">
          <Space style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddUserModal}
            >
              新增用戶
            </Button>
          </Space>
          <Table
            dataSource={users}
            columns={userColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />

          {/* 用戶模態框 */}
          <Modal
            title={isEditUser ? "編輯用戶" : "新增用戶"}
            visible={isUserModalVisible}
            onOk={handleUserModalOk}
            onCancel={handleUserModalCancel}
            okText={isEditUser ? "更新" : "新增"}
          >
            <Form
              form={userForm}
              layout="vertical"
              name="userForm"
              initialValues={{
                name: "",
                email: "",
                phone: "",
                roleId: "",
                twoFactorAuth: false,
              }}
            >
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: "請輸入姓名！" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="電子郵件"
                rules={[
                  { required: true, message: "請輸入電子郵件！" },
                  { type: "email", message: "請輸入有效的電子郵件！" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="電話"
                rules={[{ required: true, message: "請輸入電話！" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: "請選擇角色！" }]}
              >
                <Select placeholder="選擇角色">
                  {roles.map((role) => (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="twoFactorAuth"
                label="雙重驗證"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>

        {/* 系統配置 */}
        <TabPane tab="系統配置" key="4">
          <Form
            layout="vertical"
            initialValues={{
              deliveryRange: basicInfo.deliveryRange,
            }}
            onFinish={(values) => {
              setBasicInfo((prev) => ({
                ...prev,
                deliveryRange: values.deliveryRange,
              }));
              message.success("系統配置已保存！");
              console.log("保存系統配置：", values);
            }}
          >
            <Form.Item
              label="配送範圍"
              name="deliveryRange"
              rules={[{ required: true, message: "請輸入配送範圍！" }]}
            >
              <Input addonAfter="公里" />
            </Form.Item>
            {/* 如果有更多系統配置項目，可以在此添加 */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存系統配置
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Settings;
