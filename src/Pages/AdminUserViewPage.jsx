import React, {useEffect} from 'react'
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";

const AdminUserViewPage = () => {
  return (
    <div>
    <Header />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full mt-[4rem]">
        <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
          <AdminSideBar active={1} />
        </div>
        {/* <AdminDashboardMain /> */}
        <div className="md:w-full flex flex-col justify-center w-[80%]">
          User View
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminUserViewPage