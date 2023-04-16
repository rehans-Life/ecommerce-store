import React, { useState } from "react";
import UpdateStatus from "../../components/dashboard/UpdateStatus";
import ViewOrdersTable from "../../components/dashboard/ViewOrdersTable";
const styles = {
  heading:
    "text-4xl md:text-[4vw] font-extrabold tracking-wide text-center w-full mt-12 mb-5",
};

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getOrders`,
    {
      method: "POST",
      body: JSON.stringify({ all: true }),
    }
  );
  const data = await response.json();
  const orders = data.map((doc, index) => ({
    id: index,
    orderid: doc.orderId,
    orderdate: new Date(doc.createdAt).toUTCString(),
    email: doc.email,
    orderamount: doc.amount.toString() + " BHD",
    payementstatus: doc.paymentStatus,
    deliverystatus: doc.deliveryStatus,
    orderdetails: "View Details",
  }));
  return {
    props: {
      orders,
    },
  };
};

export default function ViewOrders({ orders }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  return (
    <div className={styles.container}>
      <p className={styles.heading}>All Orders</p>
      <div className="">
        <UpdateStatus
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedOrderId={selectedOrderId}
        />
        <ViewOrdersTable
          orders={orders}
          setSelectedOrderId={setSelectedOrderId}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}
