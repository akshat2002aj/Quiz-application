import React, { useEffect } from "react";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getAllQuiz } from "../Redux/Actions/quiz";
import Loader from "../Components/Layout/Loader/Loader";
import DashBoardCard from "../Components/DashboradCard/DashBoardCard";
const AdminDashboard = () => {
  const { isLoading, allQuiz } = useSelector((state) => state.quiz);
  const {  users } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(getAllQuiz());
  }, []);
  const myArray = [
    { numberValue:  0, stringValue: "Number of Quizzes" },
    { numberValue: 7, stringValue: "Number of Users" },
    { numberValue: 0, stringValue: "Active Quizzes" },
  ];
  myArray[0].numberValue=allQuiz?.length;
  myArray[1].numberValue=users?.length;
  return (
    <div>
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={1} />
          </div>
          <div className="md:w-full flex flex-col justify-center w-[80%]">
            <div className="flex flex-wrap justify-center items-center mt-3 gap-7">
              {myArray.map((i,index) => {
                return (
                  <DashBoardCard data={i} key={index} id={index} />
                )
              })}
            </div>
            {/* <div className="bg-gray-300 mt-8 rounded-3xl">
           <p className="text-3xl text-black">Active Quizzes</p>
            </div> */}
            </div>
          

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
