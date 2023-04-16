import React from "react";
import { useSelector } from "react-redux";
import { selectBasket, selectBasketTotal } from "../../redux/cartSlice";
import CartProduct from "../Sidebar/CartProduct";

const styles = {
  container:
    " md:w-[45vw] w-full flex px-3 pb-5 items-center h-full md:pt-12 justify-center",
  card: "bg-cartTotal w-full rounded-[28px] py-4 px-5 md:mr-5",
  amount:
    "flex items-center justify-between flex-1 mb-2 text-gray-400 text-lg px-2",
  payBtn:
    "block text-center w-full rounded-3xl mt-5 font-semibold bg-gradient-to-tr from-orange-400 to-orange-600  text-gray-50 p-2 text-lg hover:shadow-lg",
};

const Amount = ({ title, amount }) => (
  <div className={styles.amount}>
    <p>{title}</p>
    <p>{amount} BHD</p>
  </div>
);

export default function CheckoutCard({ initiatePayment }) {
  const basketTotal = useSelector(selectBasketTotal);
  const amounts = [
    {
      title: "Sub Total",
      amount: basketTotal,
    },
    {
      title: "Delivery",
      amount: 5.0,
    },
  ];
  const basket = useSelector(selectBasket);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className="overflow-y-scroll scrollbar-hide h-[300px] mb-2">
          {basket?.map((item, index) => (
            <CartProduct key={index} item={item} />
          ))}
        </div>
        {amounts.map((amount, index) => (
          <Amount key={index} title={amount.title} amount={amount.amount} />
        ))}
        <div className="w-full h-[1px] bg-slate-50 my-5"></div>
        <div className="flex w-full items-center justify-between text-slate-50 text-xl font-bold mb-2 px-3">
          <p>Total</p>
          <p>{basketTotal + 0.5} BHD</p>
        </div>
        <button onClick={initiatePayment} className={styles.payBtn}>
          PAY
        </button>
      </div>
    </div>
  );
}
