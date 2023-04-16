import React from "react";

const styles = {
  orderId: "text-headingColor text-sm font-semibold",
  date: "text-3xl font-semibold md:text-[3vw] text-headingColor",
  items: "font-semibold text-sm text-textColor",
  wrapper: "space-y-10 border-b border-textColor pb-5 md:pb-10",
};

export default function OrderDetailHeader({
  orderId,
  deliveryStatus,
  numberOfItems,
  createdAt,
  amount,
}) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.orderId}>
        Order: #{orderId} -- {deliveryStatus}
      </p>
      <div className="flex flex-col md:flex-row gap-3  items-start md:items-center w-full justify-between ">
        <p className={styles.date}>
          {new Date(createdAt).toLocaleString("en-GB", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className={styles.items}>
          {numberOfItems} {numberOfItems === 1 ? "Item" : "Items"} -- {amount}{" "}
          BHD
        </p>
      </div>
    </div>
  );
}
