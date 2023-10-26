import React, { useEffect } from "react";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import AdminQuiz from "../Components/Admin/AdminQuiz";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getAllQuiz } from "../Redux/Actions/quiz";
import Loader from "../Components/Layout/Loader/Loader";
import DashBoardCard from "../Components/DashboradCard/DashBoardCard";
const AdminDashboard = () => {
  const { isLoading, allQuiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    Store.dispatch(getAllQuiz());
  }, []);
  const myArray = [
    { numberValue:  0, stringValue: "Number of Quizzes" },
    { numberValue: 7, stringValue: "Number of Participants" },
    { numberValue: 123, stringValue: "Active Users" },
  ];
  myArray[0].numberValue=allQuiz?.length;
  return (
    <div>
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={1} />
          </div>
            <div className="flex flex-wrap items-center justify-start mt-3 gap-7">
              {myArray.map((i,index) => {
                return (
                  <DashBoardCard data={i} key={index} id={index} />
                )
              })}
            </div>
          

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
