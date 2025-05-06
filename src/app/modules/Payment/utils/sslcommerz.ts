import axios from "axios";

export const initiateSSLCommerzPayment = async (paymentData: any) => {
  const url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
  const storeId = process.env.SSLCOMMERZ_STORE_ID;
  const storePasswd = process.env.SSLCOMMERZ_STORE_PASSWORD;

  const payload = {
    ...paymentData,
    store_id: storeId,
    store_passwd: storePasswd,
    success_url: paymentData.success_url,
    fail_url: paymentData.fail_url,
    cancel_url: paymentData.cancel_url,
    currency: "BDT",
    tran_id: paymentData.transactionId,
  };

  const response = await axios.post(url, payload);
  return response.data;
};
