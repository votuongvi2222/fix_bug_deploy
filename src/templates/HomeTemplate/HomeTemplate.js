import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";

const HomeTemplate = () => {
  return (
    <>
      <Header />
      <HomeCarousel />
      <div>
        <Outlet />
      </div>
      <footer className="text-bg-dark" style={{ height: "50px" }}>
        FOOTER
      </footer>
    </>
  );
};

export default HomeTemplate;
