import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { useParams } from "react-router-dom";
import { getListPhongVeAction } from "../../redux/actions/BookingTicketAction";
const Checkout = () => {
  const userLogin = useSelector((state) => state.AuthReducer.user);

  const { heThongPhongVe } = useSelector((state) => state.BookingTicketReducer);

  console.log(heThongPhongVe);
  const param = useParams();
  const dispatch = useDispatch();
  const { id } = param;
  useEffect(() => {
    dispatch(getListPhongVeAction(id));
  }, []);
  const { thongTinPhim, danhSachGhe } = heThongPhongVe;
  return (
    <div className="Checkout w-screen">
      <div className="Checkout-content">
        <div className="datGhe">
          <div className="container1">
            <div className="screen"></div>
            <div className="danhSachGhe ">
              {danhSachGhe.map((ghe, index) => {
                const styleGheVip = ghe.loaiGhe === "Vip" ? "seat-vip" : "seat";
                const styleGheDaDat = ghe.daDat === true ? "seat-disable" : "";
                return (
                  <Fragment key={index}>
                    <button
                      disabled={ghe.daDat}
                      className={`${styleGheVip} ${styleGheDaDat} mb-2 ml-2 mr-3`}
                    >
                      {ghe.stt}
                    </button>
                    {(index + 1) % 18 === 0 ? <br /> : ""}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div className="muaVe flex flex-col justify-between border-solid border-3 border-sky-500">
          <div className="info-Ve ">
            <p className="total border-b-2 border-gray-400 py-3">0 $</p>
            <div className="info-content border-b-2 border-gray-400 py-3">
              <b className="tenPhim">{thongTinPhim.tenPhim}</b>
              <p className="diaChi">{thongTinPhim.diaChi}</p>
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
