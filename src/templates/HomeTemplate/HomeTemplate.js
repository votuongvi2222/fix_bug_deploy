import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
import Footer from "../HomeTemplate/Layout/Footer/Footer";

const HomeTemplate = () => {
  return (
    <>
      <Header />
      <HomeCarousel />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeTemplate;
