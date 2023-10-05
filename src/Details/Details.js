import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "./Details.scss";
import { Rate, Tabs, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getThongTinPhimAction } from "../redux/actions/CinemaAction";
import { LoadingOutlined } from "@ant-design/icons";
import contentStyle from "./Details.module.css";
import moment from "moment/moment";
// import { Rate } from "react";

// DATARATE

import data from "../assets/dataRate.json";

import { Spin } from "antd";
import { UP_COMMENT } from "../redux/actions/types/AuthType";

const Details = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { filmDetail } = useSelector((state) => state.ManagerCinema);
  // console.log({ filmDetail });
  const { user } = useSelector((state) => state.AuthReducer);

  // DATA RATE
  const { dataRate } = data;

  // StateDataRate

  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    let currentdate = new Date();
    let datetime =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    setCurrentTime(datetime);
  }, []);
  // DATA COMMENT JSON
  const { dataComment } = useSelector((state) => state.AuthReducer);

  // console.log({ dataComment });
  const [star, setStar] = useState(0);
  // Binh luan
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleChangeStar = (e) => {
    setStar(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currTime = new Date().toLocaleTimeString();
    dispatch({
      type: UP_COMMENT,
      userCurrent: {
        hoTen: user.hoTen,
        email: user.email,
        binhLuan: comment,
        rate: star * 2,
        dateTime: currTime,
      },
    });
    setComment("");
    setStar(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const arrKhongCoLich = [1];
  const arrTab = ["Lịch Chiếu", "Thông Tin", "Đánh Giá"];
  // console.log(filmDetail.danhGia / 2);
  // const daoChuoi = (chuoi) => {
  //   const tachChuoi = chuoi.split("-");
  //   const reverseChuoi = tachChuoi.reverse();
  //   const chuoiDao = reverseChuoi.join("-");
  //   return chuoiDao;
  // };
  // BACK GROUND BEFORE
  useEffect(() => {
    const hiddenDiv = ref.current;
    // console.log(hiddenDiv.style);

    hiddenDiv.style.setProperty(
      "--before-background",
      `url(${filmDetail.hinhAnh})`
    );
  }, [filmDetail]);

  // LOADING

  // LAY THONG TIN PHIM
  useEffect(() => {
    setLoading(true);
    dispatch(getThongTinPhimAction(id));
    setTimeout(() => {
      setLoading(false);
    }, [2000]);
  }, []);

  return (
    <>
      <div className="movie-card">
        <div className="img-movie">
          <a href="/">
            <img src={filmDetail.hinhAnh} alt="cover" className="cover w-32" />
          </a>
          <div className="hero" ref={ref}>
            <div className="details">
              <div className="title1">
                {filmDetail.tenPhim} <span>PG-18</span>
              </div>
              <div className="title2">
                Ngày chiếu :{" "}
                {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
              </div>
              <fieldset className="rating">
                <Rate allowHalf value={filmDetail.danhGia / 2} />
              </fieldset>
              <span className="likes">{filmDetail.maPhim} likes</span>
            </div>{" "}
            {/* end details */}
          </div>{" "}
          {/* end hero */}
          <div className="description">
            <div className="column1">
              <span className="tag">action</span>
              <span className="tag">fantasy</span>
              <span className="tag">adventure</span>
            </div>{" "}
            {/* end column1 */}
            <div className="column2">
              <p>
                {filmDetail?.moTa?.slice(0, 400)}... <a href="#">read more</a>
              </p>

              {/* end avatars */}
            </div>{" "}
            {/* end column2 */}
          </div>{" "}
          {/* end description */}
        </div>{" "}
      </div>

      <Tabs
        tabPosition={"top"}
        centered={true}
        items={arrTab.map((item, i) => {
          const id = String(i + 1);
          let content = "Hiện không có lịch chiếu";
          if (i === 0) {
            content = {
              label: item,
              key: id,
              children: (
                <>
                  {filmDetail.heThongRapChieu?.length > 0 ? (
                    <Tabs
                      style={{ width: "80%", margin: "auto" }}
                      tabPosition={"left"}
                      items={filmDetail.heThongRapChieu?.map((item, index) => {
                        const id = String(index + 1);
                        // console.log("ITEMMMM", item);
                        return {
                          label: (
                            <img
                              src={item.logo}
                              style={{ width: 50, height: 50 }}
                              alt=""
                            />
                          ),
                          key: id,
                          children: (
                            <>
                              {item.cumRapChieu?.map((rap, index) => {
                                // console.log("RAP", rap);
                                return (
                                  <div key={index}>
                                    <div className="lichChieu d-flex flex-row items-center ">
                                      <div className="img mt-3">
                                        <img
                                          style={{
                                            width: "60px",
                                            height: "60px",
                                          }}
                                          src={rap.hinhAnh}
                                          alt=""
                                        />
                                      </div>
                                      <div className="info-rap ml-2 mt-2">
                                        <p className="nameRap text-xl font-semibold">
                                          {rap.tenCumRap}
                                        </p>
                                        <p className="address text-gray-400">
                                          {rap.diaChi}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="gioChieu grid gap-4 grid-cols-4 pt-3">
                                      {rap.lichChieuPhim?.map((lich, index) => {
                                        // console.log(lich);
                                        return (
                                          <div
                                            className="col-span-1"
                                            key={index}
                                          >
                                            <NavLink
                                              className={`${contentStyle["item-hour"]}`}
                                              to={`/checkout/${lich.maLichChieu}`}
                                            >
                                              {moment(
                                                lich.ngayChieuGioChieu
                                              ).format("HH:MM A")}
                                            </NavLink>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ),
                        };
                      })}
                    />
                  ) : (
                    <div className="font-bold text-2xl text-center">
                      Hiện không có lịch chiếu
                    </div>
                  )}
                </>
              ),
            };
          } else if (i === 1) {
            content = {
              label: item,
              key: id,
              children: (
                <div
                  style={{ width: "80%", margin: "auto", textAlign: "center" }}
                >
                  <div className="font-bold text-2xl">{filmDetail.tenPhim}</div>
                  <div className="text-xl font-semibold">
                    {moment(filmDetail.ngayChieuGioChieu).format("DD/MM/YYYY")}
                  </div>
                  <div
                    className="mt-2"
                    style={{ width: "60%", margin: "auto" }}
                  >
                    {filmDetail.moTa}
                  </div>
                </div>
              ),
            };
          } else {
            content = {
              label: item,
              key: id,
              children: (
                <div>
                  <div classname="card">
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                      <div className="p-10">
                        <div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
                          <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
                            {user.hoTen.slice(0, 1)}
                          </div>
                          <div className="mt-4">
                            <h1 className="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
                              {filmDetail.tenPhim}
                            </h1>
                            <div className="flex mt-2">
                              <Rate
                                allowHalf
                                onChange={handleChangeStar}
                                value={star}
                              />
                            </div>
                            <div className="mt-4 danhGia text-md text-gray-600 flex items-center justify-between">
                              <textarea
                                className={`${contentStyle["textAre"]}`}
                                style={{
                                  paddingLeft: "10px",
                                  border: "1px solid black",
                                  width: "80%",
                                  borderRadius: "8px",
                                }}
                                placeholder="Bạn nghĩ gì?"
                                name="comment"
                                value={comment}
                                onChange={handleChange}
                              ></textarea>

                              <div
                                className="
                              p-6 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white  shadow-lg cursor-pointer
                              "
                                onClick={(e) => {
                                  handleSubmit(e);
                                }}
                              >
                                +
                              </div>
                            </div>

                            {/* ARRR REVIEW */}
                            {dataComment.map((item, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className="flex justify-between items-center"
                                  >
                                    <div className="mt-4 flex items-center space-x-4 py-6">
                                      <div>
                                        <div
                                          className="w-12 h-12 rounded-full bg-black"
                                          style={{ position: "relative" }}
                                        >
                                          <span
                                            style={{
                                              position: "absolute",
                                              top: "50%",
                                              left: "50%",
                                              transform: `translate(${-50}%,${-50}%)`,
                                              zIndex: 10,
                                              color: "gold",
                                            }}
                                          >
                                            {" "}
                                            {item.hoTen.slice(0, 1)}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="text-sm font-semibold">
                                        {item.email}
                                        <span className="font-normal">
                                          {" "}
                                          {item.dateTime}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <Rate allowHalf value={item.rate / 2} />
                                  </div>
                                  <div>{item.binhLuan}</div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            };
          }
          return content;
        })}
      />
    </>
  );
};

export default Details;
