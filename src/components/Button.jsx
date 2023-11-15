import React from "react";
//childre => just a prop
// ...props => if anyadditional props is passed then it handled by spreading ...props
// use `` backtits to inject props css passed in the class syntax className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
