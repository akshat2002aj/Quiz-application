import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
import Loading from "../../Layout/Loading/Loading";

export default function AdminUpdatePassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    if(password!==confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
    }else{
      try {
        const data = await axios.post(
          "https://treasure-hunt-tcb7.onrender.com/api/v1/user/change-password",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        toast.success("Password updated successfully")
        navigate(`/admin-user`)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.error(error?.response?.data?.message);
      }
    }
    
  };
  return (
    <div className="flex items-center justify-center mt-[2rem]">
      <div className="bg-gray-300 rounded-3xl px-4  py-12 md:p-12 shadow-2xl w-full md:w-[38rem] m-5 h-[30rem]">
        <h2 className="text-3xl font-semibold text-gray-700 mb-5 text-center">
          Update Password
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow-xl appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline bg-gray-100 focus:bg-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="newpassword"
              className="block text-gray-700 font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              className="shadow-xl appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline bg-gray-100 focus:bg-white"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmpassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              className="shadow-xl appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline bg-gray-100 focus:bg-white"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center md:justify-between">
            {/* <Link to="/home"> */}
            <button
              type="submit"
              className="shadow-2xl  bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-bold py-2 px-4 rounded-xl focus:outline"
              onClick={(e) => handleLogin(e)}
            >
              Update
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
      {
        loading ? <Loading /> : null
      }
    </div>
  );
}