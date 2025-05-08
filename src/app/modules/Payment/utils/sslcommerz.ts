import axios from "axios";
import config from "../../../config";

export const initiateSSLCommerzPayment = async (paymentData: any) => {
  const url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
  const storeId = config.SSLCOMMERZ_STORE_ID ?? "";
  const storePasswd = config.SSLCOMMERZ_STORE_PASSWORD ?? "";

  if (!storeId || !storePasswd) {
    throw new Error(
      "SSLCOMMERZ store credentials are not properly configured."
    );
  }

  const payload = new URLSearchParams();
  payload.append("store_id", storeId);
  payload.append("store_passwd", storePasswd);
  payload.append("total_amount", Number(paymentData.total_amount).toString());
  payload.append("currency", "USD");
  payload.append("tran_id", paymentData.transactionId);
  payload.append("success_url", paymentData.success_url);
  payload.append("fail_url", paymentData.fail_url);
  payload.append("cancel_url", paymentData.cancel_url);
  payload.append("emi_option", "0");
  payload.append("product_category", "service");
  payload.append("product_name", "Payment for service");
  payload.append("product_profile", "general");
  payload.append("cus_name", paymentData.name);
  payload.append("cus_email", paymentData.email);
  payload.append("cus_add1", "123 Street");
  payload.append("cus_city", "Dhaka");
  payload.append("cus_state", "Dhaka");
  payload.append("cus_postcode", "1207");
  payload.append("cus_country", "Bangladesh");
  payload.append("cus_phone", "01700000000");
  payload.append("ship_name", paymentData.name);
  payload.append("shipping_method", "nothing");
  payload.append("ship_postcode", "nothing");
  payload.append("ship_phone", "01700000000");
  payload.append("ship_state", "Dhaka");
  payload.append("ship_add1", "123 Street");
  payload.append("ship_city", "Dhaka");
  payload.append("ship_country", "Bangladesh");

  const response = await axios.post(url, payload.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};
 