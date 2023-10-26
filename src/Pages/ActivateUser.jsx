import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../Assets/registration.json";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SERVER } from "../Server";
import toast from "react-hot-toast";
import axios from "axios";

const ActivateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
      if (id) {
        const activationEmail = async () => {
          try {
            const res = await axios.post(`${SERVER}/user/activation`, {
              activation_token: id,
            },{
                withCredentials: true,
            });
            toast.success("Registered Successfully!");
          } catch (error) {
            toast.error(error.response.data.message);
            setError(true);
          }
        };
        activationEmail();
      }
  }, [id]);

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
        {error ? (
          <p className="text-[crimson]">Your token is expired!</p>
        ) : (
          <>
            <Lottie options={defaultOptions} width={300} height={300} />
            <h1 className="text-4xl mb-4">Welcome to QuizNest!</h1>
            <p className="text-lg mb-6 text-center">
              {" "}
              Your registration is now complete, and you're all set to embark on
              a journey of knowledge and fun.
            </p>
            <Link to="/login">
              <button
                className="shadow-2xl bg-indigo-600 mt-4  hover:bg-white text-white hover:text-indigo-600 font-bold py-2 px-4 rounded-lg focus:outline hover:border-2 hover:border-indigo-600"
                onClick={() => navigate(`/`)}
              >
                Go to Login
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivateUser;
