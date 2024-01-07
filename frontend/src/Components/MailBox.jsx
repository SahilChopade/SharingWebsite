import React, { useState } from "react";
import MailImage from "../assets/images/mail-img.png";
import Button from "./Button/Button";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { motion } from "framer-motion";
import { APIBASE_URL } from "../url";

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

export default function MailBox() {
  const [receiversMail, setreceiversMail] = useState("");
  const { id } = useParams();

  const handleMailChange = (e) => {
    setreceiversMail(e.target.value);
  };
  const handleMailClick = () => {
    Axios.post(APIBASE_URL + `/send/${id}`, {
      receiversMail: `${receiversMail}`,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          setreceiversMail("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <motion.div
        variants={container}
        animate="visible"
        initial="hidden"
        className="text-white p-[2rem] w-[20rem] md:w-[40rem] lg:w-auto rounded-lg flex flex-col gap-3 border-[2px] border-dashed border-rose-700 mt-[2rem] lg:mt-0"
      >
        <motion.h1
          variants={item}
          className="font-['lemon'] text-[1rem] md:text-[2rem] text-left"
        >
          SEND THE FILE VIA EMAIL
        </motion.h1>
        <div className="flex items-center justify-center">
          <motion.div variants={item} className="w-[200px] lg:w-[300px]">
            <img
              className="w-auto drop-shadow-[8px_8px_10px_#00A9FF]"
              src={MailImage}
              alt="mailimage"
            />
          </motion.div>
        </div>
        <div className="rounded-[10px] border-[2px] border-white">
          <motion.input
            variants={item}
            type="email"
            value={receiversMail}
            onChange={handleMailChange}
            placeholder="Enter Mail"
            className="w-full p-[10px] bg-transparent rounded-[10px]"
          />
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <Button functionName={handleMailClick} Name="SEND MAIL" />
        </motion.div>
      </motion.div>
    </>
  );
}
