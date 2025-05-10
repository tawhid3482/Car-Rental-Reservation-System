import SSLCommerzPayment from "sslcommerz-lts";
import config from ".";


const store_id = config.SSLCOMMERZ_STORE_ID as string;
const store_passwd = config.SSLCOMMERZ_STORE_PASSWORD as string;
const is_live = false; 

export const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
