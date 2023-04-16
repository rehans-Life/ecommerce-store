import React, { useState } from "react";
import Input from "./Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Create/Loading";
import { selectUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";

const styles = {
  addressForm: "flex flex-col md:grid md:grid-cols-2  md:gap-x-7  w-full",
  heading: "font-semibold text-xl my-2",
};

export default function AddressDetails({
  state,
  city,
  address2,
  address1,
  handleChange,
  pincode,
  district,
}) {
  const [submitting, setSubmitting] = useState(false);
  const user = useSelector(selectUser);

  const inputs = [
    {
      value: city,
      name: "city",
      type: "text",
    },
    {
      value: state,
      name: "state",
      type: "text",
    },
    {
      value: district,
      name: "district",
      type: "text",
    },
    {
      value: pincode,
      name: "pincode",
      type: "number",
    },
    {
      value: address1,
      name: "address1",
      type: "text",
      textArea: true,
    },
    {
      value: address2,
      name: "address2",
      type: "text",
      textArea: true,
    },
  ];

  const updateAddressDetails = (e) => {
    setSubmitting(true);

    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        state,
        city,
        address2,
        address1,
        handleChange,
        pincode,
        district,
        updateAddressDetails: true,
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
    setSubmitting(false);
  };

  return (
    <form onSubmit={updateAddressDetails} className="mt-7">
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
      <p className={styles.heading}>2{")"} AddressDetails</p>
      <div className={styles.addressForm}>
        {inputs.map((input, index) => (
          <Input
            key={index}
            value={input.value}
            name={input.name}
            handleChange={handleChange}
            type={input.type}
            readOnly={input.readOnly}
            textArea={input.textArea}
          />
        ))}
      </div>
      <button
        disabled={submitting}
        type="submit"
        className="text-slate-50 bg-headingColor border-0 py-2 px-6 focus:outline-none hover:bg-textColor transition-all ease-in duration-200 rounded-md text-lg"
      >
        {submitting ? <Loading /> : "Update Address Details"}
      </button>
    </form>
  );
}
