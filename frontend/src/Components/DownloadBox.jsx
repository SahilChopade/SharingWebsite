import React from "react";
import Button from "./Button/Button";
import ContentCopyIcon from "../assets/images/ContentCopy.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

export default function DownloadBox(downloadProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDownloadClick = () => {
    Axios.post(APIBASE_URL + `/file/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.password) {
          navigate(`/password/${id}`);
        } else {
          const link = document.createElement("a");
          const url = `${APIBASE_URL}/file/${id}`;
          link.href = url;
          link.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-white p-[2rem] rounded-lg w-[20rem] md:w-[40rem] lg:w-auto flex flex-col gap-3 border-[2px] border-dashed border-rose-700"
      >
        <motion.h1
          variants={item}
          className="font-['lemon'] text-[1rem] md:text-[2rem] text-left"
        >
          YOUR FILE HAS BEEN UPLOADED
        </motion.h1>
        <div className="flex flex-col items-center justify-center">
          <motion.img
            variants={item}
            className="drop-shadow-[2px_2px_5px_#00A9FF] w-[10rem] mb-[2px] md:w-auto"
            src={`http://api.qrserver.com/v1/create-qr-code/?data=${downloadProps.fileLink}&color=040238`}
            alt="qrimage"
          />
          <motion.span variants={item} className="font-['Lemon']">
            Scan QR to get Link
          </motion.span>
        </div>
        <motion.div
          variants={item}
          className="flex items-center justify-between border-[1px] rounded-lg border-white p-[10px]"
        >
          <a
            className="flex grow cursor-pointer overflow-hidden"
            onClick={handleDownloadClick}
            href={downloadProps.fileLink}
          >
            {downloadProps.fileLink}
          </a>
          <div className="cursor-pointer">
            <img
              className="w-[3rem] md:w-auto"
              onClick={() => {
                navigator.clipboard.writeText(downloadProps.fileLink);
              }}
              src={ContentCopyIcon}
              alt="ContentCopyIcon"
            />
          </div>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <Button functionName={handleDownloadClick} Name="DOWNLOAD" />
        </motion.div>
      </motion.div>
    </>
  );
}
