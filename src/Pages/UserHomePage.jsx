import React, { useEffect } from "react";
import Header from "../Components/Layout/Header/Header";
import UserHome from "../Components/Home/UserHome";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getAllQuiz } from "../Redux/Actions/quiz";
import Loader from "../Components/Layout/Loader/Loader";

const UserHomePage = () => {
  const { isLoading, allQuiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    Store.dispatch(getAllQuiz());
  }, []);
  return (
    <div>
      <Header />
        <div className="mt-[4rem] md:w-full flex flex-col justify-center w-[80%]">  
            {isLoading ? <Loader /> : <UserHome allQuiz={allQuiz} />}
        </div>
    </div>
  );
};

export default UserHomePage;
