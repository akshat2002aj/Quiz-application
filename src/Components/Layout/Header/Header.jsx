import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import Loading from "../Loading/Loading";
const Header = ({ logout = false, timeLeft }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await axios.get(
        "https://treasure-hunt-tcb7.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );
      setLoading(false)
      toast.success("Logout Successfully!");
      navigate("/login");
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <header className="bg-gradient-to-r fixed top-0 w-full z-10 from-blue-700 via-pink-400 to-fuchsia-800 p-1 md:p-2 flex justify-between items-center overflow-hidden">
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/dafmkubn3/image/upload/v1697536204/NITM_uc0war.gif"
          alt="Logo"
          className="md:w-12 md:h-12 w-9 h-9 md:mr-6 md:ml-4 mr-2  
        "
        />{" "}
        {/* Adjust the width and height as needed */}
        <div className="text-black text-base md:text-2xl">Hi, {user?.name}</div>
      </div>
      {user.role === "user" ? (
        <div className="flex justify-center flex-row self-center -ml-[2rem] md:-ml-[8rem]">
          <p className="text-white font-semibold text-2xl">{timeLeft}</p>
        </div>
      ) : null}

      <div className="flex md:gap-6 gap-2">
        {user.role === "admin" ? (
          <div
            className="text-black rounded-full bg-gray-300 md:w-12 md:h-12 w-9 h-9 flex items-center justify-center md:text-xl"
            onClick={() => navigate("/admin-dashboard")}
          >
            <span className=" cursor-pointer ">
              {/* {user.name.slice(0, 1).toUpperCase()} */}
              <MdDashboard color="black" className="text-lg md:text-2xl" />
            </span>
          </div>
        ) : null}
        {logout ? (
          <div
            className="text-black rounded-full invisible bg-gray-300 md:w-12 md:h-12 w-9 h-9 mr-2 flex items-center justify-center md:text-xl{}"
            onClick={handleLogout}
          >
            <span className=" cursor-pointer ">
              {/* {user.name.slice(0, 1).toUpperCase()} */}
              <FiLogOut
                color="black"
                className="text-lg md:text-2xl custom-logout"
              />
            </span>
          </div>
        ) : (
          <div
            className="text-black rounded-full bg-gray-300 md:w-12 md:h-12 w-9 h-9 mr-2 flex items-center justify-center md:text-xl{}"
            onClick={handleLogout}
          >
            <span className=" cursor-pointer ">
              {/* {user.name.slice(0, 1).toUpperCase()} */}
              <FiLogOut
                color="black"
                className="text-lg md:text-2xl custom-logout"
              />
            </span>
          </div>
        )}
        {
          loading ? (<Loading />) : (null)
        }
      </div>
    </header>
  );
};

export default Header;
