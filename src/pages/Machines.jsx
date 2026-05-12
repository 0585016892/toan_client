import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productApi from "../api/productApi";
import brandApi from "../api/brandApi";

import {
  Layout, Row, Col, Card, Skeleton, Checkbox, Button, 
  Tag, Select, Typography, Space, Empty, Divider, ConfigProvider
} from "antd";
import { 
  FilterOutlined, 
  SortAscendingOutlined, 
  ReloadOutlined,
  ClearOutlined
} from "@ant-design/icons";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CartProduct from "../components/CartProduct";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

/* ===== CONFIG GIÁ ===== */
const MIN_PRICE = 0;
const MAX_PRICE = 500_000_000;
const STEP = 5_000_000;

export default function Machines() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "";
  const brandParams = searchParams.getAll("brands");

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // States đồng bộ với UI trước khi nhấn "Áp dụng"
  const [tempBrands, setTempBrands] = useState(brandParams);
  const [tempPrice, setTempPrice] = useState([
    Number(searchParams.get("minPrice")) || MIN_PRICE,
    Number(searchParams.get("maxPrice")) || MAX_PRICE
  ]);

  /* LOAD BRANDS */
  useEffect(() => {
    brandApi.getAll().then((res) => setBrands(res.data));
  }, []);

  /* FETCH PRODUCTS KHI PARAMS THAY ĐỔI */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productApi.getAll({
          category,
          search,
          brands: searchParams.getAll("brands"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          sort,
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        // Tạo hiệu ứng delay nhẹ để Skeleton trông tự nhiên
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchProducts();
  }, [searchParams, sort]);
console.log(products);

  /* HANDLERS */
  const toggleBrand = (id) => {
    setTempBrands(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    const newParams = new URLSearchParams();
    if (category) newParams.set("category", category);
    if (search) newParams.set("search", search);
    if (sort) newParams.set("sort", sort);
    newParams.set("minPrice", tempPrice[0]);
    newParams.set("maxPrice", tempPrice[1]);
    tempBrands.forEach(b => newParams.append("brands", b));
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setTempBrands([]);
    setTempPrice([MIN_PRICE, MAX_PRICE]);
    setSearchParams(category ? { category } : {});
  };

  return (
    <ConfigProvider theme={{ token: { borderRadius: 12 } }}>
      <Layout style={{ background: "#f8f9fa", padding: "40px 80px" }}>
        <Row gutter={[32, 32]}>
          {/* SIDEBAR FILTER */}
          <Col xs={24} lg={6}>
            <Card 
              title={<Space><FilterOutlined /> <Text strong>BỘ LỌC TÌM KIẾM</Text></Space>}
              bordered={false}
              extra={<Button type="link" onClick={handleReset} icon={<ReloadOutlined />} size="sm">Xoá</Button>}
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.03)", position: 'sticky', top: 110 }}
            >
              {/* PRICE SLIDER */}
              <div style={{ marginBottom: 30 }}>
                <Text strong style={{ display: 'block', marginBottom: 15 }}>KHOẢNG GIÁ (VNĐ)</Text>
                <div style={{ padding: "0 10px" }}>
                  <Slider
                    range
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={STEP}
                    value={tempPrice}
                    onChange={setTempPrice}
                    trackStyle={[{ backgroundColor: '#1890ff' }]}
                    handleStyle={[{ borderColor: '#1890ff' }, { borderColor: '#1890ff' }]}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                  <Tag color="blue">{tempPrice[0].toLocaleString()}đ</Tag>
                  <Tag color="blue">{tempPrice[1].toLocaleString()}đ</Tag>
                </div>
              </div>

              <Divider style={{ margin: '20px 0' }} />

              {/* BRAND LIST */}
              <div style={{ marginBottom: 30 }}>
                <Text strong style={{ display: 'block', marginBottom: 15 }}>THƯƠNG HIỆU</Text>
                <div style={{ maxHeight: 250, overflowY: 'auto', paddingRight: 8 }}>
                  {brands.map((b) => (
                    <div key={b.id} style={{ marginBottom: 10 }}>
                      <Checkbox 
                        checked={tempBrands.includes(String(b.id))}
                        onChange={() => toggleBrand(String(b.id))}
                      >
                        {b.name}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                type="primary" 
                block 
                size="large" 
                icon={<FilterOutlined />}
                onClick={handleApply}
                style={{ height: 45, fontWeight: 600 }}
              >
                ÁP DỤNG LỌC
              </Button>
            </Card>
          </Col>

          {/* PRODUCT GRID */}
          <Col xs={24} lg={18}>
            {/* TOOLBAR */}
            <Card bordered={false} style={{ marginBottom: 24, borderRadius: 12 }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical" size={0}>
                    <Title level={4} style={{ margin: 0 }}>
                      {search ? `Kết quả cho: "${search}"` : category || "Tất cả sản phẩm"}
                    </Title>
                    <Text type="secondary">{products.length} thiết bị kỹ thuật</Text>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Text type="secondary">Sắp xếp:</Text>
                    <Select
                      value={sort}
                      onChange={(v) => setSearchParams(prev => {
                        prev.set("sort", v);
                        return prev;
                      })}
                      style={{ width: 180 }}
                      suffixIcon={<SortAscendingOutlined />}
                      options={[
                        { value: "", label: "Mặc định" },
                        { value: "asc", label: "Giá: Thấp đến Cao" },
                        { value: "desc", label: "Giá: Cao đến Thấp" },
                      ]}
                    />
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* PRODUCT LISTING */}
            {loading ? (
              <Row gutter={[20, 20]}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Col span={8} key={i}>
                    <Card bordered={false} style={{ borderRadius: 12 }}>
                      <Skeleton active aria-label="Đang tải sản phẩm" />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : products.length > 0 ? (
              <Row gutter={[20, 20]}>
                {products.map((item) => (
                  <Col xs={24} sm={12} xl={8} key={item.id}>
                    <CartProduct product={item} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Card bordered={false} style={{ textAlign: 'center', padding: '60px 0', borderRadius: 12 }}>
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description="Không tìm thấy máy móc phù hợp với bộ lọc"
                >
                  <Button icon={<ClearOutlined />} onClick={handleReset}>Xoá bộ lọc</Button>
                </Empty>
              </Card>
            )}
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
}