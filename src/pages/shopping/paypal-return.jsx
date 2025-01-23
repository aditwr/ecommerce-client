import { capturePayment } from "@/store/shop/OrderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import paymentLoadingImg from "@/assets/common/payment-loading.svg";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="mt-20 h-[80vh]">
      <div className="flex items-center justify-center w-full h-full">
        <div className="space-y-6">
          <Skeleton className="bg-white">
            <div className="flex justify-center w-full h-56 mx-auto">
              <img
                src={paymentLoadingImg}
                alt="payment loading image"
                className="w-auto h-full"
              />
            </div>
          </Skeleton>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              Processing Payment
              {/*loading dot animation */}
              <span className="loading-dots">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </span>
            </h3>
            <h5 className="text-xl font-medium text-center text-gray-600">
              Please wait!
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaypalReturnPage;
