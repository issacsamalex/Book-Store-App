import React from "react";

const Button = ({
  title,
  variant = "contained",
  color = "primary",
  type = "button",
  onClick,
  fullWidth = false,
  disabled,
}) => {
  let className = fullWidth ? "w-100 rounded " : "pr-2 pl-2 rounded ";
  if (variant === "contained" && !disabled) {
    className += "btn-" + color + " text-white" + " hover-btn";
  } else if (variant === "outlined" && !disabled) {
    className += "border-" + color + " text-" + color + " hover-btn";
  } else if (variant === "flat" && !disabled) {
    className += "btn-flat-" + color + " text-" + color + " hover-btn";
  }

  if (disabled) {
    className += "disabled-btn";
  }

  return (
    <button className={className} type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
