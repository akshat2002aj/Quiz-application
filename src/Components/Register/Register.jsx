import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SERVER } from "../../Server";


export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${SERVER}/user/create-user`, {
        email,
        password,
        name
      }, {
        withCredentials: true
      })
      console.log(data);
      toast.success(data.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-white relative">
      <div className="bg-gray-300 rounded-3xl px-4 md:p-12 shadow-2xl w-full md:w-[36rem] h-[30rem] m-5 py-12">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow-xl appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline bg-gray-100 focus:bg-white"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-4">
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
            <Link to="/login" ><p className="text-gray-700 font-semibold">Already Registered ? <span className="hover:underline">Login Now</span></p></Link>
          </div>
          <div className="flex items-center justify-center md:justify-between">
            {/* <Link to="/home"> */}
            <button
              type="submit"
              className="shadow-2xl bg-indigo-600 mt-4  hover:bg-white text-white hover:text-indigo-600 font-bold py-2 px-4 rounded-xl focus:outline"
            >
              Create User
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}