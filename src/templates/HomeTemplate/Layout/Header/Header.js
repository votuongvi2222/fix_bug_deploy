import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import "./Header.scss";
import { useSelector } from "react-redux";
import _ from "lodash";
import Profile from "../Profile/Profile";
const Header = () => {
  // HOOK DA NGON NGU
  const { t, i18n } = useTranslation();
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  // LAY USER DANG NHAP
  const userLOGIN = useSelector((state) => state.AuthReducer.user);

  // console.log(userLOGIN);
  const renderCustomer = () => {
    if (_.isEmpty(userLOGIN)) {
      return (
        <>
          <button
            onClick={() => {
              navigate("/user/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            {t("Sign in")}
          </button>
          <button
            onClick={() => {
              navigate("/user/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            {t("Sign up")}
          </button>
        </>
      );
    } else {
      return <Profile />;
    }
  };
  const navigate = useNavigate();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      let top = window.pageYOffset;

      if (top > 110) {
        headerRef.current.className =
          "p-4 dark:bg-gray-800 dark:text-gray-100 fixed w-full bg-black z-10 opacity-80 text-white";
      } else {
        headerRef.current.className =
          "p-4 dark:bg-gray-800 dark:text-gray-100 fixed w-full bg-black z-10 text-white";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="bg-black">
      <header
        ref={headerRef}
        className="p-4 dark:bg-gray-800 dark:text-gray-100 fixed w-full bg-black z-10 text-white"
      >
        <div className="container flex justify-between h-16 mx-auto">
          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <img
              src="/image/logoTixLoading.png"
              alt=""
              // className="rounded-full"
              style={{ width: 80, height: 60, objectFit: "cover" }}
            />
          </a>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive
                    ? "p-2 flex items-center px-4 -mb-1 border-b-2 border-white"
                    : "p-2 flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 "
                }
              >
                {t("header.Home")}
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/contact"
                className={(navData) =>
                  navData.isActive
                    ? "p-2 flex items-center px-4 -mb-1 border-b-2 border-white"
                    : "p-2 flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 "
                }
              >
                {t("header.Contact")}
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/news"
                className={(navData) =>
                  navData.isActive
                    ? "p-2 flex items-center px-4 -mb-1 border-b-2 border-white"
                    : "p-2 flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 "
                }
              >
                {t("header.News")}
              </NavLink>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {renderCustomer()}
            <div className="ml-2">
              <Select
                defaultValue="vi"
                style={{
                  width: 60,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "vi",
                    label: "VI",
                  },
                  {
                    value: "en",
                    label: "EN",
                  },
                  {
                    value: "chi",
                    label: "CHI",
                  },
                ]}
              />
            </div>
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
