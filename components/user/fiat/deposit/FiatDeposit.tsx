// import BankDeposit from "components/deposit/bank-deposit";
import WalletDeposit from "components/deposit/wallet-deposit";
import StripeDeposit from "components/deposit/stripe-deposit";
import {
  BANK_DEPOSIT,
  FAQ_TYPE_DEPOSIT,
  PAYPAL,
  STRIPE,
  WALLET_DEPOSIT,
  PAYSTACK,
} from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { currencyDeposit } from "service/deposit";
import SelectDeposit from "components/deposit/selectDeposit";
import DepositFaq from "components/deposit/DepositFaq";
import PaypalSection from "components/deposit/PaypalSection";
import SectionLoading from "components/common/SectionLoading";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { getFaqList } from "service/faq";
import { GetServerSideProps } from "next";
import {
  pageAvailabilityCheck,
  SSRAuthCheck,
} from "middlewares/ssr-authentication-check";
import { parseCookies } from "nookies";
import Footer from "components/common/footer";
import FiatSidebar from "layout/fiat-sidebar";
import Paystack from "components/deposit/paystack";
import BankDeposit from "components/user/fiat/deposit/BankDeposit";
import { getFiatDepositDataApi } from "service/fiat-wallet";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import SelectFiatDepositMethod from "components/deposit/SelectFiatDepositMethod";
import FiatPaypalSection from "components/deposit/FiatPaypalSection";
import FiatStripeDeposit from "components/deposit/FiatStripeDeposit";
import FiatPaystack from "components/deposit/FiatPaystack";

const FiatDeposit = ({ currency_type }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const { settings } = useSelector((state: RootState) => state.common);
  const [methods, setMethods] = useState<any>();
  const [banks, setBanks] = useState<any>([]);

  const [selectedMethods, setSelectedMethods] = useState<any>({
    method: null,
    method_id: null,
  });

  useEffect(() => {
    getFiatDepositData();
  }, []);
  const getFiatDepositData = async () => {
    setLoading(true);

    const data = await getFiatDepositDataApi();

    if (!data.success) {
      toast.error(data.message);
      router.push(`/user/my-wallet`);
      setLoading(false);

      return;
    }
    setBanks(data.data.banks);
    setMethods(data.data.payment_methods);
    setSelectedMethods({
      method:
        data?.data?.payment_methods[0] &&
        data?.data?.payment_methods[0].payment_method,
      method_id:
        data?.data?.payment_methods[0] && data?.data?.payment_methods[0].id,
    });
    setLoading(false);
  };
  return (
    <>
      <div className="page-wrap">
        {/* <FiatSidebar /> */}
        <div className="page-main-content">
          <div className="container">
            <div className="deposit-page">
              <div className="section-top-wrap mb-25">
                <div className="profle-are-top">
                  <h2 className="section-top-title">{t("Fiat Deposit")}</h2>
                </div>
              </div>

              <div className="asset-balances-area">
                <div className=" bank-section">
                  <div className="">
                    <div className="deposit-conatiner">
                      <div className="cp-user-title">
                        <h4>{t("Select method")}</h4>
                      </div>

                      <SelectFiatDepositMethod
                        setSelectedMethods={setSelectedMethods}
                        methods={methods}
                        selectedMethods={selectedMethods}
                      />
                      <div className="row">
                        {loading ? (
                          <SectionLoading />
                        ) : (
                          <div className={`col-lg-12 col-sm-12`}>
                            {!loading && !selectedMethods.method ? (
                              <div className="cp-user-title text-center  p-5">
                                <h4>{t("No Avaiable payment method")}</h4>
                              </div>
                            ) : (
                              ""
                            )}
                            {parseInt(selectedMethods.method) ===
                              BANK_DEPOSIT && (
                              <BankDeposit
                                method_id={selectedMethods.method_id}
                                banks={banks}
                                currency_type={currency_type}
                              />
                            )}

                            {parseInt(selectedMethods.method) === STRIPE && (
                              <FiatStripeDeposit
                                method_id={selectedMethods.method_id}
                                banks={banks}
                                currency_type={currency_type}
                              />
                            )}

                            {parseInt(selectedMethods.method) === PAYPAL && (
                              <FiatPaypalSection
                                method_id={selectedMethods.method_id}
                                banks={banks}
                                currency_type={currency_type}
                              />
                            )}

                            {parseInt(selectedMethods.method) === PAYSTACK && (
                              <FiatPaystack
                                method_id={selectedMethods.method_id}
                                currency_type={currency_type}
                              />
                            )}

                            {/* {parseInt(selectedMethods.method) ===
                              BANK_DEPOSIT ? (
                              <BankDeposit
                                method_id={selectedMethods.method_id}
                                banks={banks}
                              />
                            ) : parseInt(selectedMethods.method) === STRIPE ? (
                              <StripeDeposit
                                currencyList={depositInfo.currency_list}
                                walletlist={depositInfo.wallet_list}
                                method_id={selectedMethods.method_id}
                                banks={depositInfo.banks}
                              />
                            ) : parseInt(selectedMethods.method) === PAYSTACK ? (
                              <Paystack
                                walletlist={depositInfo.wallet_list}
                                method_id={selectedMethods.method_id}
                              />
                            ) : parseInt(selectedMethods.method) === PAYPAL ? (
                              <PaypalSection
                                currencyList={depositInfo.currency_list}
                                walletlist={depositInfo.wallet_list}
                                method_id={selectedMethods.method_id}
                                banks={depositInfo.banks}
                              />
                            ) : (
                              ""
                            )} */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default FiatDeposit;
