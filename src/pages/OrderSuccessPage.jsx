import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Card,
  Descriptions,
  Divider,
  Typography,
  Space,
  Progress,
} from "antd";
import {
  CheckCircleFilled,
  HomeOutlined,
  ShoppingOutlined,
  PhoneOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const { Text, Title } = Typography;

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderInfo = location.state;

  // 1. State đếm ngược
  const [countdown, setCountdown] = useState(5);

  // 2. Logic đếm ngược
  useEffect(() => {
    if (!orderInfo) return; // Nếu không có data thì không chạy bộ đếm

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Khi countdown về 0 thì navigate
    if (countdown === 0) {
      navigate("/");
    }

    return () => clearInterval(timer); // Cleanup để tránh memory leak
  }, [countdown, navigate, orderInfo]);

  if (!orderInfo) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <Card
        bordered={false}
        style={{
          maxWidth: 650,
          width: "100%",
          borderRadius: 24,
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
        }}
      >
        <Result
          status="success"
          icon={
            <CheckCircleFilled style={{ color: "#52c41a", fontSize: 72 }} />
          }
          title={<Title level={2}>Đặt hàng thành công!</Title>}
          subTitle={
            <Space direction="vertical">
              <Text type="secondary" style={{ fontSize: 16 }}>
                Hệ thống sẽ tự động quay về trang chủ sau **{countdown}s**
              </Text>
              {/* Thanh progress nhỏ để tăng hiệu ứng thị giác */}
              <Progress
                percent={(countdown / 5) * 100}
                showInfo={false}
                strokeColor="#52c41a"
                size="small"
                status="active"
              />
            </Space>
          }
        />

        <div style={{ background: "#fafafa", borderRadius: 16, padding: 24 }}>
          <Descriptions title="Thông tin đơn hàng" column={1}>
            <Descriptions.Item
              label={
                <Space>
                  <UserOutlined /> Khách hàng
                </Space>
              }
            >
              <Text strong>{orderInfo.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <PhoneOutlined /> Số điện thoại
                </Space>
              }
            >
              <Text strong>{orderInfo.phone}</Text>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <WalletOutlined /> Tổng tiền
                </Space>
              }
            >
              <Text type="danger" style={{ fontSize: 18, fontWeight: 700 }}>
                {orderInfo.total}
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </div>

        <Divider dashed />

        <div style={{ textAlign: "center" }}>
          <Space size="middle">
            <Button
              size="large"
              shape="round"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              style={{ minWidth: 150 }}
            >
              Về ngay (Home)
            </Button>
            <Button
              type="primary"
              size="large"
              shape="round"
              icon={<ShoppingOutlined />}
              style={{ minWidth: 150, background: "#000", borderColor: "#000" }}
            >
              Xem đơn hàng
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
}
