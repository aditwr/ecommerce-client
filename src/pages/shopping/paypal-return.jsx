import { capturePayment } from "@/store/shop/OrderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function PaypalReturnPage() {
  const params = new URLSearchParams(window.location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentId && payerId) {
      const newlyCreatedOrderID = sessionStorage.getItem("orderId");

      dispatch(
        capturePayment({ paymentId, payerId, orderId: newlyCreatedOrderID })
      ).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("orderId");
          window.location.href = "/shop/payment-success";
        }
      });
    } else {
      window.location.href = "/shop/home";
    }
  }, [paymentId, payerId, dispatch]);
  return (
    <div className="mt-20 h-[50vh]">
      <div className="flex items-center justify-center w-full h-full">
        <h1 className="text-2xl font-bold">
          Processing Payment... Please wait!
        </h1>
      </div>
    </div>
  );
}

export default PaypalReturnPage;
