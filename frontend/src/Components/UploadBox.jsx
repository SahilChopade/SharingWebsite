import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOn from "../assets/images/VisibilityOn.svg";
import VisibilityOff from "../assets/images/VisibilityOff.svg";
import fileImage from "../assets/images/fileImage.png";
import Upload from "../assets/images/Upload.svg";
import Button from "./Button/Button";
import Axios from "axios";
import { APIBASE_URL } from "../url";
import { motion } from "framer-motion";
import HowItWork from "./HowItWork";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function UploadBox() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [uploadfile, setuploadFile] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleClick = () => {
    let formData = new FormData();
    formData.append("file", uploadfile);
    formData.append("password", passwordInput);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    Axios.post(APIBASE_URL + "/upload", formData, config)
      .then((response) => {
        console.log("This is the post request resoponse data", response.data);
        navigate(`/download/${response.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handledragover = (event) => {
    event.preventDefault();
  };
  const handledrop = (event) => {
    event.preventDefault();
    console.log(event.dataTransfer.files[0]);
    setuploadFile(event.dataTransfer.files[0]);
  };
  return (
    <div className="p-[20px] flex flex-col md:flex-row gap-3 items-center lg:items-start justify-center lg:justify-between">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-white w-full lg:w-1/2"
      >
        <motion.div
          variants={item}
          className="font-['Lemon'] font-extrabold text-[2rem] lg:text-[3rem]"
        >
          Upload and Share your files.
        </motion.div>
        <motion.div variants={item} className="text-[1.5rem] mt-[1rem]">
          Connecting the world through sharing.
        </motion.div>
        <motion.hr
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          className="mt-[1rem]"
        />
        <HowItWork />
      </motion.div>
      <div className="text-white text-center">
        <div className="flex flex-col items-center">
          {!uploadfile ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="gap-2 border-dashed border-[3px] border-[#777777] w-[15rem] md:w-[25rem] aspect-[4/3] cursor-pointer rounded-[2rem] bg-[#151515] flex-col flex items-center justify-center"
              onClick={() => {
                inputRef.current.click();
              }}
              onDragOver={handledragover}
              onDrop={handledrop}
            >
              <motion.img
                variants={item}
                className="w-[6rem]"
                src={Upload}
                alt="Upload"
              />
              <motion.div variants={item}>Drag File</motion.div>
              <motion.div variants={item}>OR</motion.div>
              <motion.div variants={item}>Click to Upload...</motion.div>
              <input onChange={(e)=>{setuploadFile(e.target.files[0])}} hidden type="file" ref={inputRef} />
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center gap-2"
            >
              <motion.div variants={item} className="text-[2rem]">
                GOTCHA!!
              </motion.div>
              <motion.div
                variants={item}
                className="border-[1px] border-[#fff] w-[20rem] aspect-[4/3] flex flex-col items-center justify-center gap-2 py-[5px] rounded-lg"
              >
                <motion.img
                  variants={item}
                  className="w-[10rem]"
                  src={fileImage}
                  alt="fileImage"
                />
                <motion.div variants={item}>{uploadfile.name}</motion.div>
                <motion.button
                  variants={item}
                  className="bg-gradient-to-b from-[#00337C] via-[#1C82AD] to-[#03C988] py-[3px] px-[10px] rounded-[10px] shadow-[2px_2px_2px_#526D82 ]"
                  onClick={() => {
                    setuploadFile(null);
                  }}
                >
                  ReUpload
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex my-[10px]"
        >
          <motion.input
            variants={item}
            className="rounded-l-[6px] px-[20px] text-white border-[2px] border-white py-[10px] w-full bg-transparent"
            placeholder="Enter your Password"
            type={passwordType}
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          <motion.div
            variants={item}
            className="rounded-r-[6px] flex items-center border-l-0 border-[2px] border-white p-2 cursor-pointer"
            onClick={togglePassword}
          >
            {passwordType === "password" ? (
              <img src={VisibilityOff} alt="Visibility Off" />
            ) : (
              <img src={VisibilityOn} alt="Visibility On" />
            )}
          </motion.div>
        </motion.div>
        <motion.div variants={container} initial="hidden" animate="visible">
          <Button functionName={handleClick} Name="Get Link" />
        </motion.div>
      </div>
    </div>
  );
}
