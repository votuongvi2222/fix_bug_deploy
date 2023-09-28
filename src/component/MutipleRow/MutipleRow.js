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
import moment from "moment";
import { useTranslation } from "react-i18next";
import { getThongTinLichChieuAction } from "../../redux/actions/CinemaAction";
import { Cascader, Select } from "antd";
import _, { pick } from "lodash";
import { useState } from "react";
import {
  getThongTinHeThongRap,
  getThongTinLichChieu,
} from "../../services/ManagerCinemaService";
import { list } from "postcss";

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
  const [edit, setEdit] = useState({
    film: "",
    cumRap: "",
    ngayChieu: "",
    gioChieu: "",
  });

  const [chose, setChose] = useState(false);
  // const [choseFilm, setChoseFilm] = useState(false);
  // const [choseRap, setChoseRap] = useState(false);
  // const [ngayXem, setNgayXem] = useState(false);
  // const [suatChieu, setSuatChieu] = useState(false);

  // DAT STATE CUMRAP

  const [cumRap, setCumRap] = useState([]);
  // LAY HE THONG RAP CHIEU THEO PHIM

  // const { lichChieu } = useSelector((state) => state.ManagerCinema);
  // console.log(lichChieu);

  // console.log(props.listFilm);
  // console.log("pickLodash", pickLodash);
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
            value: film.tenPhim,
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

  useEffect(() => {
    console.log(cumRap);
  }, [cumRap]);

  // Neu thay doi film thi clear het form
  useEffect(() => {
    setEdit({
      ...edit,
      cumRap: "",
      ngayChieu: "",
      gioChieu: "",
    });
  }, [edit.film]);

  const onChangeFilm = async (value) => {
    // Lay thong tin lich chieu
    setEdit({
      ...edit,
      film: value[1],
    });
    try {
      const res = await getThongTinLichChieu(value[0]);
      if (res && res.statusCode === 200) {
        console.log(res);
        setCumRap(res.content.heThongRapChieu);
        console.log("CUM RAP ", cumRap);
      } else {
        console.log("LOI", res.content);
      }
    } catch (err) {
      console.log("ERR", err);
    }
    //co lichChieu dung lodash pick ra cumRapChieu
    // const arrCumRapChieu = _.map(lichChieu?.heThongRapChieu, (item) =>
    //   _.map(item, "cumRapChieu")
    // );
  };

  const onChangeCumRap = (e) => {
    setEdit({
      ...edit,
      cumRap: e.target.value,
    });
  };

  const onChangeLichChieu = (e) => {
    setEdit({
      ...edit,
      ngayChieu: e.target.value,
    });
  };
  const onChangeSuatChieu = (e) => {
    setEdit({
      ...edit,
      gioChieu: e.target.value,
    });
  };

  const converseListCumRap = () => {
    return cumRap?.map((cr, index) => {
      return cr.cumRapChieu?.map((item, index) => {
        return (
          <option key={index} value={item.maCumRap}>
            {item.tenCumRap}
          </option>
        );
      });
    });
  };

  const converseListLichChieu = () => {
    // console.log("co vao");
    return cumRap?.map((cr, index) => {
      // console.log("CRRR", cr);
      return cr.cumRapChieu?.map((item, index) => {
        // console.log("Item", item);
        return item.lichChieuPhim?.map((lc, index) => {
          // console.log("LICH CHIEU", lc);
          return (
            <option key={index} value={lc.maLichChieu}>
              {moment(lc.ngayChieuGioChieu).format("DD/MM/YYYY")}
            </option>
          );
        });
      });
    });
  };

  const converseSuatChieu = () => {
    // console.log("co vao");
    return cumRap?.map((cr, index) => {
      // console.log("CRRR", cr);
      return cr.cumRapChieu?.map((item, index) => {
        // console.log("Item", item);
        return item.lichChieuPhim?.map((lc, index) => {
          // console.log("LICH CHIEU", lc);
          return (
            <option key={index} value={lc.maLichChieu}>
              {moment(lc.ngayChieuGioChieu).format("hh:mm A")}
            </option>
          );
        });
      });
    });
  };
  // const displayRender = (labels) => labels[labels.length - 1];
  return (
    <>
      <div className="flex justify-center mb-4">
        <Cascader
          options={conversListFilm()}
          expandTrigger="hover"
          // displayRender={displayRender}
          onChange={onChangeFilm}
        />

        <select
          style={{ border: "2px solid green" }}
          name="cumRap"
          value={edit.cumRap}
          //DISABLE SET THEO GIA TRI DANG TRUOC CO THI` SE CO SELECT
          disabled={edit.film === "" ? true : false}
          className={
            edit.film === ""
              ? "mx-4 border-green-500 rounded-lg cursor-no-drop"
              : "mx-4 border-green-500 rounded-lg"
          }
          onChange={onChangeCumRap}
        >
          <option value="">Chose cum Rap</option>
          {converseListCumRap()}
        </select>
        <select
          name="gioChieu "
          value={edit.ngayChieu}
          //DISABLE SET THEO GIA TRI DANG TRUOC CO THI` SE CO SELECT
          disabled={edit.cumRap === "" ? true : false}
          className={
            edit.cumRap === "" || edit.film === ""
              ? "mr-4 cursor-no-drop"
              : "mr-4"
          }
          onChange={onChangeLichChieu}
        >
          <option value="">Chose lich chieu</option>
          {converseListLichChieu()}
        </select>

        <select
          name="suatChieu"
          //DISABLE SET THEO GIA TRI DANG TRUOC CO THI` SE CO SELECT
          disabled={edit.ngayChieu === "" ? true : false}
          className={
            edit.ngayChieu === "" || edit.film === "" ? "cursor-no-drop" : ""
          }
          onChange={onChangeSuatChieu}
          value={edit.gioChieu}
        >
          <option value="">Chose suat chieu</option>
          {converseSuatChieu()}
        </select>
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
