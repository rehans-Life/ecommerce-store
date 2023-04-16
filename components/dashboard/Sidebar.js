import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { BiCategoryAlt, BiHome } from "react-icons/bi";
import { CiBoxes } from "react-icons/ci";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectShowSidebar, setShowSidebar } from "../../redux/sidebarSlice";

const styles = {
  link: (currentPath, link) =>
    `${
      currentPath === link && "bg-textColor"
    } flex items-center space-x-2 hover:bg-textColor transition-all ease-in duration-200 rounded-md text-md p-2 my-2 text-slate-50`,
  linkIcon: "text-2xl",
};

const links = [
  {
    title: "Dashboard",
    link: "dashboard",
    icon: <BiHome className={styles.linkIcon} />,
  },
  {
    title: "View Orders",
    link: "viewOrders",
    icon: <CiBoxes className={styles.linkIcon} />,
  },
  {
    title: "View Products",
    link: "viewProducts",
    icon: <BiCategoryAlt className={styles.linkIcon} />,
  },
  {
    title: "Add Product",
    link: "create",
    icon: <AiOutlineFolderAdd className={styles.linkIcon} />,
  },
];

export default function Sidebar() {
  const showSidebar = useSelector(selectShowSidebar);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = router.pathname.split("/");
  const [currentPath, setCurrentPath] = useState(pathName[pathName.length - 1]);

  const Option = ({ title, link, icon }) => (
    <Link
      className={styles.link(currentPath, link)}
      onClick={() => setCurrentPath(link)}
      href={`/dashboard/${link === "dashboard" ? "" : link}`}
    >
      {icon}
      <p>{title}</p>
    </Link>
  );

  return (
    <div
      className={`w-[230px] max-md:fixed transition-all ease-in duration-200 ${
        showSidebar
          ? "max-md:translate-x-0 max-md:opacity-100"
          : "max-md:-translate-x-full max-md:opacity-0"
      } p-3 bg-headingColor md:sticky left-0 bottom-0 top-0 h-screen z-30`}
    >
      <IoCloseCircle
        className="absolute md:hidden text-slate-50 right-2 cursor-pointer top-4 text-3xl"
        onClick={() => dispatch(setShowSidebar())}
      />
      <Image
        src={"/logo.png"}
        width={1920}
        height={1080}
        alt=""
        className="h-20 w-20 object-contain"
      />
      <div>
        {links.map((option, index) => (
          <Option
            key={index}
            title={option.title}
            link={option.link}
            icon={option.icon}
          />
        ))}
      </div>
    </div>
  );
}
