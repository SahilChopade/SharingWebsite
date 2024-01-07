import React from "react";
import Share from "../assets/images/Share.svg";
import UploadFile from "../assets/images/UploadFile.svg";
import HourGlass from "../assets/images/HourGlass.svg";
import { motion } from "framer-motion";
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
export default function HowItWork() {
  return (
    <div className="mb-[2rem] lg:mb-0">
      <motion.div variants={item} className="text-[1.5rem] my-[1rem]">How it Works?</motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex gap-2 md:gap-0 justify-around items-center"
      >
        <motion.div
          variants={item}
          className="text-center flex flex-col justify-center items-center gap-2"
        >
          <div className="w-[100px] aspect-square flex justify-center relative bg-black rounded-lg border-rose-700 border-[2px] border-dashed">
            <div className="rounded-[100%] aspect-square w-[20px] text-center absolute top-0 left-0">
              1
            </div>
            <img className="w-[50px]" src={UploadFile} alt="Uploadfile" />
          </div>
          <div>Upload Your File...</div>
        </motion.div>
        <motion.div
          variants={item}
          className="text-center flex flex-col justify-center items-center gap-2"
        >
          <div className="w-[100px] aspect-square flex justify-center relative bg-black rounded-lg border-rose-700 border-[2px] border-dashed">
            <div className="rounded-[100%] aspect-square w-[20px] text-center absolute top-0 left-0">
              2
            </div>
            <motion.img
              animate={{
                rotate: 180,
                transition: {
                  duration: 0.7,
                  delay: 1.5,
                  repeat:Infinity,
                },
              }}
              className="w-[50px]"
              src={HourGlass}
              alt="HourGlass"
            />
          </div>
          <div>Wait for Upload...</div>
        </motion.div>
        <motion.div
          variants={item}
          className="text-center flex flex-col justify-center items-center gap-2"
        >
          <div className="w-[100px] aspect-square flex justify-center relative bg-black rounded-lg border-rose-700 border-[2px] border-dashed">
            <div className="rounded-[100%] aspect-square w-[20px] text-center absolute top-0 left-0">
              3
            </div>
            <img className="w-[50px]" src={Share} alt="Share" />
          </div>
          <div>Share File Link...</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
