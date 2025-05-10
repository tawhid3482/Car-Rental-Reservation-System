import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  CLIENT_CANCEL_URL: process.env.CLIENT_CANCEL_URL,
  CLIENT_FAIL_URL: process.env.CLIENT_FAIL_URL,
  CLIENT_SUCCESS_REDIRECT_URL: process.env.CLIENT_SUCCESS_REDIRECT_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  SSLCOMMERZ_STORE_ID: process.env.SSLCOMMERZ_STORE_ID,
  SSLCOMMERZ_STORE_PASSWORD: process.env.SSLCOMMERZ_STORE_PASSWORD,
};
