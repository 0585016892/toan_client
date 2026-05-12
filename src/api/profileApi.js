import axiosClient from "./axiosClient";

const customerApi = {
  /* ================== PROFILE ================== */

  // Lấy thông tin khách hàng theo ID
  getById(id) {
    return axiosClient.get(`/customers/${id}`);
    // return { id, full_name, email, phone, address, ... }
  },

  // Cập nhật hồ sơ khách hàng
  update(id, data) {
    return axiosClient.put(`/customers/${id}`, data);
    // body: { full_name, phone, address }
  },

  /* ================== PASSWORD ================== */

  // Đổi mật khẩu khách hàng
  changePassword(data) {
    return axiosClient.put(`/customers/change-password`, data);
    // body: { old_password, new_password }
  },

  /* ================== QUOTES / ORDERS ================== */

  // Lấy danh sách báo giá / đơn hàng của khách
  getQuotes(customerId) {
    return axiosClient.get(`/customers/${customerId}/quotes`);
    // return Array
  },
};

export default customerApi;
