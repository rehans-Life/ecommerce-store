import Image from "next/image";
import React from "react";

const styles = {
  productImage: "md:w-32 sm:h-14 w-14 md:h-32 rounded-md",
  wrapper:
    "flex items-start py-5 w-full text-headingColor justify-between h-fit",
};

export default function OrderedProduct({ item }) {
  const { title, quantity, color, size, price, images } = item;
  return (
    <div className={styles.wrapper}>
      <div className="flex items-center">
        <Image
          alt=""
          src={images[0].image1}
          width={1920}
          height={1080}
          className={styles.productImage}
        />
        <div className="ml-2 md:ml-6">
          <p className="font-semibold text-base md:text-2xl">{title}</p>
          <p className="py-1 md:pt-2 text-textColor text-xs md:text-base">
            Quantity: {quantity}
          </p>
          <div className="flex md:mt-3 items-center md:space-x-10 space-x-5">
            <div className="flex items-center">
              <p className="text-texxtColor mr-2 text-xs md:text-base ">
                Color :{" "}
              </p>
              <p className="capitalize mr-1 text-textColor text-xs md:text-base">
                {color} -{" "}
              </p>
              <div
                className={`p-1 md:p-2 ${color == "pink" && "bg-pink-500"}  ${
                  color == "blue" && "bg-blue-500"
                }  ${color == "amber" && "bg-amber-200"}  ${
                  color == "black" && "bg-black"
                }  ${
                  color == "white" && "bg-white"
                }  rounded-full border-headingColor w-4 h-4  border`}
              ></div>
            </div>
            <div className="flex items-center space-x-2 text-textColor text-xs md:text-base">
              <p>Size -</p>
              <span className="p-0.5 text-xs md:text-sm flex justify-center items-center border border-headingColor">
                {size.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-y-1 md:py-1  flex-col items-center justify-between">
        <p className="font-semibold text-base md:text-2xl ">Total </p>
        <p className="text-xs md:text-md">
          {price} x {quantity} =
        </p>
        <p className="md:text-lg text-xs md:font-semibold font-md">
          {price * quantity} BHD
        </p>
      </div>
    </div>
  );
}
