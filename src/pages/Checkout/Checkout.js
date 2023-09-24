import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getListPhongVeAction,
  postDatVeAction,
  postThongTinNguoiDungAction,
} from "../../redux/actions/BookingTicketAction";
import { CloseOutlined, UserOutlined, CheckOutlined } from "@ant-design/icons";
import { CHON_VE, DAT_VE } from "../../redux/actions/types/TicketType";
import _ from "lodash";
import moment from "moment/moment";
import { Tabs } from "antd";
import KetQuaCheckOut from "./KetQuaCheckOut";
const Checkout = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.AuthReducer.user);

  const arrTab = ["01.CHỌN GHẾ & THANH TOÁN", "02.KẾT QUẢ ĐẶT VÉ"];
  const { heThongPhongVe, danhSachVeDangDat, thongTinNguoiDung } = useSelector(
    (state) => state.BookingTicketReducer
  );

  // console.log("USER", userLogin);
  const param = useParams();
  const dispatch = useDispatch();
  const { id } = param;
  useEffect(() => {
    dispatch(getListPhongVeAction(id));
  }, []);
  const { thongTinPhim, danhSachGhe } = heThongPhongVe;
  // console.log(thongTinPhim);
  // console.log("DANG CHON", danhSachVeDangDat);

  // LICH SU DAT VE thongTinNguoiDung

  return (
    <>
      <Tabs
        tabPosition={"top"}
        items={arrTab.map((item, index) => {
          const id = String(index + 1);
          let content = "";
          // console.log(item);
          // console.log(index);
          if (+index === 0) {
            // console.log("vao`");
            content = {
              label: item,
              key: id,
              children: (
                <>
                  {/* CHECKOUt */}
                  <div className="Checkout w-screen">
                    <div className="Checkout-content">
                      <div className="datGhe">
                        <div className="container1">
                          <div className="screen"></div>
                          <div className="text-screen text-gray-400">
                            MÀN HÌNH
                          </div>
                          <div className="danhSachGhe ">
                            {danhSachGhe.map((ghe, index) => {
                              let flag = false;
                              const styleGheVip =
                                ghe.loaiGhe === "Vip" ? "seat-vip" : "seat";
                              const styleGheDaDat =
                                ghe.daDat === true ? "seat-disable" : "";
                              const indexx = danhSachVeDangDat?.findIndex(
                                (item) => item.maGhe === ghe.maGhe
                              );
                              let styleGheDangDat = "";
                              if (indexx !== -1) {
                                styleGheDangDat = "gheDangDat";
                                flag = true;
                              }

                              let styleGheMinhDat = "";
                              if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                                styleGheMinhDat = "gheMinhDat";
                              }
                              return (
                                <Fragment key={index}>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: CHON_VE,
                                        Ghe: ghe,
                                      });
                                    }}
                                    disabled={ghe.daDat}
                                    className={`${styleGheVip} ${styleGheDaDat} ${styleGheDangDat} ${styleGheMinhDat} mb-2 ml-2 mr-3`}
                                  >
                                    {ghe.daDat || flag ? (
                                      <UserOutlined />
                                    ) : (
                                      ghe.stt
                                    )}
                                  </button>
                                  {(index + 1) % 16 === 0 ? <br /> : ""}
                                </Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="muaVe flex flex-col justify-between border-solid border-3 border-sky-500">
                        <div className="info-Ve ">
                          <p className="total border-b-2 text-green-500 text-center text-2xl border-gray-400 py-3">
                            {danhSachVeDangDat
                              ?.reduce((total, item) => {
                                return (total += item.giaVe);
                              }, 0)
                              .toLocaleString()}
                            {"  "}
                            VNĐ
                          </p>
                          <div className="info-content border-b-2 border-gray-400 py-3">
                            <b className="tenPhim">{thongTinPhim.tenPhim}</b>
                            <p className="diaChi">
                              Địa chỉ : {thongTinPhim.diaChi}
                            </p>
                            <p className="ngayChieu">
                              Lịch chiếu : {thongTinPhim.ngayChieu}
                            </p>
                          </div>
                          <div className="flex justify-between border-b-2 border-gray-400 py-3">
                            <div className=" text-red-600 w-3/4 flex flex-wrap items-center ">
                              <p className="text-white">Ghế :</p>
                              {_.sortBy(danhSachVeDangDat, ["stt"])?.map(
                                (veDD, index) => {
                                  // console.log(veDD);
                                  return (
                                    <Fragment key={index}>
                                      <span
                                        className="px-2 text-xl font-bold"
                                        key={index}
                                      >
                                        {veDD.stt}
                                      </span>
                                      {(index + 1) % 4 ? <br /> : ""}
                                    </Fragment>
                                  );
                                }
                              )}
                            </div>
                            <p className="tienGhe mr-5 text-green-600 w-1/4">
                              {danhSachVeDangDat
                                ?.reduce((total, item) => {
                                  return (total += item.giaVe);
                                }, 0)
                                .toLocaleString()}
                              {"  "}
                              VNĐ
                            </p>
                          </div>
                          <div className="email-customer border-b-2 border-gray-400 py-3">
                            <p className="text-white">E-mail</p>
                            <p className="text-white">{userLogin.email}</p>
                          </div>
                          <div className="phone-customer border-b-2 border-gray-400 py-3">
                            <p className="text-white">Phone</p>
                            <p className="text-white">{userLogin.soDT}</p>
                          </div>
                        </div>
                        <div className="btn-datVe">
                          <button
                            onClick={() => {
                              dispatch(
                                postDatVeAction({
                                  maLichChieu: thongTinPhim.maLichChieu,
                                  danhSachVe: danhSachVeDangDat,
                                })
                              );
                              navigate("/checkout/result");
                            }}
                            className="btn btn-success w-full"
                          >
                            ĐẶT VÉ
                          </button>
                        </div>
                      </div>
                      <div className="table-seat">
                        <table className="table-fix">
                          <thead>
                            <tr>
                              <th>Ghế thường</th>
                              <th>Ghế vip</th>
                              <th>Ghế đang đặt</th>
                              <th>Ghế đã đươc đặt</th>
                              <th>Ghế bạn đặt</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p className="seatTable flex items-center justify-center">
                                  <CheckOutlined />
                                </p>
                              </td>
                              <td>
                                <p className="seatVipTable flex items-center justify-center ">
                                  <CheckOutlined />
                                </p>
                              </td>
                              <td>
                                <p className="seatDangDatTable flex items-center justify-center">
                                  <CheckOutlined />
                                </p>
                              </td>
                              <td>
                                <p className="seatTable seat-disable flex items-center justify-center">
                                  <CheckOutlined />
                                </p>
                              </td>
                              <td>
                                <p className="seatTable gheMinhDat flex items-center justify-center">
                                  <CheckOutlined />
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ),
            };
          } else if (+index === 1) {
            content = {
              label: item,
              key: id,
              children: (
                <>
                  {/* INFO USER  */}

                  <KetQuaCheckOut />
                </>
              ),
            };
          }
          return content;
        })}
      />
      {/* <div className="Checkout w-screen">
        <div className="Checkout-content">
          <div className="datGhe">
            <div className="container1">
              <div className="screen"></div>
              <div className="text-screen text-gray-400">MÀN HÌNH</div>
              <div className="danhSachGhe ">
                {danhSachGhe.map((ghe, index) => {
                  let flag = false;
                  const styleGheVip =
                    ghe.loaiGhe === "Vip" ? "seat-vip" : "seat";
                  const styleGheDaDat =
                    ghe.daDat === true ? "seat-disable" : "";
                  const indexx = danhSachVeDangDat?.findIndex(
                    (item) => item.maGhe === ghe.maGhe
                  );
                  let styleGheDangDat = "";
                  if (indexx !== -1) {
                    styleGheDangDat = "gheDangDat";
                    flag = true;
                  }

                  let styleGheMinhDat = "";
                  if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                    styleGheMinhDat = "gheMinhDat";
                  }
                  return (
                    <Fragment key={index}>
                      <button
                        onClick={() => {
                          dispatch({
                            type: CHON_VE,
                            Ghe: ghe,
                          });
                        }}
                        disabled={ghe.daDat}
                        className={`${styleGheVip} ${styleGheDaDat} ${styleGheDangDat} ${styleGheMinhDat} mb-2 ml-2 mr-3`}
                      >
                        {ghe.daDat || flag ? <UserOutlined /> : ghe.stt}
                      </button>
                      {(index + 1) % 16 === 0 ? <br /> : ""}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="muaVe flex flex-col justify-between border-solid border-3 border-sky-500">
            <div className="info-Ve ">
              <p className="total border-b-2 text-green-500 text-center text-2xl border-gray-400 py-3">
                {danhSachVeDangDat
                  ?.reduce((total, item) => {
                    return (total += item.giaVe);
                  }, 0)
                  .toLocaleString()}
                {"  "}
                VNĐ
              </p>
              <div className="info-content border-b-2 border-gray-400 py-3">
                <b className="tenPhim">{thongTinPhim.tenPhim}</b>
                <p className="diaChi">Địa chỉ : {thongTinPhim.diaChi}</p>
                <p className="ngayChieu">
                  Lịch chiếu : {thongTinPhim.ngayChieu}
                </p>
              </div>
              <div className="flex justify-between border-b-2 border-gray-400 py-3">
                <div className=" text-red-600 w-3/4 flex flex-wrap items-center ">
                  <p className="text-white">Ghế :</p>
                  {_.sortBy(danhSachVeDangDat, ["stt"])?.map((veDD, index) => {
                    // console.log(veDD);
                    return (
                      <Fragment key={index}>
                        <span className="px-2 text-xl font-bold" key={index}>
                          {veDD.stt}
                        </span>
                        {(index + 1) % 4 ? <br /> : ""}
                      </Fragment>
                    );
                  })}
                </div>
                <p className="tienGhe mr-5 text-green-600 w-1/4">
                  {danhSachVeDangDat
                    ?.reduce((total, item) => {
                      return (total += item.giaVe);
                    }, 0)
                    .toLocaleString()}
                  {"  "}
                  VNĐ
                </p>
              </div>
              <div className="email-customer border-b-2 border-gray-400 py-3">
                <p className="text-white">E-mail</p>
                <p className="text-white">{userLogin.email}</p>
              </div>
              <div className="phone-customer border-b-2 border-gray-400 py-3">
                <p className="text-white">Phone</p>
                <p className="text-white">{userLogin.soDT}</p>
              </div>
            </div>
            <div className="btn-datVe">
              <button
                onClick={() => {
                  dispatch(
                    postDatVeAction({
                      maLichChieu: thongTinPhim.maLichChieu,
                      danhSachVe: danhSachVeDangDat,
                    })
                  );
                }}
                className="btn btn-success w-full"
              >
                ĐẶT VÉ
              </button>
            </div>
          </div>
          <div className="table-seat">
            <table className="table-fix">
              <thead>
                <tr>
                  <th>Ghế thường</th>
                  <th>Ghế vip</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế đã đươc đặt</th>
                  <th>Ghế bạn đặt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className="seatTable flex items-center justify-center">
                      <CheckOutlined />
                    </p>
                  </td>
                  <td>
                    <p className="seatVipTable flex items-center justify-center ">
                      <CheckOutlined />
                    </p>
                  </td>
                  <td>
                    <p className="seatDangDatTable flex items-center justify-center">
                      <CheckOutlined />
                    </p>
                  </td>
                  <td>
                    <p className="seatTable seat-disable flex items-center justify-center">
                      <CheckOutlined />
                    </p>
                  </td>
                  <td>
                    <p className="seatTable gheMinhDat flex items-center justify-center">
                      <CheckOutlined />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Checkout;
