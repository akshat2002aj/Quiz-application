import UserQuizQuestion from '../Components/UserQuizQuestion/UserQuizQuestion';
import React, { useEffect, useState } from "react";
import Header from "../Components/Layout/Header/Header";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { startQuiz } from "../Redux/Actions/quiz";
import Loader from "../Components/Layout/Loader/Loader";
import { useParams } from "react-router-dom";
import Timer from '../Timer';
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from "react-full-screen";
import "../App.css";
// import Timer from "../../Timer"

const UserQuizViewPage = () => {
  const handle = useFullScreenHandle();
  const { id } = useParams();
  const { loader, start, quiz } = useSelector((state) => state.quiz);
  const [timeLeft, setTimeLeft] = useState("");
  
  useEffect(() => {
    Store.dispatch(startQuiz(id));
  }, []);

  useEffect(() => {
    console.log(start)
    console.log(quiz)
    if(start && start.startTime){
      const countdownInterval = setInterval(() => {
        setTimeLeft(Timer(start.startTime, quiz.duration));
      }, 1000);
  
      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [start, loader]);
  return (

      <FullScreen handle={handle}>
        <div className="w-full">
          <Header logout={handle.active} timeLeft={timeLeft}/>
          <div className="mt-[4rem] ml-[2rem] md:ml-0 md:w-full flex flex-col self-center items-center w-[80%] ">
            {
              loader ? (<Loader />) :(
                start ? <UserQuizQuestion questions={start.questions} /> :(null)
              )
            }
          </div>
        </div>

          
      </FullScreen>
  );
};

export default UserQuizViewPage;
