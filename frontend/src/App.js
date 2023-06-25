import "./App.css";
import React, { useState, useEffect } from "react";
import UploadPage from "./Components/Pages/UploadPage";
import Download_MailPage from "./Components/Pages/Download_MailPage";
import PasswordPage from "./Components/Pages/PasswordPage";
import Logo from "./assets/images/logo.png";
import Axios from "axios";
const APIBASE_URL = "http://localhost:3000";

function App() {
  return (
    <div className="fontstyle back p-[30px]">
      <div className="w-[150px]">
        <img src={Logo} alt="logo" />
      </div>
      <UploadPage />
      {/* <Download_MailPage />
      <PasswordPage /> */}
    </div>
  );
}

export default App;
