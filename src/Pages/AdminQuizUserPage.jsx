import React, { useEffect } from 'react'
import Loader from "../Components/Layout/Loader/Loader";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import AdminQuizUserView from "../Components/Admin/AdminQuizUserView/AdminQuizUserView";
import { useSelector } from 'react-redux';
import Store from "../Redux/Store";
import { getAllRegisterUser } from '../Redux/Actions/quiz';
import { useParams } from 'react-router-dom';

const AdminQuizUserPage = () => {
  const {id} = useParams();
  const { isLoading, users } = useSelector((state) => state.quiz);

  useEffect(() => {
    Store.dispatch(getAllRegisterUser(id));
  }, []);

  return (
    <div>
    <Header />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full mt-[4rem]">
        <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
          <AdminSideBar active={3} />
        </div>
        <div className="md:w-full flex flex-col justify-center w-[80%]">
          {isLoading ? (
            <Loader />
          ) : users ? (
            <AdminQuizUserView users={users}/>)
            : (<p>No user found</p>)
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminQuizUserPage