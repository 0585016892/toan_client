import { Layout, Row, Col, Typography, Space, Divider, Card, Statistic } from "antd";
import { 
  CheckCircleFilled, 
  GlobalOutlined, 
  RocketOutlined, 
  TeamOutlined,
  ThunderboltFilled 
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function AboutUs() {
  return (
    <Layout style={{ background: "#fff" }}>
      <Content>
        {/* --- SECTION 1: HERO (THE STATEMENT) --- */}
        <div style={styles.heroSection}>
          <Row gutter={[40, 40]} align="middle" style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Col xs={24} lg={12}>
              <Text style={{ color: "#0052cc", fontWeight: 700, letterSpacing: 2 }}>CÂU CHUYỆN CỦA CHÚNG TÔI</Text>
              <Title style={{ fontSize: "clamp(32px, 5vw, 56px)", marginTop: 16, fontWeight: 800, lineHeight: 1.1 }}>
                Định hình tương lai <br /> 
                <span style={{ color: "#0052cc" }}>Ngành Máy Công Nghiệp.</span>
              </Title>
              <Paragraph style={{ fontSize: 18, color: "#666", marginTop: 24, lineHeight: "1.8rem" }}>
                Bắt đầu từ một xưởng cơ khí nhỏ năm 2010, Industech đã vươn mình trở thành 
                đơn vị tiên phong cung cấp giải pháp tự động hóa toàn diện tại Việt Nam.
              </Paragraph>
            </Col>
            <Col xs={24} lg={12}>
              <div style={styles.imageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000" 
                  alt="Industrial" 
                  style={styles.heroImage}
                />
                <div style={styles.experienceBadge}>
                  <Title level={2} style={{ color: "#fff", margin: 0 }}>15+</Title>
                  <Text style={{ color: "#fff" }}>Năm kinh nghiệm</Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* --- SECTION 2: NUMBERS (TRUST) --- */}
        <div style={styles.statsSection}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Row gutter={[32, 32]} justify="center">
              {[
                { label: "Dự án hoàn thành", value: 500, suffix: "+", icon: <CheckCircleFilled /> },
                { label: "Đối tác toàn cầu", value: 50, suffix: "+", icon: <GlobalOutlined /> },
                { label: "Kỹ sư chuyên gia", value: 120, suffix: "+", icon: <TeamOutlined /> },
                { label: "Giải thưởng sáng tạo", value: 12, suffix: "", icon: <ThunderboltFilled /> },
              ].map((item, index) => (
                <Col xs={12} md={6} key={index}>
                  <Card bordered={false} bodyStyle={{ textAlign: 'center', background: 'transparent' }}>
                    <div style={{ fontSize: 30, color: '#0052cc', marginBottom: 16 }}>{item.icon}</div>
                    <Statistic value={item.value} suffix={item.suffix} valueStyle={{ fontWeight: 800, fontSize: 32 }} />
                    <Text type="secondary" strong>{item.label}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* --- SECTION 3: VISION & MISSION (STRATEGY) --- */}
        <div style={{ padding: "100px 20px", background: "#f8f9fa" }}>
          <Row gutter={[60, 40]} style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Col xs={24} md={12}>
              <div style={styles.strategyCard}>
                <RocketOutlined style={styles.strategyIcon} />
                <Title level={3}>Tầm nhìn</Title>
                <Paragraph style={{ fontSize: 16, color: "#555" }}>
                  Trở thành biểu tượng niềm tin hàng đầu Việt Nam về hệ thống máy móc thông minh, 
                  góp phần đưa nền sản xuất nội địa vươn tầm thế giới thông qua công nghệ 4.0.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div style={styles.strategyCard}>
                <TeamOutlined style={styles.strategyIcon} />
                <Title level={3}>Sứ mệnh</Title>
                <Paragraph style={{ fontSize: 16, color: "#555" }}>
                  Chúng tôi không chỉ bán máy móc; chúng tôi cung cấp giải pháp giúp doanh nghiệp 
                  tối ưu hóa chi phí, nâng cao năng suất và đảm bảo an toàn tuyệt đối cho người lao động.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>

        {/* --- SECTION 4: CORE VALUES (THE WHY) --- */}
        <div style={{ padding: "100px 20px" }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Title level={2}>Giá trị cốt lõi</Title>
            <Divider style={{ width: 60, minWidth: 60, borderTop: '4px solid #0052cc', margin: '20px auto' }} />
          </div>
          
          <Row gutter={[24, 24]} style={{ maxWidth: 1200, margin: "0 auto" }}>
            {[
              { title: "Chất lượng là trọng tâm", desc: "Mọi thiết bị xuất xưởng đều trải qua quy trình kiểm định 7 bước nghiêm ngặt." },
              { title: "Luôn luôn đổi mới", desc: "Dành 15% doanh thu hàng năm cho nghiên cứu và phát triển công nghệ mới." },
              { title: "Đồng hành bền vững", desc: "Chế độ bảo trì trọn đời và hỗ trợ kỹ thuật tận nơi trong vòng 24h." }
            ].map((val, i) => (
              <Col xs={24} md={8} key={i}>
                <div style={styles.valueItem}>
                  <div style={styles.valueNumber}>0{i+1}</div>
                  <Title level={4}>{val.title}</Title>
                  <Text type="secondary">{val.desc}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

const styles = {
  heroSection: {
    padding: "120px 20px",
    background: "#fff",
    overflow: "hidden"
  },
  imageWrapper: {
    position: "relative",
    padding: "20px"
  },
  heroImage: {
    width: "100%",
    borderRadius: "40px 4px 40px 4px",
    boxShadow: "20px 20px 0px #f0f2f5",
    objectFit: "cover",
    height: 450
  },
  experienceBadge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    background: "#0052cc",
    padding: "24px 40px",
    borderRadius: "4px 40px 4px 40px",
    textAlign: "center"
  },
  statsSection: {
    padding: "60px 20px",
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee"
  },
  strategyCard: {
    padding: "40px",
    background: "#fff",
    height: "100%",
    borderRadius: 16,
    transition: "transform 0.3s ease",
    cursor: "default",
    borderBottom: "4px solid transparent",
    ":hover": {
      borderBottom: "4px solid #0052cc"
    }
  },
  strategyIcon: {
    fontSize: 40,
    color: "#0052cc",
    marginBottom: 24
  },
  valueItem: {
    padding: "30px",
    height: "100%"
  },
  valueNumber: {
    fontSize: 48,
    fontWeight: 900,
    color: "#f0f2f5",
    lineHeight: 1,
    marginBottom: 16
  }
};