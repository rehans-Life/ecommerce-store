import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBasket, selectBasketTotal } from "../redux/cartSlice";
import BillnigDetailsForm from "../components/Checkout/BillnigDetailsForm";
import { useRouter } from "next/router";
import MyModal from "../components/Checkout/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutCard from "../components/Checkout/CheckoutCard";

const styles = {
  container: "",
  wrapper: "flex flex-col md:flex-row",
  payBtn:
    "block mx-5 px-3 text-center rounded-3xl my-2 bg-gradient-to-tr from-orange-400 to-orange-600  text-gray-50 p-2 text-lg hover:shadow-lg",
  heading:
    "text-4xl md:text-[4vw] font-extrabold tracking-wide text-center w-full mt-12 mb-5",
};

export default function Checkout() {
  const basketTotal = useSelector(selectBasketTotal);
  const basket = useSelector(selectBasket);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [district, setDistrict] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(
      !name.length ||
        !email.length ||
        !phone.length ||
        !city.length ||
        !state.length ||
        !(pincode.length > 2) ||
        !address1.length ||
        !address2.length
    );
  }, [name, email, phone, pincode, city, state, address1, address2, district]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addPaypal = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_CLIENT_ID}`;
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/signup");
    }
    addPaypal();
  }, [router]);

  useEffect(() => {
    if (!basket.length) {
      router.push("/");
    }
  }, [basket, router]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;

      case "phone":
        setPhone(value);
        break;

      case "pincode":
        setPinCode(value);
        break;

      case "city":
        setCity(value);
        break;

      case "state":
        setState(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "address1":
        setAddress1(value);
        break;
      case "address2":
        setAddress2(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const { email } = JSON.parse(localStorage.getItem("user"));
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
        method: "POST",
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          setEmail(data.email);
          setName(data.username);
          setPhone(data.phone);
          setState(data.state);
          setCity(data.city);
          setDistrict(data.district);
          setPinCode(data.pincode);
          setAddress1(data.address1);
          setAddress2(data.address2);
        });
    }
  }, [router]);

  const initiatePayment = () => {
    if (disabled) {
      toast.error("Please Fill out all the Required Details", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verfiycart`, {
      method: "POST",
      body: JSON.stringify(basket),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          openModal();
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

  const createNewOrder = (orderId) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createorder`, {
      method: "POST",
      body: JSON.stringify({
        orderId,
        name,
        email,
        phone,
        address: {
          pincode,
          city,
          state,
          district,
          address1,
          address2,
        },
        amount: basketTotal,
        products: basket,
        paymentStatus: "Paid",
        deliveryStatus: "NotDelivered",
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
          setTimeout(() => {
            router.push(`/order?orderId=${orderId}`);
          }, 1500);
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
        toast.success(error.message, {
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
    <div className={styles.container}>
      <p className={styles.heading}>CHECKOUT</p>
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
      <div className={styles.wrapper}>
        <BillnigDetailsForm
          name={name}
          email={email}
          phone={phone}
          pincode={pincode}
          city={city}
          state={state}
          district={district}
          address1={address1}
          address2={address2}
          handleChange={handleChange}
        />
        <CheckoutCard initiatePayment={initiatePayment} disabled={disabled} />
        <MyModal
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
          scriptLoaded={scriptLoaded}
          createNewOrder={createNewOrder}
        />
      </div>
    </div>
  );
}
