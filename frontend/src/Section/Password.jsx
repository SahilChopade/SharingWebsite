import React from "react";
import PasswordBox from "../Components/PasswordBox";
export default function Password() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-[30px] lg:mt-0">
      <PasswordBox />
    </div>
  );
}
