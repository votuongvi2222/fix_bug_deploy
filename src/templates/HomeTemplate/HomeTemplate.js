import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Layout/Header/Header";

import Footer from "../HomeTemplate/Layout/Footer/Footer";
import { useEffect } from "react";

const HomeTemplate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Header />

      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeTemplate;
