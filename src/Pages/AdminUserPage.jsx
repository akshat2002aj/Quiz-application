import React, { useEffect } from "react";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import AdminUserView from "../Components/Admin/AdminUserView/AdminUserView";
import Store from "../Redux/Store";
import { getAllUser } from "../Redux/Actions/user";
import { useSelector } from "react-redux";
import Loader from "../Components/Layout/Loader/Loader";

const AdminUserPage = () => {
  const { isLoading, users } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(getAllUser());
  }, []);
  return (
    <div>
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={4} />
          </div>
          {/* <AdminDashboardMain /> */}
          <div className="md:w-full flex flex-col justify-center w-[80%]">
            {isLoading ? <Loader /> : users ? (<AdminUserView users={users} />) : "No User Found"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
