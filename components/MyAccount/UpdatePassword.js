import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectUser } from "../../redux/userSlice";
import Loading from "../Create/Loading";
const styles = {
  updatePassform: "flex flex-col md:grid md:grid-cols-2 md:gap-x-7  w-full",
};

export default function UpdatePassword({
  newPassword,
  confirmNewPassword,
  handleChange,
}) {
  const user = useSelector(selectUser);
  const [submitting, setSubmitting] = useState(false);
  const updatePassword = (e) => {
    setSubmitting(true);
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          password: newPassword,
          updatePassword: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error(data.message, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          toast.error("An Error Occured Please Try Again", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      toast.error("Passwords Do Not Match", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    handleChange({ target: { name: "newPassword", value: "" } });
    handleChange({ target: { name: "confirmNewPassword", value: "" } });
    setSubmitting(false);
  };
  return (
    <form onSubmit={updatePassword} className="mt-6">
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <p className="font-semibold text-xl my-2">3{")"} Update Password</p>
      <div className={styles.updatePassform}>
        <div className="relative mb-4">
          <label
            for="newPassword"
            className="leading-7 text-base text-gray-600"
          >
            New Password
          </label>
          <input
            value={newPassword}
            onChange={handleChange}
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full bg-primary rounded border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label
            for="confirmNewPassword"
            className="leading-7 text-base text-gray-600"
          >
            Confirm New Password
          </label>
          <input
            value={confirmNewPassword}
            onChange={handleChange}
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            className="w-full bg-primary rounded border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="text-slate-50 bg-headingColor border-0 py-2 px-6 focus:outline-none hover:bg-textColor transition-all ease-in duration-200 rounded-md text-lg"
      >
        {submitting ? <Loading /> : "Update Password"}
      </button>
    </form>
  );
}
