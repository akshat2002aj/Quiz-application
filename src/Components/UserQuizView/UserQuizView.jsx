import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Store from "../../Redux/Store";
import CountDown from "../../CountDown";
import { registerQuiz } from "../../Redux/Actions/quiz";
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from "react-full-screen";
import UserQuizQuestion from "../UserQuizQuestion/UserQuizQuestion";
// // import { SERVER } from "../../../Server";

const UserQuizView = ({ quiz, handle, setQuizHandle }) => {
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [open, setOpen] = React.useState(false);

  function formatDate(date) {
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

    return formattedDate;
  }
  const currentTimestamp = +new Date();
  const EndTimestamp = +new Date(quiz.endTime);
  const handleChange = (event) => {
    setChecked((current) => !current);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    Store.dispatch(registerQuiz(quiz._id));
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft(CountDown(quiz.startTime));
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [quiz.startTime]);




  return (
    <div className="w-full flex flex-col items-center ml-8">
      <div className="bg-white flex justify-center items-center w-full md:w-[40rem] ">
        <div className=" m-4  flex-col justify-center">
          <h1 className=" mt-4 text-xl font-bold text-transform:uppercase flex justify-center mb-4 md:text-3xl">
            {quiz.name}
          </h1>
          <img
            src={quiz.image.url}
            alt="random img"
            className="w-[20rem] md:w-[40rem] md:mb-2 rounded-2xl shadow-md "
          />
          <p className="mt-2 text-gray-700 text-sm text-semibold tracking-tight mb-2 md:text-lg md:text-semibold md:mt-4">
            {quiz.description}
          </p>
          {handle.active ? (
            <>
              <div>
                <h1 className="text-2xl text-extrabold">Rules:</h1>
                <ul className="text-gray-700">
                  <li>1. Only individual participation is permitted.</li>
                  <li>
                    2. Registration for the event is entirely free of charge
                  </li>
                  <li>
                    3. Participants must arrive at the event venue at least 10
                    minutes prior to the scheduled start time.
                  </li>
                  <li>
                    4. It is mandatory for participants to bring their own
                    laptops and chargers
                  </li>
                  <li>
                    5. Participants are not permitted to leave the event venue
                    during the competition
                  </li>
                  <li>
                    6. The use of multiple browser tabs or windows is strictly
                    prohibited during the event.
                  </li>
                  <li>
                    7. Mobile phones are strictly prohibited for any purpose
                    during the competition
                  </li>
                  <li>
                    8. Participants encountering challenges may opt to request
                    hints.
                  </li>
                  <li>
                    9. Assistance from any external sources or individuals is
                    strictly prohibited during the competition.
                  </li>
                </ul>
              </div>
            </>
          ) : null}
          <div className="flex flex-col md:flex-row">
            <p className="mt-2 text-black text-sm md:w-[50%]  mb-2 md:text-lg md:text-bold md:mt-4">
              <span className="font-semibold">Start Time: </span>
              {formatDate(quiz.startTime)}
            </p>
            <p className="mt-2 text-black text-sm md:w-[50%] mb-2 md:text-lg md: text-semibold md:mt-4">
              <span className="font-semibold">End Time: </span>
              {formatDate(quiz.endTime)}
            </p>
          </div>
          <div className="flex flex-col md:flex-row">
            <p className="mt-2 text-black text-sm md:w-[50%] mb-2 md:text-lg md: text-semibold md:mt-4">
              <span className="font-semibold">No. of Questions: </span>
              {quiz.questions}
            </p>
            <p className="mt-2 text-black text-sm md:w-[50%] mb-2 md:text-lg md: text-semibold md:mt-4">
              <span className="font-semibold">No. of Registrations: </span>
              {quiz.registrations}
            </p>
          </div>

          {handle.active ? (
            <>
              <div className="flex flex-row justify-start gap-3 my-2">
                <input
                  type="checkbox"
                  id="ack"
                  name="ack"
                  value={isChecked}
                  onChange={handleChange}
                />
                <label for="ack" className="items-center">
                  I acknowledge the rules of the contest
                </label>
              </div>
              {!isChecked ? (
                <div className="flex flex-col justify-evenly mx-10  md:flex-row">
                  <button
                    className="mt-2 mb-2 text-sm shadow-2xl bg-green-600 py-2 px-2 text-white 
                    font-bold cursor-not-allowed rounded-xl md:text-base focus:outline md:py-2 md:px-4 md:rounded-xl md:shadow-2xl md:mt-5  md:mb-3"
                    disabled
                  >
                    Start
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-evenly mx-10  md:flex-row">
                  <button
                    className="mt-2 mb-2 text-sm shadow-2xl bg-green-600 hover:bg-white py-2 px-2 hover:text-green-600 text-white cursor-pointer
                  hover:border-2 hover:border-green-600 font-bold rounded-xl md:text-base focus:outline md:py-2 md:px-4 md:rounded-xl md:shadow-2xl md:mt-5  md:mb-3"
                    onClick={() => setQuizHandle(true)}
                  >
                    Start
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {quiz.registered ? 
               quiz.testGiven ? (
                <div className="flex flex-col justify-center md:flex-row">
                 <button
                     className="mt-2 mb-2 text-sm shadow-2xl bg-white py-2 px-2  text-green-500 border-2 border-green-500 cursor-not-allowed
                font-bold rounded-xl md:text-base focus:outline md:py-2 md:px-4 md:rounded-xl md:shadow-2xl md:mt-5  md:mb-3 "
                     disabled
                   >
                    &#9989; Test Already Given
                   </button>
                </div>
              ): currentTimestamp>EndTimestamp? (
                <div className="flex flex-col justify-center md:flex-row">
                 <button
                     className="mt-2 mb-2 text-sm shadow-2xl bg-white py-2 px-2  text-red-500 border-2 border-red-500 cursor-not-allowed
                font-bold rounded-xl md:text-base focus:outline md:py-2 md:px-4 md:rounded-xl md:shadow-2xl md:mt-5  md:mb-3 "
                     disabled
                   >
                    &#10060;
                     Expired
                   </button>
                </div>
              ):   (
                 <div className="flex flex-col justify-evenly mx-10  md:flex-row">
                 {timeLeft === "0d 0h:0m:0s" ? (
                   <button
                     className="mt-2 mb-2 text-sm shadow-2xl bg-green-600 hover:bg-white py-2 px-2 hover:text-green-600 text-white cursor-pointer
                 hover:border-2 hover:border-green-600 font-bold rounded-xl md:text-base focus:outline md:py-2 md:px-4 md:rounded-xl md:shadow-2xl md:mt-5  md:mb-3"
                     onClick={handle.enter}
                   >
                     Start Now
                   </button>
                 ) : (
                   <button
                     className="mt-2 mb-2 text-sm shadow-2xl bg-yellow-400 py-2 px-2  text-white cursor-not-allowed
                font-bold rounded-xl md:text-base focus:outline md:py-2 md:px-4 md:rounded-xl md:shadow-2xl md:mt-5  md:mb-3 "
                     disabled
                   >
                     Starts in! <span className="block text-red-400"></span>
                     {timeLeft}
                   </button>
                 )}
               </div>
             
              )
                : currentTimestamp>EndTimestamp? (
                  <div className="flex flex-col justify-center md:flex-row">
                   <button
                       className="mt-2 mb-2 text-sm shadow-2xl bg-white py-2 px-2  text-red-500 border-2 border-red-500 cursor-not-allowed
                  font-bold rounded-xl md:text-base focus:outline md:py-2 md:px-4 md:rounded-xl md:shadow-2xl md:mt-5  md:mb-3 "
                       disabled
                     >
                      &#10060;
                       Expired
                     </button>
                  </div>
                ) 
                :(
                <div className="flex flex-col justify-evenly mx-10  md:flex-row">
                  <button
                    className="mt-2 mb-2 text-sm shadow-2xl bg-green-600 hover:bg-white py-2 px-2 hover:text-green-600 text-white cursor-pointer
                  hover:border-2 hover:border-green-600 font-bold rounded-xl md:text-base focus:outline md:py-2 md:px-4 md:rounded-xl md:shadow-2xl md:mt-5  md:mb-3"
                    onClick={(e) => {
                      handleRegister(e);
                    }}
                  >
                    Register
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserQuizView;
