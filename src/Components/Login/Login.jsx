import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { SERVER } from "../../Server";
import Loading from "../Layout/Loading/Loading";
import {Link} from "react-router-dom"
import Store from '../../Redux/Store'
import { loginUser } from "../../Redux/Actions/auth";
import { useSelector } from "react-redux";

export default function Login() {
  const { loader, isAuthenticated } = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }
  },[isAuthenticated])
  const handleLogin = async (e) => {
    // setLoading(true);
    e.preventDefault();
    if(!email || !password){
      return toast.error("Please add data!")
    }
    Store.dispatch(loginUser({
      email, 
      password
    }))
  };
  return (
    <div className="flex items-center justify-center h-screen  relative">
      <div className="bg-gray-300 rounded-3xl px-4 md:p-12 shadow-2xl w-[40rem] h-[25rem] m-5 py-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-5 text-center mt-2 md:mt-0">
          Login
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
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-xl appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline bg-gray-100 focus:bg-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div >
            <Link to="/register" ><p className="text-gray-700 font-semibold">New User ? <span className="hover:underline">Register Now</span></p></Link>
          </div>
          <div className="flex mt-3 items-center justify-center md:justify-between">
            {/* <Link to="/home"> */}
            <button
              type="submit"
              disabled={loading}
              className="shadow-2xl bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-bold py-2 px-6 rounded-xl focus:outline "
            >
              Sign In
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
      {
        loader ? (<Loading />) :(null)
      }
    </div>
  );
}
