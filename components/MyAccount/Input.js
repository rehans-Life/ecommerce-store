import React from "react";

const styles = {
  input:
    "w-full bg-primary rounded border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-textColor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
};

export default function Input({
  value,
  textArea,
  type,
  name,
  handleChange,
  readOnly,
}) {
  return (
    <div className="relative mb-4">
      <label
        htmlFor={name}
        className="leading-7 text-base text-textColor capitalize"
      >
        {name}
      </label>
      {textArea ? (
        <textarea
          value={value}
          onChange={handleChange}
          type={type}
          id={name}
          name={name}
          readOnly={readOnly}
          className={styles.input}
        />
      ) : (
        <input
          value={value}
          onChange={handleChange}
          type={type}
          id={name}
          name={name}
          readOnly={readOnly}
          className={styles.input}
        />
      )}
    </div>
  );
}
