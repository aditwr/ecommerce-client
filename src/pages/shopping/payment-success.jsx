import paymentSuccessImg from "@/assets/common/payment-success.svg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 h-[80vh]">
      <div className="flex items-center justify-center w-full h-full">
        <div className="space-y-6">
          <div className="flex justify-center w-full h-56 mx-auto">
            <img
              src={paymentSuccessImg}
              alt="payment loading image"
              className="w-auto h-full"
            />
          </div>
          <div className="">
            <h3 className="mb-3 text-2xl font-bold text-center">
              Payment Success
            </h3>
            <p className="text-sm text-gray-500">
              Payment process is successful. You can now continue shopping or
              check your order details.
            </p>
            <div className="flex justify-center mt-6 gap-x-4">
              <Button
                onClick={() => navigate("/shop/account")}
                variant="outline"
              >
                View Order Details
              </Button>
              <Button
                onClick={() => navigate("/shop/listing")}
                variant="outline"
                className="flex gap-x-2"
              >
                Continue Shopping
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
