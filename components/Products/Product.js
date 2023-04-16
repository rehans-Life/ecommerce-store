import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const styles = {
  wrapper: (widthFix) =>
    `lg:w-1/4 flex flex-col md:w-1/2 p-4 
      ${widthFix && "md:min-w-[400px] min-w-[250px] min-h-[350px]"} w-full
    group cursor-pointer`,
};

export default function Product({ product, widthFix }) {
  const { category, price, title, images, _id } = product;
  const color = product.color.toLowerCase();

  const [showImage, setShowImage] = useState(images.image1);
  return (
    <Link
      href={`/product/${_id}`}
      onMouseEnter={() => {
        if (images.image2) {
          setShowImage(images.image2);
        }
      }}
      onMouseLeave={() => setShowImage(images.image1)}
      className={styles.wrapper(widthFix)}
    >
      <a className="relative h-48 rounded overflow-hidden">
        <Image
          alt="ecommerce"
          className="object-contain object-center bg-[#f8f8f8] transition-all ease-in duration-200 py-2 shadow-lg group-hover:shadow-xl w-full h-full block"
          src={showImage}
          width={1920}
          height={1080}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 capitalize text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title}
        </h2>
        <div className="flex items-center space-x-1">
          <p className="capitalize">{color} :</p>
          <div
            className={`p-2 ${color == "pink" && "bg-pink-500"}  ${
              color == "blue" && "bg-blue-500"
            }  ${color == "amber" && "bg-amber-200"}  ${
              color == "black" && "bg-black"
            }  ${
              color == "white" && "bg-white"
            }  rounded-full border-black border w-fit`}
          ></div>
        </div>
        <p className="mt-1">{price} BHD</p>
      </div>
    </Link>
  );
}
