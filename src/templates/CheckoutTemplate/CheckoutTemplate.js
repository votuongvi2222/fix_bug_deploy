import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { USER_LOGIN } from "../../types/configType";

const CheckoutTemplate = () => {
  const navigate = useNavigate();

  // PRIVATE ROUTE
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(USER_LOGIN);
    if (!isLoggedIn) {
      navigate("/user/login");
    }
  }, [navigate]);

  return (
    <div>
      CHECK OUT TEMPLATE
      <Outlet />
    </div>
  );
};

export default CheckoutTemplate;
