import React, { useEffect } from "react";
import Loader from "../Components/Layout/Loader/Loader";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import { GrAddCircle } from "react-icons/gr";
import { useParams, useNavigate } from "react-router-dom";
import AdminQuestionView from "../Components/Admin/AdminQuestionView/AdminQuestionView";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getQuestionAdmin } from "../Redux/Actions/quiz";

const AdminQuizQuestionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { allQuestion, isLoading } = useSelector((state) => state.quiz);
  console.log(allQuestion);
  useEffect(() => {
    Store.dispatch(getQuestionAdmin(id));
  }, []);
  return (
    <div>
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={3} />
          </div>
          {/* <AdminDashboardMain /> */}
          <div className="md:w-full flex flex-col justify-center w-[80%]">
            <div className="flex justify-end mr-4 md:mr-[5rem] mt-3 rounded-full ">
              <GrAddCircle
                size={35}
                className="self-end flex justify-end hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={() => navigate(`/admin-add-quiz-question/${id}`)}
              />
            </div>
            {isLoading ? (
              <Loader />
            ) : allQuestion ? (
              <AdminQuestionView id={id} questions={allQuestion} />
            ) : <p>No Question Found</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizQuestionPage;
