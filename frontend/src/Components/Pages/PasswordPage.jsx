import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainImage from "../../assets/images/main-img.svg";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import PasswordImage from "../../assets/images/password-img.png";
import IconButton from "@mui/material/IconButton";
import { OutlinedInput } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { Snackbar, Alert } from "@mui/material";
import Axios from "axios";
const APIBASE_URL = "https://shareify.onrender.com";

export default function PasswordPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [passwordInCorrect, setpasswordInCorrect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setpasswordInCorrect(false);
  };
  const handleTextInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordDownloadClick = () => {
    Axios.post(APIBASE_URL + `/file/${id}`, {
      password: `${password}`,
    }).then((res) => {
      console.log(res.data);
      if (res.data.password == "not-correct" && !res.data.passwordCorrect) {
        setpasswordInCorrect(true);
        setPassword("");
      } else {
        const link = document.createElement("a");
        const url = `${APIBASE_URL}/file/${id}?password=${password}`;
        link.href = url;
        link.click();
        navigate(`/download/${id}`);
      }
    });
  };
  return (
    <div className="flex items-center justify-center space-x-4 p-[15px] text-center">
      <div className="bg-white p-[21px] rounded-lg space-y-1">
        <Snackbar
          open={passwordInCorrect}
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
          <FormControl sx={{ m: 1, width: "5in" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              sx={{
                width: "auto",
              }}
              value={password}
              onChange={handleTextInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <div>
          <button
            className="py-[10px] px-[50px] rounded-lg back text-white font-bold text-[25px]"
            onClick={handlePasswordDownloadClick}
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
      <div className="w-[740px]">
        <img src={MainImage} alt="mainImage" />
      </div>
    </div>
  );
}
