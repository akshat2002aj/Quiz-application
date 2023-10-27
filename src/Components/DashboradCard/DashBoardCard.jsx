

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const DashboardCard = (props) => {
  const { user } = useSelector((state) => state.auth);

  

  return (
    <div className="md:w-[16rem]  w-[90%] bg-gray-300 rounded-xl shadow-2xl p-5 md:mr-6 md:ml-4 mx-2 mb-4 mt-[5rem] ">
          <div className="flex justify-center">
          <div className="bg-white w-14 h-14 rounded-full flex justify-center items-center mb-4 ">
          <h1 className=" text-[1.9rem] font-bold">
          {props.data.numberValue}
          </h1>
          </div>
          </div>
          <p className="text-xl font-semibold mb-1 flex justify-center">
            {props.data.stringValue}
          </p>
      </div>

  );
};

export default DashboardCard;