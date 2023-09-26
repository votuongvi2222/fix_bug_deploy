import React, { useState } from "react";
import "./Film.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ModalTrailer from "./ModalTrailer";
const Films = (props) => {
  const nagivate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { film } = props;
  // console.log("film", film);
  const styleContent = {
    height: "400px",
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  const daoChuoi = (chuoi) => {
    let mangChuoi = chuoi.split("-");

    let mangChuoiDaNguoc = mangChuoi.reverse();

    let ngayKhoiChieu = mangChuoiDaNguoc.join("-");
    return ngayKhoiChieu;

    // let tachChuoi = ngayKhoiChieu.split("");
    // let daoChuoi = tachChuoi.reverse();
    // return daoChuoi.split("-");
  };

  return (
    // <div className="film-item h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-10 rounded-lg overflow-hidden text-center relative mb-2 mr-2">
    //   <div
    //     className="img"
    //     style={{
    //       ...styleContent,
    //       backgroundImage: `url(${film.hinhAnh})`,
    //     }}
    //   >
    //     <img className="opacity-1" src={film.hinhAnh} alt={film.tenPhim} />
    //   </div>
    //   <h1 className="title-film text-xl font-medium text-gray-900 mb-3 h-16">
    //     {film.tenPhim}
    //   </h1>
    //   <p className="leading-relaxed mb-3 content-film h-16">
    //     {film.moTa.length > 0 ? `${film.moTa.slice(0, 100)} ...` : film.moTa}
    //   </p>
    //   <a className="text-indigo-500 inline-flex items-center">Đặt vé</a>
    // </div>

    <div className="card" style={{ width: "18rem", marginTop: 20 }}>
      <div
        className="img"
        style={{
          ...styleContent,
          backgroundImage: `url(${film.hinhAnh})`,
        }}
      >
        <img
          className="card-img-top opacity-0"
          src={film.hinhAnh}
          alt={film.tenPhim}
        />
        <div className="list-Btn">
          <button
            onClick={() => {
              nagivate(`/detail/${film.maPhim}`);
            }}
            className="btn btn-primary mb-2"
          >
            Đặt vé
          </button>
          <ModalTrailer film={film} />
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title text-center font-bold h-8">{film.tenPhim}</h5>

        <p className="card-text">
          {film.moTa.length > 0 ? `${film.moTa.slice(0, 100)} ...` : film.moTa}
        </p>

        <div className="time mt-2 border-t-2 border-gray text-center">
          <span className="font-semibold">
            Ngày khởi chiếu : {daoChuoi(film.ngayKhoiChieu.slice(0, 10))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Films;
