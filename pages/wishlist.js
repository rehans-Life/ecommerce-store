import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Products/Product";
import { selectWishlistItems } from "../redux/wishlistSlice";

const styles = {
  heading:
    "text-4xl md:text-[4vw] font-extrabold tracking-wide text-center w-full mt-12 mb-5 text-headingColor",
};

export default function Wishlist() {
  const wishlistItems = useSelector(selectWishlistItems);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) router.push("/");
  }, [router]);

  return (
    <section className="text-gray-600 body-font py-10">
      <p className={styles.heading}>My Wishlist</p>
      <div className="container px-5 mx-auto py-10">
        <div className="flex flex-wrap -m-4">
          {wishlistItems.length ? (
            wishlistItems.map((product, index) => (
              <Product key={index} product={product} />
            ))
          ) : (
            <div className="flex flex-col items-center p-2 justify-center space-y-5 w-full pt-5">
              <Image
                className="h-64 w-64 object-contain"
                src={"/emptyCart.svg"}
                width={1920}
                height={1080}
                alt=""
              />
              <p className="text-xl text-center">
                You have No Items in your Wishlist Right Now go Ahead and add
                Some
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
