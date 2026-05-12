import { Layout, Row, Col, Form, Input, Button, Typography, Space, message, ConfigProvider } from "antd";
import { 
  MailOutlined, PhoneOutlined, EnvironmentOutlined, 
  ArrowRightOutlined, FacebookFilled, LinkedinFilled, YoutubeFilled 
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function Contact() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    message.success("Yêu cầu của bạn đã được gửi tới bộ phận kỹ thuật!");
    form.resetFields();
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#0052cc', borderRadius: 2 } }}>
      <Layout style={{ background: "#fff" }}>
        <Content>
          {/* SECTION 1: HERO HEADER (PHONG CÁCH CÔNG NGHIỆP) */}
          <div style={styles.heroSection}>
            <div style={styles.heroOverlay} />
            <div style={styles.heroContent}>
              <Text style={{ color: '#0052cc', fontWeight: 700, letterSpacing: 2 }}>LIÊN HỆ TRỰC TIẾP</Text>
              <Title level={1} style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 64px)', margin: '12px 0' }}>
                Giải đáp mọi <span style={{ color: '#0052cc' }}>thách thức</span> <br /> về kỹ thuật máy móc.
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, maxWidth: 600 }}>
                Đội ngũ kỹ sư giàu kinh nghiệm của Industech luôn sẵn sàng đồng hành cùng dây chuyền sản xuất của bạn 24/7.
              </Paragraph>
            </div>
          </div>

          {/* SECTION 2: THÔNG TIN & FORM (BỐ CỤC PHÁ CÁCH) */}
          <div style={{ maxWidth: 1400, margin: "-100px auto 60px", padding: "0 20px", position: 'relative', zIndex: 10 }}>
            <Row gutter={[0, 0]} style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}>
              
              {/* CỘT TRÁI: THÔNG TIN (DARK THEME) */}
              <Col xs={24} lg={9} style={styles.infoColumn}>
                <Title level={3} style={{ color: '#fff', marginBottom: 40 }}>Thông tin kết nối</Title>
                
                <Space direction="vertical" size={40} style={{ width: '100%' }}>
                  <div style={styles.infoItem}>
                    <div style={styles.iconBox}><PhoneOutlined /></div>
                    <div>
                      <Text style={{ color: 'rgba(255,255,255,0.5)', display: 'block' }}>HOTLINE TƯ VẤN</Text>
                      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>1900 6789 (Kỹ thuật)</Text>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <div style={styles.iconBox}><MailOutlined /></div>
                    <div>
                      <Text style={{ color: 'rgba(255,255,255,0.5)', display: 'block' }}>EMAIL DOANH NGHIỆP</Text>
                      <Text style={{ color: '#fff', fontSize: 18 }}>contact@industech.vn</Text>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <div style={styles.iconBox}><EnvironmentOutlined /></div>
                    <div>
                      <Text style={{ color: 'rgba(255,255,255,0.5)', display: 'block' }}>VĂN PHÒNG ĐẠI DIỆN</Text>
                      <Text style={{ color: '#fff', fontSize: 16 }}>Khu Công Nghệ Cao, Quận 9, TP. HCM</Text>
                    </div>
                  </div>
                </Space>

                <div style={{ marginTop: 80 }}>
                  <Text style={{ color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 16 }}>MẠNG XÃ HỘI</Text>
                  <Space size={20}>
                    <FacebookFilled style={styles.socialIcon} />
                    <LinkedinFilled style={styles.socialIcon} />
                    <YoutubeFilled style={styles.socialIcon} />
                  </Space>
                </div>
              </Col>

              {/* CỘT PHẢI: FORM (CLEAN WHITE) */}
              <Col xs={24} lg={15} style={styles.formColumn}>
                <Title level={2} style={{ marginBottom: 8, fontWeight: 800 }}>GỬI YÊU CẦU BÁO GIÁ</Title>
                <Paragraph type="secondary" style={{ marginBottom: 40 }}>
                  Để lại thông tin, chúng tôi sẽ phản hồi kèm tài liệu kỹ thuật trong vòng 2 giờ làm việc.
                </Paragraph>

                <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                  <Row gutter={24}>
                    <Col xs={24} md={12}>
                      <Form.Item name="name" label={<Text strong>HỌ TÊN</Text>} rules={[{ required: true }]}>
                        <Input placeholder="Nhập tên..." style={styles.minimalInput} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="phone" label={<Text strong>SỐ ĐIỆN THOẠI</Text>} rules={[{ required: true }]}>
                        <Input placeholder="090..." style={styles.minimalInput} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="email" label={<Text strong>EMAIL CÔNG TY</Text>} rules={[{ required: true, type: 'email' }]}>
                    <Input placeholder="email@company.com" style={styles.minimalInput} />
                  </Form.Item>

                  <Form.Item name="message" label={<Text strong>NỘI DUNG CHI TIẾT</Text>} rules={[{ required: true }]}>
                    <TextArea rows={4} placeholder="Ví dụ: Cần tư vấn dây chuyền đóng gói tự động..." style={styles.minimalInput} />
                  </Form.Item>

                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    style={styles.submitBtn}
                  >
                    XÁC NHẬN GỬI ĐI <ArrowRightOutlined />
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>

          {/* SECTION 3: MAP (FULL WIDTH) */}
          <div style={{ height: 500, filter: 'grayscale(100%) invert(90%) contrast(90%)' }}>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.629663738151!2d105.79515647590924!3d21.007477980637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aca66e00f9a9%3A0xc3f8379899e69e06!2zS2h1IEPDtG5nIE5naGnhu4dwIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1711234567890!5m2!1svi!2s"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
            ></iframe>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

const styles = {
  heroSection: {
    height: '60vh',
    minHeight: 450,
    background: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070') center/cover",
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    background: 'linear-gradient(90deg, #001529 0%, rgba(0,21,41,0.6) 100%)',
    zIndex: 1
  },
  heroContent: { position: 'relative', zIndex: 2 },
  infoColumn: {
    background: '#001529',
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  formColumn: {
    background: '#fff',
    padding: '60px',
  },
  infoItem: { display: 'flex', alignItems: 'center', gap: 20 },
  iconBox: {
    width: 50, height: 50, background: '#0052cc', borderRadius: 4,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    fontSize: 20, color: '#fff'
  },
  socialIcon: { fontSize: 24, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: '0.3s' },
  minimalInput: {
    borderRadius: 0,
    border: 'none',
    borderBottom: '2px solid #f0f0f0',
    padding: '12px 0',
    boxShadow: 'none',
    background: 'transparent',
    fontWeight: 500
  },
  submitBtn: {
    height: 60,
    padding: '0 40px',
    fontSize: 16,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    boxShadow: '0 10px 20px rgba(0,82,204,0.2)'
  }
};