import React from "react";
import "./Button.css";
export default function Button(buttonProps) {
  return (
    <div>
      <button
        className="py-[10px] px-[50px] rounded-lg back text-white font-bold text-[20px] lg:text-[25px] shadow-[5px_5px_5px_#fff]"
        onClick={buttonProps.functionName}
      >
        <div className="flex items-center">{buttonProps.Name}</div>
      </button>
    </div>
  );
}
