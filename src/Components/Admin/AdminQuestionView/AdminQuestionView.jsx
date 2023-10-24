import React, { useState } from "react";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
const AdminQuestionView = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  console.log(123)
  console.log(props.questions)

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < props.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="flex flex-col  bg-slate-50  border border-gray-200 shadow-lg mx-0  py-8 px-4 md:p-8 rounded-3xl  mt-4 w-full md:mx-0 md:w-[80%] ">
        {props.questions.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row items-center">
              <div
                className="hidden md:block hover:bg-gray-400 rounded-full cursor-pointer"
                onClick={handlePrevQuestion}
              >
                <BsArrowLeftCircle size={35} />
              </div>

              <div className="grow md:mx-6 self-center w-[90%]">
                <div className="flex flex-col">
                  <h1 className=" font-bold mb-1 rounded-3xl text-lg md:text-2xl md:tex-3xl">
                    Question {currentQuestion + 1}
                  </h1>
                </div>
                <div>
                  <p className="mb-4 md:text-xl text-base  mt-3">
                    {props.questions[currentQuestion]?.description}
                  </p>
                  {props.questions[currentQuestion]?.imageDescription && (
                    <div className="flex justify-center">
                      <img
                        className="mx-2 my-3  md:w-[25rem] w-[90%]"
                        src={
                          props.questions[currentQuestion]?.imageDescription.url
                        }
                        alt=""
                      />
                    </div>
                  )}
                </div>

                {props.questions[currentQuestion].options.map(
                  (option, index) => (
                    <label
                      className={
                        "block text-gray-800 font-bold border-[3px] text-base md:text-lg rounded-lg md:py-3 md:px-3 px-2 py-2 my-4"
                      }
                      key={index}
                    >
                      {option.text}
                      {option?.image && (
                        <div className="">
                          <img
                            className="mx-2 my-3  md:w-[15rem] w-[70%]"
                            src={option?.image.url}
                            alt=""
                          />
                        </div>
                      )}
                    </label>
                  )
                )}
              </div>

              <div className="flex flex-row justify-between w-full md:hidden">
                <div
                  className="visible md:hidden hover:bg-gray-400 rounded-full cursor-pointer"
                  onClick={handlePrevQuestion}
                >
                  <BsArrowLeftCircle size={25} />
                </div>
                <div
                  className="visible md:hidden hover:bg-gray-400 rounded-full cursor-pointer"
                  onClick={handleNextQuestion}
                >
                  <BsArrowRightCircle size={25} />
                </div>
              </div>

              <div
                className="hidden md:block hover:bg-gray-400 rounded-full cursor-pointer"
                onClick={handleNextQuestion}
              >
                <BsArrowRightCircle size={35} />
              </div>
            </div>

            <div className="flex justify-evenly md:justify-between mt-8 md:mx-6       md:gap-0">
              <button className="shadow-2xl bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-bold text-sm md:py-2 py-2 md:px-6 px-5 rounded-xl focus:outline hover:border-2 hover:border-indigo-600">
                Edit
              </button>
              <button className="shadow-2xl bg-[crimson] text-sm hover:bg-white hover:text-[crimson] text-white font-bold md:py-2 py-2 px-4 md:px-6 rounded-xl focus:outline hover:border-2 hover:border-[crimson] ">
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[crimson] font-medium text-3xl text-center">
              No Question Found!
            </p>
            <p className="text-[crimson] font-medium text-xl text-center">
              Add Questions to view
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminQuestionView;
