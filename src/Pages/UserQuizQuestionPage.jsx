import UserQuizQuestion from "../Components/UserQuizQuestion/UserQuizQuestion";
import React, { useEffect, useState } from "react";
import Header from "../Components/Layout/Header/Header";
import Store from "../Redux/Store";
import { useSelector } from "react-redux";
import { startQuiz } from "../Redux/Actions/quiz";
import Loader from "../Components/Layout/Loader/Loader";
import { useParams } from "react-router-dom";
import Timer from "../Timer";
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from "react-full-screen";
import "../App.css";

const UserQuizViewPage = () => {
  const handle = useFullScreenHandle();
  const { id } = useParams();
  const { loader, start, quiz, submitted } = useSelector((state) => state.quiz);
  const [timeLeft, setTimeLeft] = useState("");
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    Store.dispatch(startQuiz(id));
  }, []);

  useEffect(() => {
    if (start && start.startTime) {
      let countdownInterval = setInterval(() => {
        const data = Timer(start.startTime, quiz.duration);
        setTimeLeft(data);
        if (data == "00:00:00") {
          console.log("message");
          setTimeOver(true);
          clearInterval(countdownInterval);
          countdownInterval = null;
          // return;
        }
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [start]);

  return (
    <FullScreen handle={handle}>
      <div className="w-full">
        {timeOver ? (
          <Header logout={handle.active} />
        ) : (
          <Header logout={handle.active} timeLeft={timeLeft} />
        )}
        <div className="mt-[4rem]  w-full flex flex-col self-center items-center  ">
          {loader ? (
            <Loader />
          ) : start ? (
            <UserQuizQuestion
              questions={start.questions}
              id={id}
              setTimeOver={setTimeOver}
              timeOver={timeOver}
              handle = {handle}
            />
          ) : null}
        </div>
      </div>
    </FullScreen>
  );
};

export default UserQuizViewPage;
