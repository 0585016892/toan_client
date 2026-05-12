import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Layout, Menu, Input, Badge, Avatar, Dropdown, Space, 
  Typography, ConfigProvider, Button, Spin ,Divider
} from "antd";
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  SearchOutlined, 
  AppstoreOutlined, 
  LogoutOutlined,
  SettingOutlined,
  PhoneOutlined
} from "@ant-design/icons";

import categoryApi from "../api/categoryApi";
import productApi from "../api/productApi";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, loading: userLoading } = useUser();
  const searchRef = useRef(null);

const { totalQuantity } = useCart();

  /* ===== STATE ===== */
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);

  /* FETCH CATEGORIES */
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await categoryApi.getAll();
        setCategories(Array.isArray(data.data) ? data.data : []);
      } catch (err) { console.error(err); }
    };
    fetchCats();
  }, []);

  /* SEARCH LOGIC (DEBOUNCE) */
  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await productApi.search(keyword);
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (err) { console.error(err); }
      finally { setIsSearching(false); }
    }, 400);
    return () => clearTimeout(timer);
  }, [keyword]);

  // Đóng gợi ý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* RENDER MENU ITEMS */
  const categoryMenu = {
    items: categories.map(cat => ({
      key: cat.slug,
      label: <Link to={`/machines?category=${cat.slug}`}>{cat.name}</Link>,
    })),
    className: "category-dropdown-custom"
  };

  const userMenu = {
    items: [
      { key: 'profile', icon: <UserOutlined />, label: <Link to="/profile">Hồ sơ cá nhân</Link> },
      { key: 'orders', icon: <AppstoreOutlined />, label: <Link to="/my-orders">Đơn hàng của tôi</Link> },
      { divider: true, type: 'divider' },
      { 
        key: 'logout', 
        icon: <LogoutOutlined />, 
        danger: true, 
        label: 'Đăng xuất',
        onClick: () => { logout(); navigate("/login"); }
      },
    ]
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <AntHeader style={{ 
        position: 'sticky', top: 0, zIndex: 1000, width: '100%',
        background: '#fff', padding: '0 80px', height: '72px',
        lineHeight: '72px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center'
      }}>
        {/* 1. LOGO */}
        <div className="logo" style={{ marginRight: '40px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '40px', height: '40px', background: '#001529', 
              borderRadius: '8px', marginRight: '10px', display: 'flex', 
              justifyContent: 'center', alignItems: 'center' 
            }}>
              <SettingOutlined style={{ color: '#fff', fontSize: '20px' }} />
            </div>
            <Text strong style={{ fontSize: '18px', letterSpacing: '1px', color: '#001529' }}>
              INDUS<span style={{ color: '#1890ff' }}>TECH</span>
            </Text>
          </Link>
        </div>

        {/* 2. SEARCH ENGINE */}
        <div style={{ flex: 1, maxWidth: '500px', position: 'relative' }} ref={searchRef}>
          <Input
            size="large"
            placeholder="Tìm kiếm máy móc, linh kiện kỹ thuật..."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            suffix={isSearching ? <Spin size="small" /> : null}
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setShowSuggest(true); }}
            onFocus={() => setShowSuggest(true)}
            onPressEnter={() => {
              setShowSuggest(false);
              navigate(`/machines?search=${keyword}`);
            }}
            style={{ borderRadius: '20px', background: '#f5f5f5', border: 'none' }}
          />

          {/* SEARCH SUGGESTIONS PANEL */}
          {showSuggest && suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '55px', left: 0, right: 0,
              background: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              padding: '10px 0', border: '1px solid #f0f0f0', overflow: 'hidden'
            }}>
              <div style={{ padding: '5px 16px', borderBottom: '1px solid #f5f5f5' }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>KẾT QUẢ GỢI Ý</Text>
              </div>
              {suggestions.slice(0, 6).map(item => (
                <div 
                  key={item.id} 
                  className="suggest-item"
                  onClick={() => { setShowSuggest(false); navigate(`/machines/${item.slug}`); }}
                >
                  <SearchOutlined style={{ marginRight: '10px', color: '#bfbfbf' }} />
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. NAVIGATION MENU */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Space size="large">
            <Menu 
              mode="horizontal" 
              selectedKeys={[location.pathname]}
              style={{ border: 'none', minWidth: '300px', justifyContent: 'end' }}
              items={[
                { key: '/', label: <Link to="/">Trang chủ</Link> },
                { 
                  key: 'cats', 
                  label: (
                    <Dropdown menu={categoryMenu} placement="bottomRight">
                      <Space>Danh mục <AppstoreOutlined style={{ fontSize: '12px' }} /></Space>
                    </Dropdown>
                  )
                },
                { key: '/contact', label: <Link to="/contact">Liên hệ</Link> },
              ]}
            />

            <Divider type="vertical" />

            {/* CART */}
            <Link to="/cart">
              <Badge count={totalQuantity} size="small" offset={[5, 0]}>
                <Button type="text" icon={<ShoppingCartOutlined style={{ fontSize: '22px' }} />} />
              </Badge>
            </Link>

            {/* USER AREA */}
            {userLoading ? <Spin size="small" /> : !user ? (
              <Button 
                type="primary" 
                shape="round" 
                icon={<UserOutlined />} 
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </Button>
            ) : (
              <Dropdown menu={userMenu} placement="bottomRight" arrow>
                <Space style={{ cursor: 'pointer', padding: '0 8px' }}>
                  <Avatar src={user.avatar} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                  <Text strong>{user.name?.split(' ').pop()}</Text>
                </Space>
              </Dropdown>
            )}
          </Space>
        </div>

        <style>{`
          .suggest-item {
            padding: 12px 16px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
          }
          .suggest-item:hover {
            background: #e6f7ff;
            color: #1890ff;
          }
          .ant-menu-horizontal { line-height: 70px !important; }
          .category-dropdown-custom .ant-dropdown-menu {
            padding: 8px;
            min-width: 200px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.08);
          }
        `}</style>
      </AntHeader>
    </ConfigProvider>
  );
}