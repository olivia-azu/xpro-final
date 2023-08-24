import React from "react";

const SelectFiatDepositMethod = ({
  setSelectedMethods,
  methods,
  selectedMethods,
}: any) => {
  return (
    <div className="select-method">
      {methods?.map((payment: any, index: number) => (
        <div
          className={
            selectedMethods.method === payment.payment_method
              ? "select-method-item-active mr-0 mr-md-3"
              : "select-method-item mr-0 mr-md-3"
          }
          key={index}
          onClick={() => {
            setSelectedMethods({
              method: payment.payment_method,
              method_id: methods?.find(
                (info: any) =>
                  parseInt(info.payment_method) ===
                  parseInt(payment.payment_method)
              ).id,
            });
          }}
        >
          {payment.title}
        </div>
      ))}
    </div>
  );
};

export default SelectFiatDepositMethod;
