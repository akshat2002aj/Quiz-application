import React from 'react'
import QuizCard from "../QuizCard/QuizCard";

const UserHome = ({allQuiz}) => {
  return (
    <div className="flex flex-wrap items-center justify-center mt-3">
      {allQuiz && allQuiz.length > 0 ? (
        allQuiz.map((i, index) => <QuizCard data={i} key={index} id={index} />)
      ) : (
        <div className="flex flex-col  bg-slate-50  border border-gray-200 shadow-lg mx-0  py-8 px-4 md:p-8 rounded-3xl  mt-4 w-full md:mx-0 md:w-[80%] ">
          <p className="text-[crimson] font-medium text-3xl text-center">
            No Quiz Added Yet!
          </p>
          <p className="text-[crimson] font-medium text-xl text-center">
            Come Later!!
          </p>
        </div>
      )}
    </div>
  )
}

export default UserHome