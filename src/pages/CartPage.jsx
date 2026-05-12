import { useCart } from "../contexts/CartContext";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout, Row, Col, Card, Table, Button, Input, Select, 
  Typography, Space, Divider, message, Badge, Tag, Avatar, Spin
} from "antd";
import {
  DeleteOutlined, ShoppingCartOutlined, SendOutlined,
  BankOutlined, TagOutlined, LoadingOutlined, UserOutlined
} from "@ant-design/icons";

import orderApi from "../api/orderApi";
import couponApi from "../api/couponApi";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function CartPage() {
  const navigate = useNavigate();
  const [msgApi, contextHolder] = message.useMessage();
  const { cartItems = [], updateQuantity, removeFromCart, clearCart } = useCart();

  const [company, setCompany] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================== 1. TỰ ĐỘNG NHẬP THÔNG TIN NẾU ĐÃ ĐĂNG NHẬP ================== */
  useEffect(() => {
    const userData = localStorage.getItem("user"); // Lấy trực tiếp từ storage
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCompany(prev => ({
          ...prev,
          name: user.company_name || user.full_name || "",
          phone: user.phone || "",
          email: user.email || "",
          address: user.address || ""
        }));
      } catch (e) { console.error("Parse user error"); }
    }
  }, []);

  /* ================== 2. TÍNH TOÁN GIÁ TRỊ GIỎ HÀNG ================== */
  const subtotal = useMemo(() => 
    cartItems.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0)
  , [cartItems]);

  /* ================== 3. LOAD & FILTER COUPON (NGÀY + SỐ LƯỢNG) ================== */
  useEffect(() => {
    const fetchValidCoupons = async () => {
      try {
        const res = await couponApi.getCoupons(); // API lấy danh sách mã
        const now = new Date();

        const validList = res.data.filter(c => {
          const startDate = c.start_date ? new Date(c.start_date) : null;
          const endDate = c.end_date ? new Date(c.end_date) : null;
          
          // Kiểm tra trạng thái kích hoạt
          if (c.status !== "active") return false;
          // Kiểm tra số lượng còn lại
          if (c.used_count >= c.usage_limit) return false;
          // Kiểm tra ngày bắt đầu
          if (startDate && now < startDate) return false;
          // Kiểm tra ngày hết hạn
          if (endDate && now > endDate) return false;
          
          return true;
        });
        setCoupons(validList);
      } catch { console.error("Coupon load error"); }
    };
    fetchValidCoupons();
  }, []);

  /* ================== 4. LOGIC TỰ ĐỘNG HỦY MÃ NẾU GIỎ HÀNG THAY ĐỔI ================== */
  useEffect(() => {
    if (selectedCoupon && selectedCoupon.min_order && subtotal < Number(selectedCoupon.min_order)) {
      setSelectedCoupon(null);
      msgApi.warning("Mã ưu đãi đã bị gỡ do chưa đạt giá trị đơn hàng tối thiểu.");
    }
  }, [subtotal, selectedCoupon, msgApi]);

  const discount = useMemo(() => {
    if (!selectedCoupon) return 0;
    let d = selectedCoupon.discount_type === "percent" 
      ? (subtotal * selectedCoupon.discount_value) / 100 
      : selectedCoupon.discount_value;
    
    // Check max discount cho mã %
    if (selectedCoupon.discount_type === "percent" && selectedCoupon.max_discount) {
      d = Math.min(d, selectedCoupon.max_discount);
    }
    return d;
  }, [selectedCoupon, subtotal]);

  const total = Math.max(subtotal - discount, 0);

  /* ================== 5. SUBMIT BÁO GIÁ ================== */
  const submitOrder = async () => {
    if (!company.name || !company.phone) return msgApi.error("Vui lòng điền đủ thông tin liên hệ!");
    
    setLoading(true);
    try {
      await orderApi.createQuote({
        ...company,
        items: cartItems,
        coupon_id: selectedCoupon?.id || null,
        total_amount: total
      });
      msgApi.success("Gửi yêu cầu thành công!");
      clearCart();
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      msgApi.error("Lỗi: " + (err.response?.data?.message || "Hệ thống bận"));
      setLoading(false);
    }
  };

  const formatVND = (v) => `${Math.floor(v).toLocaleString("vi-VN")} ₫`;

  return (
    <Layout style={{ background: "#f8f9fa", minHeight: "100vh", padding: "40px 0" }}>
      {contextHolder}
      
      {/* LOADING TOÀN MÀN HÌNH */}
      {loading && (
        <div style={styles.overlay}>
          <Space direction="vertical" align="center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: '#fff' }} spin />} />
            <Text style={{ color: '#fff', fontSize: 18, marginTop: 20 }}>Đang khởi tạo báo giá dự án...</Text>
          </Space>
        </div>
      )}

      <Content style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title={<Space><ShoppingCartOutlined /> Chi tiết thiết bị</Space>} bordered={false} style={{ borderRadius: 12 }}>
              <Table
                dataSource={cartItems}
                pagination={false}
                rowKey="id"
                columns={[
                  {
                    title: "Sản phẩm",
                    render: (_, i) => (
                      <Space>
                        <Avatar shape="square" size={64} src={`${process.env.REACT_APP_WEB_IMG_URL}/products/${i.image}`} />
                        <Text strong>{i.name}</Text>
                      </Space>
                    )
                  },
                  {
                    title: "Số lượng",
                    width: 120,
                    render: (_, i) => (
                      <Input type="number" value={i.quantity} onChange={e => updateQuantity(i.id, e.target.value)} />
                    )
                  },
                  { title: "Tạm tính", align: 'right', render: (_, i) => formatVND(i.price * i.quantity) },
                  { title: "", render: (_, i) => <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeFromCart(i.id)} /> }
                ]}
              />
            </Card>

            <Card title={<Space><BankOutlined /> Thông tin khách hàng</Space>} style={{ marginTop: 24, borderRadius: 12 }} bordered={false}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text type="secondary">Tên công ty / Người đại diện</Text>
                  <Input prefix={<UserOutlined />} size="large" value={company.name} onChange={e => setCompany({...company, name: e.target.value})} />
                </Col>
                <Col span={12}>
                  <Text type="secondary">Số điện thoại</Text>
                  <Input size="large" value={company.phone} onChange={e => setCompany({...company, phone: e.target.value})} />
                </Col>
                <Col span={24}>
                  <Text type="secondary">Địa chỉ giao hàng</Text>
                  <Input size="large" value={company.address} onChange={e => setCompany({...company, address: e.target.value})} />
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Space direction="vertical" style={{ width: '100%' }} size={24}>
              <Card title={<Space><TagOutlined /> Mã ưu đãi còn hạn</Space>} bordered={false} style={{ borderRadius: 12 }}>
                <Select
                  placeholder="Chọn mã giảm giá"
                  style={{ width: '100%' }}
                  size="large"
                  allowClear
                  value={selectedCoupon?.id}
                  onChange={(id) => setSelectedCoupon(coupons.find(c => c.id === id))}
                >
                  {coupons.map(c => (
                    <Select.Option key={c.id} value={c.id} disabled={subtotal < c.min_order}>
                      <Space direction="vertical" size={0}>
                        <Text strong>{c.code}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          {c.discount_type === 'percent' ? `Giảm ${c.discount_value}%` : `Giảm ${formatVND(c.discount_value)}`} 
                          (Tối thiểu {formatVND(c.min_order)})
                        </Text>
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Card>

              <Card bordered={false} style={{ borderRadius: 12, background: '#001529' }}>
                <Title level={4} style={{ color: '#fff' }}>Tổng hợp báo giá</Title>
                <div style={styles.row}>
                  <Text style={{ color: 'rgba(255,255,255,0.6)' }}>Tạm tính:</Text>
                  <Text style={{ color: '#fff' }}>{formatVND(subtotal)}</Text>
                </div>
                <div style={styles.row}>
                  <Text style={{ color: 'rgba(255,255,255,0.6)' }}>Chiết khấu:</Text>
                  <Text style={{ color: '#52c41a' }}>-{formatVND(discount)}</Text>
                </div>
                <Divider style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div style={styles.row}>
                  <Title level={3} style={{ color: '#fff', margin: 0 }}>TỔNG CỘNG:</Title>
                  <Title level={3} style={{ color: '#ff4d4f', margin: 0 }}>{formatVND(total)}</Title>
                </div>
                <Button 
                  type="primary" size="large" block icon={<SendOutlined />} 
                  style={{ marginTop: 24, height: 50, fontWeight: 700 }}
                  onClick={submitOrder}
                >
                  XÁC NHẬN BÁO GIÁ
                </Button>
              </Card>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.8)', zIndex: 1000,
    display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)'
  },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 }
};