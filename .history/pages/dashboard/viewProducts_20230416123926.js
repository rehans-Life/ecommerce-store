import React from "react";
import ViewProductsTable from "../../components/dashboard/ViewProductsTable";

const styles = {
  heading:
    "text-4xl md:text-[4vw] font-extrabold tracking-wide text-center w-full mt-12 mb-5",
  linkcell:
    "text-blue-400 underline cursor-pointer w-full flex text-center font-medium",
  table: "w-[95%] h-[430px] md:p-5 p-2 flex items-center justify-center",
  cell: "text-textColor whitespace-wrap",
  amountCell: "font-semibold text-textColor",
  header: "text-base text-headingColor font-semibold",
  updatecell:
    "text-green-500 underline cursor-pointer w-full flex text-center font-medium",
};

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getProducts`,
    {
      method: "POST",
      body: JSON.stringify({ category: "All Categories" }),
    }
  );
  const data = await response.json();
  const products = data.map((product) => ({
    id: product._id,
    title: product.title,
    availableQty: product.availableQty,
    price: product.price.toString() + " BHD",
    color: product.color,
    size: product.size,
    category: product.category,
    productdetails: "View Details",
    updatedetails: "Update Details",
  }));
  return {
    props: {
      products: products,
    },
  };
};

export default function ViewProducts({ products }) {
  return (
    <div>
      <p className={styles.heading}>View Products</p>
      <div className="w-full flex justify-center">
        <ViewProductsTable products={products} />
      </div>
    </div>
  );
}
