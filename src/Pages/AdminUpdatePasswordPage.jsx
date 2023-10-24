import React, { useEffect } from "react";
import Header from "../Components/Layout/Header/Header";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";
import AdminUpdatePassword from "../Components/Admin/AdminUpdatePassword/AdminUpdatePassword"
const AdminUpdatePasswordPage = () => {
   
  return (
<div>
      <Header />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4rem]">
          <div className="w-[80px] md:w-[330px] sticky top-[5rem]">
            <AdminSideBar active={5} />
          </div>
        
          <div className="md:w-full flex flex-col justify-center w-[80%]">
         
              <AdminUpdatePassword  />
        
          </div>
        </div>
      </div>
    </div>  
    );
}

export default AdminUpdatePasswordPage