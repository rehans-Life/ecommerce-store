import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Sidebar from "../components/dashboard/Sidebar";
import { setShowSidebar } from "../redux/sidebarSlice";
import { setUser } from "../redux/userSlice";

const styles = {
  menuIcon: "text-3xl text-headingColor group-hover:text-textColor",
};

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/");
      return;
    }
    if (
      JSON.parse(localStorage.getItem("user")).email !==
      "rehantosif80@gmail.com"
    ) {
      router.push("/");
      return;
    }
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }, [dispatch, router]);
  return (
    <div className="bg-primary w-full justify-between flex flex-col md:flex-row items-center">
      <div className="md:hidden w-full px-2 pt-2">
        <div
          onClick={() => dispatch(setShowSidebar())}
          className=" mx-3 p-1 rounded-md border border-headingColor group hover:border-textColor w-fit cursor-pointer"
        >
          <BiMenu className={styles.menuIcon} />
        </div>
      </div>
      <Sidebar />
      <div className="md:flex-1 max-md:w-full">{children}</div>
    </div>
  );
}
