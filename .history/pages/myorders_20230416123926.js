import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";

const styles = {
  container: "w-full",
  heading:
    "text-4xl md:text-[4vw] font-extrabold tracking-wide text-center w-full mt-12 mb-5",
  linkcell:
    "text-blue-400 underline cursor-pointer w-full flex text-center font-medium",
  table:
    "md:w-[75%] w-full h-[420px] md:p-5 p-2 flex items-center justify-center",
  cell: "text-textColor",
  amountCell: "font-semibold text-textColor",
  delivered: "text-green-400",
  notdelivered: "text-red-400",
  header: "text-base text-headingColor font-semibold",
};

const columns = [
  {
    field: "orderid",
    headerName: "Order ID",
    width: 200,
    headerClassName: styles.header,
    headerAlign: "center",
    align: "center",
    cellClassName: styles.cell,
  },
  {
    field: "orderdate",
    headerName: "Order Date",
    width: 250,
    headerAlign: "center",
    headerClassName: styles.header,

    align: "center",
    cellClassName: styles.cell,
  },
  {
    field: "orderamount",
    headerName: "Order Amount",
    width: 150,
    headerAlign: "center",
    headerClassName: styles.header,

    align: "center",
    cellClassName: styles.amountCell,
  },
  {
    field: "deliverystatus",
    headerName: "Delivery Status",
    type: "text",
    width: 150,
    headerAlign: "center",
    align: "center",
    headerClassName: styles.header,
    cellClassName: styles.cell,
  },
  {
    field: "orderdetails",
    headerName: "Order Details",
    width: 150,
    headerAlign: "center",
    headerClassName: styles.header,

    cellClassName: styles.linkcell,
    align: "center",
  },
];

export default function Myorders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        all: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const rows = data.map((order, index) => ({
          id: index,
          orderid: order.orderId,
          orderdate: new Date(order.createdAt).toUTCString(),
          orderamount: order.amount.toString() + " BHD",
          deliverystatus: order.deliveryStatus,
          orderdetails: "View Details",
        }));
        setOrders(rows);
      })
      .catch((error) => console.log(error.message));
  }, [router]);

  const handleClick = (event) => {
    if (event.currentTarget.dataset.field === "orderdetails") {
      const rowIndex = event.currentTarget.parentElement.dataset.rowindex;
      router.push(`/order?orderId=${orders[rowIndex].orderid}`);
    }
  };

  const CustomNoRowsOverlay = () => (
    <div className="flex flex-col items-center h-full px-2 justify-center space-y-5 w-full">
      <Image
        className="object-center w-36 h-36"
        src={"/emptyCart.svg"}
        width={1920}
        height={1080}
        alt=""
      />
      <p className="text-sm text-center">
        You Haven{"'"}t yet Placed Any Order yet
      </p>
    </div>
  );

  return (
    <div className={styles.container}>
      <p className={styles.heading}>My Orders</p>
      <div className="w-full flex items-center justify-center">
        <div className={styles.table}>
          <DataGrid
            rows={orders}
            columns={columns}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getCellClassName={(params) => {
              if (params.field === "deliverystatus") {
                if (params.value === "NotDelivered") {
                  return styles.notdelivered;
                } else {
                  return styles.delivered;
                }
              }
            }}
            componentsProps={{
              cell: {
                onClick: (event) => handleClick(event),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
