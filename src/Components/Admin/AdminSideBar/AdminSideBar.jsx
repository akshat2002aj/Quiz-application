import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup, HiOutlineViewGridAdd } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting, AiOutlineUserAdd, AiOutlineEdit } from "react-icons/ai";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[85vh] bg-white shadow-sm sticky top-0 left-0 z-5">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin-dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[#555]"
              }`}
            
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-create-quiz" className="w-full flex items-center">
          <HiOutlineViewGridAdd
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#555]"
              }`}
          >
            Create Quiz
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-quiz" className="w-full flex items-center">
          <FaLayerGroup
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#555]"
              }`}
          >
            All Quiz
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-user" className="w-full flex items-center">
          <HiOutlineUserGroup
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]"
              }`}
          >
            All Users
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-update-password"
          className="w-full flex items-center"
        >
          <AiOutlineEdit
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#555]"
              }`}
          >
            Update Password
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/profile"
          className="w-full flex items-center"
        >
          <AiOutlineSetting
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${active === 8 ? "text-[crimson]" : "text-[#555]"
              }`}
          >
            Settings
          </h5>
        </Link>
      </div>

    </div>
  );
};

export default AdminSideBar;