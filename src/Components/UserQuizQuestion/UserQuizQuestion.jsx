import React, { useState, useEffect } from "react";
import Store from "../../Redux/Store";
import { submitQuiz } from "../../Redux/Actions/quiz";
import { useSelector } from "react-redux";
import ThankYouPage from "../../Pages/ThankYouPage";
import Loading from "../Layout/Loading/Loading";
// import { Radio } from "@material-tailwind/react";
const UserQuizQuestion = ({ questions, id, timeOver, setTimeOver }) => {
  const { submitted, result } = useSelector((state) => state.quiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [thank, setThank] = useState(false);
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState(-1);
  const [questionStatus, setQuestionStatus] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(()=>{
    if(submitted){
      setTimeOver(true)
      setLoading(false);
      setThank(true);
    }
  },[submitted, result])

  useEffect(() => {
    if (timeOver) {
      handleSubmit();
    }
  }, [timeOver]);

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
    // setTimer(100);

    setExist(false);
    setQuestionStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      if (selectedOption === -1) {
        updatedStatus[currentQuestion] = {
          question: questions[currentQuestion]._id,
          correctOption: -1,
        };
      } else {
        updatedStatus[currentQuestion] = {
          question: questions[currentQuestion]._id,
          correctOption: selectedOption + 1,
        };
      }
      return updatedStatus;
    });
    setSelectedOption(-1);
    handleUpdate();
  };

  const [bordercolor, setBordercolor] = useState(-1);
  const [exist, setExist] = useState(true);

  const handleon = () => {
    setExist(false);
    setQuestionStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[currentQuestion] = {
        question: questions[currentQuestion]._id,
        correctOption: -1,
      };
      return updatedStatus;
    });
    setSelectedOption(-1);
  };
  // let correctValue=-1;

  const handleClick = (index) => {
    setExist(true);
    setSelectedOption(index);
    setBordercolor(index);
  };

  const handleSubmit = async () => {
    setLoading(true)
    const updatedStatus = [...questionStatus];
    updatedStatus[currentQuestion] = {
      question: questions[currentQuestion]._id,
      correctOption: selectedOption === -1 ? -1 : selectedOption + 1,
    };
    Store.dispatch(submitQuiz(id, updatedStatus));
  };

  const [visibleQuestions, setVisibleQuestions] = useState(20);
  const [isValue, setValue] = useState(0);
  const handleUpdate = () => {
    if ((currentQuestion + 1) % 20 == 0)
      setValue((isValue) => isValue + visibleQuestions);
  };

  return (
    <>
      {thank ? <ThankYouPage id={id}/> : (
        <div className="flex justify-center align-center flex-col w-[90%] mb-10   mt-10">
          <div className="flex flex-row">
            <div className="self-center bg-slate-50  border border-gray-100 shadow-lg mx-5 p-4 rounded-xl sm:mt-204 sm:px-14 md:w-full ">
              <div className="flex flex-col  sm:flex-row sm:justify-between sm:items-center">
                <h1 className=" font-bold mb-1 rounded-3xl text-2xl md:tex-3xl">
                  Question {currentQuestion + 1}
                </h1>
              </div>
              <div>
                <p className="mb-4 text-xl sm:text-2xl mt-3">
                  {questions[currentQuestion]?.description}
                </p>
                {questions[currentQuestion]?.imageDescription && (
                  <div className="flex justify-center">
                    <img
                      className="mx-2 my-3  md:w-[17rem] md:h-[15rem] w-[90%]"
                      src={questions[currentQuestion]?.imageDescription.url}
                      alt=""
                    />
                  </div>
                )}
              </div>
              {/* <ul className="list-disc pl-4 mb-8 text-lg"> */}
              {questions[currentQuestion].options.map((option, index) => (
                // <li key={index}>

                <label
                  id="exists"
                  className={`block text-gray-700 font-bold border-2 rounded-lg py-3 px-3 my-4 cursor-pointer ${
                    bordercolor === index && exist == true
                      ? "border-blue-500"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  {/* {option} */}
                  {option.text}
                  {option?.image && (
                    <div className="">
                      <img
                        className="mx-2 my-3  md:w-[12rem] md:h-[10rem] w-[70%]"
                        src={option?.image.url}
                        alt=""
                      />
                    </div>
                  )}
                </label>
              ))}
              <div className="flex justify-between">
                <button
                  className="shadow-2xl bg-red-600 hover:bg-white hover:text-red-600 text-white font-bold py-3 px-7 rounded-xl hover:outline "
                  onClick={handleon}
                >
                  Clear
                </button>

                <button
                  onClick={
                    questions.length == currentQuestion + 1
                      ? handleSubmit
                      : handleNextQuestion
                  }
                  className="shadow-2xl bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-bold py-3 px-7 rounded-xl hover:outline "
                >
                  {questions.length == currentQuestion + 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
            <div className="bg-slate-200 shadow-lg mr-2 ml-5 p-4 rounded-xl w-[30rem] h-[25rem]">
              <h1 className="text-2xl font-semibold self-center">Questions</h1>
              <div className="flex flex-wrap justify-center">
                {questions
                  .slice(0 + isValue, visibleQuestions + isValue)
                  .map((question, index) => {
                    return (
                      <div
                        key={index}
                        className={`text-black rounded-full md:w-12 md:h-12 w-9 h-9 mr-2 mt-5 flex items-center justify-center md:text-xl ${
                          index + isValue === currentQuestion
                            ? "bg-yellow-400" // Current question is yellow
                            : questionStatus[index + isValue] >= 0
                            ? "bg-green-400" // Answered questions are green
                            : questionStatus[index + isValue] === -1
                            ? "bg-red-400" // Unanswered questions are red
                            : "bg-gray-300"
                        }`}
                      >
                        <span className="">{index + 1 + isValue}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {
            loading ? <Loading /> : (null)
          }
        </div>
      )}
    </>
  );
};

export default UserQuizQuestion;
