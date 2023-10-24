import React, { useEffect } from "react";
import Loader from "../Components/Layout/Loader/Loader";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import AdminAddQuestion from "../Components/Admin/AdminAddQuestion/AdminAddQuestion";
import { useParams } from "react-router-dom";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getOneQuiz } from "../Redux/Actions/quiz";

const AdminAddQuestionPage = () => {
  const { id } = useParams();
  const { isLoading, quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    Store.dispatch(getOneQuiz(id));
  }, []);
  
  return (
    <div className="relative">
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={3} />
          </div>
          {/* <AdminDashboardMain /> */}
          <div className="md:w-full flex flex-col justify-center w-[80%]">
            {isLoading ? (
              <Loader />
            ) : quiz ? (
              <AdminAddQuestion quiz={quiz} />
            ) : (
              <p>No Quiz Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddQuestionPage;
