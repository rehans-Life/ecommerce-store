import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../redux/cartSlice";

const styles = {
  container: (white) =>
    `${
      white
        ? "shadow-sm backdrop-blur-lg bg-card hover:shadow-md"
        : "bg-cartItem"
    } transition-all ease-in duation-200 w-full my-2 flex items-center p-3 justify-between rounded-md`,
  productInfo: (white) =>
    `flex items-center space-x-2 ${
      white ? "text-headingColor" : "text-white"
    } ${white ? "text-md font-semibold" : "text-sm"}`,
  quantityContainer: `flex  items-center space-x-3 `,
  quantity: `p-1 w-5 
    text-white
     flex items-center justify-center h-5 rounded-full bg-cartBg text-xs`,
  icon: (white) =>
    `text-lg cursor-pointer ${white ? "text-headingColor" : "text-white"}`,
};

export default function CartProduct({ item, white }) {
  const { title, price, id, images, quantity } = item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addToBasket({ id }));
  };

  const removeFromCart = () => {
    dispatch(removeFromBasket(id));
  };

  return (
    <div className={styles.container(white)}>
      <div className={styles.productInfo(white)}>
        <Image
          width={1920}
          height={1080}
          src={Object.values(images)[0]}
          alt=""
          className={`${
            white ? "h-16 w-16" : "h-14 w-14"
          } rounded-md object-contain`}
        />
        <div className="space-y-1">
          <p>{title}</p>
          <p className="text-xs">{price} BHD</p>
        </div>
      </div>
      <div className={styles.quantityContainer}>
        <span onClick={removeFromCart} className={styles.icon(white)}>
          -
        </span>
        <span className={styles.quantity}>{quantity}</span>
        <span onClick={addToCart} className={styles.icon(white)}>
          +
        </span>
      </div>
    </div>
  );
}
