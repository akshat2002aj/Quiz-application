import React, { useEffect } from "react";
import Loader from "../Components/Layout/Loader/Loader";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import { useParams, useNavigate } from "react-router-dom";
import AdminQuestionView from "../Components/Admin/AdminQuestionView/AdminQuestionView";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getQuestionAdmin } from "../Redux/Actions/quiz";
import AdminCreateQuiz from "../Components/Admin/AdminCreateQuiz/AdminCreateQuiz"

const AdminCreateQuizPage = () => {
    // const { isLoading} = useSelector((state) => state.quiz);
  return (
<div>
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={2} />
          </div>
          {/* <AdminDashboardMain /> */}
          <div className="md:w-full flex flex-col justify-center w-[80%]">
            {/* {isLoading ? (
              <Loader />
            ) : ( */}
              <AdminCreateQuiz  />
        
          </div>
        </div>
      </div>
    </div>  
    );
}

export default AdminCreateQuizPage