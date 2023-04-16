import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const styles = {
  container:
    "md:flex grid border-t border-textColor pt-7 md:pt-10 grid-cols-1 w-full justify-between py-5  items-start gap-4 md:gap-0",
  info: " text-xs lg:text-base text-textColor",
  contactBtn:
    "group md:w-[303px] relative flex w-full md:p-3 justify-center rounded-sm border border-transparent  bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in duration-100 border-0 py-2 px-3 focus:outline-none hover:shadow-md shadow-sm text-md font-medium text-white focus:outline-none whitespace-nowrap",
  returnBtn:
    "text-headingColor border border-textColor my-2 text-center p-2 md:p-3 rounded-sm hover:bg-headingColor hover:text-slate-50 transition-all ease-in duration-200",
};

export default function OderFooter({ email, name, address, phone }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className="flex  justify-between w-full items-start space-x-3 md:space-x-8 p-3">
        <div className="w-1/2">
          <p className="font-semibold text-medium py-2 text-headingColor">
            Shipping Address
          </p>
          <p className={styles.info}>{name}</p>
          <p className={styles.info}>
            {address.address1} {address.address2},
          </p>
          <p className={styles.info}>
            {address.city} {address.state},
          </p>
          <p className={styles.info}>{address.pincode}</p>
        </div>
        <div className="w-1/2">
          {" "}
          <p className="font-semibold text-medium py-2 text-headingColor">
            User Information
          </p>
          <p className={styles.info}>{name}</p>
          <p className={styles.info}>{email},</p>
          <p className={styles.info}>{phone}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 m-1">
        <Link href={"/contact"} className={styles.contactBtn}>
          Contact Us
        </Link>
        <button onClick={() => router.back()} className={styles.returnBtn}>
          Return
        </button>
        <p className="text-textColor text-center text-xs">
          *You can Email us your Order Id to get more information on your Order
        </p>
      </div>
    </div>
  );
}
