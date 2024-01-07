import React from "react";
import DeleteForever from "../assets/images/DeleteForever.svg";
import PasswordHash from "../assets/images/PasswordHash.svg";
import PasswordPin from "../assets/images/PasswordPin.svg";
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
export default function PasswordWorks() {
  return (
    <div className="mb-[2rem] lg:mb-0">
      <motion.div variants={item} className="text-[1.5rem] my-[1rem]">
        How it Works?
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex gap-2 md:gap-0 justify-around items-start"
      >
        <motion.div
          variants={item}
          className="text-center flex flex-col justify-center items-center gap-2"
        >
          <div className="w-[100px] aspect-square flex justify-center relative bg-black rounded-lg border-rose-700 border-[2px] border-dashed">
            <div className="rounded-[100%] aspect-square w-[20px] text-center absolute top-0 left-0">
              1
            </div>
            <img className="w-[50px]" src={PasswordPin} alt="PasswordPin" />
          </div>
          <div>Type Your Password...</div>
        </motion.div>
        <motion.div
          variants={item}
          className="text-center flex flex-col justify-center items-center gap-2"
        >
          <div className="w-[100px] aspect-square flex justify-center relative bg-black rounded-lg border-rose-700 border-[2px] border-dashed">
            <div className="rounded-[100%] aspect-square w-[20px] text-center absolute top-0 left-0">
              2
            </div>
            <img className="w-[50px]" src={PasswordHash} alt="PasswordHash" />
          </div>
          <div>Password is Hashed...</div>
        </motion.div>
        <motion.div
          variants={item}
          className="text-center flex flex-col justify-center items-center gap-2"
        >
          <div className="w-[100px] aspect-square flex justify-center relative bg-black rounded-lg border-rose-700 border-[2px] border-dashed">
            <div className="rounded-[100%] aspect-square w-[20px] text-center absolute top-0 left-0">
              3
            </div>
            <img className="w-[50px]" src={DeleteForever} alt="DeleteForever" />
          </div>
          <div>Old Password Deleted...</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
