import axiosClient from "./axiosClient";

const couponsApi = {
  getCoupons() {
    return axiosClient.get("/coupons");
  },
};

export default couponsApi;
