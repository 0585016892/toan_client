import { Layout, Row, Col, Typography, Space, Input, Button, Divider, ConfigProvider } from "antd";
import {
  FacebookOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SendOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";

const { Footer } = Layout;
// Thêm Paragraph vào đây
const { Title, Text, Link, Paragraph } = Typography;
export default function AppFooter() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Footer style={{ background: "#001529", color: "#fff", padding: "80px 80px 30px" }}>
        <Row gutter={[48, 40]}>
          {/* 1. GIỚI THIỆU & TÍN NHIỆM */}
          <Col xs={24} lg={8}>
            <div style={{ marginBottom: 24 }}>
               <Title level={3} style={{ color: "#fff", margin: 0, letterSpacing: '1px' }}>
                INDUS<span style={{ color: '#1890ff' }}>TECH</span>
              </Title>
              <Text style={{ color: "#8c8c8c", fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Industrial Solutions Specialist
              </Text>
            </div>
            <Paragraph style={{ color: "rgba(255,255,255,0.65)", lineHeight: '1.8', marginBottom: 24 }}>
              Chúng tôi tiên phong trong việc cung cấp máy móc cơ khí chính xác và giải pháp nhà máy thông minh (Smart Factory), giúp doanh nghiệp Việt vươn tầm quốc tế.
            </Paragraph>
            <Space direction="vertical" size={12}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.85)' }}>
                  <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
                  <Text style={{ color: '#fff' }}>Hội viên Hiệp hội Doanh nghiệp Cơ khí Việt Nam</Text>
               </div>
            </Space>
          </Col>

          {/* 2. LIÊN KẾT NHANH */}
          <Col xs={12} sm={8} lg={4}>
            <Title level={5} style={{ color: "#fff", marginBottom: 25 }}>
              Giải pháp
            </Title>
            <Space direction="vertical" size={12}>
              <Link className="footer-link" href="/machines">Máy cắt CNC</Link>
              <Link className="footer-link" href="/machines">Cánh tay Robot</Link>
              <Link className="footer-link" href="/machines">Hệ thống kho tự động</Link>
              <Link className="footer-link" href="/machines">Dây chuyền đóng gói</Link>
            </Space>
          </Col>

          {/* 3. HỖ TRỢ KHÁCH HÀNG */}
          <Col xs={12} sm={8} lg={4}>
            <Title level={5} style={{ color: "#fff", marginBottom: 25 }}>
              Hỗ trợ
            </Title>
            <Space direction="vertical" size={12}>
              <Link className="footer-link" href="/about">Về chúng tôi</Link>
              <Link className="footer-link" href="/contact">Yêu cầu báo giá</Link>
              <Link className="footer-link" href="/policy">Chính sách bảo trì</Link>
              <Link className="footer-link" href="/faq">Câu hỏi thường gặp</Link>
            </Space>
          </Col>

          {/* 4. ĐĂNG KÝ NHẬN TIN & KẾT NỐI */}
          <Col xs={24} sm={8} lg={8}>
            <Title level={5} style={{ color: "#fff", marginBottom: 25 }}>
              Đăng ký cập nhật kỹ thuật
            </Title>
            <Paragraph style={{ color: "rgba(255,255,255,0.45)", fontSize: '13px' }}>
              Nhận thông tin về công nghệ mới nhất và ưu đãi linh kiện định kỳ.
            </Paragraph>
            <Space.Compact style={{ width: '100%', marginBottom: 24 }}>
              <Input 
                placeholder="Email của bạn" 
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #303030', color: '#fff' }} 
              />
              <Button type="primary" icon={<SendOutlined />}>Gửi</Button>
            </Space.Compact>
            
            <Title level={5} style={{ color: "#fff", marginBottom: 15, fontSize: '14px' }}>
              Theo dõi chúng tôi trên
            </Title>
            <Space size={16}>
              <Button shape="circle" icon={<FacebookOutlined />} style={{ background: '#1877f2', border: 'none', color: '#fff' }} />
              <Button shape="circle" icon={<YoutubeOutlined />} style={{ background: '#ff0000', border: 'none', color: '#fff' }} />
              <Button shape="circle" icon={<LinkedinOutlined />} style={{ background: '#0077b5', border: 'none', color: '#fff' }} />
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "rgba(255,255,255,0.1)", margin: '60px 0 30px' }} />

        {/* BOTTOM INFO */}
        <Row align="middle" gutter={[16, 16]}>
          <Col xs={24} md={12}>
             <Space split={<Divider type="vertical" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />}>
                <Text style={{ color: 'rgba(255,255,255,0.45)' }}><PhoneOutlined /> 0989 999 999</Text>
                <Text style={{ color: 'rgba(255,255,255,0.45)' }}><MailOutlined /> tech@industech.vn</Text>
             </Space>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Text style={{ color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} HT Team. All rights reserved.
            </Text>
          </Col>
        </Row>

        <style>{`
          .footer-link {
            color: rgba(255,255,255,0.65) !important;
            transition: all 0.3s ease;
            display: block;
          }
          .footer-link:hover {
            color: #1890ff !important;
            padding-left: 5px;
          }
          @media (max-width: 768px) {
            .ant-layout-footer { padding: 40px 20px !important; }
          }
        `}</style>
      </Footer>
    </ConfigProvider>
  );
}