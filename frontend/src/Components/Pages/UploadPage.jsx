import React, { useState} from "react";
import MainImage from "../../assets/images/main-img.svg";
import LinkIcon from "@mui/icons-material/Link";
import { FileUploader } from "react-drag-drop-files";
import IconButton from "@mui/material/IconButton";
import { OutlinedInput } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const APIBASE_URL = "https://shareify.onrender.com";

export default function UploadPage() {
  const [uploadfile, setuploadFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };  
  const handleTextInputChange = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    let formData = new FormData(); //formdata object
    formData.append("file", uploadfile); //append the values with key, value pair
    formData.append("password", password);
    // console.log("This is form data",formData);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    Axios.post(APIBASE_URL + "/upload", formData, config)
      .then((response) => {
        console.log("This is the post request resoponse data",response.data);
        navigate(`/download/${response.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (file) => {
    console.log(file[0]);    
    setuploadFile(file[0]);
  };

  return (
    <div className="flex items-center justify-center space-x-4 p-[20px] text-center">
      <div className="bg-white p-[40px] rounded-lg">
        <h1 className="font-bold text-[30px] text-left p-[10px]">
          SHARE FILES WITH SAFETY
        </h1>
        <div className="p-[10px]">
          <FileUploader
            multiple={true}
            handleChange={handleChange}
            label="Upload OR Drop files here."
          />
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
            onClick={handleClick}
          >
            <div className="flex items-center">
              GET LINK
              <LinkIcon sx={{ fontSize: "35px", marginLeft: "10px" }} />
            </div>
          </button>
        </div>
      </div>
      <div className="w-[747px]">
        <img src={MainImage} alt="mainImage" />
      </div>
    </div>
  );
}
