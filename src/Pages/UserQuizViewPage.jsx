import React, { useEffect, useState } from "react";
import Header from "../Components/Layout/Header/Header";
import UserQuizView from "../Components/UserQuizView/UserQuizView";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { getOneQuiz } from "../Redux/Actions/quiz";
import Loader from "../Components/Layout/Loader/Loader";
import { useParams } from "react-router-dom";
import Timer from "../Timer";
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from "react-full-screen";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserQuizQuestion from "../Components/UserQuizQuestion/UserQuizQuestion";
import UserQuizQuestionPage from "./UserQuizQuestionPage";

const UserQuizViewPage = () => {
  const handle = useFullScreenHandle();

  const { id } = useParams();
  const { isLoading, quiz } = useSelector((state) => state.quiz);
  const [quizHandle, setQuizHandle] = useState(false);

  useEffect(() => {
    Store.dispatch(getOneQuiz(id));
  }, []);



  
  return (
    <div className="w-full overflow-hidden">
      <FullScreen handle={handle}>
        {quizHandle ? (
          <UserQuizQuestionPage />
        ) : (
          <div>
            <Header logout={handle.active} timeLeft />
            <div className="mt-[4rem] ml-[2rem] md:ml-0 md:w-full flex flex-col self-center items-center w-[80%] overflow-hidden">
              {isLoading ? (
                <Loader />
              ) : quiz ? (
                <UserQuizView
                  quiz={quiz}
                  handle={handle}
                  setQuizHandle={setQuizHandle}
                />
              ) : (
                <p>Quiz not found!</p>
              )}
            </div>
          </div>
        )}
      </FullScreen>
    </div>
  );
};

export default UserQuizViewPage;
