import React, { useEffect } from "react";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import AdminQuiz from "../Components/Admin/AdminQuiz";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getAllQuiz } from "../Redux/Actions/quiz";
import Loader from "../Components/Layout/Loader/Loader";

const AdminDashboard = () => {
  const { isLoading, allQuiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    Store.dispatch(getAllQuiz());
  }, []);
  return (
    <div>
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={1} />
          </div>
          {/* <AdminDashboardMain /> */}
          <div className="md:w-full flex flex-col justify-center w-[80%]">
            Dashboard
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
