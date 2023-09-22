import React from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";
const Checkout = () => {
  const userLogin = useSelector((state) => state.AuthReducer.user);
  console.log(userLogin);
  return (
    <div className="Checkout w-screen">
      <div className="Checkout-content flex h-screen">
        <div className="datGhe w-3/4">
          <div className="container" style={{ width: "75%" }}>
            <div className="screen"></div>
            <div className="row">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
            </div>
          </div>
        </div>
        <div className="muaVe w-1/4 flex flex-col justify-between border-solid border-3 border-sky-500 p-3">
          <div className="info-Ve ">
            <p className="total border-b-2 border-gray-400 py-3">0 $</p>
            <div className="info-content border-b-2 border-gray-400 py-3">
              <b className="tenPhim">Spider MAN 2023</b>
              <p className="diaChi">Dia diem : BHD-Star - Vincom 3/2 </p>
              <p className="ngayChieu">Ngay chieu : 25/04/2023 - 12:05 Rap 5</p>
            </div>
            <div className="flex justify-between border-b-2 border-gray-400 py-3">
              <p className=" text-red-600">Ghe</p>
              <p className="tienGhe">0 $ </p>
            </div>
            <div className="email-customer border-b-2 border-gray-400 py-3">
              <p className="text-gray-600">E-mail</p>
              <p className="text-gray-700">{userLogin.email}</p>
            </div>
            <div className="phone-customer border-b-2 border-gray-400 py-3">
              <p className="text-gray-600">Phone</p>
              <p className="text-gray-700">{userLogin.soDT}</p>
            </div>
          </div>
          <div className="btn-datVe">
            <button className="btn btn-success w-full">DAT VE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
