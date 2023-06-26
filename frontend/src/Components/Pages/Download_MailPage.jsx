import React, { useState, useEffect } from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MailImage from "../../assets/images/mail-img.png";
import TextField from "@mui/material/TextField";
import { Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
const APIBASE_URL = "https://shareify.onrender.com";

export default function Download_MailPage() {
  const [fileLink, setfileLink] = useState("");
  const [receiversMail, setreceiversMail] = useState("");
  const [mailSent, setmailSent] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    Axios.post(APIBASE_URL + `/file/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.password) {
          navigate(`/password/${id}`);
        } else {
          const link = document.createElement("a");
          const url = `${APIBASE_URL}/file/${id}`;
          link.href=url;
          link.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // Axios({
    //   url:  `${APIBASE_URL}/file/${id}`,
    //   method: 'POST',
    //   responseType: 'blob', // important
    // }).then((response) => {
    //   console.log(response);
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', `file.${response.data.type}`);
    //   document.body.appendChild(link);
    //   link.click();
    // });
  };
  const handleMailChange = (e) => {
    console.log(receiversMail);
    setreceiversMail(e.target.value);
  };
  const handleMailClick = () => {
    Axios.post(APIBASE_URL + `/send/${id}`, {
      receiversMail: `${receiversMail}`,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          setmailSent(true);
          setreceiversMail("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setmailSent(false);
    setLinkCopied(false);
  };
  useEffect(() => {
    Axios.get(APIBASE_URL + `/upload/${id}`).then((res) => {
      setfileLink(res.data.fileLink);
    });
  }, []);
  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-14">
        <div className="bg-white p-[41px] rounded-lg w-[550px] space-y-4">
          <h1 className="font-bold text-[30px] text-left">
            YOUR FILE HAS BEEN UPLOADED
          </h1>
          <div className="flex items-center justify-center">
            <div className="w-[270px]">
              <img
                className="border-[2px] border-black"
                src={`http://api.qrserver.com/v1/create-qr-code/?data=${fileLink}&color=040238`}
                alt="qrimage"
              />
              <span className="">Scan QR to get Link</span>
            </div>
          </div>
          <Snackbar
            open={linkCopied}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Link Copied Successfully.
            </Alert>
          </Snackbar>
          <div className="flex items-center justify-between border-[1px] rounded-lg border-black p-[10px]">
            <a
              className="cursor-pointer text-[#093f92]"
              // href={fileLink}
              onClick={handleDownloadClick}
            >
              {fileLink}
            </a>
            <div className="cursor-pointer">
              <ContentCopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(fileLink);
                  setLinkCopied(true);
                }}
              />
            </div>
          </div>
          <div>
            <button
              className="py-[10px] px-[50px] rounded-lg back text-white font-bold text-[25px]"
              onClick={handleDownloadClick}
            >
              <div className="flex items-center">
                DOWNLOAD
                <DownloadForOfflineIcon
                  sx={{ fontSize: "35px", marginLeft: "10px" }}
                />
              </div>
            </button>
          </div>
        </div>
        <div className="bg-white p-[41px] rounded-lg w-[550px] space-y-4">
          <Snackbar
            open={mailSent}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              The Mail has been sent Successfully.
            </Alert>
          </Snackbar>
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
            value={receiversMail}
            onChange={handleMailChange}
            sx={{
              width: "5in",
            }}
          />
          <div>
            <button
              className="py-[10px] px-[50px] rounded-lg back text-white font-bold text-[25px]"
              onClick={handleMailClick}
            >
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
