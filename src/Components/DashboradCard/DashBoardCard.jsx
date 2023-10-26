

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const DashboardCard = (props) => {
  const { user } = useSelector((state) => state.auth);

  

  return (
    <div className="md:w-[14rem] h-[8rem] w-[90%] bg-gray-300 rounded-xl shadow-2xl p-5 md:mr-6 md:ml-4 mx-2 mb-4 mt-[5rem] ">
          <h1 className=" text-2xl font-bold">
          {props.data.numberValue}
          </h1>
          <p className="text-xl font-semibold">
            {props.data.stringValue}
          </p>
      </div>

  );
};

export default DashboardCard;