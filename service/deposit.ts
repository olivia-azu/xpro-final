import request from "lib/request";

export const currencyDeposit = async () => {
  const { data } = await request.get("/currency-deposit");
  return data;
};

export const getCurrencyDepositRate = async (credential: any) => {
  const { data } = await request.post("/get-currency-deposit-rate", credential);
  return data;
};
export const VerificationPaystackPayment = async (reference: any) => {
  const { data } = await request.post("/verification-paystack-payment", {
    reference: reference,
  });
  return data;
};
export const GetPaystackPaymentUrl = async (email: any, amount: any,wallet_id:any, crypto_type: any, currency: any) => {
  const { data } = await request.post("/get-paystack-payment-url", {
    email: email,
    amount: amount,
    wallet_id: wallet_id,
    crypto_type: crypto_type,
    currency: currency
  });
  return data;
};
export const currencyDepositProcess = async (credential: any) => {
  const { data } = await request.post("/currency-deposit-process", credential);
  return data;
};

export const apiFiatWithdrawal = async () => {
  const { data } = await request.get("/fiat-withdrawal");
  return data;
};
export const getFiatWithdrawalRate = async (payload: any) => {
  const { data } = await request.post("/get-fiat-withdrawal-rate", payload);
  return data;
};

export const addEditBankDetails = async (payload: any) => {
  const { data } = await request.post("user-bank-save", payload);
  return data;
};

export const getBankList = async () => {
  const { data } = await request.get("/user-bank-list");
  return data;
};
export const deleteBank = async (id: any) => {
  const { data } = await request.post("/user-bank-delete", { id });
  return data;
};
export const fiatWithdrawProcess = async (payload: any) => {
  const { data } = await request.post("/fiat-withdrawal-process", payload);
  return data;
};
export const getBankListSSr = async (id: any, ctxCookie: any) => {
  const { data } = await request.get("/user-bank-list?id=" + id, {
    headers: {
      Authorization: `Bearer ${ctxCookie}`,
    },
  });
  return data;
};
