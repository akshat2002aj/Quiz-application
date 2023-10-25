import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../Assets/load.json";


const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full fixed z-10 bg-transparent top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loading;