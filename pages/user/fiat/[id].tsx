import { NoItemFound } from "components/NoItemFound/NoItemFound";
import SectionLoading from "components/common/SectionLoading";
import FiatDeposit from "components/user/fiat/deposit/FiatDeposit";
import FiatWithdraw from "components/user/fiat/deposit/FiatWithdraw";
import {
  SSRAuthCheck,
  pageAvailabilityCheck,
} from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

export default function Index() {
  const [fiatType, setfiatType] = useState<any>("");
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    if (!router?.query?.type) {
      router.push("/user/my-wallet");
      return;
    }
    setfiatType(router?.query?.type);
  }, [router.isReady]);

  if (fiatType === "") return <SectionLoading />;
  else if (fiatType === "deposit") return <FiatDeposit currency_type={router?.query?.currency}/>;
  else if (fiatType === "withdraw") return <FiatWithdraw currency_type={router?.query?.currency}/>;
  else return <NoItemFound />;
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/profile");
  const cookies = parseCookies(ctx);
  const commonRes = await pageAvailabilityCheck();

  if (parseInt(commonRes.currency_deposit_status) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
