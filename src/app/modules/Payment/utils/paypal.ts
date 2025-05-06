import axios from "axios";

export const createPayPalPayment = async (amount: number) => {
  // Get access token
  interface PayPalAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
  }

  const auth = await axios<PayPalAuthResponse>({
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    method: "post",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID!,
      password: process.env.PAYPAL_CLIENT_SECRET!,
    },
    params: {
      grant_type: "client_credentials",
    },
  });

  const accessToken = auth.data.access_token;

  // Create payment
  const payment = await axios.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toFixed(2),
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return payment.data;
};
