import { useCart } from "../contexts/CartContext";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Card,
  Table,
  Button,
  Input,
  Select,
  Typography,
  Space,
  Divider,
  message,
  Badge,
  Tag,
  Avatar,
  Spin,
  Empty,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  SendOutlined,
  BankOutlined,
  TagOutlined,
  LoadingOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FormOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import orderApi from "../api/orderApi";
import couponApi from "../api/couponApi";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function CartPage() {
  const navigate = useNavigate();
  const [msgApi, contextHolder] = message.useMessage();
  const {
    cartItems = [],
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [company, setCompany] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- LOGIC GIỮ NGUYÊN ---
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCompany((prev) => ({
          ...prev,
          name: user.company_name || user.full_name || "",
          phone: user.phone || "",
          email: user.email || "",
          address: user.address || "",
        }));
      } catch (e) {
        console.error("Parse user error");
      }
    }
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0,
      ),
    [cartItems],
  );

  useEffect(() => {
    const fetchValidCoupons = async () => {
      try {
        const res = await couponApi.getCoupons();
        const now = new Date();
        const validList = res.data.filter((c) => {
          const startDate = c.start_date ? new Date(c.start_date) : null;
          const endDate = c.end_date ? new Date(c.end_date) : null;
          if (c.status !== "active" || c.used_count >= c.usage_limit)
            return false;
          if (startDate && now < startDate) return false;
          if (endDate && now > endDate) return false;
          return true;
        });
        setCoupons(validList);
      } catch {
        console.error("Coupon load error");
      }
    };
    fetchValidCoupons();
  }, []);

  useEffect(() => {
    if (
      selectedCoupon &&
      selectedCoupon.min_order &&
      subtotal < Number(selectedCoupon.min_order)
    ) {
      setSelectedCoupon(null);
      msgApi.warning(
        "Mã ưu đãi đã bị gỡ do chưa đạt giá trị đơn hàng tối thiểu.",
      );
    }
  }, [subtotal, selectedCoupon, msgApi]);

  const discount = useMemo(() => {
    if (!selectedCoupon) return 0;
    let d =
      selectedCoupon.discount_type === "percent"
        ? (subtotal * selectedCoupon.discount_value) / 100
        : selectedCoupon.discount_value;
    if (
      selectedCoupon.discount_type === "percent" &&
      selectedCoupon.max_discount
    )
      d = Math.min(d, selectedCoupon.max_discount);
    return d;
  }, [selectedCoupon, subtotal]);

  const total = Math.max(subtotal - discount, 0);

  const submitOrder = async () => {
    if (!company.name || !company.phone)
      return msgApi.error("Vui lòng điền đủ thông tin liên hệ!");
    setLoading(true);
    try {
      await orderApi.createQuote({
        ...company,
        items: cartItems,
        coupon_id: selectedCoupon?.id || null,
        total_amount: total,
      });
      clearCart();
      navigate("/order-success", {
        replace: true,
        state: {
          name: company.name,
          phone: company.phone,
          total: formatVND(total),
        },
      });
    } catch (err) {
      msgApi.error("Lỗi: " + (err.response?.data?.message || "Hệ thống bận"));
      setLoading(false);
    }
  };
  console.log("cartItems:::", cartItems);

  const formatVND = (v) => `${Math.floor(v).toLocaleString("vi-VN")} ₫`;

  // --- GIAO DIỆN MỚI ---
  return (
    <Layout style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      {contextHolder}

      {loading && (
        <div style={styles.overlay}>
          <div className="loader-container" style={styles.loaderBox}>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 40, color: "#1890ff" }}
                  spin
                />
              }
            />
            <Text strong style={{ marginTop: 16, display: "block" }}>
              Đang gửi yêu cầu đặt hàng...
            </Text>
          </div>
        </div>
      )}

      <Content style={styles.container}>
        {/* Header Section */}
        <div style={{ marginBottom: 24 }}>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ padding: 0 }}
          >
            Quay lại cửa hàng
          </Button>
          <Title level={2} style={{ marginTop: 8 }}>
            <ShoppingCartOutlined /> Giỏ hàng của bạn
          </Title>
        </div>

        {cartItems.length === 0 ? (
          <Card
            style={{ borderRadius: 16, textAlign: "center", padding: "40px 0" }}
          >
            <Empty description="Giỏ hàng đang trống" />
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/")}
              style={{ marginTop: 20 }}
            >
              Tiếp tục mua sắm
            </Button>
          </Card>
        ) : (
          <Row gutter={[24, 24]}>
            {/* Left Column: Items and Info */}
            <Col xs={24} lg={15}>
              <Space direction="vertical" style={{ width: "100%" }} size={24}>
                {/* Table Card */}
                <Card
                  bordered={false}
                  style={styles.glassCard}
                  bodyStyle={{ padding: 0 }}
                >
                  <Table
                    dataSource={cartItems}
                    pagination={false}
                    rowKey="id"
                    columns={[
                      {
                        title: "Sản phẩm",
                        key: "product",
                        render: (_, i) => (
                          <Space size="middle">
                            <Avatar
                              shape="round"
                              size={80}
                              src={`${process.env.REACT_APP_WEB_URL}/products/${i.image}`}
                              style={{ border: "1px solid #f0f0f0" }}
                            />
                            <div>
                              <Text
                                strong
                                style={{ fontSize: 16, display: "block" }}
                              >
                                {i.name}
                              </Text>
                              <Tag color="blue">{formatVND(i.price)}</Tag>
                            </div>
                          </Space>
                        ),
                      },
                      {
                        title: "Số lượng",
                        width: 140,
                        align: "center",
                        render: (_, i) => (
                          <Input
                            type="number"
                            min={1}
                            value={i.quantity}
                            onChange={(e) =>
                              updateQuantity(i.id, e.target.value)
                            }
                            style={{
                              width: 80,
                              textAlign: "center",
                              borderRadius: 8,
                            }}
                          />
                        ),
                      },
                      {
                        title: "Thành tiền",
                        align: "right",
                        render: (_, i) => (
                          <Text strong>{formatVND(i.price * i.quantity)}</Text>
                        ),
                      },
                      {
                        title: "",
                        width: 50,
                        render: (_, i) => (
                          <Button
                            type="text"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => removeFromCart(i.product_id)}
                          />
                        ),
                      },
                    ]}
                  />
                </Card>

                {/* Customer Info Card */}
                <Card
                  title={
                    <Space>
                      <UserOutlined /> Thông tin đặt hàng
                    </Space>
                  }
                  bordered={false}
                  style={styles.glassCard}
                >
                  <Row gutter={[20, 20]}>
                    <Col span={12}>
                      <Text type="secondary" small>
                        Họ tên / Đơn vị
                      </Text>
                      <Input
                        prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                        size="large"
                        placeholder="Nguyễn Văn A"
                        value={company.name}
                        onChange={(e) =>
                          setCompany({ ...company, name: e.target.value })
                        }
                        style={styles.inputRound}
                      />
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">Số điện thoại</Text>
                      <Input
                        prefix={<PhoneOutlined style={{ color: "#bfbfbf" }} />}
                        size="large"
                        placeholder="09xxx"
                        value={company.phone}
                        onChange={(e) =>
                          setCompany({ ...company, phone: e.target.value })
                        }
                        style={styles.inputRound}
                      />
                    </Col>
                    <Col span={24}>
                      <Text type="secondary">Email liên hệ</Text>
                      <Input
                        prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                        size="large"
                        placeholder="email@example.com"
                        value={company.email}
                        onChange={(e) =>
                          setCompany({ ...company, email: e.target.value })
                        }
                        style={styles.inputRound}
                      />
                    </Col>
                    <Col span={24}>
                      <Text type="secondary">Địa chỉ công trình/văn phòng</Text>
                      <Input
                        prefix={
                          <EnvironmentOutlined style={{ color: "#bfbfbf" }} />
                        }
                        size="large"
                        placeholder="Số nhà, đường, tỉnh thành..."
                        value={company.address}
                        onChange={(e) =>
                          setCompany({ ...company, address: e.target.value })
                        }
                        style={styles.inputRound}
                      />
                    </Col>
                    <Col span={24}>
                      <Text type="secondary">Ghi chú yêu cầu thêm</Text>
                      <Input.TextArea
                        prefix={<FormOutlined />}
                        rows={3}
                        placeholder="Ví dụ: Cần CO/CQ, giao hàng gấp..."
                        value={company.note}
                        onChange={(e) =>
                          setCompany({ ...company, note: e.target.value })
                        }
                        style={{ borderRadius: 12 }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Space>
            </Col>

            {/* Right Column: Order Summary */}
            <Col xs={24} lg={9}>
              <div style={{ position: "sticky", top: 24 }}>
                <Card
                  title={
                    <Space>
                      <TagOutlined /> Ưu đãi khả dụng
                    </Space>
                  }
                  bordered={false}
                  style={{ ...styles.glassCard, marginBottom: 24 }}
                >
                  <Select
                    placeholder="Chọn mã giảm giá"
                    style={{ width: "100%" }}
                    size="large"
                    allowClear
                    value={selectedCoupon?.id}
                    onChange={(id) =>
                      setSelectedCoupon(coupons.find((c) => c.id === id))
                    }
                    dropdownStyle={{ borderRadius: 12 }}
                  >
                    {coupons.map((c) => (
                      <Select.Option
                        key={c.id}
                        value={c.id}
                        disabled={subtotal < c.min_order}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text strong>{c.code}</Text>
                          <Text type="danger">
                            {c.discount_type === "percent"
                              ? `-${c.discount_value}%`
                              : `-${formatVND(c.discount_value)}`}
                          </Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          Đơn tối thiểu: {formatVND(c.min_order)}
                        </Text>
                      </Select.Option>
                    ))}
                  </Select>
                </Card>

                <Card bordered={false} style={styles.summaryCard}>
                  <Title level={4} style={{ color: "#fff", marginBottom: 24 }}>
                    Tóm tắt đơn hàng
                  </Title>

                  <div style={styles.summaryRow}>
                    <Text style={{ color: "rgba(255,255,255,0.7)" }}>
                      Tạm tính ({cartItems.length} món):
                    </Text>
                    <Text style={{ color: "#fff", fontWeight: 600 }}>
                      {formatVND(subtotal)}
                    </Text>
                  </div>

                  {discount > 0 && (
                    <div style={styles.summaryRow}>
                      <Text style={{ color: "rgba(255,255,255,0.7)" }}>
                        Ưu đãi giảm giá:
                      </Text>
                      <Tag color="success" style={{ marginRight: 0 }}>
                        -{formatVND(discount)}
                      </Tag>
                    </div>
                  )}

                  <Divider
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      margin: "20px 0",
                    }}
                  />

                  <div style={styles.summaryRow}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>
                      Tổng cộng:
                    </Text>
                    <Title level={2} style={{ color: "#fff", margin: 0 }}>
                      {formatVND(total)}
                    </Title>
                  </div>

                  <Paragraph
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                      marginTop: 16,
                    }}
                  >
                    * Giá trên đã bao gồm thuế phí dự kiến. Đội ngũ kỹ thuật sẽ
                    liên hệ lại sau 5-10 phút.
                  </Paragraph>

                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<SendOutlined />}
                    style={styles.btnSubmit}
                    onClick={submitOrder}
                  >
                    XÁC NHẬN ĐẶT HÀNG
                  </Button>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    width: "95%",
    padding: "24px 0 60px",
  },
  glassCard: {
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  summaryCard: {
    borderRadius: 20,
    background: "linear-gradient(135deg, #001529 0%, #003a8c 100%)",
    boxShadow: "0 10px 30px rgba(0, 21, 41, 0.3)",
    padding: 8,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  inputRound: { borderRadius: 8 },
  btnSubmit: {
    marginTop: 12,
    height: 56,
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 700,
    background: "#ff4d4f",
    border: "none",
    boxShadow: "0 4px 15px rgba(255, 77, 79, 0.4)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.7)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(8px)",
  },
  loaderBox: {
    background: "#fff",
    padding: "30px 50px",
    borderRadius: 20,
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};
