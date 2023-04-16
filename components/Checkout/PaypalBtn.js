import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket, selectBasketTotal } from "../../redux/cartSlice";

export default function PaypalBtn({ createNewOrder }) {
  const refPaypalBtn = useRef();
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (refPaypalBtn.current.childElementCount === 0) {
      paypal
        .Buttons({
          style: {
            layout: "vertical",
            shape: "pill",
            label: "paypal",
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: basketTotal,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(function (orderData) {
              const transaction =
                orderData.purchase_units[0].payments.captures[0];
              dispatch(clearBasket());
              createNewOrder(transaction.id);
            });
          },
        })
        .render(refPaypalBtn.current);
    }
  }, []);
  return <div ref={refPaypalBtn}> </div>;
}
