import React from 'react'
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../Assets/success.json";
import { useNavigate } from 'react-router-dom'

const ThankYouPage = ({id}) => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen">
        <Lottie options={defaultOptions} width={200} height={300} />
        <h1 className="text-4xl mb-4">Quiz Completed!</h1>
        <p className="text-lg mb-6 text-center">Congratulations on completing the quiz.</p>
        <Link to='/'>
            <button 
            className="shadow-2xl bg-indigo-600 mt-4  hover:bg-white text-white hover:text-indigo-600 font-bold py-2 px-4 rounded-lg focus:outline hover:border-2 hover:border-indigo-600"
            onClick={()=> navigate(`/`)}
            >
            Return to Home
            </button>
        </Link>
        
      </div>
    </div>
    
  )
}

export default ThankYouPage