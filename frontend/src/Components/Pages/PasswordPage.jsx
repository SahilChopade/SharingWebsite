import React, { useState, useEffect } from "react";
import MainImage from "../../assets/images/main-img.svg";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import PasswordImage from "../../assets/images/password-img.png";
import Password from "../Password.jsx";
import { Snackbar, Alert } from "@mui/material";
import Axios from "axios";
const APIBASE_URL = "http://localhost:3000"
export default function PasswordPage() {
  const [passwordCorrect, setpasswordCorrect] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setpasswordCorrect(false);
  };
  return (
    <div className="flex items-center justify-center space-x-4 p-[15px] text-center">
      <div className="bg-white p-[40px] rounded-lg space-y-1">
        <Snackbar
          open={passwordCorrect}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            OOPs!! Incorrect Password. Please Try Again.
          </Alert>
        </Snackbar>
        <div className="font-bold text-[30px] text-left">
          ENTER THE PASSWORD
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[300px]">
            <img className="w-auto" src={PasswordImage} alt="passwordimage" />
          </div>
        </div>
        <div className="w-full">
          <Password />
        </div>
        <div>
          <button className="py-[10px] px-[50px] rounded-lg back text-white font-bold text-[25px]">
            <div className="flex items-center">
              DOWNLOAD
              <DownloadForOfflineIcon
                sx={{ fontSize: "35px", marginLeft: "10px" }}
              />
            </div>
          </button>
        </div>
      </div>
      <div className="w-[740px]">
        <img src={MainImage} alt="mainImage" />
      </div>
    </div>
  );
}
