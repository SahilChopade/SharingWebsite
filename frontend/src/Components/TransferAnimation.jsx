import React from "react";
import Lottie from "react-lottie";
import Animation from "../Data/animation.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Animation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default function TransferAnimation() {
  return (
    <div>
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
}
