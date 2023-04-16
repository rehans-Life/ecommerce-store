import { useRouter } from "next/router";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
const styles = {
  heading:
    "text-4xl md:text-[4vw] font-extrabold tracking-wide text-center w-full mt-12 mb-5",
  linkcell:
    "text-blue-400 underline cursor-pointer w-full flex text-center font-medium",
  table: "w-full h-[420px] md:p-5 p-2 flex items-center justify-center",
  cell: "text-textColor",
  amountCell: "font-semibold text-textColor",
  delivered: "text-green-400 cursor-pointer",
  notdelivered: "text-red-400 cursor-pointer",
  paid: "text-green-400",
  unpaid: "text-red-400 ",
  header: "text-base text-headingColor font-semibold",
};
const columns = [
  {
    field: "orderid",
    headerName: "Order ID",
    width: 190,
    headerAlign: "center",
    headerClassName: styles.header,
    align: "center",
    cellClassName: styles.cell,
  },
  {
    field: "orderdate",
    headerName: "Order Date",
    width: 250,
    headerClassName: styles.header,
    headerAlign: "center",
    cellClassName: styles.cell,
    align: "center",
  },
  {
    field: "email",
    headerName: "Email",
    width: 210,
    headerClassName: styles.header,
    headerAlign: "center",
    align: "center",
    cellClassName: styles.cell,
  },
  {
    field: "orderamount",
    headerName: "Order Amount",
    width: 150,
    headerAlign: "center",
    align: "center",
    headerClassName: styles.header,
    cellClassName: styles.amountCell,
  },
  {
    field: "payementstatus",
    headerClassName: styles.header,
    headerName: "Payment Status",
    type: "text",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "deliverystatus",
    headerName: "Delivery Status",
    type: "text",
    width: 150,
    headerAlign: "center",
    align: "center",
    headerClassName: styles.header,
  },
  {
    field: "orderdetails",
    headerName: "Order Details",
    width: 150,
    headerAlign: "center",
    align: "center",
    headerClassName: styles.header,
    cellClassName: styles.linkcell,
  },
];

export default function ViewOrdersTable({
  orders,
  setSelectedOrderId,
  setIsOpen,
}) {
  const router = useRouter();
  const handleClick = (event) => {
    if (event.currentTarget.dataset.field === "orderdetails") {
      const rowIndex = event.currentTarget.parentElement.dataset.rowindex;
      router.push(`/order?orderId=${orders[rowIndex].orderid}`);
    } else if (event.currentTarget.dataset.field === "deliverystatus") {
      const rowIndex = event.currentTarget.parentElement.dataset.rowindex;
      setSelectedOrderId(orders[rowIndex].orderid);
      setIsOpen(true);
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
      <p className="text-sm text-center">You Haven{"'"}t got any orders yet</p>
    </div>
  );
  return (
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
          } else if (params.field === "payementstatus") {
            if (params.value === "Paid") {
              return styles.paid;
            } else {
              return styles.unpaid;
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
  );
}
