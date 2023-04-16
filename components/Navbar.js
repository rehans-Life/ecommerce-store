import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { motion } from "framer-motion";
import { IoMdBasket } from "react-icons/io";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setShowSidebar } from "../redux/sidebarSlice";
import { removeUser, selectUser } from "../redux/userSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const styles = {
  logo: "flex items-center md:ml-0 -ml-4",
  logoText: "font-bold text-headingColor -ml-4 text-xl md:text-2xl",
  link: "capitalize whitespace-nowrap text-textColor font-medium text-[17px] hover:text-headingColor transition-all ease-in duration-100",
  options: "flex space-x-5",
  bigWrapper: "md:flex hidden px-2 items-center justify-between ",
  icon: "text-[32px] text-textColor hover:text-headingColor cursor-pointer  transition-all md:w-14 ease-in duration-100",
  smallWrapper: "flex items-center justify-between px-4  md:hidden relative",
  dropdown:
    "shadow-lg w-44 bg-gray-50 rounded-lg md:hidden top-[50px] absolute right-12 z-20",
  dropdownLink:
    "text-lg font-medium py-2 w-30 px-3 hover:shadow-md text-left text-headingColor rounded-lg hover:bg-slate-200 transition-all ease-in duration-100 font-medium",
  logout:
    "m-2 space-x-3 text-lg font-medium py-2 px-3 flex items-center shadow-md justify-center text-headingColor rounded-lg bg-slate-200 hover:bg-slate-300 transition-all ease-in duration-100 cursor-pointer",
  logoutIcon: "text-2xl",
  linkIcon: "group-hover:animate-bounce text-lg text-textColor",
  logInButton:
    "p-2  m-2 rounded-md bg-headingColor text-slate-50 shadow-md hover:shadow-lg transtion-all ease-in duration-200",
  dropdown2:
    "shadow-lg w-44 bg-gray-50 rounded-lg md:flex flex-col hidden top-[50px] absolute right-12 z-20",
};

const options = [
  { title: "Home", link: "" },
  { title: "About Us", link: "about" },
  { title: "Contact Us", link: "contact" },
];

const options1 = [
  { title: "My Account", link: "myaccount" },
  { title: "My Orders", link: "myorders" },
  { title: "My Wishlist", link: "wishlist" },
];

const Option = ({ title, link }) => (
  <Link href={`/${link}`}>
    <p className={styles.link}>{title}</p>
  </Link>
);

const DropdownOption = ({ title, link }) => (
  <Link href={`/${link}`}>
    <p className={styles.dropdownLink}>{title}</p>
  </Link>
);

export default function Navbar() {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const getCategories = async () => {
      const colRef = collection(db, "categories");
      const snap = await getDocs(colRef);
      const categories = [];
      snap.forEach((doc) => {
        categories.push(doc.data().name);
      });
      setCategories(categories);
    };
    getCategories();
  }, []);

  return (
    <div className="">
      {/* Big Screen */}
      <div className={styles.bigWrapper}>
        <Link href={"/"} className={styles.logo}>
          <Image src={"/logo.png"} width={90} height={90} alt="" />
          <p className={styles.logoText}>Beechwood Baby</p>
        </Link>
        <div className="flex items-center space-x-5">
          <Dropdown categories={categories} />
          <div className={styles.options}>
            {options.map((option, index) => (
              <Option key={index} title={option.title} link={option.link} />
            ))}
          </div>
          <IoMdBasket
            className={styles.icon}
            onClick={() => dispatch(setShowSidebar())}
          />
          {user ? (
            <motion.img
              onMouseEnter={() => setShowOptions(true)}
              onMouseLeave={() => setShowOptions(false)}
              onClick={() => setShowOptions(!showOptions)}
              whileTap={{ scale: 0.6 }}
              src={"/avatar.png"}
              alt=""
              className="w-10 h-10 cursor-pointer"
            />
          ) : (
            <Link href={"/login"} className={styles.logInButton}>
              LogIn
            </Link>
          )}
        </div>
        {user && showOptions && (
          <motion.div
            onMouseEnter={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.dropdown2}
          >
            {options1.map((option, index) => (
              <DropdownOption
                key={index}
                title={option.title}
                link={option.link}
              />
            ))}
            {user.email === "rehantosif80@gmail.com" && (
              <DropdownOption title="Dashboard" link="/dashboard" />
            )}
            <div
              onClick={() => dispatch(removeUser())}
              className={styles.logout}
            >
              <p>Log Out</p>
              <TbLogout className={styles.logoutIcon} />
            </div>
          </motion.div>
        )}
      </div>
      {/* Small Screen */}
      <div className={styles.smallWrapper}>
        <IoMdBasket
          className={styles.icon}
          onClick={() => dispatch(setShowSidebar())}
        />
        <Link href={"/"} className={styles.logo}>
          <Image src={"/logo.png"} width={80} height={80} alt="" />
          <p className={styles.logoText}>Beechwood Baby</p>
        </Link>
        {user ? (
          <motion.img
            onClick={() => setShowOptions(!showOptions)}
            whileTap={{ scale: 0.6 }}
            src={"/avatar.png"}
            alt=""
            className="w-10 h-10 cursor-pointer"
          />
        ) : (
          <Link href={"/login"} className={styles.logInButton}>
            LogIn
          </Link>
        )}
      </div>
      <div className="flex items-center w-full justify-center gap-6 mt-1 md:hidden ">
        <Dropdown categories={categories} style />
      </div>
      {user && showOptions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.dropdown}
        >
          {options.map((option, index) => (
            <DropdownOption
              key={index}
              title={option.title}
              link={option.link}
            />
          ))}
          {options1.map((option, index) => (
            <DropdownOption
              key={index}
              title={option.title}
              link={option.link}
            />
          ))}
          {user.email === "rehantosif80@gmail.com" && (
            <DropdownOption title="Dashboard" link="/dashboard" />
          )}
          <div onClick={() => dispatch(removeUser())} className={styles.logout}>
            <p>Log Out</p>
            <TbLogout className={styles.logoutIcon} />
          </div>
        </motion.div>
      )}
      <Sidebar />
    </div>
  );
}
