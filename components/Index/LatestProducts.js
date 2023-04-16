import React, { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Product from "../Products/Product";
import { motion } from "framer-motion";

const styles = {
  container: "py-12 px-10 md:pl-20 w-full relative",
  heading: "w-full text-left font-semibold text-3xl",
  wrapper:
    "py-6 flex items-center justify-start w-full overflow-x-scroll scroll-smooth scrollbar-hide",
  icon: "bg-headingColor text-slate-50 text-xl cursor-pointer rounded-md p-2",
};

export default function LatestProducts({ latestProducts }) {
  const [scrollValue, setScroll] = useState(0);
  const carouselRef = useRef();
  useEffect(() => {
    carouselRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  return (
    <div className={styles.container}>
      <div className="flex items-center justify-between">
        <p className={styles.heading}>Our Latest Products</p>
        <div className="hidden md:flex gap-3 items-center">
          <motion.div
            onClick={() => {
              const scrollValue = -740;
              setScroll(scrollValue);
            }}
            whileTap={{ scale: 0.75 }}
            className={styles.icon}
          >
            <MdChevronLeft />
          </motion.div>
          <motion.div
            onClick={() => {
              const scrollValue = 740;
              setScroll(scrollValue);
            }}
            whileTap={{ scale: 0.75 }}
            className={styles.icon}
          >
            <MdChevronRight />
          </motion.div>
        </div>
      </div>
      <div ref={carouselRef} className={styles.wrapper}>
        {latestProducts.map((product, index) => (
          <Product key={index} product={product} widthFix />
        ))}
      </div>
    </div>
  );
}
