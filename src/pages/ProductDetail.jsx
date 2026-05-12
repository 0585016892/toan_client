import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productApi from "../api/productApi";
import { useCart } from "../contexts/CartContext";
import {
  Row, Col, Card, Image, Typography, Tag, Button, 
  InputNumber, Breadcrumb, Skeleton, Tabs, message, 
  Space, Divider, List, ConfigProvider
} from "antd";
import {
  ShoppingCartOutlined,
  FileTextOutlined,
  PhoneOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
  ThunderboltOutlined,EyeOutlined,
  ToolOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const IMAGE_BASE = `${process.env.REACT_APP_WEB_IMG_URL}/products/`;

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await productApi.getDetail(slug);
        setProduct(res);
        // Ưu tiên thumbnail nếu không có mảng images
        setActiveImage(res.images?.[0]?.image_url || res.thumbnail);
      } catch {
        message.error("Không tải được thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  // Hàm định dạng tiền tệ chuẩn (Đã fix lỗi .00)
  const formatPrice = (price) => {
    if (!price || price <= 0) return "Liên hệ báo giá";
    return new Intl.NumberFormat('vi-VN').format(Math.floor(price)) + " ₫";
  };

  if (loading) return (
    <div style={{ padding: "40px 80px" }}>
      <Skeleton active avatar paragraph={{ rows: 10 }} />
    </div>
  );

  if (!product) return <div style={{ padding: 100, textAlign: 'center' }}><Title level={4}>Sản phẩm không tồn tại</Title></div>;

  const handleAddToCart = () => {
     // Nếu hết hàng
  if (!product.stock || product.stock <= 0) {
    message.error("Sản phẩm hiện đang hết hàng");
    return;
  }

  // Nếu số lượng vượt tồn kho
  if (quantity > product.stock) {
    message.error(`Chỉ còn ${product.stock} sản phẩm trong kho`);
    return;
  }
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: activeImage,
    });
    message.success("Đã thêm vào giỏ hàng");
  };

  return (
    <ConfigProvider theme={{ token: { borderRadius: 8 } }}>
      <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "20px 80px" }}>
        
        {/* BREADCRUMB */}
        <Breadcrumb style={{ marginBottom: 24 }}>
          <Breadcrumb.Item><Link to="/">Trang chủ</Link></Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/machines?category=${product.category_slug}`}>{product.category_name}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Card bordered={false} style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderRadius: 16 }}>
          <Row gutter={60}>
            {/* LEFT: IMAGES */}
            <Col xs={24} lg={10}>
              <div style={{ position: 'sticky', top: 100 }}>
                <Card bordered style={{ borderRadius: 12, overflow: 'hidden', textAlign: 'center', background: '#fff' }}>
                  <Image
                    src={IMAGE_BASE + activeImage}
                    width="100%"
                    style={{ maxHeight: 450, objectFit: "contain" }}
                    preview={{ mask: <><EyeOutlined /> Phóng to</> }}
                  />
                </Card>

                <Row gutter={12} style={{ marginTop: 16 }}>
                  {product.images?.map((img) => (
                    <Col key={img.id}>
                      <div 
                        onClick={() => setActiveImage(img.image_url)}
                        style={{
                          width: 80, height: 80, padding: 4, borderRadius: 8,
                          border: activeImage === img.image_url ? "2px solid #1677ff" : "1px solid #f0f0f0",
                          cursor: "pointer", transition: '0.3s', background: '#fff'
                        }}
                      >
                        <img src={IMAGE_BASE + img.image_url} width="100%" height="100%" style={{ objectFit: 'contain' }} />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            {/* RIGHT: MAIN INFO */}
            <Col xs={24} lg={14}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <div>
                  <Space size="middle">
                    <Tag color="blue" style={{ fontSize: 13, padding: '2px 10px' }}>{product.brand_name}</Tag>
                    <Text type="secondary">Mã sản phẩm: <Text strong>{product.sku || 'N/A'}</Text></Text>
                  </Space>
                  <Title level={2} style={{ marginTop: 12, marginBottom: 8 }}>{product.name}</Title>
                  <Text type={product.stock > 0 ? "success" : "danger"}>
                    {product.stock > 0 
                      ? `Còn ${product.stock} sản phẩm trong kho` 
                      : "Hết hàng"}
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 16 }}>{product.short_desc}</Paragraph>
                </div>

                <div style={{ background: "#fdf2f2", padding: "24px", borderRadius: 12, border: "1px solid #ffccc7" }}>
                  <Text type="secondary" style={{ fontSize: 14 }}>Giá bán niêm yết:</Text>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <Title level={1} style={{ color: "#d32f2f", margin: 0 }}>
                      {formatPrice(product.price)}
                    </Title>
                    {product.old_price > product.price && (
                      <Text delete type="secondary" style={{ fontSize: 18 }}>
                        {formatPrice(product.old_price)}
                      </Text>
                    )}
                  </div>
                  <Text type="secondary" italic style={{ fontSize: 12 }}>* Giá đã bao gồm thuế VAT 10%</Text>
                </div>

                {/* TRUST BADGES */}
                <Row gutter={[16, 16]}>
                  {[
                    { icon: <SafetyCertificateOutlined />, text: "Bảo hành 24 tháng" },
                    { icon: <ToolOutlined />, text: "Hỗ trợ lắp đặt tận nơi" },
                    { icon: <ThunderboltOutlined />, text: "Giao hàng nhanh 24h" }
                  ].map((item, idx) => (
                    <Col span={8} key={idx}>
                      <Space><Text style={{ color: '#52c41a' }}>{item.icon}</Text> <Text size="small">{item.text}</Text></Space>
                    </Col>
                  ))}
                </Row>

                <Divider style={{ margin: '12px 0' }} />

                {/* ACTION AREA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <Space direction="vertical" size={4}>
                    <Text strong>Số lượng đặt hàng:</Text>
                    <InputNumber
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={setQuantity}
                      size="large"
                      disabled={product.stock === 0}
                      style={{ width: 120, borderRadius: 8 }}
                    />
                  </Space>
                  
                  <div style={{ flex: 1, display: 'flex', gap: 12, paddingTop: 24 }}>
                    <Button 
                        type="primary"
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddToCart}
                        block
                        disabled={product.stock === 0}
                        style={{ height: 50, fontWeight: 600 }}
                      >
                        {product.stock === 0 ? "HẾT HÀNG" : "THÊM VÀO GIỎ"}
                      </Button>
                    <Button 
                      size="large" icon={<FileTextOutlined />} 
                      block style={{ height: 50, fontWeight: 600, borderColor: '#1677ff', color: '#1677ff' }}
                    >
                      NHẬN BÁO GIÁ SỈ
                    </Button>
                  </div>
                </div>

                <Card size="small" style={{ background: '#e6f4ff', border: 'none' }}>
                  <Space>
                    <PhoneOutlined style={{ fontSize: 20, color: '#1677ff' }} />
                    <div>
                      <Text style={{ display: 'block' }}>Hotline Tư vấn Kỹ thuật 24/7:</Text>
                      <Text strong style={{ fontSize: 18, color: '#1677ff' }}>0909 999 888</Text>
                    </div>
                  </Space>
                </Card>
              </Space>
            </Col>
          </Row>

          {/* BOTTOM TABS */}
          <div style={{ marginTop: 60 }}>
            <Tabs
              type="card"
              size="large"
              items={[
                {
                  key: "1",
                  label: "Mô tả sản phẩm",
                  children: (
                    <div className="product-desc-content" style={{ padding: '20px', lineHeight: 1.8 }}>
                      <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: "Thông số kỹ thuật",
                  children: (
                    <div style={{ padding: '20px' }}>
                      {/* Giả sử bạn có mảng specs, nếu không sẽ hiển thị bảng mẫu */}
                      <List
                        bordered
                        dataSource={[
                          { label: "Công suất động cơ", value: product.power || "5.5 kW" },
                          { label: "Điện áp đầu vào", value: product.voltage || "380V / 50Hz" },
                          { label: "Tốc độ vòng quay", value: product.speed || "2800 vòng/phút" },
                          { label: "Trọng lượng máy", value: product.weight || "120 kg" },
                          { label: "Xuất xứ", value: product.origin || "Nhật Bản" },
                        ]}
                        renderItem={item => (
                          <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>{item.label}</Text> <Text>{item.value}</Text>
                          </List.Item>
                        )}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Card>

        <style>{`
          .product-desc-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
          .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active { background: #fff !important; }
          .ant-breadcrumb a { color: #8c8c8c; }
          .ant-breadcrumb a:hover { color: #1677ff; }
        `}</style>
      </div>
    </ConfigProvider>
  );
}