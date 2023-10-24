import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CountDown from "../../CountDown";
import { useNavigate } from "react-router-dom";


const QuizCard = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft(CountDown(props.data.startTime));
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [props.data.startTime]);
  return (
    <div className="md:w-[20rem] w-[90%] relative bg-white rounded-3xl shadow-lg md:px-4 px-2 pt-[3rem] md:mx-6 mx-2 mb-4 mt-[5rem]">
      <img
        src={props.data.image.url}
        alt="random img"
        className="md:w-[16rem] w-[75%] h-[8rem] absolute rounded-2xl shadow-md top-[-4rem] left-[2rem]"
      />

      <div className=" px-4 w-full pt-[3rem] ">
        <div className="flex flex-col items-baseline">
          <h1 className=" text-lg font-semibold uppercase leading-tight truncate">
            {props.data.name}
          </h1>
          <p className="mt-1 text-gray-600 text-xs ">
            {props.data.description.slice(0, 60)}...
          </p>
          <div className="flex justify-between items-center mb-4 mt-5 w-full">
            <div >
            <p className="text-black font-medium">Time Left:</p>
            <p className="text-[crimson] font-medium">{timeLeft}</p>
            </div>
            <div>
              {user.role === "admin" ? (
                <button
                    className=" shadow-2xl bg-indigo-600 hover:bg-white hover:text-indigo-600 hover:button-2
                            hover:button-indigo-600 text-white font-bold py-2 px-4 rounded-xl focus:outline"
                            onClick={()=>{navigate(`/admin-quiz/${props.data._id}`)}}
                  >
                    View
                  </button>
                ) : (
                    <button
                      className="shadow-2xl bg-indigo-600 hover:bg-white hover:text-indigo-600 hover:button-2
                      hover:button-indigo-600 text-white font-bold py-2 px-4 rounded-xl focus:outline"
                      onClick={()=>navigate(`/quiz/${props.data._id}`)}
                      >
                      View
                    </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;