import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
  Divider,
  Checkbox,
  Space,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

import authApi from "../api/authApi";
import { useUser } from "../contexts/UserContext";

const { Title, Text, Paragraph } = Typography;

export default function CustomerLogin() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await authApi.login(values);

      login(res.user, res.token);
      message.success("Chào mừng bạn trở lại!");
      navigate("/");
    } catch (error) {
      message.error("Email hoặc mật khẩu không chính xác");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{ token: { borderRadius: 8, primaryColor: "#1677ff" } }}
    >
      <div style={styles.container}>
        {/* Nút quay lại trang chủ nhanh */}
        <Link to="/" style={styles.backLink}>
          <Space>
            <ArrowLeftOutlined /> Quay lại cửa hàng
          </Space>
        </Link>

        {/* LEFT SIDE: Visual Content */}
        <div style={styles.leftSide}>
          <div style={styles.overlay} />
          <div style={styles.leftContent}>
            <div style={styles.brandBadge}>
              <SafetyOutlined style={{ fontSize: 24, color: "#1677ff" }} />
              <Text strong style={{ color: "#1677ff", marginLeft: 8 }}>
                HỆ THỐNG MÁY CÔNG NGHIỆP
              </Text>
            </div>
            <Title
              level={1}
              style={{
                color: "#fff",
                fontSize: "3rem",
                fontWeight: 800,
                marginBottom: 20,
              }}
            >
              Giải pháp tối ưu <br />{" "}
              <span style={{ color: "#1677ff" }}>Năng suất vượt trội</span>
            </Title>
            <Paragraph
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.1rem",
                maxWidth: 450,
              }}
            >
              Đăng nhập để theo dõi các bản báo giá dự án, quản lý đơn hàng và
              nhận ưu đãi đặc quyền dành cho khách hàng thân thiết.
            </Paragraph>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div style={styles.rightSide}>
          <div style={styles.formWrapper}>
            <div style={{ marginBottom: 40 }}>
              <Title level={2} style={{ fontWeight: 700, margin: 0 }}>
                Đăng nhập
              </Title>
              <Text type="secondary">
                Chào mừng bạn! Vui lòng điền thông tin bên dưới.
              </Text>
            </div>

            <Form
              layout="vertical"
              onFinish={handleSubmit}
              size="large"
              initialValues={{ remember: true }}
              requiredMark={false}
            >
              <Form.Item
                label={<Text strong>Địa chỉ Email</Text>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="name@company.com"
                />
              </Form.Item>

              <Form.Item
                label={<Text strong>Mật khẩu</Text>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="••••••••"
                />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ</Checkbox>
                </Form.Item>
                <Link to="/forgot-password" style={{ color: "#1677ff" }}>
                  Quên mật khẩu?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{ height: 48, fontWeight: 600, fontSize: 16 }}
                >
                  Đăng nhập ngay
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#fff",
    position: "relative",
  },
  backLink: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 10,
    color: "#8c8c8c",
    fontSize: "14px",
  },
  leftSide: {
    flex: 1.2,
    position: "relative",
    background:
      "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000') center/cover",
    display: "flex",
    alignItems: "center",
    padding: "0 80px",
    overflow: "hidden",
    // Ẩn phía trái trên màn hình mobile nhỏ
    "@media (maxWidth: 768px)": { display: "none" },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(0,21,41,0.9) 0%, rgba(0,21,41,0.6) 100%)",
    zIndex: 1,
  },
  leftContent: {
    position: "relative",
    zIndex: 2,
  },
  brandBadge: {
    background: "#fff",
    padding: "8px 16px",
    borderRadius: "50px",
    display: "inline-flex",
    alignItems: "center",
    marginBottom: 32,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  rightSide: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 40px",
    background: "#fff",
  },
  formWrapper: {
    width: "100%",
    maxWidth: 400,
  },
};
