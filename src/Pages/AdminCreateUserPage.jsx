import React, { useEffect } from "react";
import Loader from "../Components/Layout/Loader/Loader";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import { useParams, useNavigate } from "react-router-dom";
import AdminQuestionView from "../Components/Admin/AdminQuestionView/AdminQuestionView";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getQuestionAdmin } from "../Redux/Actions/quiz";
import Register from "../Components/Register/Register"

const AdminCreateUserPage = () => {
  return (
<div>
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={3} />
          </div>
          <div className="mt-8 md:w-full flex flex-col justify-center w-[80%]">
              <Register  />
        
          </div>
        </div>
      </div>
    </div>  
    );
}

export default AdminCreateUserPage;