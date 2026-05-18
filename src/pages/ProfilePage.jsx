import { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Tabs,
  Table,
  Tag,
  Typography,
  Space,
  Avatar,
  Divider,
  Skeleton,
  message,
  Popconfirm,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  SaveOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CarOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import customerApi from "../api/profileApi";
const { Content } = Layout;
const { Title, Text } = Typography;

export default function ProfilePage() {
  const { user, setUser, logout, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [pwdForm] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [quotes, setQuotes] = useState([]);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!userLoading && !user) navigate("/login");
  }, [userLoading, user, navigate]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const [profileRes, quoteRes] = await Promise.all([
          customerApi.getById(user.id),
          customerApi.getQuotes(user.id),
        ]);
        form.setFieldsValue({
          full_name: profileRes.full_name,
          email: profileRes.email,
          phone: profileRes.phone,
          address: profileRes.address,
        });
        setQuotes(Array.isArray(quoteRes) ? quoteRes : []);
      } catch (err) {
        message.error("Không thể tải dữ liệu hồ sơ");
      } finally {
        setLoading(false);
        setLoadingQuotes(false);
      }
    };
    fetchData();
  }, [user?.id, form]);

  /* ================= UPDATE PROFILE ================= */
  const onUpdateProfile = async (values) => {
    setSaving(true);
    try {
      await customerApi.update(user.id, values);
      const updatedUser = { ...user, ...values };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      message.success("Cập nhật thông tin thành công");
    } catch {
      message.error("Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const onChangePassword = async (values) => {
    try {
      const res = await customerApi.changePassword(user.id, values);
      console.log(res);

      message.success("Đổi mật khẩu thành công");
      pwdForm.resetFields();
    } catch {
      message.error("Mật khẩu cũ không chính xác");
    }
  };
  console.log(user);

  const handleLogout = () => {
    logout();
    navigate("/login");
    message.info("Đã đăng xuất");
  };
  console.log(quotes);

  if (loading || userLoading)
    return (
      <div style={{ padding: 100 }}>
        <Skeleton active avatar />
      </div>
    );

  return (
    <Layout
      style={{ background: "#f0f2f5", padding: "40px 0", minHeight: "90vh" }}
    >
      <Content
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <Row gutter={[24, 24]}>
          {/* LEFT SIDE: AVATAR & QUICK INFO */}
          <Col xs={24} lg={8}>
            <Card
              bordered={false}
              className="shadow-sm"
              style={{ textAlign: "center", borderRadius: 12 }}
            >
              <Avatar
                size={100}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff", marginBottom: 16 }}
              />
              <Title level={4} style={{ marginBottom: 4 }}>
                {user?.full_name}
              </Title>
              <Text type="secondary">
                <SafetyCertificateOutlined /> Đối tác doanh nghiệp
              </Text>

              <Divider />

              <div style={{ textAlign: "left" }}>
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Text>
                    <MailOutlined /> {user?.email}
                  </Text>
                  <Text>
                    <PhoneOutlined /> {user?.phone || "Chưa cập nhật"}
                  </Text>
                  <Text>
                    <HomeOutlined /> {user?.address || "Chưa cập nhật"}
                  </Text>
                </Space>
              </div>

              <Popconfirm
                title="Bạn có chắc muốn đăng xuất?"
                onConfirm={handleLogout}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <Button
                  danger
                  block
                  icon={<LogoutOutlined />}
                  style={{ marginTop: 24, borderRadius: 8 }}
                >
                  Đăng xuất tài khoản
                </Button>
              </Popconfirm>
            </Card>
          </Col>

          {/* RIGHT SIDE: TABS CONTENT */}
          <Col xs={24} lg={16}>
            <Card
              bordered={false}
              className="shadow-sm"
              style={{ borderRadius: 12, minHeight: 500 }}
            >
              <Tabs
                defaultActiveKey="1"
                size="large"
                items={[
                  {
                    key: "1",
                    label: (
                      <Space>
                        <UserOutlined />
                        Hồ sơ của tôi
                      </Space>
                    ),
                    children: (
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onUpdateProfile}
                        style={{ marginTop: 20 }}
                      >
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              label="Tên khách hàng / Doanh nghiệp"
                              name="full_name"
                              rules={[{ required: true }]}
                            >
                              <Input size="large" placeholder="Nhập tên" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Email (Không thể thay đổi)"
                              name="email"
                            >
                              <Input size="large" disabled />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Số điện thoại" name="phone">
                              <Input size="large" placeholder="0989xxx" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Địa chỉ" name="address">
                              <Input
                                size="large"
                                placeholder="Hà Nội, Việt Nam"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={saving}
                          icon={<SaveOutlined />}
                          size="large"
                        >
                          Lưu thay đổi
                        </Button>
                      </Form>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <Space>
                        <FileSearchOutlined />
                        Lịch sử đơn hàng
                      </Space>
                    ),
                    children: (
                      <Table
                        dataSource={quotes}
                        loading={loadingQuotes}
                        rowKey="id"
                        style={{ marginTop: 20 }}
                        columns={[
                          {
                            title: "Mã",
                            dataIndex: "id",
                            render: (id) => (
                              <Text
                                code
                              >{`SP${String(id).padStart(3, "0")}`}</Text>
                            ),
                          },

                          {
                            title: "Tổng tiền",
                            dataIndex: "total_amount",
                            key: "total_amount",
                            render: (value) => (
                              <Text strong style={{ color: "#ff4d4f" }}>
                                {Number(value || 0).toLocaleString("vi-VN")} ₫
                              </Text>
                            ),
                          },

                          {
                            title: "Trạng thái",
                            dataIndex: "status",
                            key: "status",
                            render: (status) => {
                              const mapStatus = {
                                pending: {
                                  color: "gold",
                                  text: "Chờ xác nhận",
                                  icon: <ClockCircleOutlined />,
                                },
                                confirmed: {
                                  color: "blue",
                                  text: "Đã xác nhận",
                                  icon: <CheckCircleOutlined />,
                                },
                                shipping: {
                                  color: "processing",
                                  text: "Đang giao",
                                  icon: <CarOutlined />,
                                },
                                completed: {
                                  color: "success",
                                  text: "Hoàn thành",
                                  icon: <CheckCircleOutlined />,
                                },
                                cancelled: {
                                  color: "error",
                                  text: "Đã hủy",
                                  icon: <CloseCircleOutlined />,
                                },
                              };

                              const current = mapStatus[status] || {
                                color: "default",
                                text: status,
                              };

                              return (
                                <Tag color={current.color} icon={current.icon}>
                                  {current.text}
                                </Tag>
                              );
                            },
                          },

                          {
                            title: "Ngày tạo",
                            dataIndex: "created_at",
                            key: "created_at",
                            render: (date) =>
                              new Date(date).toLocaleDateString("vi-VN"),
                          },
                        ]}
                      />
                    ),
                  },
                  {
                    key: "3",
                    label: (
                      <Space>
                        <LockOutlined />
                        Bảo mật
                      </Space>
                    ),
                    children: (
                      <Form
                        form={pwdForm}
                        layout="vertical"
                        onFinish={onChangePassword}
                        style={{ marginTop: 20, maxWidth: 400 }}
                      >
                        <Form.Item
                          label="Mật khẩu hiện tại"
                          name="old_password"
                          rules={[{ required: true }]}
                        >
                          <Input.Password size="large" />
                        </Form.Item>
                        <Form.Item
                          label="Mật khẩu mới"
                          name="new_password"
                          rules={[{ required: true, min: 6 }]}
                        >
                          <Input.Password size="large" />
                        </Form.Item>
                        <Form.Item
                          label="Xác nhận mật khẩu"
                          name="confirm_password"
                          dependencies={["new_password"]}
                          rules={[
                            { required: true },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("new_password") === value
                                )
                                  return Promise.resolve();
                                return Promise.reject(
                                  new Error("Mật khẩu xác nhận không khớp!"),
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password size="large" />
                        </Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          size="large"
                        >
                          Cập nhật mật khẩu
                        </Button>
                      </Form>
                    ),
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </Content>

      <style>{`
        .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02); }
        .ant-tabs-tab-active { font-weight: 700 !important; }
      `}</style>
    </Layout>
  );
}
