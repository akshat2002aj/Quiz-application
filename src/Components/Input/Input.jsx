import React from "react";

const Input = (props) => {
  return (
    <div className="flex flex-col w-full mx-0">
      <label
        className="block text-gray-700 font-bold mb-2 text-lg"
        htmlFor="name"
      >
        {props.label}
      </label>
      {props.type === "text" ? (
        <input
          type="text"
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          // onChange={props.onChange}
          className={props.className}
          {...props}
        />
      ) : props.type === "number" ? (
        <input
          type="number"
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          // onChange={props.onChange}
          className={props.className}
          {...props}
        />
      ) : (
        <textarea
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          // onChange={props.onChange}
          {...props}
          className={props.className}
        />
      )}
      {props.error && (
        <p className="text-[crimson] text-sm mr-2 mb-2 self-end">
          {props.error}
        </p>
      )}
    </div>
  );
};

export default Input;
