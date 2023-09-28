import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import styleContent from "./MutipleRow.module.css";
import Films from "../Films/Films";
import { useDispatch, useSelector } from "react-redux";
import {
  FILM_DANG_CHIEU,
  FILM_SAP_CHIEU,
} from "../../redux/actions/types/FilmType";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { getThongTinLichChieuAction } from "../../redux/actions/CinemaAction";
import { Cascader, Select } from "antd";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleContent["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleContent["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRows = (props) => {
  // HOOK ĐA NGÔN NGỮ
  const { t, i18n } = useTranslation();
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.ManangerFilmReducer
  );

  // LAY HE THONG RAP CHIEU THEO PHIM

  const { lichChieu } = useSelector((state) => state.ManagerCinema);
  console.log(lichChieu);

  // console.log(props.listFilm);

  const renderListFilm = () => {
    return props.listFilm.slice(0, 12).map((item, index) => {
      return (
        <div className={`${styleContent["item-width"]}`} key={index}>
          <Films film={item} />
        </div>
      );
    });
  };
  // console.log("LISTFILM:", props.listFilm);
  const settings = {
    className: "center slider varialbe-width ",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
    rows: 1,
    dots: false,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const activeClassDC = dangChieu ? "active-btn" : "none-active-btn";
  const activeClassSC = sapChieu ? "active-btn" : "none-active-btn";

  const handleChange = (e) => {
    dispatch(getThongTinLichChieuAction(e.target.value));
  };

  const conversListFilm = () => {
    return props.listFilm?.map((film, index) => {
      return {
        value: film.maPhim,
        label: (
          <div className="w-36">
            {film.tenPhim.length > 20
              ? film.tenPhim.slice(0, 20) + " ..."
              : film.tenPhim}
          </div>
        ),
        children: [
          {
            value: film.maPhim,
            label: (
              <img
                style={{ width: 150, height: 150 }}
                src={film.hinhAnh}
                alt=""
              />
            ),
          },
        ],
      };
    });
  };
  // const options = [
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     children: [
  //       {
  //         value: "hangzhou",
  //         label: (
  //           <img
  //             style={{ width: 150, height: 150 }}
  //             src="https://picsum.photos/200"
  //             alt=""
  //           />
  //         ),
  //       },
  //     ],
  //   },
  // ];

  const onChange = (value) => {
    console.log(value);
  };
  // const displayRender = (labels) => labels[labels.length - 1];
  return (
    <>
      <div className="">
        <Cascader
          options={conversListFilm()}
          expandTrigger="hover"
          // displayRender={displayRender}
          onChange={onChange}
        />
      </div>
      <div className="listBtn text-center">
        <button
          type="button"
          className={`px-8 mr-2 py-3 font-semibold border rounded ${styleContent[activeClassDC]}`}
          onClick={() => {
            dispatch({
              type: FILM_DANG_CHIEU,
            });
          }}
        >
          {t("body.DangChieu")}
        </button>

        <button
          type="button"
          className={`px-8 py-3 font-semibold border rounded ${styleContent[activeClassSC]}`}
          onClick={() => {
            dispatch({
              type: FILM_SAP_CHIEU,
            });
          }}
        >
          {t("body.SapChieu")}
        </button>
      </div>
      <div>
        <Slider {...settings}>{renderListFilm()}</Slider>
      </div>
    </>
  );
};

export default MultipleRows;
