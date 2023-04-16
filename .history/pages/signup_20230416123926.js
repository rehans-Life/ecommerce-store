import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Create/Loading";

const styles = {
  signUpBotton:
    "group relative flex w-full justify-center rounded-md border border-transparent  bg-gradient-to-tr from-blue-400 to-blue-600 transition-all ease-in duration-100 border-0 py-2 px-3 focus:outline-none hover:shadow-lg shadow-sm text-md font-medium text-white  focus:outline-none",
};

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const addUser = (e) => {
    e.preventDefault();

    setSubmitting(true);
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addUser`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
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
    setSubmitting(false);
    setUsername("");
    setEmail("");
    setPassword("");
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
            alt="Your Company"
          />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <Link
            href={"/login"}
            className="w-full text-center hover:text-headingColor duration-150 transition ease-in text-textColor"
            legacyBehavior
          >
            <p className="my-2 text-center cursor-pointer font-medium text-md">
              {" "}
              Or Login
            </p>
          </Link>
        </div>
        <form onSubmit={addUser} className="mt-5 space-y-4">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Your Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="w-full bg-primary rounded-t border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-textColor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Username"
              />
            </div>
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
                className="w-full bg-primary  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-textColor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full bg-primary rounded-b border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-textColor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className={styles.signUpBotton}
            >
              {submitting ? <Loading /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
