import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const styles = {
  botton:
    "relative flex w-full justify-center rounded-md border border-transparent  bg-gradient-to-tr from-blue-400 to-blue-600 transition-all ease-in duration-100 border-0 py-2 px-3 focus:outline-none hover:shadow-lg shadow-sm text-md font-medium text-white focus:outline-none",
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const token = router.query.token;
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/");
    }
  }, [router]);

  const updatePassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`, {
        method: "POST",
        body: JSON.stringify({
          token,
          password: newPassword,
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
            setEmailSent(true);
            router.push("/login");
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
          toast.error(error.message, {
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
  };

  const sendEmail = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      body: JSON.stringify({
        email,
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
          setEmailSent(true);
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
        toast.error(error.message, {
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
  };

  return (
    <div className="flex min-h-full pb-5 items-center justify-center px-4 sm:px-6 lg:px-8">
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
      <div className="w-full max-w-md">
        <div>
          <Image
            width={1920}
            height={1080}
            className="mx-auto h-48 w-48"
            src={"/logo.png"}
            alt="beechwood-baby"
          />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Update Your Password
          </h2>
          <Link
            href={"/signup"}
            className="w-full text-center cursor-pointer hover:text-headingColor duration-150 transition ease-in text-textColor"
            legacyBehavior
          >
            <p className="my-2 text-center cursor-pointer font-medium text-md">
              {" "}
              Or Create a New Account
            </p>
          </Link>
        </div>
        {token ? (
          <form onSubmit={updatePassword} className="mt-5 space-y-4">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-primary rounded-t  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-textColor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Type your New Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-primary rounded-b  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-textColor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button type="submit" className={styles.botton}>
                Set New Password
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={sendEmail} className="mt-5 space-y-4">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full bg-primary rounded  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-textColor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Email address"
                />
              </div>
            </div>
            {emailSent && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full text-center text-headingColor font-medium text-medium"
              ></motion.p>
            )}
            <div>
              <button type="submit" className={styles.botton}>
                Send Email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
