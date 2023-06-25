import React, { useState, useEffect } from "react";
import MainImage from "../../assets/images/main-img.svg";
import Password from "../Password.jsx";
import LinkIcon from "@mui/icons-material/Link";
import { FileUploader } from "react-drag-drop-files";
import Axios from "axios";
const APIBASE_URL = "http://localhost:3000";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  const handleClick = () => {
    let formData = new FormData(); //formdata object
    console.log(file);
    const data ={
      'file':file,
      'password':20
    };
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    // Axios.postForm()
  
    Axios.postForm(APIBASE_URL + "/upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // var data = new FormData();
    // // var imagedata = document.querySelector('input[type="file"]').files[0];
    // data.append("file", file);

    // fetch(APIBASE_URL+"/upload", {
    //   mode: 'no-cors',
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     "Accept": "application/json",
    //     "type": "formData"
    //   },
    //   body: data
    // }).then(function (res) {
    //   if (res.ok) {
    //     alert("Perfect! ");
    //   } else if (res.status == 401) {
    //     alert("Oops! ");
    //   }
    // }, function (e) {
    //   alert("Error submitting form!");
    // });
  };

  const handleChange = (file) => {
    // console.log(file);
    setFile(file);
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
          <Password />
        </div>
        <div>
          <button className="py-[10px] px-[50px] rounded-lg back text-white font-bold text-[25px]" onClick={handleClick}>
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
