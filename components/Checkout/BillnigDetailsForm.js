import React from "react";
import Input from "../MyAccount/Input";

const styles = {
  billingDetails: "grid grid-cols-1 md:gap-3 md:w-[65vw] w-full md:grid-cols-2",
  heading: "font-semibold text-xl my-3",
};

export default function BillnigDetailsForm({
  name,
  email,
  phone,
  pincode,
  city,
  state,
  district,
  address1,
  address2,
  handleChange,
}) {
  const inputs = [
    {
      value: name,
      name: "name",
      type: "text",
    },
    {
      value: email,
      name: "email",
      type: "text",
      readOnly: true,
    },
    {
      value: phone,
      name: "phone",
      type: "number",
    },
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
  ];
  const addresses = [
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

  return (
    <form className="p-5 w-full">
      <p className={styles.heading}>Address Details</p>
      <div className={styles.billingDetails}>
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
      <div className={styles.billingDetails}>
        {addresses.map((input, index) => (
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
    </form>
  );
}
