import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postThongTinNguoiDungAction } from "../../redux/actions/BookingTicketAction";
import moment from "moment";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DIS_LOADING, LOADING } from "../../redux/actions/types/LoadingType";
// const count = 1;
const KetQuaCheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.BookingTicketReducer
  );

  // const arrPick=_.map(thongTinNguoiDung.thongTinDatVe,(item)=>{
  //   _.pick(item,)
  // })
  useEffect(() => {
    dispatch(postThongTinNguoiDungAction());
  }, []);
  const ticketFirst = (arr) => {
    return _.head(arr);
  };

  console.log(thongTinNguoiDung);
  // LƯU THÔNG TIN ĐẶT VÉ

  return (
    <>
      <div
        className="text-2xl pl-2 font-bold"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeftOutlined /> Tiếp tục đặt vé
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Lịch sử đặt vé
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Chúc bạn xem phim vui vẻ
            </p>
          </div>
          {thongTinNguoiDung?.thongTinDatVe?.length > 0 ? (
            <>
              <div className="flex flex-wrap -m-2">
                {thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
                  return (
                    <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img
                          alt="team"
                          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                          src={ticket.hinhAnh}
                        />
                        <div className="flex-grow">
                          <h2 className="text-gray-900 title-font font-medium">
                            {ticket.tenPhim}
                          </h2>
                          <p className="ngayGio text-gray-600 font-bold">
                            Giờ chiếu :{" "}
                            {moment(ticket.ngayDat).format("hh:mm A")}
                            {" | "}
                            Ngày chiếu :{" "}
                            {moment(ticket.ngayDat).format("DD-MM-YYYY")}
                          </p>
                          <p className="text-gray-700 font-semibold">
                            Địa điểm :{" "}
                            {ticketFirst(ticket.danhSachGhe).tenHeThongRap}
                          </p>
                          <p className="text-gray-700 font-semibold">
                            Rạp : {ticketFirst(ticket.danhSachGhe).tenRap}
                          </p>
                          <p className="font-semibold text-gray-700"> Ghế : </p>{" "}
                          {ticket.danhSachGhe.map((ghe, index) => {
                            return (
                              <span
                                key={index}
                                className="mr-2 text-green-500 font-semibold"
                              >
                                {"["} {ghe.tenGhe} {"]"}
                                {(index + 1) % 5 === 0 ? <br /> : ""}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center text-green-500 text-2xl font-bold">
              Chua co ve nao
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default KetQuaCheckOut;
