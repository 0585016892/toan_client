import { Row, Col, Typography, Layout, Button, Space, Statistic, Badge, Card, Tag } from "antd";
import { 
  SettingOutlined, 
  SafetyCertificateOutlined, 
  ThunderboltOutlined,
  ArrowsAltOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import Banner from "../components/Banner"; // Giả định Banner của bạn chứa ảnh máy móc lớn

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

export default function Home() {
  return (
    <div style={{ background: "#fff", overflow: "hidden" }}>
      {/* 1. HERO SECTION - CẢM GIÁC CƠ KHÍ MẠNH MẼ */}
      <div style={{ position: 'relative', background: '#001529' }}>
        <Banner /> 
        {/* <div style={styles.heroOverlay}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
            <Tag color="#1890ff" style={{ marginBottom: 16, borderRadius: 0, padding: '4px 12px' }}>NEW ARRIVAL 2026</Tag>
            <Title style={{ color: '#fff', fontSize: 'clamp(40px, 6vw, 72px)', margin: 0, lineHeight: 1 }}>
              MÁY CẮT LASER <br/> <span style={{ color: '#1890ff' }}>CNC KHỔ LỚN</span>
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20, marginTop: 24, maxWidth: 600 }}>
              Công nghệ sợi quang (Fiber) thế hệ mới, tăng năng suất lên 300% với độ chính xác tuyệt đối.
            </Paragraph>
            <Space size="middle" style={{ marginTop: 40 }}>
              <Button type="primary" size="large" style={styles.btnPrimary}>NHẬN BÁO GIÁ NGAY</Button>
              <Button ghost size="large" icon={<PlayCircleOutlined />} style={styles.btnGhost}>XEM VẬN HÀNH</Button>
            </Space>
          </div>
        </div> */}
      </div>

      <Content>
        {/* 2. THÔNG SỐ KỸ THUẬT NỔI BẬT (TECHNICAL SPECS) */}
        <div style={{ background: '#f5f5f5', padding: '40px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} md={6}>
                <Statistic title="Công suất nguồn" value={12000} suffix="W" valueStyle={styles.statValue} />
              </Col>
              <Col xs={12} md={6}>
                <Statistic title="Tốc độ cắt tối đa" value={120} suffix="m/p" valueStyle={styles.statValue} />
              </Col>
              <Col xs={12} md={6}>
                <Statistic title="Sai số gia công" value={0.02} suffix="mm" valueStyle={styles.statValue} />
              </Col>
              <Col xs={12} md={6}>
                <Statistic title="Khổ bàn làm việc" value={"3000x1500"} valueStyle={styles.statValue} />
              </Col>
            </Row>
          </div>
        </div>

        {/* 3. DANH MỤC MÁY CHỦ ĐẠO (PRODUCT BENTO) */}
        <div style={{ padding: '100px 20px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Title level={2} style={{ textTransform: 'uppercase', letterSpacing: 2 }}>Danh mục máy chủ đạo</Title>
            <div style={{ width: 60, height: 4, background: '#1890ff', margin: '0 auto' }} />
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={16}>
              <div className="product-card-large">
                <div className="card-content">
                  <Title level={3} style={{ color: '#fff' }}>Máy Chấn CNC Thủy Lực</Title>
                  <Text style={{ color: '#ccc' }}>Lực ép lên tới 500 tấn, điều khiển đa trục tự động.</Text>
                </div>
                <img src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1000" alt="Machine 1" />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="product-card-small">
                <div className="card-content">
                  <Title level={4} style={{ color: '#fff' }}>Máy Hàn Laser Handheld</Title>
                </div>
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600" alt="Machine 2" />
              </div>
              <div className="product-card-small" style={{ marginTop: 24 }}>
                <div className="card-content">
                  <Title level={4} style={{ color: '#fff' }}>Máy Phay CNC 5 Trục</Title>
                </div>
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600" alt="Machine 3" />
              </div>
            </Col>
          </Row>
        </div>

        {/* 4. CHẤT LƯỢNG & DỊCH VỤ (SERVICE FOCUS) */}
        <div style={{ background: '#001529', padding: '100px 0', color: '#fff' }}>
          <Row style={{ maxWidth: 1200, margin: '0 auto' }} gutter={[48, 48]} align="middle">
            <Col xs={24} lg={10}>
              <Title level={2} style={{ color: '#fff', fontSize: 36 }}>Tại sao nên chọn <br/> máy móc từ Industech?</Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>
                Chúng tôi không chỉ cung cấp máy, chúng tôi cung cấp giải pháp sản xuất bền bỉ trong hàng thập kỷ.
              </Paragraph>
              <Space direction="vertical" size="large" style={{ marginTop: 20 }}>
                <div style={styles.featureItem}>
                  <SafetyCertificateOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <div>
                    <Text strong style={{ color: '#fff', fontSize: 18 }}>Linh kiện chuẩn EU/G7</Text><br/>
                    <Text style={{ color: 'rgba(255,255,255,0.5)' }}>Sử dụng điện từ Schneider, động cơ Yaskawa Nhật Bản.</Text>
                  </div>
                </div>
                <div style={styles.featureItem}>
                  <ToolOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <div>
                    <Text strong style={{ color: '#fff', fontSize: 18 }}>Bảo trì 24/7 Tận Nơi</Text><br/>
                    <Text style={{ color: 'rgba(255,255,255,0.5)' }}>Đội ngũ kỹ thuật có mặt xử lý sự cố trong vòng tối đa 12h.</Text>
                  </div>
                </div>
              </Space>
            </Col>
            <Col xs={24} lg={14}>
              <div style={styles.videoPlaceholder}>
                <PlayCircleOutlined style={{ fontSize: 80, color: '#fff', opacity: 0.8 }} />
                <Text style={{ color: '#fff', marginTop: 16 }}>XEM QUY TRÌNH KIỂM ĐỊNH MÁY XUẤT XƯỞNG</Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* 5. NEWS / BLOG SECTION */}
        <div style={{ padding: '80px 20px', maxWidth: 1200, margin: '0 auto' }}>
          <Row justify="space-between" align="bottom" style={{ marginBottom: 40 }}>
            <Col><Title level={2} style={{ margin: 0 }}>Tư vấn Kỹ thuật</Title></Col>
            <Col><Button type="link" icon={<ArrowsAltOutlined />}>Xem tất cả bài viết</Button></Col>
          </Row>
          <Row gutter={[24, 24]}>
            {[1, 2, 3].map(i => (
              <Col xs={24} md={8} key={i}>
                <Card 
                  hoverable 
                  cover={<img alt="blog" src={`https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&index=${i}`} />}
                  style={{ borderRadius: 0 }}
                >
                  <Tag color="blue">KỸ THUẬT LASER</Tag>
                  <Title level={4} style={{ marginTop: 12 }}>Cách tối ưu hóa bép cắt Laser để tiết kiệm khí Nitrogen</Title>
                  <Text type="secondary">Đọc thêm <ArrowRightOutlined /></Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>

      <style jsx>{`
        .product-card-large, .product-card-small {
          position: relative;
          overflow: hidden;
          background: #000;
          height: 500px;
          cursor: pointer;
        }
        .product-card-small { height: 238px; }
        
        .product-card-large img, .product-card-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
          transition: 0.5s all ease;
        }

        .product-card-large:hover img, .product-card-small:hover img {
          transform: scale(1.1);
          opacity: 0.4;
        }

        .card-content {
          position: absolute;
          bottom: 0; left: 0;
          padding: 30px;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}

const styles = {
  heroOverlay: {
    padding: '120px 0',
    background: 'linear-gradient(to right, rgba(0,21,41,0.9), rgba(0,21,41,0.2))',
  },
  btnPrimary: {
    height: 56,
    padding: '0 40px',
    borderRadius: 0,
    fontWeight: 700,
    fontSize: 16
  },
  btnGhost: {
    height: 56,
    padding: '0 30px',
    borderRadius: 0,
    color: '#fff',
    borderColor: '#fff'
  },
  statValue: {
    fontWeight: 900,
    fontSize: 32,
    color: '#001529'
  },
  featureItem: {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
    marginBottom: 24
  },
  videoPlaceholder: {
    width: '100%',
    height: 400,
    background: 'url("https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1000") center/cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '10px solid rgba(255,255,255,0.1)'
  }
};