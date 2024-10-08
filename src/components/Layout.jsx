import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="p-8 m-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
