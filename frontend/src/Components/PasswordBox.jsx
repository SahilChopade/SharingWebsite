import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VisibilityOn from "../assets/images/VisibilityOn.svg";
import VisibilityOff from "../assets/images/VisibilityOff.svg";
import PasswordImage from "../assets/images/password-img.png";
import Axios from "axios";
import Button from "./Button/Button";
import { motion } from "framer-motion";
import { APIBASE_URL } from "../url";
import PasswordWorks from "./PasswordWorks";

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

export default function PasswordBox() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const handlePasswordDownloadClick = () => {
    Axios.post(APIBASE_URL + `/file/${id}`, {
      password: `${passwordInput}`,
    }).then((res) => {
      if (res.data.password === "not-correct" && !res.data.passwordCorrect) {
        setPasswordInput("");
      } else {
        const link = document.createElement("a");
        const url = `${APIBASE_URL}/file/${id}?password=${passwordInput}`;
        link.href = url;
        link.click();
        navigate(`/download/${id}`);
      }
    });
  };
  return (
    <>
      <div>
        <div className="p-[20px] flex flex-col md:flex-row gap-3 items-center lg:items-start justify-center lg:justify-between text-white">
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
              Don't Worry..Your file is Safe!!
            </motion.div>
            <motion.div variants={item} className="text-[1.5rem] mt-[1rem]">
              Lock your data with a strong key.
            </motion.div>
            <motion.hr
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              className="mt-[1rem]"
            />
            <PasswordWorks />
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            <motion.div
              variants={item}
              className="font-['lemon'] text-[1.5rem] md:text-[2rem] text-left"
            >
              ENTER YOUR PASSWORD
            </motion.div>
            <div className="flex items-center justify-center">
              <motion.div variants={item}>
                <img
                  className="w-[10rem] md:w-[15rem]"
                  src={PasswordImage}
                  alt="passwordimage"
                />
              </motion.div>
            </div>
            <div className="flex my-[10px]">
              <motion.input
                variants={item}
                className="rounded-l-[6px] px-[20px] text-black border-[2px] border-white py-[10px] w-full bg-transparent"
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
            </div>
            <motion.div variants={item} className="flex justify-center">
              <Button
                functionName={handlePasswordDownloadClick}
                Name="DOWNLOAD"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
