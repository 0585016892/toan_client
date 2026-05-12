import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

export default function QuoteRequest() {
  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({
    company_name: "",
    tax_code: "",
    email: "",
    phone: "",
    address: "",
    shipping_method: "truck",
    coupon_code: "",
  });

  const total = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const submit = async () => {
    try {
      await axiosClient.post("/quotes", {
        ...form,
        items: cartItems.map(i => ({
          product_id: i.id,
          price: i.price,
          quantity: i.quantity,
        })),
      });

      alert("Đã gửi yêu cầu báo giá 🎉");
      clearCart();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi");
    }
  };

  return (
    <Container className="py-4">
      <h4 className="mb-3">🧾 Yêu cầu báo giá</h4>

      {/* CART */}
      <Table bordered>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>SL</th>
            <th>Tạm tính</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(i => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.price.toLocaleString()} đ</td>
              <td>{i.quantity}</td>
              <td>{(i.price * i.quantity).toLocaleString()} đ</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-4">🏢 Thông tin doanh nghiệp</h5>

      <Row>
        <Col md={6}>
          <Form.Control
            placeholder="Tên công ty"
            className="mb-2"
            onChange={e => setForm({ ...form, company_name: e.target.value })}
          />
        </Col>
        <Col md={6}>
          <Form.Control
            placeholder="Mã số thuế"
            className="mb-2"
            onChange={e => setForm({ ...form, tax_code: e.target.value })}
          />
        </Col>
        <Col md={6}>
          <Form.Control
            placeholder="Email"
            className="mb-2"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </Col>
        <Col md={6}>
          <Form.Control
            placeholder="SĐT"
            className="mb-2"
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
        </Col>
        <Col md={12}>
          <Form.Control
            placeholder="Địa chỉ"
            className="mb-2"
            onChange={e => setForm({ ...form, address: e.target.value })}
          />
        </Col>
      </Row>

      <h5 className="mt-3">🚚 Vận chuyển</h5>
      <Form.Select
        onChange={e =>
          setForm({ ...form, shipping_method: e.target.value })
        }
      >
        <option value="truck">Xe tải</option>
        <option value="container">Container</option>
        <option value="crane">Cẩu</option>
      </Form.Select>

      <h5 className="mt-3">💰 Tổng tiền tham chiếu</h5>
      <h4 className="text-danger">
        {total.toLocaleString()} đ
      </h4>

      <Button size="lg" className="mt-3" onClick={submit}>
        Gửi yêu cầu báo giá
      </Button>
    </Container>
  );
}
