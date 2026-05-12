
import axiosClient from "./axiosClient";

const orderApi = {
createQuote(data) {
  return axiosClient.post("/orders/quotes", data);
}
};

export default orderApi;
