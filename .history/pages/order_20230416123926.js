import React from "react";
import OderFooter from "../components/Order/OderFooter";
import OrderDetailHeader from "../components/Order/OrderDetailHeader";
import OrderedProduct from "../components/Order/OrderedProduct";

export const getServerSideProps = async (context) => {
  const orderId = context.query.orderId;
  console.log(orderId);
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrder`, {
    method: "POST",
    body: JSON.stringify({ orderId }),
  });
  const orderDetails = await response.json();
  return {
    props: { orderDetails: JSON.parse(JSON.stringify(orderDetails)) },
  };
};

const styles = {
  container: "flex items-center justify-center w-full md:p-10 px-5 py-10",
  wrapper: "bg-card rounded-xl text-gray-50 md:p-7  p-4 w-full shadow-lg",
};

export default function order({ orderDetails }) {
  const {
    orderId,
    email,
    products,
    address,
    name,
    phone,
    createdAt,
    deliveryStatus,
    amount,
  } = orderDetails;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <OrderDetailHeader
          orderId={orderId}
          createdAt={createdAt}
          numberOfItems={products.length}
          amount={amount}
          deliveryStatus={deliveryStatus}
        />
        <div className="py-5 md:py-5">
          {products.map((item, index) => (
            <OrderedProduct key={index} item={item} />
          ))}
        </div>
        <OderFooter address={address} phone={phone} email={email} name={name} />
      </div>
    </div>
  );
}
