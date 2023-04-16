import React from "react";
import { MdArrowBack, MdClearAll } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectShowSidebar, setShowSidebar } from "../redux/sidebarSlice";
import CartProduct from "./Sidebar/CartProduct";
import { clearBasket, selectBasket } from "../redux/cartSlice";
import Image from "next/image";
import Subtotal from "./Sidebar/Subtotal";
const styles = {
  container: (showSidebar) =>
    `fixed bottom-0 ${
      showSidebar
        ? "translate-x-0 opacity-1"
        : "translate-x-full transtion-all ease-in duration-200 opacity-0"
    } top-0 right-0 w-full md:w-[360px] bg-gray-50 z-20  shadow-lg transition-all ease-in duration-200 z-16`,
  clear:
    "mx-1 px-2 py-1 flex items-center text-slate-50 bg-headingColor space-x-1 rounded-md",
  wrapper:
    "bg-cartBg h-full pb-4 mt-5 justify-between rounded-t-[30px] pt-5 w-full flex flex-col justify-center",
};

export default function Sidebar() {
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  const showSidebar = useSelector(selectShowSidebar);

  const SidebarHeader = () => (
    <div className="flex p-3 items-center justify-between">
      <MdArrowBack
        className="text-3xl cursor-pointer"
        onClick={() => dispatch(setShowSidebar())}
      />{" "}
      <p className="font-semibold text-xl">Cart</p>
      <button className={styles.clear} onClick={() => dispatch(clearBasket())}>
        <MdClearAll />
        <p>Clear</p>
      </button>
    </div>
  );

  return (
    <div className={styles.container(showSidebar)}>
      <SidebarHeader />
      {basket.length ? (
        <div className={styles.wrapper}>
          <div className="pt-4 px-5 overflow-y-scroll pb-16  scrollbar-hide">
            {basket?.map((item, index) => (
              <CartProduct key={index} item={item} />
            ))}
          </div>
          <Subtotal />
        </div>
      ) : (
        <div className="flex flex-col items-center px-2 justify-center space-y-5 w-full pt-16">
          <Image
            className="h-64 w-64 object-contain"
            src={"/emptyCart.svg"}
            width={1920}
            height={1080}
            alt=""
          />
          <p className="text-xl text-center">
            Your Cart Is Empty. Go Ahead Add Some Items To your Cart.
          </p>
        </div>
      )}
    </div>
  );
}
