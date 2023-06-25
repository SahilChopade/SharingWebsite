import React, { useState, useEffect } from "react";
import qrImage from "../../assets/images/qr-image.svg";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MailImage from "../../assets/images/mail-img.png";
import TextField from "@mui/material/TextField";
import Axios from "axios";
const APIBASE_URL = "http://localhost:3000";

export default function Download_MailPage() {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-14">
        <div className="bg-white p-[40px] rounded-lg w-[550px] space-y-3">
          <h1 className="font-bold text-[30px] text-left">
            YOUR FILE HAS BEEN UPLOADED
          </h1>
          <div className="flex items-center justify-center">
            <div className="w-[270px]">
              <img src={qrImage} alt="qrimage" />
              <span className="">Scan QR to get Link</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-[1px] rounded-lg border-black p-[10px]">
            <a>Here is the download Link</a>
            <ContentCopyIcon />
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
        <div className="bg-white p-[40px] rounded-lg w-[550px] space-y-4">
          <h1 className="font-bold text-[30px] text-left">
            SEND THE FILE VIA EMAIL
          </h1>
          <div className="flex items-center justify-center">
            <div className="w-[300px]">
              <img className="w-auto" src={MailImage} alt="mailimage" />
            </div>
          </div>

          <TextField
            id="outlined-basic"
            label="Receiver's Mail"
            variant="outlined"
            sx={{
              width: "5in",
            }}
          />

          <div>
            <button className="py-[10px] px-[50px] rounded-lg back text-white font-bold text-[25px]">
              <div className="flex items-center">
                SEND MAIL
                <EmailIcon sx={{ fontSize: "35px", marginLeft: "10px" }} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
