import { Card, Typography, Button, Tag, Space, Badge } from "antd";
import { 
  ArrowRightOutlined, 
  FireFilled, 
  EyeOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

export default function CartProduct({ product }) {
  const imageUrl = `${process.env.REACT_APP_WEB_IMG_URL}/products/${product.thumbnail}`;

  // --- HÀM ĐỊNH DẠNG TIỀN TỆ CHUẨN VN ---
  const formatVND = (price) => {
    if (!price || isNaN(price)) return null;
    return new Intl.NumberFormat('vi-VN').format(Math.floor(price)) + " ₫";
  };

  // Logic kiểm tra giá
  const rawPrice = parseFloat(product.price);
  const rawOldPrice = parseFloat(product.old_price);
  
  const hasPrice = rawPrice > 0;
  const isSale = rawOldPrice > rawPrice;
  const discountPercent = isSale ? Math.round(((rawOldPrice - rawPrice) / rawOldPrice) * 100) : 0;

  return (
    <Card
      hoverable
      className="tech-product-card"
      cover={
        <div style={{ position: 'relative', overflow: 'hidden', height: 240, background: '#f5f5f5' }}>
          {/* Tag giảm giá góc ảnh */}
          {isSale && (
            <div className="discount-badge">
              TIẾT KIỆM {discountPercent}%
            </div>
          )}

          <img
            alt={product.name}
            src={imageUrl}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
            className="product-img"
          />
          
          <div className="card-mask">
             <Link to={`/products/${product.slug}`}>
                <Button type="primary" size="large" icon={<EyeOutlined />} shape="round">
                  Chi tiết kỹ thuật
                </Button>
             </Link>
          </div>

          <div className="floating-tags">
            {product.stock > 10 && (
              <Tag color="#f5222d" className="status-tag"><FireFilled /> BÁN CHẠY</Tag>
            )}
            {product.stock > 0 ? (
              <Tag color="#52c41a" className="status-tag"><CheckCircleOutlined /> SẴN HÀNG</Tag>
            ) : (
              <Tag color="#bfbfbf" className="status-tag">HẾT HÀNG</Tag>
            )}
          </div>
        </div>
      }
      bodyStyle={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '220px' }}
    >
      {/* 1. THÔNG TIN THƯƠNG HIỆU & TÊN */}
      <div style={{ flexGrow: 1 }}>
        <Text type="secondary" style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
          {product.brand_name || "INDUSTRIAL TECH"}
        </Text>
        <Title level={5} style={{ marginTop: 4, marginBottom: 8, height: '42px', overflow: 'hidden' }}>
          <Link to={`/products/${product.slug}`} className="product-title-link">
            {product.name}
          </Link>
        </Title>
        <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ fontSize: '13px', marginBottom: 0 }}>
          {product.short_desc}
        </Paragraph>
      </div>

      {/* 2. KHỐI GIÁ - ĐÃ FIX LỖI .00 VÀ ĐỊNH DẠNG ĐẸP */}
      <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
        <div style={{ 
          background: '#f9fafb', 
          padding: '10px', 
          borderRadius: '8px', 
          border: '1px solid #f0f0f0',
          marginBottom: '12px'
        }}>
          {hasPrice ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {isSale && (
                <Text delete type="secondary" style={{ fontSize: '12px' }}>
                  {formatVND(rawOldPrice)}
                </Text>
              )}
              <Text strong style={{ fontSize: '18px', color: '#d32f2f' }}>
                {formatVND(rawPrice)}
              </Text>
            </div>
          ) : (
            <div style={{ padding: '4px 0' }}>
              <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>LIÊN HỆ BÁO GIÁ</Text>
              <div style={{ fontSize: '11px', color: '#8c8c8c' }}>Giá sỉ cho doanh nghiệp/dự án</div>
            </div>
          )}
        </div>

        <Link to={`/products/${product.slug}`}>
          <Button 
            type={hasPrice ? "default" : "primary"} 
            block 
            icon={hasPrice ? <ArrowRightOutlined /> : <ThunderboltOutlined />}
            className="action-btn"
          >
            {hasPrice ? "Cấu hình chi tiết" : "Gửi yêu cầu ngay"}
          </Button>
        </Link>
      </div>

      <style>{`
        .tech-product-card { border-radius: 12px; transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); }
        .tech-product-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; border-color: #1890ff; }
        
        .product-img { transition: transform 0.5s ease; }
        .tech-product-card:hover .product-img { transform: scale(1.05); }

        .card-mask {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 21, 41, 0.4); display: flex; justify-content: center;
          align-items: center; opacity: 0; transition: 0.3s; z-index: 2;
        }
        .tech-product-card:hover .card-mask { opacity: 1; }

        .discount-badge {
          position: absolute; top: 0; right: 0; background: #ff4d4f; color: white;
          padding: 4px 10px; font-size: 12px; font-weight: 700; 
          border-bottom-left-radius: 10px; z-index: 3;
        }

        .floating-tags { position: absolute; bottom: 10px; left: 10px; z-index: 3; display: flex; gap: 4px; }
        .status-tag { margin: 0; border: none; font-size: 10px; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        .product-title-link { color: #1f1f1f; transition: color 0.3s; }
        .product-title-link:hover { color: #1890ff; }
        
        .action-btn { height: 38px; border-radius: 6px; font-weight: 600; }
      `}</style>
    </Card>
  );
}