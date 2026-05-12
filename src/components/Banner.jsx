import { Carousel, Button, Typography, Space, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined, FileTextOutlined, CustomerServiceOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function Banner() {
  const navigate = useNavigate();

  const slides = [
    {
      title: "GIẢI PHÁP CÔNG NGHIỆP 4.0",
      subtitle: "Tư vấn • Cung cấp • Lắp đặt • Bảo hành trọn gói",
      bg: "https://images.unsplash.com/photo-1581093588401-22d93c7db8f0?auto=format&fit=crop&q=80&w=1920",
      btnText: "Yêu cầu báo giá",
      btnIcon: <FileTextOutlined />,
      link: "/quote",
      color: "#1890ff"
    },
    {
      title: "HIỆU SUẤT VƯỢT TRỘI",
      subtitle: "Thiết bị hiện đại – Tiêu chuẩn kỹ thuật quốc tế",
      bg: "https://images.unsplash.com/photo-1581091215367-59ab6c3e1c8d?auto=format&fit=crop&q=80&w=1920",
      btnText: "Xem sản phẩm",
      btnIcon: <ArrowRightOutlined />,
      link: "/machines",
      color: "#52c41a"
    },
    {
      title: "KỸ SƯ CHUYÊN GIA",
      subtitle: "Hỗ trợ kỹ thuật 24/7 – Nghiệm thu tận nơi",
      bg: "https://images.unsplash.com/photo-1581092334472-1c2b89c7e8a4?auto=format&fit=crop&q=80&w=1920",
      btnText: "Liên hệ tư vấn",
      btnIcon: <CustomerServiceOutlined />,
      link: "/contact",
      color: "#f5222d"
    }
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <div className="banner-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
        <Carousel 
          autoplay 
          effect="fade" 
          autoplaySpeed={6000}
          dots={{ className: 'custom-dots' }}
        >
          {slides.map((slide, index) => (
            <div key={index}>
              <div 
                style={{
                  height: '85vh',
                  minHeight: '600px',
                  background: `linear-gradient(rgba(0, 21, 41, 0.7), rgba(0, 21, 41, 0.5)), url(${slide.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  padding: '0 20px'
                }}
              >
                <div className="content-box" style={{ maxWidth: '900px' }}>
                  <div className="animate-reveal">
                    <Title 
                      style={{ 
                        color: '#fff', 
                        fontSize: 'clamp(32px, 5vw, 64px)', 
                        fontWeight: 800,
                        marginBottom: '16px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {slide.title}
                    </Title>
                    <Paragraph 
                      style={{ 
                        color: 'rgba(255,255,255,0.85)', 
                        fontSize: 'clamp(16px, 1.5vw, 20px)',
                        marginBottom: '40px',
                        letterSpacing: '1px'
                      }}
                    >
                      {slide.subtitle}
                    </Paragraph>
                    <Space size="large">
                      <Button 
                        type="primary" 
                        size="large" 
                        icon={slide.btnIcon}
                        onClick={() => navigate(slide.link)}
                        style={{ 
                          height: '56px', 
                          paddingInline: '40px', 
                          fontSize: '16px', 
                          fontWeight: 600,
                          boxShadow: `0 4px 15px ${slide.color}44`,
                          border: 'none'
                        }}
                      >
                        {slide.btnText}
                      </Button>
                      <Button 
                        ghost 
                        size="large" 
                        style={{ 
                          height: '56px', 
                          paddingInline: '40px', 
                          fontSize: '16px',
                          borderColor: 'rgba(255,255,255,0.5)',
                          color: '#fff'
                        }}
                        onClick={() => navigate('/about')}
                      >
                        Về chúng tôi
                      </Button>
                    </Space>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* CSS để tạo hiệu ứng mượt mà */}
        <style>{`
          .animate-reveal {
            animation: revealUp 1s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes revealUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .custom-dots li button {
            width: 12px !important;
            height: 12px !important;
            border-radius: 50% !important;
            background: rgba(255,255,255,0.3) !important;
          }
          .custom-dots li.ant-carousel-active-dot button {
            background: #1890ff !important;
            width: 30px !important;
            border-radius: 6px !important;
          }
          .ant-carousel .slick-slide {
            overflow: hidden;
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
}